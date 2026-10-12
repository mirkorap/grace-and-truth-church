This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Registrazioni degli studi biblici

La sezione `/recordings` è riservata: è protetta da una password condivisa e
non viene indicizzata. Il catalogo (serie e registrazioni) vive in Sanity, i
file MP3 in un bucket **privato** su Cloudflare R2.

Il design completo è in
[`docs/superpowers/specs/2026-09-28-recordings-section-design.md`](docs/superpowers/specs/2026-09-28-recordings-section-design.md).

### Variabili d'ambiente

Da aggiungere in `.env.local` e nelle impostazioni del progetto su Vercel:

```bash
# Cloudflare R2
R2_ACCOUNT_ID=...          # Cloudflare dashboard → R2 → Account ID
R2_BUCKET=...              # nome del bucket (deve restare privato)
R2_ACCESS_KEY_ID=...       # R2 → Manage API tokens → Create token
R2_SECRET_ACCESS_KEY=...

# Accesso alla sezione
RECORDINGS_PASSWORD=...        # la password comunicata in chiesa
RECORDINGS_COOKIE_SECRET=...   # stringa casuale: openssl rand -hex 32

# Serve solo allo script di sync, non al sito
SANITY_API_WRITE_TOKEN=...     # token Sanity con ruolo Editor
```

`RECORDINGS_COOKIE_SECRET` firma il cookie di sessione: cambiarlo fa decadere
tutte le sessioni attive, che è il modo per sfilare l'accesso a chi ha avuto la
password in passato.

### Prerequisiti

- Gli schemi `recordingSeries` e `recording` vanno creati nel repo dello Studio
  Sanity: le definizioni pronte da copiare sono in
  [`docs/sanity/recordings-schemas.md`](docs/sanity/recordings-schemas.md).
- Il bucket R2 deve restare **privato**: il sito ci accede solo tramite URL
  firmati a scadenza. Non attivare l'accesso pubblico né un dominio pubblico.
- `ffmpeg` e `ffprobe` sul PATH: `brew install ffmpeg`.

### Caricare nuove registrazioni

Organizza i file in una cartella per serie, poi:

```bash
pnpm sync:recordings:preview --dir=~/Registrazioni   # mostra cosa farebbe
pnpm sync:recordings --dir=~/Registrazioni           # converte, carica, registra
```

Lo script converte in MP3 64 kbps mono, carica su R2 e crea i documenti in
Sanity. Le registrazioni già sincronizzate vengono saltate, quindi il comando
si può rilanciare dopo aver aggiunto nuovi file. `node scripts/sync-recordings.mjs --help`
non esiste: le opzioni sono documentate in testa allo script.
