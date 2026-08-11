-- Footer "Get Started" email capture
create table if not exists footer_waitlist_emails (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique
);

-- Row Level Security: allow anyone to submit the form, but nobody can read
-- back through the public API (only accessible via the Supabase dashboard
-- or a service-role key on the server).
alter table footer_waitlist_emails enable row level security;

create policy "Anyone can join the footer waitlist"
  on footer_waitlist_emails
  for insert
  to anon
  with check (true);
