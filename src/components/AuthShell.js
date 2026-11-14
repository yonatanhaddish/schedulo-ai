import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

export default function AuthShell({ eyebrow, title, description, children }) {
  return (
    <main className="auth-page">
      <div className="auth-layout">
        <aside className="auth-showcase" aria-label="Schedulo AI overview">
          <Link
            className="auth-brand auth-showcase-brand"
            href="/"
            aria-label="Schedulo AI home"
          >
            <span>Schedulo</span>
            <strong>AI</strong>
          </Link>

          <div className="auth-showcase-copy">
            <p className="auth-product-kicker">
              <Sparkles aria-hidden="true" size={15} strokeWidth={2.2} />
              AI-assisted team scheduling
            </p>
            <h2>
              Turn busy calendars into <em>one clear plan.</em>
            </h2>
            <p>
              A private workspace that helps teams align availability, make
              decisions faster, and keep work moving.
            </p>
          </div>

          <div className="auth-showcase-points">
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Private by design
            </span>
            <span>
              <UsersRound size={16} aria-hidden="true" />
              Built for internal teams
            </span>
          </div>
        </aside>

        <section className="auth-panel" aria-labelledby="auth-title">
          <div className="auth-card">
            <div className="auth-mobile-brand-row">
              <Link
                className="auth-brand"
                href="/"
                aria-label="Schedulo AI home"
              >
                <span>Schedulo</span>
                <strong>AI</strong>
              </Link>
              <span className="auth-mobile-secure">
                <Check size={13} aria-hidden="true" /> Secure
              </span>
            </div>

            <Link className="auth-back-link" href="/">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to home
            </Link>

            <div className="auth-heading">
              <p className="auth-eyebrow">{eyebrow}</p>
              {title ? (
                <h1 id="auth-title">{title}</h1>
              ) : (
                <h1 className="auth-visually-hidden" id="auth-title">
                  {eyebrow}
                </h1>
              )}
              <p>{description}</p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
