"use client";

import { useAIStore } from "@/store/aiStore";

export default function PromptPanel() {
    const {
        prompt,
        setPrompt,
        setGeneratedCode,
        setGeneratedFiles,
        loading,
        setLoading,
        error,
        setError,
    } = useAIStore();

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/generate-ui", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to generate UI");
            }

            const cleanedCode = data.result
                .replace(/```json/g, "")
                .replace(/```tsx/g, "")
                .replace(/```ts/g, "")
                .replace(/```jsx/g, "")
                .replace(/```js/g, "")
                .replace(/```/g, "")
                .trim();

            // Current single-file flow
            setGeneratedCode(cleanedCode);

            // Prepare for future multi-file support
            setGeneratedFiles({
                "App.tsx": cleanedCode,
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-5">
            <h2 className="text-lg font-semibold text-white">
                AI Prompt
            </h2>

            <p className="mt-1 text-sm text-gray-400">
                Describe the UI you want to generate.
            </p>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create a responsive pricing page with dark theme..."
                className="mt-5 h-64 resize-none rounded-xl border border-gray-700 bg-[#0F172A] p-4 text-white outline-none transition focus:border-purple-500"
            />

            {error && (
                <p className="mt-3 text-sm text-red-400">
                    {error}
                </p>
            )}

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-5 rounded-xl bg-purple-600 py-3 font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Generating..." : "Generate UI"}
            </button>
        </div>
    );
}