'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

type ChatMessage = {
  id: number;
  from: 'user' | 'james';
  text: string;
  time: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    from: 'james',
    text: 'They sent us out again today.',
    time: '18:41',
  },
  {
    id: 2,
    from: 'user',
    text: 'What happened?',
    time: '18:42',
  },
  {
    id: 3,
    from: 'james',
    text: 'Nothing the papers will print. But my hands still smell of the powder.',
    time: '18:44',
  },
];

function toHistory(messages: ChatMessage[]) {
  // only send the last 10 exchanges to keep context reasonable
  return messages.slice(-10).map((m) => ({
    role: m.from === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));
}

export default function SpeakPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  function currentTime() {
    return new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      from: 'user',
      text,
      time: currentTime(),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/james-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: toHistory(nextMessages),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const replyText: string =
        data.reply ?? "…silence. The line doesn't carry tonight.";

      const jamesMsg: ChatMessage = {
        id: Date.now() + 1,
        from: 'james',
        text: replyText,
        time: currentTime(),
      };

      setMessages((prev) => [...prev, jamesMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: Date.now() + 2,
        from: 'james',
        text:
          'The connection faltered. Try again in a moment, if your patience allows.',
        time: currentTime(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsSending(false);
    }
  }

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
            A cavalry officer grown older and threadbare, sitting in a pub where the
            noise never quite drowns out the memories. This page now lets you write
            into the din.
          </p>
          <p className="js-sidebar-note">
            James is an AI persona improvising from fragments of war, London fog,
            and whatever you choose to send across the table.
          </p>
        </aside>

              {/* RIGHT SIDE – chat */}
        <div className="js-chat-frame">
          <div className="js-chat-header">
            <div className="js-avatar" />
            <div className="js-chat-title">
              <span className="js-chat-name">James</span>
              <span className="js-chat-status">last seen… elsewhere</span>
            </div>
          </div>

          <div className="js-chat-log">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`js-msg ${
                  msg.from === 'james' ? 'js-msg-them' : 'js-msg-me'
                }`}
              >
                <p>{msg.text}</p>
                <span className="js-msg-time">{msg.time}</span>
              </div>
            ))}
          </div>

          <form className="js-input-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Write to James..."
              className="js-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
            />
            <button
              type="submit"
              className="js-send-btn"
              disabled={isSending}
            >
              {isSending ? 'Sending…' : 'Send'}
            </button>
          </form>
        </div>
