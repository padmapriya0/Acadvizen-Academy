# Supabase backend setup

This project uses Supabase PostgreSQL for published course data and contact form submissions. The site remains runnable without Supabase by falling back to local sample courses; the contact form will clearly identify demo mode and will not pretend it saved data.

## 1. Create a Supabase project

1. Open https://supabase.com/ and create a project.
2. In the project dashboard, open **Connect** or **Project Settings → API Keys**.
3. Copy the Project URL and the public publishable key (or legacy anon key). Never use a service-role/secret key in browser code.

## 2. Add environment variables

1. In the project root, copy `.env.example` to `.env.local`.
2. Replace the placeholders:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_PUBLISHABLE_OR_ANON_KEY
   ```

3. Stop and restart the development server after editing environment variables.

## 3. Create tables and sample courses

1. In Supabase, open **SQL Editor → New query**.
2. Open `supabase/schema.sql` in VS Code and copy the entire contents.
3. Paste into SQL Editor and click **Run**.
4. Open **Table Editor → courses** and verify the six sample rows exist.

The SQL creates `courses` and `contact_messages`, enables Row Level Security, allows public reads only for published courses, and allows public insert-only access to the contact form table. It also inserts sample course descriptions and prices for the assessment. Verify or replace these before representing them as real Acadvizen offerings.

## 4. Run the site

```bash
npm install
npm run dev
```

Open http://localhost:3000. The home page, course catalogue and course details query Supabase first. If Supabase is not configured, or no published rows are returned, they use the local sample data in `data/courses.js`. The contact form inserts into `contact_messages` when Supabase is configured; otherwise it displays a demo-mode message.

## 5. Verify backend behaviour

- Visit `/courses` and confirm courses are present.
- Change a course's title in Supabase Table Editor, refresh the site, and confirm the title updates.
- Submit the contact form and confirm a row appears in `contact_messages`.
- Set `published` to `false` for a course and confirm it no longer appears publicly.
- Check browser dev tools/terminal for errors if a query fails.

## Security notes

- Never expose a Supabase service-role or secret key in a `NEXT_PUBLIC_` variable, source code, GitHub repository, or client component.
- The contact table has no public read policy; anonymous visitors can only insert. Public forms can still be spammed. Before production, add server-side rate limiting and CAPTCHA/bot protection, verify inputs server-side, and review your Supabase policies.
- The public course policy permits reading published rows only. Keep course management limited to the Supabase dashboard or a separately authenticated admin interface.
- `.env.local` is ignored by Git. Do not commit real credentials.

## Troubleshooting

- **Courses show sample data:** verify `.env.local`, restart `npm run dev`, confirm `supabase/schema.sql` ran successfully, and check that `published = true` for at least one row.
- **Contact form reports a save error:** check the `contact_messages` table, the insert policy, and the browser console. Do not disable RLS as a workaround.
- **Invalid API key:** copy the public publishable/anon key for this exact Supabase project; do not use the database password or service-role secret.
