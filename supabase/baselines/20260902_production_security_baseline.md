# Production Supabase Security Baseline — 2026-09-02

This baseline records catalog-only facts retrieved read-only from the production Supabase project on 2026-09-02. It is the precondition for the local hardening migrations dated 2026-09-02.

No application row, Auth row, `storage.objects` row, object name, customer value, URL value, credential, token, or project identifier was read or copied into this file.

## Evidence scope

The source queries were limited to `pg_class`, `pg_namespace`, `pg_constraint`, `pg_proc`, `pg_policies`, `information_schema.columns`, `information_schema.role_table_grants`, and the four allowlisted `storage.buckets` metadata rows.

All nine reviewed public tables existed with RLS enabled and FORCE RLS disabled. `storage.buckets` and `storage.objects` also had RLS enabled and FORCE RLS disabled.

## Production columns

### `public.inquiries`

Production still had the pre-attribution 16-column shape. The separately prepared `20260901_conversion_attribution.sql` migration had not been applied.

| Column | Type | Null/default or constraint |
| --- | --- | --- |
| `id` | `uuid` | PK; default `uuid_generate_v4()` |
| `created_at`, `updated_at` | `timestamptz` | NOT NULL; default `now()` |
| `name`, `email`, `message` | `text` | NOT NULL |
| `company`, `country`, `phone` | `text` | Nullable |
| `status` | `text` | NOT NULL; default `new`; allowed values `new`, `reviewing`, `quoted`, `in_progress`, `completed`, `closed`, `spam` |
| `source` | `text` | Nullable; default `website` |
| `assigned_to` | `uuid` | Nullable FK to `auth.users(id)` |
| `internal_notes` | `text` | Nullable |
| `quote_amount` | `numeric(12,2)` | Nullable |
| `quote_currency` | `text` | Nullable; default `USD` |
| `tags` | `text[]` | Nullable; default empty text array |

### `public.customers`

| Column | Type | Null/default or constraint |
| --- | --- | --- |
| `id` | `uuid` | PK; default `uuid_generate_v4()` |
| `created_at`, `updated_at` | `timestamptz` | NOT NULL; default `now()` |
| `name` | `text` | NOT NULL |
| `email` | `text` | Nullable; unique |
| `company`, `country`, `phone`, `industry`, `notes` | `text` | Nullable |
| `tier` | `text` | Nullable; default `prospect`; allowed values `prospect`, `active`, `vip`, `inactive`, `blacklist` |
| `total_orders` | `integer` | Nullable; default `0` |
| `total_revenue` | `numeric(14,2)` | Nullable; default `0` |
| `last_order_at` | `timestamptz` | Nullable |
| `tags` | `text[]` | Nullable; default empty text array |
| `assigned_to` | `uuid` | Nullable FK to `auth.users(id)` |

### `public.feedback_messages`

| Column | Type | Null/default or constraint |
| --- | --- | --- |
| `id` | `uuid` | PK; default `uuid_generate_v4()` |
| `created_at` | `timestamptz` | NOT NULL; default `now()` |
| `name`, `country`, `admin_response` | `text` | Nullable |
| `category` | `text` | NOT NULL; default `Question` |
| `message` | `text` | NOT NULL |
| `is_published` | `boolean` | NOT NULL; default `false` |
| `published_at` | `timestamptz` | Nullable |
| `reviewed_by` | `uuid` | Nullable FK to `auth.users(id)` |

### `public.orders`

| Column | Type | Null/default or constraint |
| --- | --- | --- |
| `id` | `uuid` | PK; default `uuid_generate_v4()` |
| `created_at`, `updated_at` | `timestamptz` | NOT NULL; default `now()` |
| `customer_name` | `text` | NOT NULL |
| `company`, `country`, `email`, `phone`, `product_name`, `notes` | `text` | Nullable |
| `quantity` | `integer` | Nullable; default `0`; no non-negative CHECK |
| `board_amount`, `bom_amount`, `unit_price`, `total_amount` | `numeric(12,2)` | Nullable; default `0`; no non-negative CHECK |
| `currency` | `text` | Nullable; default `USD` |
| `status` | `text` | NOT NULL; default `pending`; allowed values `pending`, `in_production`, `shipped`, `completed`, `cancelled` |
| `image_1`, `image_2`, `image_3` | `text` | Nullable; no URL/path CHECK |

### `public.articles`

| Column | Type | Null/default or constraint |
| --- | --- | --- |
| `id` | `uuid` | PK; default `uuid_generate_v4()` |
| `slug` | `text` | NOT NULL; unique |
| `title` | `text` | NOT NULL |
| `description`, `content`, `cover_image` | `text` | Nullable |
| `author` | `text` | NOT NULL; default `Huitai Engineering Team` |
| `read_time` | `integer` | NOT NULL; default `5` |
| `status` | `text` | NOT NULL; default `draft`; allowed values `draft`, `published` |
| `created_at`, `updated_at` | `timestamptz` | NOT NULL; default `now()` |
| `published_at` | `timestamptz` | Nullable |

