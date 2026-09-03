-- Prepared 2026-09-01. Review and back up production before execution.
-- This migration is intentionally additive and leaves legacy side-effect states null.

begin;

alter table public.inquiries
  add column if not exists page_path text,
  add column if not exists landing_page text,
  add column if not exists referrer text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text,
  add column if not exists ga_client_id text,
  add column if not exists ga_session_id text,
  add column if not exists idempotency_key uuid,
  add column if not exists analytics_event_id uuid,
  add column if not exists files_status text,
  add column if not exists files_expected_count integer,
  add column if not exists files_saved_count integer,
  add column if not exists admin_email_status text,
  add column if not exists admin_email_message_id text,
  add column if not exists admin_email_sent_at timestamptz,
  add column if not exists customer_email_status text,
  add column if not exists customer_email_message_id text,
  add column if not exists customer_email_sent_at timestamptz,
  add column if not exists analytics_status text,
  add column if not exists analytics_sent_at timestamptz,
  add column if not exists analytics_attempt_count integer not null default 0,
  add column if not exists analytics_last_attempt_at timestamptz,
  add column if not exists analytics_last_error_code text,
  add column if not exists analytics_retry_state text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'inquiries_files_status_check'
      and conrelid = 'public.inquiries'::regclass
  ) then
    alter table public.inquiries
      add constraint inquiries_files_status_check
      check (files_status is null or files_status in (
        'not_required', 'pending', 'saved', 'partial', 'failed'
      ));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'inquiries_file_counts_check'
      and conrelid = 'public.inquiries'::regclass
  ) then
    alter table public.inquiries
      add constraint inquiries_file_counts_check
      check (
        (files_expected_count is null or files_expected_count >= 0)
        and (files_saved_count is null or files_saved_count >= 0)
        and (
          files_expected_count is null
          or files_saved_count is null
          or files_saved_count <= files_expected_count
        )
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'inquiries_admin_email_status_check'
      and conrelid = 'public.inquiries'::regclass
  ) then
    alter table public.inquiries
      add constraint inquiries_admin_email_status_check
      check (admin_email_status is null or admin_email_status in (
        'pending', 'sent', 'failed', 'skipped_unconfigured'
      ));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'inquiries_customer_email_status_check'
      and conrelid = 'public.inquiries'::regclass
  ) then
    alter table public.inquiries
      add constraint inquiries_customer_email_status_check
      check (customer_email_status is null or customer_email_status in (
        'pending', 'sent', 'failed', 'skipped_unconfigured'
      ));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'inquiries_analytics_status_check'
      and conrelid = 'public.inquiries'::regclass
  ) then
    alter table public.inquiries
      add constraint inquiries_analytics_status_check
      check (analytics_status is null or analytics_status in (
        'pending', 'sent', 'failed', 'skipped_unconfigured'
      ));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'inquiries_analytics_retry_state_check'
      and conrelid = 'public.inquiries'::regclass
  ) then
    alter table public.inquiries
      add constraint inquiries_analytics_retry_state_check
      check (analytics_retry_state is null or analytics_retry_state in (
        'not_needed', 'safe', 'manual_review'
      ));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'inquiries_analytics_attempt_count_check'
      and conrelid = 'public.inquiries'::regclass
  ) then
    alter table public.inquiries
      add constraint inquiries_analytics_attempt_count_check
      check (analytics_attempt_count >= 0);
  end if;
end $$;

create unique index if not exists idx_inquiries_idempotency_key_unique
  on public.inquiries(idempotency_key)
  where idempotency_key is not null;

create unique index if not exists idx_inquiries_analytics_event_id_unique
  on public.inquiries(analytics_event_id)
  where analytics_event_id is not null;

comment on column public.inquiries.landing_page is
  'Authoritative first-touch pathname captured by the application; query and fragment removed.';
comment on column public.inquiries.page_path is
  'Authoritative form-submission pathname captured by the application; query and fragment removed.';
comment on column public.inquiries.analytics_event_id is
  'Stable non-PII event identifier reused by any explicitly authorized analytics replay.';
comment on column public.inquiries.analytics_status is
  'sent means the Measurement Protocol request returned HTTP 2xx; it does not confirm GA4 report appearance or session attribution. NULL means legacy outcome unknown.';
comment on column public.inquiries.analytics_attempt_count is
  'For rows with NULL analytics_status, the legacy analytics outcome remains unknown regardless of this counter value.';
comment on column public.inquiries.analytics_retry_state is
  'safe permits a future compare-and-set replay; manual_review marks ambiguous network delivery.';

commit;
