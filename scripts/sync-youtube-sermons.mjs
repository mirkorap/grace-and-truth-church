#!/usr/bin/env node

/**
 * Syncs sermons from the church YouTube channel into Sanity.
 *
 * Sources:
 *  - With YOUTUBE_API_KEY set: full channel backfill via YouTube Data API v3.
 *  - Without it: falls back to the channel RSS feed (latest 15 videos only).
 *
 * Required env (in .env.local or the shell):
 *  - SANITY_API_PROJECT_ID / SANITY_API_DATASET  (already used by the site)
 *  - SANITY_API_WRITE_TOKEN                      (Sanity token with Editor role)
 *  - YOUTUBE_API_KEY                             (optional, for full backfill)
 *
 * Usage:
 *  node scripts/sync-youtube-sermons.mjs --dry-run    preview without writing
 *  node scripts/sync-youtube-sermons.mjs              sync new videos
 *  Flags:
 *   --limit=N          only process the N most recent videos
 *   --select           interactively pick which sermons to sync from a
 *                      numbered list (e.g. "1,3,5-8" or "all")
 *   --ids=ID1,ID2      only sync the given YouTube video IDs (non-interactive)
 *   --force            overwrite already-synced sermons (createOrReplace)
 *   --reset            sync from zero: DELETE every sermon document in Sanity
 *                      (manual entries included), then rebuild all from YouTube
 *   --no-image         skip thumbnail upload
 *   --include-shorts   do not filter out videos shorter than 2 minutes
 *
 * Existing sermons are matched by slug (= YouTube video ID) and skipped,
 * so manual edits in Sanity Studio are never overwritten (unless --force).
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? 'UCnBhss0G3LqcZ5PvpQf3lLA';
const API_VERSION = 'v2024-01-01';

// ——— tiny .env loader (no deps) ———
for (const file of ['.env.local', '.env']) {
  const path = join(ROOT, file);
  if (!existsSync(path)) continue;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"#]*)"?\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim();
  }
}

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) =>
  args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1];

const DRY_RUN = flag('dry-run');
const FORCE = flag('force');
const NO_IMAGE = flag('no-image');
const INCLUDE_SHORTS = flag('include-shorts');
const RESET = flag('reset');
const SELECT = flag('select');
const LIMIT = Number(opt('limit') ?? Infinity);
const IDS = opt('ids')
  ?.split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const YT_KEY = process.env.YOUTUBE_API_KEY;
const PROJECT_ID = process.env.SANITY_API_PROJECT_ID;
const DATASET = process.env.SANITY_API_DATASET;
const WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!PROJECT_ID || !DATASET)
  fail('Missing SANITY_API_PROJECT_ID / SANITY_API_DATASET.');
if (!DRY_RUN && !WRITE_TOKEN)
  fail('Missing SANITY_API_WRITE_TOKEN (use --dry-run to preview).');

function fail(msg) {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

// ——— Bible book detection (single source of truth: types/Translation.ts) ———
const transSource = readFileSync(join(ROOT, 'types/Translation.ts'), 'utf8');
const BOOKS = [
  ...transSource.matchAll(/^\s*'?([a-z0-9]+)'?:\s*'([^']+)',/gm),
].map(([, key, it]) => ({
  key,
  it,
  norm: normalize(it),
}));
// longest names first so "1 Giovanni" wins over "Giovanni"
BOOKS.sort((a, b) => b.norm.length - a.norm.length);

function normalize(s) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

function findBook(text) {
  const norm = normalize(text);
  for (const book of BOOKS) {
    const re = new RegExp(
      `(?<![A-Z0-9])${book.norm}(?![A-Z])\\s*(\\d{1,3}(?:\\s*[:.,]\\s*\\d{1,3})?(?:\\s*-\\s*\\d{1,3}(?:\\s*[:.,]\\s*\\d{1,3})?)?)?`,
    );
    const m = norm.match(re);
    if (m)
      return {
        book: book.key,
        verses: m[1] ? m[1].replace(/\s+/g, '').replace(/[.,]/g, ':') : '',
      };
  }
  return { book: '', verses: '' };
}

// ——— title parsing: "G. FORTUNA 19/04/2026 - COSA SIGNIFICA ADORARE DIO (GIOVANNI 4:1-30)" ———
const SMALL_WORDS = new Set(
  'e di a da in con su per tra fra la le lo il i gli un una del della dei delle nel nella che non al alla ai alle'.split(
    ' ',
  ),
);

function titleCase(s) {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) =>
      i > 0 && SMALL_WORDS.has(w)
        ? w
        : w
            .replace(/\p{L}/u, (c) => c.toUpperCase())
            .replace(/(\p{L}')(\p{L})/u, (_, a, b) => a + b.toUpperCase()),
    )
    .join(' ');
}

function parseVideo({ videoId, rawTitle, description, uploadedAt }) {
  const dateMatch = rawTitle.match(/(\d{1,2})[\/.](\d{1,2})[\/.](\d{2,4})/);
  let publishedAt = uploadedAt;

  if (dateMatch) {
    const [, d, mo, y] = dateMatch.map(Number);
    const year = y < 100 ? 2000 + y : y;
    const date = new Date(Date.UTC(year, mo - 1, d, 10));
    // titles sometimes contain typos in the year: trust it only if close to the upload date
    const drift = Math.abs(date - new Date(uploadedAt)) / 86400000;
    if (!Number.isNaN(date.getTime()) && drift < 90)
      publishedAt = date.toISOString();
  }

  // author = short prefix before the date ("G. FORTUNA 19/04/2026 - ...");
  // when the date is elsewhere, drop it and split on " - " or ": " instead
  let author = '';
  let rest = rawTitle;
  if (dateMatch) {
    const before = rawTitle.slice(0, dateMatch.index);
    const after = rawTitle.slice(dateMatch.index + dateMatch[0].length);
    if (
      before.trim() &&
      before.trim().length <= 25 &&
      !/[-–:]\s/.test(before)
    ) {
      author = before;
      rest = after;
    } else {
      rest = `${before} ${after}`;
    }
  }
  if (!author) {
    const [head] = rest.split(/\s+[-–]\s+|:\s+/);
    if (head.length < rest.length && head.trim().length <= 25) {
      author = head;
      rest = rest.slice(head.length).replace(/^\s*[-–:]\s*/, '');
    }
  }
  author = titleCase(
    author
      .replace(/^\s*PRED(ICAZIONE)?\.?\s*/i, '')
      .replace(/[-–:,\s]+$/g, '')
      .trim(),
  );
  rest = rest
    .replace(/^[-–:,\s]+/, '')
    .replace(/[-–:,\s]+$/, '')
    .trim();
  if (!rest) rest = rawTitle.trim();

  const { book, verses } = findBook(`${rawTitle}\n${description}`);

  return {
    videoId,
    title: titleCase(rest),
    author,
    publishedAt,
    book,
    verses,
    description: (description ?? '').trim(),
  };
}

