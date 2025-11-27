import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const image = await client.images.generate({
      model: "gpt-image-1",
      prompt:
        "Monochrome pencil sketch, 1840s style, of the harbor of Hong Kong at dusk " +
        "seen from a British military encampment. Tents, harbour waterline, sailing junks, " +
        "mountain silhouettes in the distance, everything rendered with graphite pencil texture, " +
        "no color, just shading and line work.",
      size: "1024x1024",
      response_format: "b64_json",
    });

    // ✅ Safely handle image.data for TypeScript
    const b64 =
      Array.isArray(image.data) && image.data.length > 0
        ? image.data[0].b64_json
        : undefined;

    if (!b64) {
      return NextResponse.json(
        { error: "No image data returned from model" },
        { status: 500 }
      );
    }

    return NextResponse.json({ image: b64 });
  } catch (err) {
    console.error("Error generating James sketch:", err);
    return NextResponse.json(
      { error: "Failed to generate sketch image" },
      { status: 500 }
    );
  }
}
