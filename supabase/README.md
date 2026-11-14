# Supabase database workflow

All database changes are represented by ordered SQL files in `migrations/`.

- Create a migration with `npm run db:new -- descriptive_name`.
- Rebuild a local database with `npm run db:reset`.
- Apply committed migrations to a linked project with `npm run db:push`.
- Never rewrite a migration that has been applied to a shared environment.
- Every tenant-owned table must enable RLS and ship policies in the same
  migration that creates it.

Phase 0 intentionally contains no schema migration. Profiles and their RLS
policies are introduced in Phase 1.

For direct SQL script runs, use:

- `scripts/create_all_tables.sql` to create the current project tables.
- `scripts/drop_all_tables.sql` to remove the current project tables.

Never run the drop script automatically or against a shared database without
explicit confirmation.
