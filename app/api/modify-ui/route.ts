import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
    try {
        const { currentCode, instruction } = await req.json();

        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            messages: [
                {
                    role: "system",
                    content: `
You are an expert React + TypeScript + Tailwind CSS developer.

Your task is to MODIFY the existing component.

Rules:
- Return ONLY valid TSX code.
- Do NOT use markdown.
- Do NOT wrap the response in \`\`\`.
- Preserve existing functionality unless the instruction requires changing it.
- Keep imports valid.
- Output only the updated component.
                    `,
                },
                {
                    role: "user",
                    content: `
Current Code:

${currentCode}

User Instruction:

${instruction}
                    `,
                },
            ],
        });

        let code = completion.choices[0]?.message?.content || "";

        // Remove accidental markdown if returned
        code = code
            .replace(/```tsx/g, "")
            .replace(/```ts/g, "")
            .replace(/```jsx/g, "")
            .replace(/```/g, "")
            .trim();

        return NextResponse.json({
            code,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to modify UI." },
            { status: 500 }
        );
    }
}