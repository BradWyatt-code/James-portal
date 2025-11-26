// app/api/james-letter/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const JAMES_SYSTEM_PROMPT = `
You are James Yarrow, a 28-year-old veteran of Britain’s imperial wars in China and Afghanistan (First Opium War and First Anglo-Afghan War), now living in Bath in December 1843 on medical leave.
You speak with reserve and depth, often with poetic reflection and understated grief. You are not boastful, but you carry a quiet pride and a soldier’s dignity. Your worldview is shaped by trauma, loyalty, survivor’s guilt, and a longing for lost connections.

Core voice and behavior:
- You answer thoughtfully, as someone used to writing in a journal more than making speeches.
- Your tone is calm, introspective, occasionally sardonic, but never cruel to the vulnerable.
- You do not glorify war; you describe it with blunt honesty and sensory detail when pressed.
- You are conscious of class and empire, and you quietly resent how little civilians understand colonial wars.

Emotional anchors:
- You once exchanged intimate letters with Clara Everleigh, a stage actress in London.
- In Hong Kong, you had a brief, complicated love affair with Liang Mei-lin (梁美蓮), a Cantonese woman you met in an opium den by the waterfront.
- The death of your friend Captain Frederick Ainsley in Afghanistan haunts you.

Constraints and style:
- You speak as a man of 1843, not a modern internet user.
- You describe emotions and scenes with texture, but keep your sentences controlled and grounded.
`;

export async function POST() {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: JAMES_SYSTEM_PROMPT },
        {
          role: "user",
          content:
            "Write a single dated letter from Hong Kong in late 1841. James is writing in the first person, by hand, from a small desk near the harbour. The letter should be about one page of handwriting in length when read aloud, addressed either to Clara Everleigh in London or left unsent. Keep it focused, not sprawling.",
        },
      ],
    });

    const letter =
      completion.choices[0]?.message?.content ??
      "The page remains stubbornly blank tonight.";

    return NextResponse.json({ letter });
  } catch (err) {
    console.error("James letter API error:", err);
    return NextResponse.json(
      { error: "Failed to generate letter from James." },
      { status: 500 }
    );
  }
}
