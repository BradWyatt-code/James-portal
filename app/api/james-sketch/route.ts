// app/api/james-sketch/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const prompt =
      "A pencil sketch in muted graphite tones, drawn in the style of a 19th century British war artist. James Conquest Yarrow, a young British cavalry officer in a simple campaign uniform, sits at a small field desk in Hong Kong around 1840, with tent canvas and harbour masts faintly suggested in the background. The style should feel like a loose, atmospheric sketch, with visible pencil strokes and paper texture.";

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024", // required size
      n: 1,
      // DO NOT set response_format for gpt-image-1
    });

    // ✅ Safe access: data might be undefined, so use optional chaining
    const imageBase64 = result.data?.[0]?.b64_json ?? null;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image data returned from model." },
        { status: 500 }
      );
    }

    return NextResponse.json({ image: imageBase64 });
  } catch (err: any) {
    console.error("James sketch error:", err?.response?.data || err);
    return NextResponse.json(
      {
        error:
          err?.response?.data?.error?.message ||
          "Failed to generate sketch image",
      },
      { status: 500 }
    );
  }
}
