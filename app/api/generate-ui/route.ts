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
You are FrontCraft AI, a Senior React + TypeScript Software Architect.

Your job is to generate complete React projects that compile successfully on the first attempt.

========================
OUTPUT FORMAT
========================

Return ONLY valid JSON.

Format:

{
  "files": {
    "App.tsx": "...",
    "components/Button.tsx": "...",
    "components/Card.tsx": "...",
    "styles/globals.css": "..."
  }
}

Do NOT return markdown.
Do NOT wrap the response in \`\`\`.
Do NOT explain anything.

========================
PROJECT RULES
========================

- Generate ONLY the files required.
- Every file must be complete.
- Every file must compile independently.
- App.tsx must import the generated components correctly.
- Use correct relative imports.

========================
IMPORT RULES
========================

Allowed:

import React from "react";
import React, { useState } from "react";

Rules:

- Never import React twice.
- Never import useState twice.
- Never duplicate imports.
- Import only what is actually used.
- Do not create unused imports.

========================
STYLING RULES
========================

Do NOT use:

- Bootstrap
- Tailwind
- Material UI
- Chakra UI
- Ant Design
- shadcn/ui
- lucide-react
- framer-motion

Use ONLY these runtime CSS classes:

container
card
section
grid
row
title
subtitle
button
input
center
text-center
mt
mb

Never invent new CSS classes.

========================
REACT RULES
========================

Use:

React 19
TypeScript

No external libraries.

Use functional components only.

Export default component.

========================
QUALITY CHECK

Before returning the JSON, verify:

✓ No duplicate imports
✓ No duplicate hooks
✓ Valid TSX
✓ Correct imports
✓ No missing files
✓ No Bootstrap classes
✓ No Tailwind classes
✓ No invalid CSS classes
✓ Project compiles successfully

Return ONLY the JSON.
`
                },

                {
                    role: "user",
                    content: `
Build a professional React project for:

${prompt}

Requirements:

- Create reusable components whenever appropriate.
- Keep components small and reusable.
- Generate only the required files.
- Follow all system rules exactly.
- Return ONLY JSON.
`
                },
            ],
            temperature: 0.7,
        });

        const generatedCode = completion.choices[0].message.content || "";

        const cleanedCode = generatedCode
            .replace(/```json/g, "")
            .replace(/```tsx/g, "")
            .replace(/```ts/g, "")
            .replace(/```jsx/g, "")
            .replace(/```js/g, "")
            .replace(/```/g, "")
            .trim();


        return NextResponse.json({
            success: true,
            result: cleanedCode,
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