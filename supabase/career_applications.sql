-- Career application submissions
create table if not exists career_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  full_name text not null,
  phone text not null,
  email text not null,
  role text not null
);

-- Row Level Security: allow anyone to submit the form, but nobody can read
-- back through the public API (only accessible via the Supabase dashboard
-- or a service-role key on the server).
alter table career_applications enable row level security;

create policy "Anyone can submit a career application"
  on career_applications
  for insert
  to anon
  with check (true);
