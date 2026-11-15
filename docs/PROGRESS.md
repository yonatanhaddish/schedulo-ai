# Schedulo AI progress

Last updated: 2026-11-15

## Current state

- **Active phase:** None. Phase 1 is complete; Phase 2 has not yet been
  authorized.
- **Last verified phase:** Phase 1 — Supabase authentication and accounts
  (completed 2026-11-15).
- **Scope boundary:** Do not add organization membership, invitations, or other
  Phase 2 schema until the user explicitly authorizes Phase 2.

## Repository audit

- The starting repository was the default Next.js 16.4.6 App Router scaffold.
- `package.json` and `package-lock.json` already contained uncommitted dependency
  additions. They were preserved.
- Installed runtime is Node.js 25.9.0, which satisfies the Node 22+ package
  requirement.
- FullCalendar is 7.1.5 and uses `@fullcalendar/react` plus
  `temporal-polyfill`; no v6 plugin packages are installed.
- The repository initially had no `docs/`, Supabase client utilities, migration
  directory, environment template, or project-specific setup guide.
- `.env.local` exists and is ignored. Only its variable names were inspected;
  secret values were not printed or copied.

## Phase 0 work completed

- Added the permanent handoff contract and four canonical project records.
- Added the planned source and migration directory structure.
- Added Supabase browser and server client factories.
- Added Next.js 16 `src/proxy.js` session refresh using `getClaims()`, refreshed
  request/response cookies, and Supabase SSR cache-safety headers.
- Added `.env.example`, migration scripts/workflow, and a project-specific
  README.
- Replaced the create-next-app placeholder with a responsive foundation page.

## Phase 1 work completed

- Added the forward-only `public.profiles` migration with an `auth.users`
  foreign key, safe existing-user backfill, new-user trigger, updated-at
  trigger, restricted grants, and owner-only select/update RLS policies.
- Added pgTAP policy coverage for trigger creation, anonymous denial, owner
  access, cross-user isolation, and insert/delete denial under
  `supabase/tests/profiles_rls_test.sql`.
- Added Zod-validated Server Actions for email/password signup, sign-in,
  sign-out, and profile updates. Signup sends the display name as Auth metadata
  for the profile trigger and uses the configured application URL for email
  redirects.
- Added `/auth/confirm` support for both token-hash verification links and PKCE
  callback codes, plus check-email and confirmation-error states.
- Added accessible sign-up and sign-in forms with field errors, pending states,
  appropriate autocomplete attributes, and generic provider error messages.
- Added the protected `/onboarding` account page. It verifies claims close to
  the data read, relies on profile RLS, supports display-name updates and
  sign-out, and explicitly does not grant organization access.
- Activated the landing-page `Get Started` and `Sign In` controls as real links
  while preserving the completed hero design and animation.
- Added `NEXT_PUBLIC_SITE_URL` to the environment template and documented the
  hosted Supabase redirect/email-template configuration.
- Added enumeration-resistant password recovery: the request action always
  returns the same success message, `/auth/callback` accepts recovery token
  hashes or PKCE codes, and `/update-password` requires verified claims before
  changing the password.
- Changed sign-in failures to one generic email-or-password message so the UI
  does not reveal whether an email exists or is unconfirmed.
- The user reported running `supabase/scripts/create_all_tables.sql` against
  the database on 2026-11-14. Table, trigger, grant, and RLS behavior still
  require an application-level authenticated flow check.
- The hosted Supabase project's Confirm email setting was temporarily disabled
  for development after the built-in provider returned its project-wide email
  rate limit. The user then verified that signup, immediate authentication,
  onboarding, and sign-out work without waiting for an email.
- After signing up a second account in the same browser, the onboarding display
  name input showed the first account's name. The database read was already
  constrained by both the verified user ID and owner-only RLS. The client form
  now remounts with the authenticated user ID as its React key so an
  uncontrolled input cannot survive an account change, and its autocomplete
  purpose is `nickname` rather than the browser's legal-name profile field. The
  user repeated the two-account flow and confirmed the second account now
  renders its own display name.
- Redesigned the shared authentication experience with a responsive split
  layout, minimal product message, stronger content hierarchy, light form
  surface, field icons, accessible password visibility control, inline
  recovery access, polished pending/error states, and mobile-specific
  composition. A decorative calendar preview from the first pass was removed
  at the user's request, along with all of its unused markup and CSS, leaving a
  simpler brand/message/trust-cue panel. Existing field names, Server Actions,
  validation, and Supabase behavior were preserved. The shared shell also
  improves the recovery and confirmation states without changing their flows.
