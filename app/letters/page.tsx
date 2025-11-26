// app/letters/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LettersPage() {
  const [letter, setLetter] = useState<string>("");
  const [sketch, setSketch] = useState<string>("");
  const [isLetterLoading, setIsLetterLoading] = useState(false);
  const [isSketchLoading, setIsSketchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerateLetter() {
    setIsLetterLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/james-letter", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setLetter(data.letter ?? "");
    } catch (err) {
      console.error(err);
      setError("James faltered at the page. Try again in a moment.");
    } finally {
      setIsLetterLoading(false);
    }
  }

  async function handleGenerateSketch() {
    setIsSketchLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/james-sketch", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setSketch(data.sketch ?? "");
    } catch (err) {
      console.error(err);
      setError("The pencil slipped. Try again in a moment.");
    } finally {
      setIsSketchLoading(false);
    }
  }

  return (
    <main className="james-page">
      <div className="overlay" />

      <header className="site-header">
        <div className="badge">BW8 Studio</div>
        <nav className="nav-links">
          <Link href="/">James</Link>
          <span>·</span>
          <Link href="/his-story">His Story</Link>
          <span>·</span>
          <Link href="/speak">Speak</Link>
          <span>·</span>
          <span className="current">Letters</span>
          <span>·</span>
          <a href="https://clara.bw8.org" target="_blank" rel="noreferrer">
            Clara
          </a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-card">
          {/* Left: desk image */}
          <div className="portrait-wrap">
            <Image
              src="/images/james-desk.png"
              alt="James writing at a field desk"
              width={480}
              height={640}
            />
          </div>

          {/* Right: controls and output */}
          <div className="hero-text">
            <h1>Letters from Hong Kong</h1>
            <h2>Dispatches & Pencil Sketches</h2>

            <p className="logline">
              At a small desk overlooking the harbour, James writes the letters
              he never quite sends—and sketches the city as charcoal and fog.
            </p>

            <div className="portal-links" style={{ marginBottom: "1rem" }}>
              <button
                type="button"
                className="portal-btn"
                onClick={handleGenerateLetter}
                disabled={isLetterLoading}
              >
                {isLetterLoading ? "Writing…" : "Generate Letter"}
              </button>

              <button
                type="button"
                className="portal-btn secondary"
                onClick={handleGenerateSketch}
                disabled={isSketchLoading}
              >
                {isSketchLoading ? "Drawing…" : "Generate Sketch"}
              </button>
            </div>

            {error && (
              <p style={{ color: "#ffb3b3", fontSize: "0.85rem" }}>{error}</p>
            )}

            <div className="letters-output">
              {letter && (
                <section className="letters-block">
                  <h3>Letter from Hong Kong</h3>
                  <p>{letter}</p>
                </section>
              )}

              {sketch && (
                <section className="letters-block">
                  <h3>Pencil Sketch</h3>
                  <p>{sketch}</p>
                </section>
              )}

              {!letter && !sketch && (
                <p className="letters-placeholder">
                  Press a button above to call a letter or a sketch across from
                  the harbour.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        © {new Date().getFullYear()} BW8 Studio · James Conquest Yarrow
      </footer>
    </main>
  );
}
