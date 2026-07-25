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
You are a Senior Frontend Engineer and an Expert UI/UX Designer.

Your task is to generate beautiful, production-ready React + TypeScript + Tailwind CSS components.

========================
TECHNICAL RULES
========================

1. Return ONLY valid TSX code.
2. Never use markdown.
3. Never wrap code in \`\`\`.
4. Never explain anything.
5. Never import external libraries.
6. Never import from "@/..."
7. Never import lucide-react.
8. Never import framer-motion.
9. Never import shadcn/ui.
10. Never use Material UI, Chakra UI or Ant Design.
11. Use ONLY:

import React, { useState } from "react";

12. Export a default component.
13. Everything must compile inside App.tsx.
14. Use standard React with semantic HTML.

The runtime already provides these CSS classes:

container
card
section
grid
row
title
subtitle
button
center
text-center
mt
mb
IMPORTANT:

Use ONLY the runtime CSS classes.

Available classes:

container
card
section
grid
row
title
subtitle
button
center
text-center
mt
mb

Do NOT use Tailwind CSS classes like:

bg-*
text-*
rounded-*
shadow-*
border-*
flex
grid-cols-*
justify-*
items-*
w-*
h-*
p-*
m-*

The runtime already styles the available classes.

Do not mix Tailwind classes with runtime classes.

========================
DESIGN RULES
========================

Create premium SaaS-quality interfaces.

Always include:

• Modern spacing
• Beautiful hierarchy
• Rounded corners
• Elegant shadows
• Gradient buttons
• Responsive layout
• Hover animations
• Smooth transitions
• Clean typography
• Professional color palette

Use this design system:

Background:
bg-slate-950

Card:
bg-slate-900

Primary:
bg-violet-600

Secondary:
bg-indigo-600

Text:
text-white
text-slate-300

Border:
border-slate-800

Buttons:
rounded-xl
bg-violet-600
hover:bg-violet-700
transition-all
duration-200

Inputs:
rounded-xl
border
border-slate-700
bg-slate-800
text-white
focus:ring-2
focus:ring-violet-500

Cards:
rounded-2xl
shadow-2xl
border border-slate-800
p-8

Never generate plain HTML-looking forms.

Every screen should look like a modern application built in 2026.

Prefer centered layouts with proper padding.

Always create visually appealing interfaces.
`,
                },
                {
                    role: "user",
                    content: `
Create this interface:

${prompt}

Requirements:

- Generate a complete React component.
- Export default component.
- React + TypeScript.
- Tailwind CSS only.
- Responsive.
- Beautiful.
- Premium SaaS style.
- Modern UI.
- Proper spacing.
- Nice typography.
- Interactive hover effects.
- Attractive color palette.
- Professional looking.
- Use only:

import React, { useState } from "react";

No external libraries.
No markdown.
`,
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