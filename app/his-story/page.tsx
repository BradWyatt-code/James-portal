// app/his-story/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HisStoryPage() {
  return (
    <main className="james-page">
      <div className="overlay" />

      <header className="site-header">
        <div className="badge">BW8 Studio</div>
        <nav className="nav-links">
          <Link href="/">Portal</Link>
          <span>·</span>
          <Link href="/speak">Speak</Link>
          <span>·</span>
          <span className="current">His Story</span>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-card">
          {/* Portrait */}
          <div className="portrait-wrap">
            <Image
              src="/images/james-18.png"
              alt="James Conquest Yarrow as a young cavalry officer"
              width={480}
              height={640}
            />
          </div>

          {/* Text */}
          <div className="hero-text">
            <h1>His Story</h1>
            <h2>James Conquest Yarrow</h2>

            <p className="logline">
              Born to a dwindling Sussex gentry line and forged in the dust of
              China and Afghanistan, James Conquest Yarrow now lives on
              half-pay in Bath, carrying more ghosts than medals.
            </p>

            <p>
              James was born on <strong>3 March 1815</strong> in Sussex,
              England, the only son of{" "}
              <strong>Colonel Ambrose Yarrow</strong>, a veteran of the
              Napoleonic Wars, and the late <strong>Elizabeth Yarrow</strong>{" "}
              (née Pomeroy). The Yarrows are old gentry with more history than
              money: a modest estate, inherited duty, and expectations that a
              son would serve the Crown as his father did.
            </p>

            <p>
              At sixteen, his father purchased him a commission, and James
              joined the <strong>18th (Royal Irish) Regiment of Foot</strong>.
              His first major campaign was the{" "}
              <strong>First Opium War (1839–1842)</strong>, where he saw action
              at Chusan and later at Canton, witnessing the bombardment, looted
              warehouses, and the uneasy calm that followed the{" "}
              <strong>Treaty of Nanking</strong>. The victory sat poorly with
              him; he learned how easily words like <em>trade</em> and{" "}
              <em>order</em> could be used to dress up cruelty.
            </p>

            <p>
              From China he was sent to an even harsher theatre: the{" "}
              <strong>First Anglo-Afghan War</strong>. James marched through the
              passes into Kabul and survived the brutal unraveling that
              followed—retreats in snow, shattered columns, and the death of his
              friend <strong>Captain Frederick Ainsley</strong>, a loss that
              still shapes his mistrust of confident generals and tidy official
              reports.
            </p>

            <p>
              By late 1843, worn down by wounds, exposure, and recurring fever,
              James has been granted <strong>medical leave in Bath</strong>.
              Officially he is twenty-eight, an officer of good record on
              temporary respite. Unofficially he is a man hanging between
              worlds: the quiet rooms of England and the memory of Canton’s
              alleys and Afghan passes. Letters from an actress in London and a
              woman once known in Hong Kong are among the few threads that still
              bind him to the idea of a future.
            </p>

            <p>
              <em>
                This portal records the James who sits in that narrow December
                of 1843—no longer a boy officer, not yet whatever comes after
                war.
              </em>
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        © {new Date().getFullYear()} BW8 Studio · James Conquest Yarrow
      </footer>
    </main>
  );
}
