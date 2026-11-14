# Schedulo AI project specification

Last updated: 2026-11-12

## Product intent

Schedulo AI is a private scheduling workspace for employees inside an
organization. It combines deterministic availability, concurrency-safe meeting
booking, internal invitations, and an explicitly confirmed AI scheduling
assistant. It is not an external calendar aggregator.

## Users and roles

- **Member:** maintains a personal internal calendar, participates in meetings,
  and can schedule with colleagues in their organizations.
- **Admin:** manages an organization's directory and employee invitations in
  addition to member capabilities.
- **Owner:** has full organization administration and ownership authority.

A person may belong to multiple organizations with a different role in each.
Independent signup does not grant organization membership.

## Core requirements

### Identity and tenancy

- Supabase Auth provides email verification and cookie-backed SSR sessions.
- Every server authorization decision uses verified identity, never unverified
  session payloads.
- PostgreSQL RLS is mandatory for tenant-owned and user-owned records.
- Users without a membership see organization onboarding, never organization
  data.

### Organizations and invitations

- Verified users can create organizations and become their owner.
- Admin invitations are email-bound, random, single-use, expiring, revocable,
  and stored only as hashes.
- Invitation acceptance is transactional and idempotent and must match the
  signed-in verified email.

### Calendar and scheduling

- Calendars and events live in Supabase; external calendar providers are out of
  scope.
- Availability is calculated deterministically in UTC from IANA time zones,
  working hours, busy blocks, meeting state, duration, and buffers.
- Private event details remain private; authorized colleagues receive only the
  free/busy information needed to schedule.
- Multi-attendee booking uses an atomic database operation so concurrent
  requests cannot double-book an attendee.

### AI behavior

- OpenAI is introduced only after deterministic scheduling and booking services
  exist.
- The model receives narrow, validated tools and never invents availability.
- Every tool call is scoped to the signed-in user and active organization.
- Consequential changes require organizer confirmation and an atomic conflict
  recheck.
- Conversations and tool traces are tenant-isolated and auditable.

### Quality attributes

- Responsive, keyboard-accessible UI with useful loading, empty, and error
  states.
- JavaScript/JSX source in one Next.js 16 application.
- Repeatable SQL migrations, realistic authorization tests, and evidence-based
  progress records.
- Secrets remain server-only. Browser code receives only the Supabase project
  URL and publishable key, with security enforced by Auth and RLS.

## Approved technical constraints

- Next.js 16 App Router, React 19, JavaScript, Tailwind CSS 4
- Supabase Auth/PostgreSQL/RLS and `@supabase/ssr`
- FullCalendar Standard v7 using `@fullcalendar/react` and
  `temporal-polyfill`
- OpenAI for Phase 5 agent behavior
- Resend for Phase 2 employee invitation delivery

The project does not use TypeScript, Prisma, Auth.js, Python, Express,
organization-wide join codes, external users, or external calendar
integrations.

## Delivery phases

0. Repository audit and project foundation
1. Supabase authentication and profiles
2. Organizations and secure employee invitations
3. Internal calendar and deterministic availability
4. Manual booking and internal meeting invitations
5. OpenAI natural-language scheduling
6. Durable rescheduling and coordination
7. Teams, meeting workspaces, and analytics
8. Production security, deployment, and portfolio handoff

Each phase is a gate. Work stops after the active phase is implemented,
validated, and documented.