### `public.admin_users`

| Column | Type | Null/default or constraint |
| --- | --- | --- |
| `user_id` | `uuid` | PK/FK to `auth.users(id)` with cascade delete |
| `role` | `text` | NOT NULL; default `admin`; allowed values `admin`, `manager`, `viewer` |
| `full_name` | `text` | Nullable |
| `created_at` | `timestamptz` | Nullable; default `now()` |

### `public.library_files`

| Column | Type | Null/default or constraint |
| --- | --- | --- |
| `id` | `uuid` | PK; default `uuid_generate_v4()` |
| `created_at` | `timestamptz` | NOT NULL; default `now()` |
| `title`, `storage_path`, `file_name` | `text` | NOT NULL |
| `description`, `category`, `mime_type` | `text` | Nullable |
| `tags` | `text[]` | Nullable; default empty text array |
| `file_size` | `bigint` | Nullable |
| `uploaded_by` | `uuid` | Nullable FK to `auth.users(id)` |

`public.inquiry_files` and `public.knowledge_articles` also existed and matched the checked-in schema; they are included in the policy/grant baseline because the hardening migration must preserve their application behavior.

## Production RLS policies

All policies below were PERMISSIVE. `{public}` policies applied to every database role.

| Table | Production SELECT | Production INSERT | Production UPDATE | Production DELETE |
| --- | --- | --- | --- | --- |
| `inquiries` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` |
| `inquiry_files` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` |
| `customers` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` |
| `feedback_messages` | `is_published = true` OR `public.is_admin()` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` |
| `orders` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` |
| `articles` | `status = 'published'` OR any `authenticated` role | Any `authenticated` role | Any `authenticated` role | Any `authenticated` role |
| `knowledge_articles` | `status = 'published'` OR `public.is_admin()` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` |
| `admin_users` | Own `user_id = auth.uid()` OR `public.is_admin()` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` |
| `library_files` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` |

The `articles` authenticated-wide policy is the confirmed table-level blocker.

## Production grants

Every reviewed table granted both `anon` and `authenticated` the same broad set: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `REFERENCES`, `TRIGGER`, and `TRUNCATE`. RLS blocked many row operations, but these grants were not least privilege and combined with the defective `articles` policy to expose draft and CMS DML access.

## Production `public.is_admin()`

- Owner: `postgres`.
- Attributes: `STABLE SECURITY DEFINER`.
- Arguments: none.
- Search path: fixed to `public`.
- Logic: returns whether a row exists in `public.admin_users` with `user_id = auth.uid()`.
- Execute ACL: `anon`, `authenticated`, and `service_role` could execute it.
- Role semantics: any `admin_users` row counts as membership; this baseline does not reinterpret `admin`, `manager`, or `viewer`.

## Production Storage buckets

| Bucket | Exists | Public | File-size limit | MIME allowlist |
| --- | --- | --- | --- | --- |
| `article-images` | Yes | Yes | 5 MiB | `image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/gif` |
| `inquiry-files` | Yes | No | 25 MiB | None |
| `library-files` | Yes | No | None | None |
| `order-images` | Yes | Yes | None | None |

`knowledge-covers` did not exist and no current Storage call referenced it.

## Production `storage.objects` policies

| Bucket | Production SELECT | Production INSERT | Production UPDATE | Production DELETE |
| --- | --- | --- | --- | --- |
| `article-images` | Public, bucket-scoped | `public.is_admin()` | `public.is_admin()` | `public.is_admin()` |
| `inquiry-files` | `service_role` only | `service_role` only | `service_role` only | `service_role` only |
| `library-files` | Any `authenticated` role | Any `authenticated` role | No policy | Any `authenticated` role |
| `order-images` | Public, bucket-scoped | Any `authenticated` role | No policy | Any `authenticated` role |

The `library-files` and `order-images` policy sets are confirmed blockers. The `inquiry-files` public boundary was safe, but it lacked the bucket-scoped admin SELECT needed by the new signed-URL admin detail flow.

## Convergence rule

The remediation is acceptable only when a catalog-only post-migration verification shows:

- public published article and feedback reads still work;
- non-admin authenticated users have no draft CMS or admin data access;
- `library-files`, `order-images`, and `inquiry-files` are private and bucket-scoped as designed;
- `article-images` remains public with its existing 5 MiB image policy;
- table grants are reduced to the operation set actually used by the application;
- no business-row or Storage-object mutation is required for the policy migration itself.
