"use client";

import { useAIStore } from "@/store/aiStore";
export default function BottomPanel() {
    const { generatedCode } = useAIStore();
    return (
        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-4">
            <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
                <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white">
                    Code
                </button>

                <button className="rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-gray-800">
                    AI Chat
                </button>

                <button className="rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-gray-800">
                    Console
                </button>

                <button className="rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-gray-800">
                    History
                </button>
            </div>

            <div className="h-64 overflow-auto rounded-lg bg-[#0F172A] p-4">
                {generatedCode ? (
                    <pre className="whitespace-pre-wrap text-sm text-green-400">
                        <code>{generatedCode}</code>
                    </pre>
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">
                        No code generated yet.
                    </div>
                )}
            </div>
        </div>
    );
}