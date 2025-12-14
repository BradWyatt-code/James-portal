"use client";

import { FormEvent, useState } from "react";

type ChatMessage = {
  role: "user" | "james";
  text: string;
  time?: string;
};

export default function SpeakPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    // show user message immediately
    const userMsg: ChatMessage = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/james-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      const replyText =
        data?.reply ||
        "The line crackles, but I cannot quite make out your meaning. Perhaps try again, a little more plainly.";

      const jamesMsg: ChatMessage = {
        role: "james",
        text: replyText,
      };

      setMessages((prev) => [...prev, jamesMsg]);
    } catch (err) {
      console.error("Error talking to James API:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "james",
          text: "Something went wrong with the wires. I cannot hear you clearly. We will have to blame the weather—or the Admiralty.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="james-speak">
      {/* Fog overlay effect */}
      <div className="fog-container" aria-hidden="true">
        <div className="fog-layer fog-layer-1" />
        <div className="fog-layer fog-layer-2" />
      </div>

      {/* Ember effects */}
      <div className="ember-container" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`ember ember-${i + 1}`} />
        ))}
      </div>
      {/* Smoke effects */}
      <div className="smoke-container" aria-hidden="true">
        <div className="smoke smoke-1" />
        <div className="smoke smoke-2" />
        <div className="smoke smoke-3" />
      </div>

      {/* Speak layout */}
      <section className="hero">
        <div className="hero-card">
          <div className="speak-chat-wrap">
            <div className="chat-dialogue">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`message ${m.role === "user" ? "user" : "james"}`}
                >
                  <span className="message-text">{m.text}</span>
                  {m.time && <span className="message-time">{m.time}</span>}
                </div>
              ))}
            </div>

            <form className="chat-input-row" onSubmit={handleSubmit}>
              <input
                type="text"
                className="chat-input"
                placeholder="Buy James a drink..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="chat-send-btn" disabled={sending}>
                {sending ? "…" : "SEND"}
              </button>
            </form>
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
