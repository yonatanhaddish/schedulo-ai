<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Schedulo AI handoff contract

Before changing this repository:

1. Read `AGENTS.md`, `docs/PROJECT_SPEC.md`, `docs/DECISIONS.md`,
   `docs/ROADMAP.md`, and `docs/PROGRESS.md`.
2. Inspect the existing implementation and `git status`. Preserve working
   functionality and unrelated user changes.
3. Work only on the currently approved roadmap phase. Do not silently change
   the approved stack or expand scope into the next phase.
4. Use JavaScript/JSX for application source. Do not introduce TypeScript.
5. Before editing Next.js code, read the relevant installed guide under
   `node_modules/next/dist/docs/`; this repository uses Next.js 16 conventions.

After substantial work:

- Update `docs/PROGRESS.md` with actual commands, results, failures, blockers,
  and the next exact task.
- Mark only verified work in `docs/ROADMAP.md`.
- Append to `docs/DECISIONS.md` only when an architecture decision is approved.
- Update `README.md` and `.env.example` when setup or configuration changes.
- Do not claim a check passed unless it was run successfully.
