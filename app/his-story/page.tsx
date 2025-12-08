// app/his-story/page.tsx
import Image from "next/image";

export default function HisStoryPage() {
  return (
    <main className="james-story">
      <div className="overlay" />

      <section className="hero">
        <div className="hero-card">
          {/* Left: 18-year-old James leaving the estate */}
          <div className="portrait-wrap">
            <Image
              src="/images/james-18.png"
              alt="James Conquest Yarrow at eighteen, in civilian dress, preparing to leave his country estate"
              width={480}
              height={580}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "360px",
              }}
            />
          </div>

          {/* Right: headline + short summary */}
          <div className="hero-text">
            <h1>His Story</h1>
            <h2>James Conquest Yarrow</h2>

            <p className="logline">
              Born to an old but fading Sussex family, James Yarrow left his
              country estate at eighteen to chase honour on distant battlefields.
              The years that followed would strip the romance from war and leave
              him walking home with more ghosts than glory.
            </p>

            <p>
              James is the only son of Colonel Ambrose Yarrow, a retired officer
              of Napoleonic fame, and the late Elizabeth Yarrow (née Pomeroy).
              The Yarrows hold a modest estate in Sussex—land rich in memory,
              poorer in coin. At sixteen his father purchased him a commission,
              and the boy who once rode the downs for sport was turned toward
              soldiering in earnest.
            </p>

            <p>
              He would serve in Britain&apos;s imperial campaigns in China and
              Afghanistan: the First Opium War and the First Anglo-Afghan War.
              In Canton and along the Chinese coast he saw trade dressed up as
              righteousness and cities shelled into obedience. In the passes of
              Afghanistan he watched columns freeze, starve, and fall under fire
              as command blundered and men paid the price.
            </p>

            <p>
              By December 1843 James has returned to England on medical leave,
              his body worn by fever and his nerves by all that could not be
              carried home in a dispatch. He lodges in Bath, somewhere between
              convalescent and ghost, living on a modest officer&apos;s income,
              his father&apos;s expectations, and the fragile company of letters
              and memories that have followed him back from the edges of empire.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>Threads That Bind Him</h3>
        <p>
          James&apos;s life is held together by a few thin, stubborn threads:
          his loyalty to fallen comrades, his complicated affection for Clara
          Everleigh—the London actress who once wrote to him at the front—and
          the memory of Liang Mei-lin, a Cantonese woman whose presence in Hong
          Kong carved a quiet, indelible place in his heart. Between these
          ghosts and his aging father&apos;s shadow, he tries to decide what a
          man is meant to be when the war is over but the war will not leave him.
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
