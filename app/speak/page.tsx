"use client";

import { FormEvent, useState } from "react";
import { JamesNav } from "../../components/JamesNav";

type ChatMessage = {
  role: "user" | "james";
  text: string;
  time?: string;
};

export default function SpeakPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "james",
      text: "Ah… a quiet hour at last. Good evening. It is—how to say?—a relief, somewhat, to hear a voice unconnected to cannon fire or the restless moan of the desert wind.",
      time: "08:37",
    },
  ]);
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
      const res = await fetch("/api/james-speak", {
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
      <div className="overlay" />

      {/* Shared header + nav */}
      <header className="site-header">
        <div className="badge">BW8 STUDIO</div>
        <JamesNav current="speak" className="nav-links" />
      </header>

      {/* Speak layout */}
      <section className="hero">
        <div className="hero-card">
          {/* Left: description card (like His Story) */}
          <div className="speak-card-left">
            <h1>JAMES CONQUEST YARROW</h1>
            <h2>Letters at the pub table</h2>
            <p>
              A cavalry officer gone older and threadbare, sitting in a room
              where the noise never quite drowns out the memories. This page
              lets you write into the dim.
            </p>
            <p>
              James is an AI persona improvising from fragments of war, London
              fog, and whatever you choose to send across the table.
            </p>
          </div>

          {/* Right: chat over the portrait */}
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
                placeholder="Write to James..."
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
