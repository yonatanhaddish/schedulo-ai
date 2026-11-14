import Image from "next/image";
import Link from "next/link";
import HeroTitleSweep from "../components/HeroTitleSweep";

export default function Home() {
  return (
    <div className="page-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="topbar" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Schedulo AI home">
            <span>Schedulo</span>
            <strong>AI</strong>
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1
              id="hero-title"
              aria-label="Smart Scheduling. Better Teamwork."
            >
              <HeroTitleSweep />
            </h1>

            <p className="hero-lead">
              Let AI handle the scheduling. Schedulo AI helps your team find the
              right meeting times, manage calendars, and coordinate
              effortlessly—all in one intelligent workspace.
            </p>

            <div className="hero-actions" aria-label="Authentication actions">
              <Link
                className="hero-button hero-button-primary"
                href="/sign-up"
              >
                Get Started
              </Link>
              <Link
                className="hero-button hero-button-secondary"
                href="/sign-in"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <Image
              className="hero-image"
              src="/images/landing_page03.jpg"
              alt="Friendly office robot wearing a red tie while sitting at a desk"
              width={716}
              height={1075}
              sizes="(max-width: 900px) calc(100vw - 40px), 470px"
              preload
            />
          </div>
        </section>
      </main>
    </div>
  );
}
