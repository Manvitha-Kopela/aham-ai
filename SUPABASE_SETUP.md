# Supabase Backend Setup Guide
## For Aham.ai v3 — Step by step

---

## Why Supabase?
- Free tier handles everything you need for 1-2 years
- No server to manage — works directly from React
- Real authentication (not just fake login)
- PostgreSQL database (industry standard)
- File storage built in
- Realtime messages (no page refresh needed)

---

## STEP 1 — Create your Supabase project (5 minutes)

1. Go to **https://supabase.com** → Sign Up (use GitHub or email)
2. Click **"New Project"**
3. Fill in:
   - Organization: `Aham AI`
   - Project name: `aham-ai-portal`
   - Database password: choose a strong password (save it!)
   - Region: **Singapore** (closest to India)
4. Click **"Create new project"**
5. Wait ~2 minutes for it to set up

---

## STEP 2 — Run the database schema

1. In your Supabase dashboard → click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Open the file `supabase/schema.sql` from your project
4. Copy the entire contents and paste into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

This creates all your tables: clients, projects, messages, files, invoices, approvals, etc.

---

## STEP 3 — Get your API credentials

1. In Supabase → **Settings** (bottom left) → **API**
2. Copy two values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

---

## STEP 4 — Add credentials to your project

Create a file called `.env` in the root of your project (same folder as `package.json`):

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANT:** Add `.env` to your `.gitignore` file so your keys don't get exposed on GitHub.

---

## STEP 5 — Install Supabase package

```bash
npm install @supabase/supabase-js
```

---

## STEP 6 — Create your first client account

1. In Supabase → **Authentication** → **Users** → **"Add user"**
2. Fill in:
   - Email: `client@nexora.com`
   - Password: `nexora123`
   - Click **"Create user"**
3. Copy the **User UUID** shown (looks like: `a1b2c3d4-...`)
4. Go to **SQL Editor** → **New Query** → run:

```sql
-- Replace 'YOUR-UUID-HERE' with the actual UUID you just copied
UPDATE public.profiles 
SET full_name = 'Ravi Kiran', company = 'Nexora Jewellery', phone = '+91 98765 43210', city = 'Hyderabad'
WHERE id = 'YOUR-UUID-HERE';

-- Create a project for this client
INSERT INTO public.projects (client_id, name, type, status, color, icon, complete, days_left, target_date)
VALUES (
  'YOUR-UUID-HERE',
  'Nexora Jewellery',
  'Brand Identity + Web Design',
  'In Progress',
  '#9B7FFF',
  '💎',
  75,
  22,
  '2026-04-10'
);
```

5. Copy the project UUID from the result, then add timeline steps:

```sql
-- Replace 'YOUR-PROJECT-UUID' with the project UUID from above
INSERT INTO public.timeline_steps (project_id, title, status, target_date, sort_order) VALUES
  ('YOUR-PROJECT-UUID', 'Discovery & Research',   'done',    '3 Mar 2026',      1),
  ('YOUR-PROJECT-UUID', 'Strategy & Proposal',    'done',    '8 Mar 2026',      2),
  ('YOUR-PROJECT-UUID', 'Design & Development',   'current', 'Est. 28 Mar 2026',3),
  ('YOUR-PROJECT-UUID', 'Review & Revisions',     'pending', 'Est. 3 Apr 2026', 4),
  ('YOUR-PROJECT-UUID', 'Launch',                 'pending', 'Target: 10 Apr',  5);

INSERT INTO public.deliverables (project_id, title, done, sort_order) VALUES
  ('YOUR-PROJECT-UUID', 'Brand Discovery Document',        true,  1),
  ('YOUR-PROJECT-UUID', 'Logo Design (3 concepts)',        true,  2),
  ('YOUR-PROJECT-UUID', 'Color Palette & Typography',      true,  3),
  ('YOUR-PROJECT-UUID', 'Website Design (Figma Mockups)',  false, 4),
  ('YOUR-PROJECT-UUID', 'Website Development (React)',     false, 5),
  ('YOUR-PROJECT-UUID', 'SEO Setup & Analytics',          false, 6),
  ('YOUR-PROJECT-UUID', 'Final Review & Launch',          false, 7);

INSERT INTO public.invoices (project_id, invoice_number, description, amount, status, due_date) VALUES
  ('YOUR-PROJECT-UUID', 'INV-001', 'Project Deposit (50%)',     17500, 'paid',     '2026-03-01'),
  ('YOUR-PROJECT-UUID', 'INV-002', 'Milestone 2 — Design Phase', 8750, 'due',      '2026-04-01'),
  ('YOUR-PROJECT-UUID', 'INV-003', 'Final Payment (25%)',        8750, 'upcoming', '2026-04-10');
```

---

## STEP 7 — Create your admin account

1. In Supabase → **Authentication** → **Users** → **"Add user"**
2. Email: `admin@aham.ai`, Password: choose a strong one
3. Copy the UUID, then run:

```sql
UPDATE public.profiles 
SET full_name = 'Arun Kumar', company = 'Aham.ai', role = 'admin'
WHERE id = 'YOUR-ADMIN-UUID-HERE';
```

---

## STEP 8 — Set up file storage

1. In Supabase → **Storage** → **"New Bucket"**
2. Name: `project-files`
3. Public: **OFF** (private — clients can only see their own files)
4. Click **"Create bucket"**
5. Go to **Policies** → **"New policy"** → choose "For full customization"
6. Add this policy:

```sql
-- Policy name: "Authenticated users can upload"
-- Table: storage.objects
-- Operation: INSERT
-- Check: auth.role() = 'authenticated'
```

---

## STEP 9 — Test everything

```bash
npm run dev
```

1. Go to http://localhost:5173
2. Click **"Client Login"** in the navbar
3. Log in with `client@nexora.com` / `nexora123`
4. You should see the real dashboard with real data from Supabase

---

## Deployment to Vercel

```bash
npm install -g vercel
vercel
```

When Vercel asks about environment variables, add:
- `VITE_SUPABASE_URL` = your project URL
- `VITE_SUPABASE_ANON_KEY` = your anon key

---

## Adding a new client (workflow)

1. Create user in Supabase Auth → copy UUID
2. Update their profile in SQL (name, company, etc.)
3. Create a project row linked to their UUID
4. Add timeline, deliverables, invoices
5. Send them their login credentials

In future, you can build an admin UI to do this without SQL — that's Phase 4.

---

## Realtime messages

Messages update instantly without page refresh because `supabase.js` uses
`subscribeToMessages()` which listens on a Postgres channel. When you (as admin)
insert a message row in Supabase, the client sees it appear immediately.

---

## Questions?
Email: ahamaidigitalworks@gmail.com
