-- Enforce one application per email on the existing career_applications table.
-- Run this once against the live database — the CREATE TABLE in
-- career_applications.sql won't retroactively add this to an already-existing table.
--
-- If this fails with a duplicate-key error, you already have repeat
-- applications for the same email. Find them first:
--   select email, count(*) from career_applications group by email having count(*) > 1;
-- then decide which row(s) to keep/delete before re-running this.

alter table career_applications
  add constraint career_applications_email_unique unique (email);
