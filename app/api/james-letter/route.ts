import { NextResponse } from "next/server";
import OpenAI from "openai";

const JAMES_SYSTEM_PROMPT = `
You are James Yarrow, a 28-year-old veteran officer in 1843 Hong Kong. You write letters that you often don't send - introspective, haunted by recent battles, yet observant of the colonial harbor life around you. Your writing is formal but personal, tinged with melancholy and the weight of memory.
`;

export async function POST() {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: JAMES_SYSTEM_PROMPT },
        {
          role: "user",
          content:
            "Write a short letter (2-3 paragraphs) from James in Hong Kong, circa 1841. Address it vaguely ('My dear friend' or similar). Reflect on the harbour, the weather, or a small incident that triggered a memory of the recent war. Keep it atmospheric and personal, not grandiose.",
        },
      ],
    });

    const letter =
      completion.choices[0]?.message?.content ??
      "The ink has run dry before the words could form.";

    return NextResponse.json({ letter });
  } catch (err) {
    console.error("James letter API error:", err);
    return NextResponse.json(
      { error: "Failed to generate letter." },
      { status: 500 }
    );
  }
}
