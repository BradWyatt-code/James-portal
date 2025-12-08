// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="james-home">
      <div className="overlay" />

      {/* Hero section with portrait + text */}
      <section className="hero">
        <div className="hero-card">
          <div className="portrait-wrap">
            <img
              src="/images/james-portrait.png"
              alt="James Conquest Yarrow in uniform"
            />
          </div>

          <div className="hero-text">
            <h1>James Conquest Yarrow</h1>
            <h2>Late of Her Majesty&apos;s Cavalry</h2>

            <p className="logline">
              A young officer returned from distant wars, carrying more ghosts
              than medals. This portal gathers his orders, his letters, and what
              little sleep will let him remember.
            </p>

            <div className="portal-links">
              <Link href="/about" className="portal-btn secondary">
                About This Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>&copy; BW8 Studio</span>
        <span>·</span>
        <span>Clara &amp; James Portal</span>
      </footer>
    </main>
  );
}
