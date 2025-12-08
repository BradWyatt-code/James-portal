"use client";

import Image from "next/image";
import { useState } from "react";

type SketchResponse = {
  image?: string;
  error?: string;
};

export default function LettersPage() {
  const [letterText, setLetterText] = useState<string>("");
  const [letterLoading, setLetterLoading] = useState(false);

  const [sketchImage, setSketchImage] = useState<string | null>(null);
  const [sketchStatus, setSketchStatus] = useState<string>(
    "No sketch generated."
  );
  const [sketchLoading, setSketchLoading] = useState(false);

  const handleGenerateLetter = async () => {
    setLetterLoading(true);
    try {
      const res = await fetch("/api/james-letter", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("API Error:", data);
        setLetterText(`Error: ${data.error || "Failed to generate letter"}`);
        return;
      }

      setLetterText(data.letter || "No letter generated.");
    } catch (err) {
      console.error("Fetch error:", err);
      setLetterText("Error: Could not connect to API.");
    } finally {
      setLetterLoading(false);
    }
  };

  const handleGenerateSketch = async () => {
    setSketchLoading(true);
    setSketchStatus("Sketching Hong Kong in graphite...");
    setSketchImage(null);

    try {
      const res = await fetch("/api/james-sketch", {
        method: "POST",
      });
      const data: SketchResponse = await res.json();

      if (!res.ok || !data.image) {
        console.error("Sketch API error:", data);
        setSketchStatus(
          data.error || "Error: Failed to generate sketch image."
        );
        return;
      }

      setSketchImage(data.image);
      setSketchStatus(""); // we have an image; no text status needed
    } catch (err) {
      console.error("Sketch fetch error:", err);
      setSketchStatus("Error: Could not contact sketch API.");
    } finally {
      setSketchLoading(false);
    }
  };

  return (
    <main className="james-letters">
      <div className="overlay" />

      <section className="hero">
        <div className="hero-card">
          {/* Left: desk image */}
          <div className="portrait-wrap">
            <Image
              src="/images/james-desk.png"
              alt="James writing at a desk"
              width={480}
              height={640}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "320px",
                borderRadius: "1rem",
                border: "1px solid #4a4338",
              }}
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
                onClick={handleGenerateLetter}
                disabled={letterLoading}
              >
                {letterLoading ? "Generating..." : "Generate Letter"}
              </button>

              <button
                type="button"
                className="portal-btn secondary"
                onClick={handleGenerateSketch}
                disabled={sketchLoading}
              >
                {sketchLoading ? "Sketching..." : "Generate Sketch"}
              </button>
            </div>

            <div className="letters-output">
              {letterText && (
                <section className="letters-block">
                  <h3>Letter from Hong Kong</h3>
                  <p>{letterText}</p>
                </section>
              )}

              <section className="letters-block">
                <h3>Pencil Sketch</h3>
                {sketchImage ? (
                  <img
                    src={`data:image/png;base64,${sketchImage}`}
                    alt="Pencil sketch of Hong Kong harbour from James's perspective"
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "420px",
                      marginTop: "0.75rem",
                      borderRadius: "0.75rem",
                      border: "1px solid #3b3730",
                    }}
                  />
                ) : (
                  <p>{sketchStatus}</p>
                )}
              </section>

              {!letterText && !sketchImage && sketchStatus && (
                <p className="letters-placeholder" style={{ marginTop: "0.75rem" }}>
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