// ——— YouTube fetchers ———
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok)
    fail(
      `${res.status} ${res.statusText} — ${url.split('?')[0]}\n${await res.text()}`,
    );
  return res.json();
}

async function fetchFromApi() {
  const playlist = 'UU' + CHANNEL_ID.slice(2); // uploads playlist
  const items = [];
  let pageToken = '';

  do {
    const data = await fetchJson(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlist}&key=${YT_KEY}&pageToken=${pageToken}`,
    );
    items.push(...data.items);
    pageToken = data.nextPageToken ?? '';
  } while (pageToken);

  // durations, to filter out Shorts and unfinished live streams
  const durations = new Map();
  if (!INCLUDE_SHORTS) {
    const ids = items.map((i) => i.contentDetails.videoId);
    for (let i = 0; i < ids.length; i += 50) {
      const data = await fetchJson(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids.slice(i, i + 50).join(',')}&key=${YT_KEY}`,
      );
      for (const v of data.items)
        durations.set(v.id, parseDuration(v.contentDetails.duration));
    }
  }

  return items
    .filter(
      (i) =>
        INCLUDE_SHORTS || (durations.get(i.contentDetails.videoId) ?? 0) >= 120,
    )
    .map((i) => ({
      videoId: i.contentDetails.videoId,
      rawTitle: i.snippet.title,
      description: i.snippet.description,
      uploadedAt: i.contentDetails.videoPublishedAt ?? i.snippet.publishedAt,
      thumbnail: (
        i.snippet.thumbnails.maxres ??
        i.snippet.thumbnails.standard ??
        i.snippet.thumbnails.high
      )?.url,
    }));
}

