// app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="james-about">
      <div className="overlay" />

      <section className="hero">
        <div className="hero-card">
          {/* Left: magnifying glass image */}
          <div className="portrait-wrap">
            <Image
              src="/images/magnifyingglass.png"
              alt="Magnifying glass examining the details"
              width={400}
              height={400}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "320px",
                aspectRatio: "1 / 1",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Right: headline + tech stack */}
          <div className="hero-text">
            <h1>About</h1>
            <h2>The James Portal</h2>

            <p className="logline">
              A digital experience blending historical fiction with modern AI,
              built to bring the character of James Conquest Yarrow to life
              through conversation, letters, and imagery.
            </p>

            <p>
              This portal is part of the BW8 Studio project, an experimental
              narrative universe exploring Victorian-era characters through
              interactive AI personas.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>Technologies Used</h3>
        <ul className="tech-list">
          <li>
            <strong>Next.js 16</strong> &mdash; React framework with App Router,
            server components, and API routes
          </li>
          <li>
            <strong>React 18</strong> &mdash; Component-based UI with hooks and
            concurrent features
          </li>
          <li>
            <strong>TypeScript</strong> &mdash; Type-safe JavaScript for
            reliable code
          </li>
          <li>
            <strong>OpenAI API</strong> &mdash; GPT-4 powers James&apos;s
            conversational responses and letter generation
          </li>
          <li>
            <strong>OpenAI Image Generation</strong> &mdash; Creates pencil
            sketches in 1840s engraving style
          </li>
          <li>
            <strong>Tailwind CSS</strong> &mdash; Utility-first CSS framework
            for rapid styling
          </li>
          <li>
            <strong>CSS Custom Properties</strong> &mdash; Dark Victorian theme
            with period-appropriate colors
          </li>
          <li>
            <strong>Vercel</strong> &mdash; Deployment and hosting platform
            optimized for Next.js
          </li>
        </ul>
      </section>

      <section className="section">
        <h3>Design Philosophy</h3>
        <p>
          The visual design draws from Victorian aesthetics: muted sepia tones,
          serif typography, and atmospheric overlays that evoke gaslit rooms and
          aged parchment. The UI prioritizes immersion, letting conversations
          with James feel like exchanges across time rather than interactions
          with a chatbot.
        </p>
      </section>

      <footer className="site-footer">
        <span>&copy; {new Date().getFullYear()} BW8 Studio</span>
        <span>&middot;</span>
        <span>Clara &amp; James Portal</span>
      </footer>
    </main>
  );
}
