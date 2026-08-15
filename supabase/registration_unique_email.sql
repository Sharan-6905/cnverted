-- Enforce one submission per email on the existing registration table.
-- Run this once against the live database — the CREATE TABLE in
-- registration.sql won't retroactively add this to an already-existing table.
--
-- If this fails with a duplicate-key error, you already have repeat
-- submissions for the same email. Find them first:
--   select email, count(*) from registration group by email having count(*) > 1;
-- then decide which row(s) to keep/delete before re-running this.

alter table registration
  add constraint registration_email_unique unique (email);
