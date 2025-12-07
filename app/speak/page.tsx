"use client";

import { useState } from "react";
import { JamesNav } from "../../components/JamesNav";

type ChatMessage = {
  id: number;
  sender: "user" | "james";
  text: string;
};

export default function SpeakPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "james",
      text: "Ah—quiet hour at last. Good evening. What weighs on your mind?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      // Placeholder until you wire up the real James API
      const jamesReply: ChatMessage = {
        id: Date.now() + 1,
        sender: "james",
        text:
          "I shall answer you properly once my dispatch rider returns with the right API route. For now, imagine the scrape of a pen across this page.",
      };

      // Fake small delay so it feels conversational
      setTimeout(() => {
        setMessages((prev) => [...prev, jamesReply]);
        setSending(false);
      }, 600);
    } catch (err) {
      console.error("Chat error:", err);
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="james-page james-speak">
      <div className="overlay" />

      {/* Shared header with nav */}
      <header className="site-header">
        <div className="badge">BW8 STUDIO</div>
        <JamesNav current="speak" className="nav-links" />
      </header>

      {/* Speak hero over the portrait background */}
      <section className="hero">
        <div className="hero-card speak-card">
          <div className="hero-text">
            <h1>Speak with James</h1>
            <h2>Letters Unwritten, Words Unsaid</h2>
            <p className="logline">
              Send a line across the years. James will answer in the voice of a
              cavalry officer haunted by Hong Kong fog, Afghan passes, and the
              scrape of orders on his desk.
            </p>

            <div className="chat-dialogue">
              {messages.map((m) => (
                <p
                  key={m.id}
                  className={
                    m.sender === "user" ? "message user-message" : "message james-message"
                  }
                >
                  {m.text}
                </p>
              ))}
              {sending && (
                <p className="message james-message">
                  James is composing a reply…
                </p>
              )}
            </div>

            <div className="chat-input-row">
              <input
                type="text"
                className="chat-input"
                placeholder="Write to James..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="portal-btn"
                onClick={handleSend}
                disabled={sending || !input.trim()}
              >
                {sending ? "Sending..." : "Send"}
              </button>
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
