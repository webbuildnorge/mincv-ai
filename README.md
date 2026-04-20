# MinCV.ai

Norges smarteste verktøy for jobbsøkere.

## Sider

- `/` — Landingsside
- `/dashboard` — Søknadsoversikt (legg til, rediger, slett søknader)
- `/cv-sjekk` — AI-drevet CV-analyse mot stillingsannonse

## Kom i gang lokalt

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000)

## Deploy til Vercel (5 min)

1. Opprett konto på [github.com](https://github.com)
2. Lag et nytt repo og push koden:
   ```bash
   git init
   git add .
   git commit -m "første versjon"
   git remote add origin https://github.com/DITT-BRUKERNAVN/mincv-ai.git
   git push -u origin main
   ```
3. Gå til [vercel.com](https://vercel.com) → "New Project"
4. Importer GitHub-repoet ditt
5. Klikk "Deploy" — Vercel oppdager Next.js automatisk
6. Siden er live på `mincv-ai.vercel.app` innen 2 minutter!

## Koble til eget domene

1. Kjøp `mincv.ai` på [porkbun.com](https://porkbun.com)
2. I Vercel: Settings → Domains → legg til `mincv.ai`
3. Følg instruksjonene for å peke DNS mot Vercel

## Teknologi

- [Next.js 14](https://nextjs.org/) (App Router)
- CSS Modules
- Anthropic Claude API (CV-sjekk)