function parseDuration(iso) {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) ?? [];
  return (
    (Number(m[1]) || 0) * 3600 + (Number(m[2]) || 0) * 60 + (Number(m[3]) || 0)
  );
}

async function fetchFromRss() {
  console.warn(
    '⚠ No YOUTUBE_API_KEY — using the RSS feed (latest 15 videos only).',
  );
  const xml = await (
    await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
    )
  ).text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, entry]) => {
      const get = (re) => entry.match(re)?.[1] ?? '';
      return {
        videoId: get(/<yt:videoId>([^<]+)/),
        rawTitle: decodeXml(get(/<title>([^<]*)/)),
        description: decodeXml(
          get(/<media:description>([\s\S]*?)<\/media:description>/),
        ),
        uploadedAt: get(/<published>([^<]+)/),
        thumbnail: `https://i.ytimg.com/vi/${get(/<yt:videoId>([^<]+)/)}/maxresdefault.jpg`,
      };
    })
    .filter((v) => v.videoId && !/#shorts/i.test(v.rawTitle));
}

function decodeXml(s) {
  return s
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

// ——— Sanity helpers ———
const sanityBase = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}`;
const authHeaders = WRITE_TOKEN
  ? { Authorization: `Bearer ${WRITE_TOKEN}` }
  : {};

async function fetchExistingSlugs() {
  const query = encodeURIComponent('*[_type == "sermon"].slug.current');
  const res = await fetch(
    `${sanityBase}/data/query/${DATASET}?query=${query}`,
    { headers: authHeaders },
  );
  if (!res.ok) fail(`Sanity query failed: ${res.status} ${await res.text()}`);
  return new Set((await res.json()).result.filter(Boolean));
}

async function uploadThumbnail(videoId, url) {
  let res = await fetch(url);
  // maxresdefault does not exist for every video — fall back to hqdefault
  if (!res.ok)
    res = await fetch(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
  if (!res.ok) return null;
  const upload = await fetch(
    `${sanityBase}/assets/images/${DATASET}?filename=sermon-${videoId}.jpg`,
    {
      method: 'POST',
      headers: { ...authHeaders, 'Content-Type': 'image/jpeg' },
      body: Buffer.from(await res.arrayBuffer()),
    },
  );
  if (!upload.ok)
    fail(`Image upload failed: ${upload.status} ${await upload.text()}`);
  return (await upload.json()).document._id;
}

function toPortableText(videoId, text) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs.map((p, i) => ({
    _type: 'block',
    _key: `${videoId}-${i}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `${videoId}-${i}-0`,
        text: p.replace(/\n/g, ' '),
        marks: [],
      },
    ],
  }));
}

