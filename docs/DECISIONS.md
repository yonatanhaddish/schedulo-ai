# Schedulo AI architecture decisions

This is an append-only record of approved architecture decisions. Supersede a
decision with a new entry instead of rewriting its history.

## ADR-001 — Single JavaScript Next.js application

- **Date:** 2026-11-12
- **Status:** Accepted
- **Decision:** Use one Next.js 16 App Router application with React 19,
  JavaScript/JSX, and Tailwind CSS 4.
- **Consequences:** Server and client concerns share one deployment and one
  routing model. TypeScript, a separate Express API, and Python services are
  outside the approved architecture.

## ADR-002 — Supabase owns identity and tenant data

- **Date:** 2026-11-12
- **Status:** Accepted
- **Decision:** Use Supabase Auth, PostgreSQL, and RLS. Use `@supabase/ssr` for
  cookie-based browser/server clients and a Next.js 16 Proxy for refresh.
- **Consequences:** A new Supabase client is created for each server request.
  The Proxy calls `getClaims()` and propagates both refreshed cookies and
  anti-cache headers. `getSession()` data is never proof of identity, and every
  tenant table must include RLS policies.

## ADR-003 — Internal calendar only

- **Date:** 2026-11-12
- **Status:** Accepted
- **Decision:** Store calendars, events, availability inputs, and meetings in
  Supabase. Do not integrate Google, Microsoft, Apple, or other external
  calendars.
- **Consequences:** Schedulo AI owns conflict semantics and privacy rules.
  Availability and booking are deterministic application/database services.

## ADR-004 — FullCalendar v7 package model

- **Date:** 2026-11-12
- **Status:** Accepted
- **Decision:** Use FullCalendar Standard v7 through `@fullcalendar/react` with
  `temporal-polyfill`.
- **Consequences:** Do not install or copy the v6 view/plugin package pattern.
  Calendar UI implementation waits until Phase 3.

## ADR-005 — AI is a constrained orchestration layer

- **Date:** 2026-11-12
- **Status:** Accepted
- **Decision:** Introduce OpenAI in Phase 5 only after authorized directory,
  availability, and atomic booking services exist.
- **Consequences:** The model cannot query unrestricted data or write meetings
  directly. Tool inputs are validated, calls are authorized and audited, and
  consequential actions require explicit confirmation.

## ADR-006 — Forward-only SQL migrations

- **Date:** 2026-11-12
- **Status:** Accepted
- **Decision:** Commit timestamped SQL migrations under
  `supabase/migrations`; add a new migration for changes rather than editing an
  applied migration.
- **Consequences:** Local reset and hosted push follow the same ordered history.
  Schema, constraints, indexes, functions, and RLS policies remain reviewable.
