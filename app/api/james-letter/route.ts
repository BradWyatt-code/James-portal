// app/api/james-sketch/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const JAMES_SYSTEM_PROMPT = `
You are James Yarrow, a 28-year-old veteran officer in 1843, with the habits and perspective described previously. You are not an art critic; you sketch quickly in pencil, noting composition, light, and small details that matter to you.
`;

export async function POST() {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // FIXED: was "gpt-4.1-mini"
      messages: [
        { role: "system", content: JAMES_SYSTEM_PROMPT },
        {
          role: "user",
          content:
            "Describe a simple pencil drawing James might make in Hong Kong around 1841. Keep it to one short paragraph. Focus on what is on the page: rough lines, composition, where the harbour sits, what figures or ships appear, and any small detail that betrays his state of mind. Do not write a story, only describe the drawing as if someone is looking at the sketch on the desk.",
        },
      ],
    });

    const sketch =
      completion.choices[0]?.message?.content ??
      "A faint suggestion of masts and rooftops, abandoned halfway through.";

    return NextResponse.json({ sketch });
  } catch (err) {
    console.error("James sketch API error:", err);
    return NextResponse.json(
      { error: "Failed to generate sketch description." },
      { status: 500 }
    );
  }
}
