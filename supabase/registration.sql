-- Early access questionnaire submissions
create table if not exists registration (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Step 1 — who you are
  full_name text not null,
  phone text not null,
  email text not null,

  -- Step 2 — where you work
  company text,
  role text not null,
  what_you_do text,
  team_size text not null check (team_size in ('Just me', '2–10', '11–50', '51–200', '200+')),
  location text not null,

  -- Step 3 — current tooling
  used_sales_tool text not null check (used_sales_tool in ('yes', 'no')),
  tools text[] not null default '{}',
  tools_feedback text,
  finding_accounts_today text,

  -- Step 4 — the gap
  biggest_challenge text,

  -- Step 5 — fit & timing
  intent text not null check (intent in ('Actively looking', 'Exploring', 'Just curious')),
  demo_time text
);

-- Row Level Security: allow anyone to submit the form, but nobody can read
-- back through the public API (only accessible via the Supabase dashboard
-- or a service-role key on the server).
alter table registration enable row level security;

create policy "Anyone can submit early access form"
  on registration
  for insert
  to anon
  with check (true);