- The user completed the existing-account sign-in, persisted-session, and
  two-account profile-isolation checks on 2026-11-14. The second account kept
  its own authenticated profile data, with no first-account profile rendered.
- The shared sign-in and sign-up container now uses square corners and no outer
  border on both routes. The left/right composition, shadow, text, and form
  styling remain unchanged.
- Deployed the application to Vercel at
  `https://schedulo.mrirongoose.com`, connected the Cloudflare-managed DNS
  subdomain, and configured the production application origin in Vercel and
  Supabase.
- Verified `auth.schedulo.mrirongoose.com` in Resend with isolated DKIM, SPF,
  and DMARC records, then configured it as the Supabase custom SMTP sender.
- Enabled production email confirmation and configured token-hash templates for
  signup confirmation and password recovery against the application callback
  routes.
- Expanded the profile pgTAP suite to ten checks by adding repeatable extension
  setup and an assertion that every existing Auth user has a backfilled profile.
  The suite continues to isolate all temporary users and mutations inside a
  transaction that ends with `rollback`.

## Post-Phase 0 UI refinements

- Replaced the right-side hero schedule mockup with the user-supplied
  `public/images/landing_page.jpeg` robot illustration.
- Rendered the asset with the Next.js 16 image component at its full portrait
  ratio, with responsive sizing, descriptive alternative text, and hero-image
  preloading.
- Removed the unused schedule-preview markup and styles.
- Verified with `npm.cmd run lint`, `npm.cmd run build`, a direct image request
  returning HTTP 200 as `image/jpeg`, and a homepage request returning HTTP 200
  with the new image path and alt text.
- Reworked the landing-page theme from green to warm burgundy/red. Updated the
  shared accent tokens, ambient background glow, borders, status indicator,
  translucent surfaces, and shadows while preserving layout and contrast.
- Verified the red-theme change with `npm.cmd run lint`, `npm.cmd run build`, an
  old-palette source scan returning no matches, and a homepage HTTP 200 smoke
  check with the robot image still present.
- Follow-up verification found that the long-running development server was
  still delivering its previously compiled green CSS despite the red source and
  clean production build. Restarted only that repository's Next.js server and
  fetched its live stylesheet directly; it now contains the red palette, no old
  green palette values, and `Cache-Control: no-cache, must-revalidate`.
- Swapped the hero to the user-supplied red-tie robot artwork at
  `public/images/landing_page.jpg` and retained the earlier artwork separately.
- Removed the boxed `S` brand mark and its unused CSS, leaving a text-only
  `Schedulo AI` navbar wordmark.
- Simplified the landing page by removing the hero eyebrow, Phase 0 navbar
  badge, project-foundation status card, and complete verified-foundation
  section. Removed their unused data and CSS, and corrected the red-tie hero
  image metadata to its actual 716 by 1075 dimensions.
- Verified the simplified page with `npm.cmd run lint` and a live homepage HTTP
  200 check confirming the wordmark, hero, image, and red-tie alternative text
  remain while all four requested content areas are absent.
- Recreated the public landing page as a complete, responsive product story
  with a cleaner navigation, stronger hero hierarchy, internal anchor actions,
  product-principle cues, benefit cards, a three-step workflow, closing callout,
  and footer. The user-supplied red-tie robot remains the right-side hero focal
  point, and `#E80403` is now the canonical interface accent.
- Verified the redesign with `npm.cmd run lint`, a live homepage HTTP 200 check
  for the new hero, benefits, workflow, and current image path, a live
  stylesheet check confirming the exact `#E80403` accent, and a direct hero
  image request returning HTTP 200 as `image/jpeg`.
- Reduced the redesigned landing page to the requested navbar-and-hero-only
  composition. Removed all lower sections, the footer, their data and styles,
  and links or buttons that targeted the deleted content.
- Verified the reduced page with `npm.cmd run lint`, a source scan finding only
  the hero section, and a live homepage HTTP 200 check confirming the navbar,
  hero, and current robot image remain while the benefits, workflow, closing,
  and footer markup are absent.
- Simplified the hero's right column to the robot image alone by removing its
  badge, caption, framed card, offset accent block, and shadow treatment.
- Verified the image-only column with `npm.cmd run lint` and a live homepage
  HTTP 200 check confirming the image remains while the badge, figure, and
  caption markup are absent.
