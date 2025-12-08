// app/api/james-sketch/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Server is missing OPENAI_API_KEY." },
      { status: 500 }
    );
  }

  try {
    const prompt =
      "A pencil sketch in muted graphite tones, drawn in the style of a 19th century British war artist. James Conquest Yarrow, a young British cavalry officer in a simple campaign uniform, sits at a small field desk in Hong Kong around 1840, with tent canvas and harbour masts faintly suggested in the background. The style should feel like a loose, atmospheric sketch, with visible pencil strokes and paper texture.";

    const result = await client.images.generate({
      // This is the current DALL·E-3-generation model
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      n: 1,
      // no response_format here – gpt-image-1 returns base64 by default
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      console.error("James sketch: no b64_json in response", result);
      return NextResponse.json(
        { error: "Model returned no image data." },
        { status: 500 }
      );
    }

    return NextResponse.json({ image: imageBase64 });
  } catch (err: any) {
    console.error("James sketch error:", err);

    const message =
      err?.response?.data?.error?.message ??
      err?.error?.message ??
      err?.message ??
      "Failed to generate sketch image";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
