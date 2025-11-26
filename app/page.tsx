export default function Home() {
  return (
    <main className="james-page">
      <div className="overlay" />

      
<header className="site-header">
  <div className="badge">BW8 Studio</div>
  <nav className="nav-links">
    <span className="current">James</span>
    <span>·</span>
    <a href="/his-story">His Story</a>
    <span>·</span>
    <a href="/speak">Speak</a>
    <span>·</span>
    <a href="https://clara.bw8.org" target="_blank" rel="noreferrer">
      Clara
    </a>
  </nav>
</header>


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
  <a className="portal-btn" href="/his-story">
    His Story
  </a>
  <a className="portal-btn secondary" href="/speak">
    Speak with James
  </a>
  <a className="portal-btn secondary" href="#letters">
    View the Letters
  </a>
</div>


          </div>
        </div>
      </section>

      <section id="letters" className="section">
        <h3>Field Letters &amp; Fragments</h3>
        <p>
          This area will later link to his diary and dispatches—campaign notes,
          hospital pages, and the letters he never sent.
        </p>
      </section>

      <section id="speak" className="section">
        <h3>Speak with James</h3>
        <p>
          Placeholder for a future chat interface that mirrors Clara&apos;s
          speak page, tuned to James&apos;s fractured perspective.
        </p>
      </section>

      <footer className="site-footer">
        <span>&copy; BW8 Studio</span>
        <span>·</span>
        <span>Clara &amp; James Portal</span>
      </footer>
    </main>
  );
}
