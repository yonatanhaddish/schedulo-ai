# Schedulo AI

Schedulo AI is an internal, multi-tenant scheduling application for teams. It
will combine deterministic availability and conflict-safe booking with a
conversational OpenAI layer. The application uses its own Supabase-backed
calendar; external calendar integrations are intentionally out of scope.

The repository is currently in **Phase 1: Supabase authentication and
accounts**. The account UI, server actions, confirmation callback, protected
onboarding route, and profiles migration are implemented. The migration and
real email flow still need to be exercised against a configured Supabase
project before Phase 1 can be marked complete.

## Approved stack

- Next.js 16 App Router, React 19, JavaScript/JSX
- Tailwind CSS 4
- Supabase Auth, PostgreSQL, Row Level Security, and `@supabase/ssr`
- FullCalendar Standard v7 through `@fullcalendar/react` and
  `temporal-polyfill`
- OpenAI (introduced in Phase 5)
- Resend (introduced for employee invitations in Phase 2)

Do not add TypeScript, Prisma, Auth.js, Python, Express, external calendar
providers, or FullCalendar v6 plugin packages.

## Prerequisites

- Node.js 22 or newer (the installed Supabase and OpenAI packages require it)
- npm
- A Supabase project for hosted development, or Docker plus the Supabase CLI
  for local database work

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and supply your own values:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell, use:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Get the Supabase URL and publishable key from the project's **Connect**
   dialog. Set `NEXT_PUBLIC_SITE_URL` to the application origin (for local
   development, `http://localhost:3000`). Never commit `.env.local` or a
   service-role key.

4. Apply the profiles migration to local Supabase or a linked hosted project:

   ```bash
   npm run db:reset
   ```

   or:

   ```bash
   npm run db:push
   ```

5. Start the application:

   ```bash
   npm run dev
   ```

6. Open <http://localhost:3000>.

## Environment variables

| Variable | Required now | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Auth redirects | Public application origin; defaults to `http://localhost:3000` locally |
| `NEXT_PUBLIC_SUPABASE_URL` | Auth/data use | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Auth/data use | Browser-safe Supabase publishable key |
| `OPENAI_API_KEY` | Phase 5 | Server-only OpenAI API key |
| `RESEND_API_KEY` | Phase 2 | Server-only Resend API key |
| `RESEND_FROM_EMAIL` | Phase 2 | Verified invitation sender address |

Only variables prefixed with `NEXT_PUBLIC_` are exposed to browser bundles.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run check` | Run lint, then build |
| `npm run db:start` / `db:stop` | Start or stop local Supabase |
| `npm run db:reset` | Rebuild the local database from migrations |
| `npm run db:push` | Apply committed migrations to a linked project |
| `npm run db:new -- migration_name` | Create a timestamped migration |

On Windows systems that block PowerShell's `npm.ps1`, run the same commands
through `npm.cmd`, for example `npm.cmd run dev`.

## Supabase SSR session flow

- Browser code creates a cookie-aware client through
  `src/lib/supabase/client.js`.
- Server Components, Server Actions, and Route Handlers create a new request
  client through `src/lib/supabase/server.js`.
- Next.js 16 runs `src/proxy.js`, which delegates to
  `src/lib/supabase/proxy.js` to refresh sessions with `getClaims()` and copy
  both cookies and anti-cache headers to the response.
- Authorization must never trust `getSession()` user data. Protected server
  operations use verified claims or a fresh `getUser()` lookup and still rely
  on PostgreSQL RLS.

Phase 1 uses Server Actions for validated signup, sign-in, profile updates, and
sign-out. Login failures use a generic response to avoid revealing whether an
email has an account. `/auth/confirm` accepts both token-hash email links and
PKCE callback codes. Password recovery uses `/auth/callback` and the protected
`/update-password` route. `/onboarding` verifies claims again before reading
profile data; Proxy is not the only authorization boundary.

Public pages remain available when Supabase variables are empty, but auth/data
features return a configuration message until both Supabase values are set.

## Supabase Auth configuration

For hosted development, configure these values in the Supabase dashboard:

- Enable the email provider and **Confirm email**.
- Set the Site URL to the value of `NEXT_PUBLIC_SITE_URL`.
- Add `<SITE_URL>/auth/confirm` and `<SITE_URL>/auth/callback` to the allowed
  Redirect URLs.
- In the **Confirm signup** email template, use:

  ```text
  {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
  ```

- In the **Reset password** email template, use:

  ```text
  {{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=recovery&next=/update-password
  ```

The implemented account routes are `/sign-up`, `/sign-in`, `/check-email`,
`/forgot-password`, `/auth/confirm`, `/auth/callback`, their error states, and
the protected `/update-password` and `/onboarding` routes. Independent signup
creates only an account/profile; it does not create or grant organization
membership.

## Database migrations

Migrations are committed under `supabase/migrations` and applied in filename
order. Never edit an applied migration; add a new migration instead.

For local development:

```bash
npm run db:start
npm run db:reset
```

For a hosted project:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npm run db:push
```

The Phase 1 profiles migration creates `public.profiles`, backfills existing
Auth users, installs the new-user and updated-at triggers, restricts table
grants, and enables owner-only RLS. SQL policy tests live under
`supabase/tests/`.

## Project records

- [`docs/PROJECT_SPEC.md`](docs/PROJECT_SPEC.md) — requirements and boundaries
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — approved architecture decisions
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — phase gates and verified checklist
- [`docs/PROGRESS.md`](docs/PROGRESS.md) — current state and exact handoff