async function mutate(mutations) {
  const res = await fetch(`${sanityBase}/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: { ...authHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok)
    fail(`Sanity mutation failed: ${res.status} ${await res.text()}`);
}

// ——— sermon selection (--select / --ids) ———
function sermonLabel(parsed) {
  return `${parsed.publishedAt.slice(0, 10)}  ${parsed.title}${parsed.book ? `  [${parsed.book} ${parsed.verses}]` : ''}`;
}

function parseSelection(input, max) {
  const picked = new Set();
  for (const part of input.split(',')) {
    const p = part.trim();
    if (!p) continue;
    const m = p.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!m) return null;
    const from = Number(m[1]);
    const to = Number(m[2] ?? m[1]);
    if (from < 1 || to > max || from > to) return null;
    for (let i = from; i <= to; i += 1) picked.add(i - 1);
  }
  return picked.size > 0 ? picked : null;
}

async function promptSelection(list) {
  if (!process.stdin.isTTY)
    fail('--select needs an interactive terminal (use --ids=ID1,ID2 instead).');

  console.log('\nSermons available to sync:\n');
  list.forEach((video, i) => {
    console.log(
      `  ${String(i + 1).padStart(3)}. ${sermonLabel(parseVideo(video))}`,
    );
  });

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    for (;;) {
      const answer = (
        await rl.question(
          '\nWhich sermons? (e.g. "1,3,5-8", "all", empty to cancel) › ',
        )
      ).trim();
      if (!answer) return [];
      if (/^all$/i.test(answer)) return list;
      const picked = parseSelection(answer, list.length);
      if (picked) return list.filter((_, i) => picked.has(i));
      console.log(
        `Invalid selection — use numbers or ranges between 1 and ${list.length}, e.g. "1,3,5-8".`,
      );
    }
  } finally {
    rl.close();
  }
}

// ——— main ———
const videos = (YT_KEY ? await fetchFromApi() : await fetchFromRss()).slice(
  0,
  LIMIT,
);
let existing = await fetchExistingSlugs();
console.log(
  `Found ${videos.length} video(s) on YouTube, ${existing.size} sermon(s) already in Sanity.`,
);

if (RESET) {
  if (DRY_RUN) {
    console.log(
      `--reset: would delete all ${existing.size} existing sermon(s) before syncing.`,
    );
  } else {
    await mutate([{ delete: { query: '*[_type == "sermon"]' } }]);
    console.log(`--reset: deleted ${existing.size} existing sermon(s).`);
  }
  existing = new Set();
}

const candidates = videos.filter((v) => FORCE || !existing.has(v.videoId));
if (candidates.length === 0) {
  console.log('✔ Nothing to sync — everything is already in Sanity.');
  process.exit(0);
}

let selected = candidates;
if (IDS) {
  selected = candidates.filter((v) => IDS.includes(v.videoId));
  const found = new Set(selected.map((v) => v.videoId));
  for (const id of IDS.filter((id) => !found.has(id)))
    console.warn(`⚠ --ids: "${id}" not found among the syncable videos.`);
} else if (SELECT) {
  selected = await promptSelection(candidates);
}

if (selected.length === 0) {
  console.log('Nothing selected — exiting without changes.');
  process.exit(0);
}
if (selected.length < candidates.length)
  console.log(
    `Selected ${selected.length} of ${candidates.length} syncable sermon(s).`,
  );

let created = 0;
for (const video of selected) {
  const parsed = parseVideo(video);
  const label = sermonLabel(parsed);

  if (DRY_RUN) {
    console.log(`would create: ${label}  (author: ${parsed.author || '—'})`);
    continue;
  }

  const assetId = NO_IMAGE
    ? null
    : await uploadThumbnail(video.videoId, video.thumbnail);
  const doc = {
    _id: `sermon-yt-${video.videoId}`,
    _type: 'sermon',
    title: parsed.title,
    slug: { _type: 'slug', current: video.videoId },
    publishedAt: parsed.publishedAt,
    author: parsed.author,
    ...(parsed.book && { book: parsed.book }),
    ...(parsed.verses && { verses: parsed.verses }),
    ...(assetId && {
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    }),
    ...(parsed.description && {
      text: toPortableText(video.videoId, parsed.description),
    }),
  };

  await mutate([{ [FORCE ? 'createOrReplace' : 'createIfNotExists']: doc }]);
  created += 1;
  console.log(`✔ created: ${label}`);
}

console.log(
  DRY_RUN
    ? `\n${selected.length} sermon(s) would be created. Run without --dry-run to sync.`
    : `\nDone — ${created} sermon(s) synced to Sanity.`,
);
