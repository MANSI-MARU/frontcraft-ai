import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
    try {
        const { files, activeFile, instruction } = await req.json();

        const currentCode = files[activeFile];

        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            messages: [
                {
                    role: "system",
                    content: `
You are an expert React and TypeScript developer.
You will receive an existing React project.
Modify the project according to the instruction.

Return ONLY valid JSON.

Output format:
{
  "files": {
    "App.tsx": "...",
    "components/Button.tsx": "...",
    "components/Card.tsx": "...",
    "components/LoginInput.tsx": "...",
    "styles.css": "..."
  }
}

Rules:
- Return every file.
- Modify only what is necessary.
- Keep unchanged files exactly the same.
- Never use markdown or backticks.
- Never explain anything.
- If you modify styles, update styles.css.
- All files must be complete and valid.
`
                },
                {
                    role: "user",
                    content: `
Project Files:

${JSON.stringify(files, null, 2)}

Currently Editing:
${activeFile}

Current File Content:

${currentCode}

Instruction:

${instruction}

Important:
- Return the COMPLETE project.
- Every file must be included inside the "files" object.
- Modify only the files required.
- Keep all other files exactly the same.
- Every file must contain its complete source code.
- Return ONLY valid JSON.
`,
                },
            ],
        });

        let responseText =
            completion.choices[0]?.message?.content || "";

        responseText = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const extractJson = (text: string) => {
            const match = text.match(/\{[\s\S]*\}/);
            if (!match) return null;
            return match[0];
        };

        const removeTrailingCommas = (text: string) =>
            text.replace(/,\s*([}\]])/g, "$1");

        const tryParseJson = (text: string) => {
            try {
                return JSON.parse(text);
            } catch {
                const extracted = extractJson(text);
                if (!extracted) return null;
                try {
                    return JSON.parse(extracted);
                } catch {
                    try {
                        return JSON.parse(removeTrailingCommas(extracted));
                    } catch {
                        return null;
                    }
                }
            }
        };

        const isFileMap = (obj: any): obj is Record<string, string> => {
            if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
                return false;
            }

            const keys = Object.keys(obj);
            if (keys.length === 0) {
                return false;
            }

            return keys.every(
                (key) =>
                    typeof obj[key] === "string" &&
                    key.includes(".")
            );
        };

        const findFiles = (obj: any): any => {
            if (obj == null) {
                return null;
            }

            if (typeof obj === "string") {
                const parsed = tryParseJson(obj);
                return parsed ? findFiles(parsed) : null;
            }

            if (Array.isArray(obj)) {
                for (const item of obj) {
                    const nested = findFiles(item);
                    if (nested) {
                        return nested;
                    }
                }
                return null;
            }

            if (isFileMap(obj)) {
                return obj;
            }

            if ("files" in obj) {
                const candidate = obj.files;
                if (candidate && typeof candidate === "object") {
                    if (isFileMap(candidate)) {
                        return candidate;
                    }
                    const nested = findFiles(candidate);
                    if (nested) {
                        return nested;
                    }
                }
                if (typeof candidate === "string") {
                    const parsedCandidate = tryParseJson(candidate);
                    if (parsedCandidate) {
                        return findFiles(parsedCandidate);
                    }
                }
            }

            for (const key of Object.keys(obj)) {
                const nested = findFiles(obj[key]);
                if (nested) {
                    return nested;
                }
            }

            return null;
        };

        console.log("===== RAW AI RESPONSE =====");
        console.log(responseText);
        console.log("===========================");

        let parsed = tryParseJson(responseText);

        if (!parsed) {
            console.error("Invalid AI Response:", responseText);

            return NextResponse.json(
                {
                    error: "AI returned an invalid response.",
                    rawResponse: responseText,
                },
                {
                    status: 500,
                }
            );
        }

        const modifiedFiles = findFiles(parsed);

        if (!modifiedFiles) {
            console.error("AI Response missing files:", parsed);
            return NextResponse.json(
                {
                    error: "AI did not return files.",
                    rawResponse: responseText,
                    parsedResponse: parsed,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            files: modifiedFiles,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to modify UI." },
            { status: 500 }
        );
    }
}