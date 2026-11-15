# Schedulo AI roadmap

Checkboxes indicate verified repository state, not intent. Only the active
phase may be implemented.

## Phase 0 — Repository audit and project foundation (complete)

- [x] Audit the scaffold, installed packages, and Git status without removing
  existing work.
- [x] Record the canonical specification, decisions, roadmap, and progress
  handoff contract.
- [x] Establish `src/app`, `src/components`, `src/lib/supabase`,
  `src/lib/scheduling`, `src/lib/ai`, and `supabase/migrations`.
- [x] Add current browser/server Supabase SSR client factories.
- [x] Add Next.js 16 Proxy-based cookie refresh using verified claims and
  anti-cache headers.
- [x] Confirm FullCalendar v7 uses `@fullcalendar/react` and
  `temporal-polyfill`, without v6 plugins.
- [x] Add a secret-free environment template and repeatable migration workflow.
- [x] Replace the generic scaffold README and landing page with project-specific
  guidance and foundation status.
- [x] Verify lint.
- [x] Verify a production build.
- [x] Verify a development-server HTTP smoke check.

## Phase 1 — Supabase authentication and accounts

- [ ] Email/password signup with verification, sign-in, and sign-out.
- [x] Verified protected routes and unaffiliated-user onboarding.
- [ ] Profile migration, trigger/backfill behavior, and profile RLS policies.
- [x] Accessible validation and auth error states.
- [x] Unauthenticated and authenticated flow checks.

## Phase 2 — Organizations and secure employee invitation

- [ ] Multi-organization membership with OWNER/ADMIN/MEMBER roles.
- [ ] Active organization context, directory, and tenant-isolating RLS.
- [ ] Hashed, email-bound, expiring, single-use invitations delivered by Resend.
- [ ] Transactional acceptance plus revoke, resend, audit, and abuse tests.

## Phase 3 — Own calendar and deterministic availability

- [ ] Supabase-backed FullCalendar views and personal busy blocks.
- [ ] Working hours, IANA time zones, visibility, and buffers.
- [ ] Privacy-preserving common-slot engine with DST and boundary tests.

## Phase 4 — Manual meeting booking and internal invitations

- [ ] Propose, confirm, create, edit, cancel, and reschedule meetings.
- [ ] Participant response states, reservations, and notifications.
- [ ] Atomic conflict check and attendee reservation RPC with race tests.

## Phase 5 — OpenAI agent and natural-language scheduling

- [ ] Tenant-scoped chat and conversation persistence.
- [ ] Validated directory, availability, proposal, and meeting tools.
- [ ] Explicit confirmation and atomic recheck for consequential actions.
- [ ] Representative scheduling evaluation suite.

## Phase 6 — Stateful rescheduling and coordination

- [ ] Durable coordination state and alternative-slot workflow.
- [ ] Idempotent delivery, retries, activity timeline, and organizer approval.

## Phase 7 — Teams, meeting workspaces and analytics

- [ ] Teams/departments and team-aware scheduling resolution.
- [ ] Agenda, notes, action items, preferences, reminders, and dashboards.
- [ ] Deterministic tenant-scoped analytics and authorization tests.

## Phase 8 — Production security, deployment, and portfolio handoff

- [ ] Full authorization, RLS, concurrency, token, AI, and secret audit.
- [ ] Lint, build, unit/integration, and E2E evidence.
- [ ] Deployment, migration, observability, backup, and recovery guidance.
- [ ] Fictional demo data and portfolio-ready architecture documentation.
