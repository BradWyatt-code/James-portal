// app/api/james-sketch/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const FALLBACK_SKETCHES = [
  "/images/james-sketch-1.png",
  "/images/james-sketch-2.png",
  "/images/james-sketch-3.png",
  // add/remove as you like – just make sure the files exist in /public/images
];

function randomFallback() {
  const choice =
    FALLBACK_SKETCHES[Math.floor(Math.random() * FALLBACK_SKETCHES.length)];
  // Always return something predictable, no errors
  return NextResponse.json({
    imageUrl: choice,
    source: "fallback",
  });
}

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY;

  // If there is no key, skip straight to fallback
  if (!apiKey) {
    console.warn("[james-sketch] No OPENAI_API_KEY – using fallback image.");
    return randomFallback();
  }

  const client = new OpenAI({ apiKey });

  try {
    const prompt =
      "Randomly generate a pencil sketch in muted graphite tones, drawn in the style of a 19th century British war artist. Sketches of different Hong Kong 1840 subjects: Chinese junks, Chinese people in period clothing, British cavalry officers, horses, attractive Chinese women in 1840s dress, harbor scenes, etc.";

    const result = await client.images.generate({
      model: "gpt-image-1", // or "dall-e-3" when your org actually has access
      prompt,
      size: "1024x1024",
      n: 1,
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      console.warn(
        "[james-sketch] OpenAI returned no b64_json, using fallback instead."
      );
      return randomFallback();
    }

    // Happy path: model worked, send base64
    return NextResponse.json({
      image: imageBase64,
      source: "openai",
    });
  } catch (err: any) {
    console.error(
      "[james-sketch] OpenAI error, falling back to static image:",
      err?.response?.data || err
    );
    return randomFallback();
  }
}
