"use client";

import Link from "next/link";

export default function SpeakPage() {
  return (
    <main className="james-speak">
      <div className="js-overlay" />

      <header className="js-header">
        <div className="js-header-title">
          <span className="js-header-label">BW8 Studio</span>
          <h1>Speak with James</h1>
        </div>

        <nav className="js-header-nav">
          <Link href="/">Portal</Link>
          <span>·</span>
          <Link href="https://clara.bw8.org" target="_blank">
            Clara
          </Link>
        </nav>
      </header>

      <section className="js-chat-shell">
        {/* LEFT SIDE – description */}
        <aside className="js-sidebar">
          <h2>James Conquest Yarrow</h2>
          <p>
            A cavalry officer grown older and threadbare, sitting in a pub where
            the noise never quite drowns out the memories. This page will host
            the chat that tries.
          </p>
          <p className="js-sidebar-note">
            The interface below is a shell only for now — wiring to the model
            comes later.
          </p>
        </aside>

        {/* RIGHT SIDE – WhatsApp-style chat mockup */}
        <div className="js-chat-frame">
          <div className="js-chat-header">
            <div className="js-avatar" />
            <div className="js-chat-title">
              <span className="js-chat-name">James</span>
              <span className="js-chat-status">last seen... elsewhere</span>
            </div>
          </div>

          <div className="js-chat-log">
            <div className="js-msg js-msg-them">
              <p>They sent us out again today.</p>
              <span className="js-msg-time">18:41</span>
            </div>

            <div className="js-msg js-msg-me">
              <p>What happened?</p>
              <span className="js-msg-time">18:42</span>
            </div>

            <div className="js-msg js-msg-them">
              <p>
                Nothing the papers will print. But my hands still smell of the
                powder.
              </p>
              <span className="js-msg-time">18:44</span>
            </div>
          </div>

          <form
            className="js-input-bar"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Write to James..."
              className="js-input"
            />
            <button type="submit" className="js-send-btn">
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
