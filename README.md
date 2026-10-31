# Acadvizen Academy — Next.js + Supabase assessment project

A responsive Next.js website with Home, Courses, Course Details, About and Contact pages. Supabase integration loads published course records from PostgreSQL and stores contact form submissions. Local sample course data is used as a fallback so the site can run before a database is configured.

## Run locally

1. Install Node.js LTS from https://nodejs.org/.
2. Extract the ZIP and open the `acadvizen-academy` folder in VS Code.
3. In Terminal, run:

   ```bash
   npm install
   npm run dev
   ```

4. Open http://localhost:3000.

## Configure the backend

Follow `SUPABASE_SETUP.md`. The SQL schema and sample seed data are in `supabase/schema.sql`.

## Pages

- `/` — Home with featured courses
- `/courses` — Database-backed course catalogue with search and category filters
- `/courses/[id]` — Database-backed course details
- `/about` — About the academy
- `/contact` — Validated contact form; stores messages in Supabase when configured

## Database behaviour

- `lib/courses.js` queries Supabase first and falls back to `data/courses.js` if not configured or the database returns no published courses.
- The public course policy permits reads only where `published = true`.
- The contact form uses the public key and an RLS-protected insert policy; it cannot read messages.
- Never expose service-role/secret keys in frontend code.

## Assessment and attribution notes

- This is an original assessment/demo implementation using Acadvizen as a reference. It is not represented as Acadvizen's official website.
- Course names, descriptions and prices in the seed data are illustrative placeholders. Verify them before making real-world claims.
- Disclose AI assistance according to the assessment instructions.


## Visual refresh included

The refreshed interface adds education and creative-work imagery to the course cards, a photographic learning visual on the homepage, and a photo-backed About section. It also adds subtle entrance, floating, hover, focus and navigation animations, with reduced-motion support for visitors who prefer less animation. The existing pages, course search/filtering, sample-course fallback and Supabase contact flow are retained.

Course and decorative photos are loaded from Unsplash over the internet. If your deployment blocks external images, replace the `imageUrl` values in `data/courses.js` and the image URLs in `app/globals.css` with your own hosted/local image paths.

## Environment setup

For local development, copy `.env.example` to `.env.local` and enter your own Supabase project URL and public anon/publishable key. The delivered ZIP intentionally does not include a private `.env.local` file. Never add a Supabase service-role key to frontend environment variables.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

On macOS/Linux:

```bash
cp .env.example .env.local
npm install
npm run dev
```
