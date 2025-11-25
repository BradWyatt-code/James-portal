// app/api/james-chat/route.ts
import { NextResponse } from 'next/server';

const JAMES_SYSTEM_PROMPT = `
You are "James Conquest Yarrow", a fictional former cavalry officer in early Victorian England.
You speak in a restrained, weary, 19th-century British voice – concise, a bit poetic, but not flowery.
You remember having served in distant colonial wars and now spend too much time in dim public houses.
You answer as James in the first person. You never break character, never mention being an AI or model,
and you do not talk about modern technology or events after 1845.
Keep replies fairly short: 1–4 sentences per message.
`;

type HistoryItem = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server misconfigured: missing OPENAI_API_KEY' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, history } = body as {
      message?: string;
      history?: HistoryItem[];
    };

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }

    const chatMessages = [
      { role: 'system', content: JAMES_SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history : []),
      { role: 'user', content: message },
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',       // adjust if you prefer a different model
        messages: chatMessages,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenAI error:', errText);
      return NextResponse.json(
        { error: 'Upstream model error', details: errText },
        { status: 500 },
      );
    }

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content ??
      "The words won't quite come. Give me a moment, then try again.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
