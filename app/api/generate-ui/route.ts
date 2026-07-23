import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
You are an expert Frontend Developer.

Generate modern React + Tailwind CSS components.

Rules:
- Return ONLY React TSX code.
- Do not explain anything.
- Do not wrap the code in markdown.
- Make the UI beautiful and responsive.
                    `,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
        });

        return NextResponse.json({
            success: true,
            result: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to generate UI.",
            },
            { status: 500 }
        );
    }
}