- Added responsive `Get Started` and `Sign In` controls to the hero. Both are
  intentionally disabled until Phase 1 supplies real account-creation and
  sign-in routes, preventing placeholder navigation or broken links.
- Verified the controls with `npm.cmd run lint` and a live homepage HTTP 200
  check confirming both labels, both disabled states, and the hero image.
- Diagnosed missing live button styling as another stale development-server
  stylesheet: the running CSS bundle contained none of the current hero-button
  selectors. Restarted only this repository's port-3000 Next.js process.
- Added explicit button appearance, alignment, opacity, and disabled-state color
  rules. Verified with `npm.cmd run lint` and a live stylesheet check confirming
  both button variants and the exact `#E80403` accent are now served.
- Rebalanced the landing page onto a softer charcoal-grey foundation
  (`#222225`) with warm-white primary text, muted-grey supporting text, darker
  borders and secondary controls, and a neutral ambient glow. Kept `#E80403`
  as a focused accent while removing the broad red background glow.
- Verified the darker theme with `npm.cmd run lint` and a live stylesheet check
  confirming the new background, text, and control colors, the retained accent,
  and the absence of the prior bright paper background.
- Restyled the navbar-and-hero page to the user-selected pink reference: a
  near-black framed canvas, `#FF0A5B` accent, sweeping translucent pink arcs,
  pink primary action with arrow, dark outlined secondary action, and subtly
  framed robot image. Preserved the existing copy and image-only right column.
- Verified the pink treatment with `npm.cmd run lint`, a homepage HTTP 200
  check, and direct inspection of the live CSS bundle confirming the pink
  tokens, frame, pseudo-element arcs, button treatment, and removal of the old
  red accent.
- Lifted the pink theme from near-black to a lighter charcoal-grey canvas using
  `#2D2F36`, a softer `#3A3C45` gradient surface, brighter borders, supporting
  text, and secondary control while retaining the pink accents and white title.
- Verified the lighter grey treatment with `npm.cmd run lint` and a live CSS
  bundle check confirming every new grey token, the retained pink accent, and
  the absence of the former near-black canvas token.
- Softened the accent from hot pink to rose `#FF5C8A` while preserving the
  existing charcoal background, neutral controls, and shadows exactly as they
  were. Per request, no lint or build command was run for this refinement, and
  the development server remained stopped.
- Verified these refinements with `npm.cmd run lint`, a homepage HTTP 200 check
  confirming no `brand-mark` markup and the red-tie image reference, and a
  direct image HTTP 200 response as `image/jpeg`.

## Validation

Passed on 2026-11-13 during Phase 1 implementation:

- `npm.cmd run lint` — passed after the auth implementation with no ESLint
  findings.
- `npm.cmd run build` — passed with Next.js 16.4.6; `/auth/confirm` and
  `/onboarding` are dynamic, while the landing and auth form pages prerender.
- Development-server smoke checks — `/`, `/sign-up`, `/sign-in`,
  `/check-email`, and `/auth/confirm-error` returned HTTP 200; unauthenticated
  `/onboarding` returned HTTP 307 to `/sign-in`.
- `.env.local` inspection checked names and non-empty status only. The Supabase
  URL and publishable key are populated; no secret values were printed.

Passed on 2026-11-14:

- `npm.cmd run lint` — passed after the generic-login and password-recovery
  changes with no ESLint findings.
- `npm.cmd run lint` — passed after isolating the onboarding profile form by
  authenticated user ID.
- `npm.cmd run lint` — passed after the sign-in and sign-up visual redesign.
- Live development-server checks — `/sign-in` and `/sign-up` both returned
  HTTP 200 with the redesigned showcase, route-specific heading, expected form
  fields, and active responsive authentication stylesheet.
- `npm.cmd run lint` — passed after removing the auth calendar preview and
  simplifying the shared layout. Both auth routes still returned HTTP 200, the
  live output contained no calendar preview, and a source scan found none of
  its removed selectors.
- `npm.cmd run lint` — passed after compacting the auth layout by reducing its
  desktop minimum height, panel spacing, heading scale, control height, and
  mobile showcase height. `/sign-in` and `/sign-up` both remained HTTP 200.
- `npm.cmd run lint` — passed after removing the large route-specific sign-in
  and sign-up headlines. Live checks confirmed both phrases are absent while
  each page retains a visually hidden semantic heading for accessibility.
- `npm.cmd run lint` — passed after giving sign-in and sign-up one shared
  responsive desktop container height (640–680px). Tablet and mobile layouts
  retain automatic height, and both routes returned HTTP 200.
