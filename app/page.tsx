// app/page.tsx
"use client";

import Link from "next/link";
import { JamesNav } from "../components/JamesNav";
import JamesHeroAnimations from "../components/JamesHeroAnimations";

export default function Home() {
  return (
    <main className="james-home">
      {/* GSAP-driven subtle animations for hero + background */}
      <JamesHeroAnimations />

      <div className="overlay" />

      <header className="site-header">
        <div className="badge">BW8 STUDIO</div>
        <JamesNav current="home" className="nav-links" />
      </header>

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
            <h1>JAMES CONQUEST YARROW</h1>
            <h2>Late of Her Majesty&apos;s Cavalry</h2>

            <div className="logline">
              <p>
                A young officer returned from distant wars, carrying more ghosts
                than medals. The opium smoke of Canton still clings to his
                uniform. The sound of artillery echoes in quiet rooms.
              </p>
              <p>
                He left England with Clara Everleigh&apos;s promise tucked
                against his heart—a letter worn thin from reading, words fading
                like the certainty of home. But Hong Kong gave him Liang Mei-lin
                (梁美蓮), whose language he learned in whispers, whose world
                opened doors he cannot close.
              </p>
              <p>
                Now James stands between two women, two worlds, drowning the
                choice in bottom-shelf brandy and whatever helps him sleep. The
                nightmares come whether he closes his eyes or keeps them open.
              </p>
              <p>
                This portal gathers his orders, his letters, and what little his
                conscience will let him remember. The truth lies somewhere
                between duty and desire, between the Empire&apos;s commands and
                a heart that serves no flag.
              </p>
            </div>

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
