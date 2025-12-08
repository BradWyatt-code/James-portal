import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(_req: NextRequest) {
  try {
    const result = await openai.images.generate({
      model: "gpt-image-1",
      // Tune the prompt however you like
      prompt:
        "A monochrome pencil sketch in the style of a 19th-century illustration, " +
        "showing British cavalry officer James Conquest Yarrow at a small field desk " +
        "overlooking Hong Kong harbour at dusk. Loose graphite lines, misty mountains " +
        "and ships in the distance, no text, no frame.",
      size: "1024x1024",
      n: 1,
      response_format: "b64_json",
    });

    const b64 = result.data[0]?.b64_json;

    if (!b64) {
      return NextResponse.json(
        { error: "No image returned from OpenAI." },
        { status: 500 }
      );
    }

    // Your frontend expects { image: string }
    return NextResponse.json({ image: b64 });
  } catch (err) {
    console.error("James sketch API error:", err);
    return NextResponse.json(
      { error: "Failed to generate sketch image." },
      { status: 500 }
    );
  }
}