- `npm.cmd run lint` — passed after top-aligning the shared right-side auth
  card. Sign-in and sign-up now begin at the same vertical position while the
  longer signup form extends downward; both routes returned HTTP 200.
- Screenshot comparison showed that the internal right-panel offsets already
  matched, while the two captures placed the entire container at different
  vertical positions. The desktop auth container is now top-anchored at one
  shared offset instead of viewport-centered. `npm.cmd run lint` passed and
  both auth routes returned HTTP 200.
- `npm.cmd run lint` — passed after removing the shared auth container's
  corner radius and outer border. `/sign-in` and `/sign-up` both returned HTTP
  200 after each refinement.
- User-reported manual checks — existing-account sign-in, cookie-backed session
  persistence, and two-account profile isolation behaved as expected.
- `npm.cmd run build` — passed; `/auth/callback` and `/update-password` compile
  as dynamic routes, while `/forgot-password` and `/auth/recovery-error`
  prerender successfully.
- Development-server recovery smoke checks — `/sign-in`, `/forgot-password`,
  and `/auth/recovery-error` returned HTTP 200; signed-out `/update-password`
  returned HTTP 307 to `/sign-in`; `/auth/callback` without a token returned
  HTTP 307 to `/auth/recovery-error`.
- `git diff --check` — passed with only expected LF-to-CRLF working-tree
  notices, and the source scan found no TypeScript application files.

Passed on 2026-11-15:

- DNS verification — `schedulo.mrirongoose.com` resolved publicly as a CNAME
  to the Vercel-provided target, and Vercel reported the custom domain as valid.
- User-reported production authentication flow — a new account received the
  Resend-backed confirmation email, followed the token-hash link to the live
  application, completed onboarding, signed out, and signed back in.
- User-reported production password recovery flow — the confirmed account
  received the recovery email, followed the callback to the protected password
  update page, reset its password, and successfully used the new password.
- Hosted Supabase SQL Editor pgTAP run — all ten profile checks completed
  through `ok 10` with no SQL error or failure diagnostics. The run verified
  backfill coverage, new-user profile creation, anonymous denial, owner-only
  select/update, cross-user isolation, and direct insert/delete denial, then
  rolled back its temporary data.

Passed on 2026-11-12:

- `git diff --check` — passed; Git emitted only expected LF-to-CRLF working-tree
  notices.
- `npm.cmd ls --depth=0` — passed; the installed dependency tree is valid and
  confirms Next.js 16.4.6, React 19.3.0, Supabase SSR 0.12.7, and FullCalendar
  React 7.1.5.
- `npm.cmd run lint` — passed with no ESLint findings.
- `npm.cmd run build` — passed; Next.js compiled and prerendered `/` and
  `/_not-found`, with the request Proxy detected.
- `npm.cmd run check` — passed after the final fixes (lint followed by build).
- `Invoke-WebRequest http://localhost:3000` — passed with HTTP 200,
  `text/html`, the `Schedulo AI` title, and expected hero content.
- `rg --files src | rg '\.(ts|tsx)$'` — returned no matches, confirming no
  TypeScript source files.

Observed failures and resolutions:

- Direct `npm` invocation in PowerShell was blocked by the machine's script
  execution policy. Validation used `npm.cmd`; the README documents this.
- Starting a second `npm.cmd run dev` exited because PID 22152 was already
  serving this repository on port 3000. The existing server was preserved and
  used for the HTTP smoke check.
- The first HTTP smoke request returned 500 because the existing `.env.local`
  has empty Supabase values. The Proxy now passes public requests through when
  Supabase is not configured, while actual Supabase client creation still fails
  with a clear configuration error. The repeated smoke check returned 200.
- The first production build passed with a warning about a lockfile outside the
  repository. Setting `turbopack.root` to the config directory removed the
  warning; the final build passed cleanly.
- The Supabase CLI is not installed in the project, `npx.cmd supabase
  --version` did not yield a usable CLI result, and Docker reported that its
  engine is not running. The migration and pgTAP suite therefore have not been
  executed locally; no database check is recorded as passed.

## Known gaps and blockers

- No Phase 1 blocker remains. Phase 2 is intentionally unstarted pending user
  authorization.

## Next exact task

Request explicit authorization to begin Phase 2. Once authorized, start with
the organization/membership schema and maintain the requested cumulative
create-all and drop-all SQL scripts alongside forward-only migrations.
