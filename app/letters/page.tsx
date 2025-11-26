"use client";

import Image from "next/image";
import { useState } from "react";
import { JamesNav } from "../../components/JamesNav";

export default function LettersPage() {
  const [letterText, setLetterText] = useState<string>("");
  const [sketchText, setSketchText] = useState<string>("");

  return (
    <main className="james-page">
      <div className="overlay" />

      <header className="site-header">
        <div className="badge">BW8 Studio</div>
        <JamesNav current="letters" className="nav-links" />
      </header>

      <section className="hero">
        <div className="hero-card">
          {/* Left: desk image */}
          <div className="portrait-wrap">
            <Image
              src="images/james-desk.png"
              alt="James writing at a desk"
              width={480}
              height={640}
            />
          </div>

          {/* Right: controls and output */}
          <div className="hero-text">
            <h1>Letters from Hong Kong</h1>
            <h2>Dispatches &amp; Pencil Sketches</h2>

            <p className="logline">
              At a small desk overlooking the harbour, James writes the letters
              he never quite sends—and sketches the city in charcoal and fog.
            </p>

            <div className="portal-links" style={{ marginBottom: "1rem" }}>
              <button
                type="button"
                className="portal-btn"
                onClick={() =>
                  setLetterText(
                    "Sample Hong Kong field letter placeholder. We’ll wire this to the real API later."
                  )
                }
              >
                Generate Letter
              </button>

              <button
                type="button"
                className="portal-btn secondary"
                onClick={() =>
                  setSketchText(
                    "Simple pencil sketch description placeholder—masts in the harbour, lantern light on wet stone."
                  )
                }
              >
                Generate Sketch
              </button>
            </div>

            <div className="letters-output">
              {letterText && (
                <section className="letters-block">
                  <h3>Letter from Hong Kong</h3>
                  <p>{letterText}</p>
                </section>
              )}

              {sketchText && (
                <section className="letters-block">
                  <h3>Pencil Sketch</h3>
                  <p>{sketchText}</p>
                </section>
              )}

              {!letterText && !sketchText && (
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
        <span>&copy; {new Date().getFullYear()} BW8 Studio</span>
        <span>·</span>
        <span>Clara &amp; James Portal</span>
      </footer>
    </main>
  );
}
