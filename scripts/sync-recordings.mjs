#!/usr/bin/env node

/**
 * Converts the raw bible-study recordings, uploads them to Cloudflare R2 and
 * registers them in Sanity.
 *
 * Expected layout of the source directory — one folder per series:
 *
 *   <dir>/Famiglia/01 - Il ruolo del padre.m4a
 *   <dir>/Famiglia/2025-03-12 - La moglie saggia.m4a
 *   <dir>/Educazione dei figli/...
 *
 * A folder becomes a `recordingSeries`; every audio file inside becomes a
 * `recording` pointing at it. A leading "NN - " sets the order, a leading
 * "YYYY-MM-DD - " sets the date (otherwise the file mtime is used).
 *
 * Required env (in .env.local or the shell):
 *  - SANITY_API_PROJECT_ID / SANITY_API_DATASET
 *  - SANITY_API_WRITE_TOKEN   (Sanity token with Editor role)
 *  - R2_ACCOUNT_ID / R2_BUCKET / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY
 *
 * Requires `ffmpeg` and `ffprobe` on PATH (brew install ffmpeg).
 *
 * Usage:
 *  node scripts/sync-recordings.mjs --dir=~/Registrazioni --dry-run
 *  node scripts/sync-recordings.mjs --dir=~/Registrazioni
 *  Flags:
 *   --dir=PATH         source directory (required)
 *   --series=NAME      only process the folder with this name
 *   --limit=N          only process the first N files of each series
 *   --bitrate=64k      target MP3 bitrate (default 64k, mono)
 *   --force            re-upload and overwrite recordings already synced
 *   --keep-mp3         leave the converted files in the temp directory
 *
 * Recordings already present in Sanity are skipped unless --force, so the
 * command is safe to re-run after adding new files.
 */
import { AwsClient } from 'aws4fetch';
import { spawn } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from 'node:fs';
import { readFile } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API_VERSION = 'v2024-01-01';
const AUDIO_EXTENSIONS = new Set([
  '.m4a',
  '.mp3',
  '.wav',
  '.aac',
  '.ogg',
  '.opus',
  '.flac',
  '.amr',
  '.3gp',
  '.caf',
]);

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
const KEEP_MP3 = flag('keep-mp3');
const LIMIT = Number(opt('limit') ?? Infinity);
const BITRATE = opt('bitrate') ?? '64k';
const ONLY_SERIES = opt('series');
const DIR = (opt('dir') ?? '').replace(/^~(?=$|\/)/, homedir());

const PROJECT_ID = process.env.SANITY_API_PROJECT_ID;
const DATASET = process.env.SANITY_API_DATASET;
const WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_BUCKET = process.env.R2_BUCKET;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

function fail(msg) {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

if (!DIR) fail('Missing --dir=PATH (the folder holding the recordings).');
if (!existsSync(DIR)) fail(`Source directory not found: ${DIR}`);
if (!PROJECT_ID || !DATASET)
  fail('Missing SANITY_API_PROJECT_ID / SANITY_API_DATASET.');
if (!DRY_RUN && !WRITE_TOKEN) fail('Missing SANITY_API_WRITE_TOKEN.');
if (
  !DRY_RUN &&
  (!R2_ACCOUNT_ID || !R2_BUCKET || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY)
)
  fail(
    'Missing one of R2_ACCOUNT_ID / R2_BUCKET / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY.',
  );

// ——— helpers ———
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function run(command, commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs);
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => (stdout += chunk));
    child.stderr.on('data', (chunk) => (stderr += chunk));
    child.on('error', reject);
    child.on('close', (code) =>
      code === 0
        ? resolve(stdout.trim())
        : reject(new Error(`${command} exited ${code}:\n${stderr}`)),
    );
  });
}

async function probeDuration(path) {
  const out = await run('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    path,
  ]);
  return Math.round(Number(out) || 0);
}

async function toMp3(source, target) {
  await run('ffmpeg', [
    '-nostdin',
    '-y',
    '-i',
    source,
    '-vn',
    '-ac',
    '1',
    '-b:a',
    BITRATE,
    '-map_metadata',
    '-1',
    target,
  ]);
}

// "01 - Titolo" / "2025-03-12 - Titolo" / "Titolo"
function parseFilename(filename, index, mtime) {
  let name = basename(filename, extname(filename)).trim();
  let order = index + 1;
  let recordedAt = mtime.toISOString().slice(0, 10);

  const dated = name.match(/^(\d{4}-\d{2}-\d{2})\s*[-_.]\s*(.+)$/);
  if (dated) {
    recordedAt = dated[1];
    name = dated[2].trim();
  }

  const numbered = name.match(/^(\d{1,3})\s*[-_.]\s*(.+)$/);
  if (numbered) {
    order = Number(numbered[1]);
    name = numbered[2].trim();
  }

  return { title: name, slug: slugify(name), order, recordedAt };
}

function humanSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// ——— Sanity ———
const sanityBase = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}`;
const authHeaders = WRITE_TOKEN
  ? { Authorization: `Bearer ${WRITE_TOKEN}` }
  : {};

async function query(groq) {
  const res = await fetch(
    `${sanityBase}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`,
    { headers: authHeaders },
  );
  if (!res.ok) fail(`Sanity query failed: ${res.status} ${await res.text()}`);
  return (await res.json()).result;
}

async function mutate(mutations) {
  if (DRY_RUN) return;
  const res = await fetch(`${sanityBase}/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: { ...authHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok)
    fail(`Sanity mutation failed: ${res.status} ${await res.text()}`);
}

// ——— R2 ———
const r2 = new AwsClient({
  accessKeyId: R2_ACCESS_KEY_ID ?? '',
  secretAccessKey: R2_SECRET_ACCESS_KEY ?? '',
  service: 's3',
  region: 'auto',
});

async function upload(key, path) {
  if (DRY_RUN) return;
  const body = await readFile(path);
  const url = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET}/${key
    .split('/')
    .map(encodeURIComponent)
    .join('/')}`;
  const res = await r2.fetch(url, {
    method: 'PUT',
    body,
    headers: { 'Content-Type': 'audio/mpeg' },
  });
  if (!res.ok) fail(`R2 upload failed: ${res.status} ${await res.text()}`);
}

// ——— main ———
const folders = readdirSync(DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !ONLY_SERIES || name === ONLY_SERIES)
  .sort();

if (!folders.length)
  fail(
    `No series folders found in ${DIR}${ONLY_SERIES ? ` matching "${ONLY_SERIES}"` : ''}.`,
  );

const existing = new Set((await query('*[_type == "recording"]._id')) ?? []);

const temp = mkdtempSync(join(tmpdir(), 'recordings-'));
let converted = 0;
let skipped = 0;
let bytes = 0;

try {
  for (const folder of folders) {
    const seriesSlug = slugify(folder);
    const seriesId = `recording-series-${seriesSlug}`;

    const files = readdirSync(join(DIR, folder))
      .filter((name) => AUDIO_EXTENSIONS.has(extname(name).toLowerCase()))
      .sort()
      .slice(0, LIMIT);

    if (!files.length) continue;

    console.log(`\n▸ ${folder}  (${files.length} file)`);

    await mutate([
      {
        createIfNotExists: {
          _id: seriesId,
          _type: 'recordingSeries',
          title: folder,
          slug: { _type: 'slug', current: seriesSlug },
        },
      },
    ]);

    for (const [index, file] of files.entries()) {
      const source = join(DIR, folder, file);
      const stats = statSync(source);
      const parsed = parseFilename(file, index, stats.mtime);
      const docId = `recording-${seriesSlug}-${parsed.slug}`;

      if (existing.has(docId) && !FORCE) {
        console.log(`  · ${parsed.title} — già presente, salto`);
        skipped += 1;
        continue;
      }

      const target = join(temp, `${seriesSlug}-${parsed.slug}.mp3`);
      const key = `${seriesSlug}/${parsed.slug}.mp3`;

      if (DRY_RUN) {
        const duration = await probeDuration(source);
        console.log(
          `  · ${parsed.title} — ${Math.round(duration / 60)} min, ${humanSize(stats.size)} → ${key}`,
        );
        converted += 1;
        continue;
      }

      await toMp3(source, target);
      const duration = await probeDuration(target);
      const size = statSync(target).size;
      bytes += size;

      await upload(key, target);

      await mutate([
        {
          [FORCE ? 'createOrReplace' : 'createIfNotExists']: {
            _id: docId,
            _type: 'recording',
            title: parsed.title,
            slug: { _type: 'slug', current: parsed.slug },
            series: { _type: 'reference', _ref: seriesId },
            recordedAt: parsed.recordedAt,
            audioKey: key,
            duration,
            order: parsed.order,
          },
        },
      ]);

      console.log(
        `  ✓ ${parsed.title} — ${Math.round(duration / 60)} min, ${humanSize(size)} → ${key}`,
      );
      converted += 1;
    }
  }
} finally {
  if (!KEEP_MP3) rmSync(temp, { recursive: true, force: true });
  else console.log(`\nFile convertiti lasciati in ${temp}`);
}

console.log(
  `\n${DRY_RUN ? '[dry-run] ' : ''}${converted} registrazioni elaborate, ${skipped} saltate${
    bytes ? `, ${humanSize(bytes)} caricati su R2` : ''
  }.`,
);
