import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(_req: Request) {
  try {
    // Prompt for the pencil sketch
    const prompt = `
An atmospheric 19th-century pencil sketch of Hong Kong harbour,
seen from a British army encampment around 1860:
canvas tents, a small field desk, ships in the distance, mist and fog.
Drawn in graphite, monochrome, with soft shading and visible pencil texture.
`;

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      n: 1,
      response_format: "b64_json",
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      console.error("No image returned from OpenAI", result);
      return new Response(
        JSON.stringify({ error: "OpenAI did not return an image." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ image: imageBase64 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("James sketch API error:", err);

    const message =
      err?.response?.data?.error?.message ||
      err?.message ||
      "Unknown error from OpenAI";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
