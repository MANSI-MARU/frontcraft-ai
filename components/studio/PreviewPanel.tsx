"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useAIStore } from "@/store/aiStore";
import { frontCraftRuntime } from "@/lib/runtime/runtime";

export default function PreviewPanel() {
    const {
        generatedCode,
        generatedFiles,
        device,
    } = useAIStore();

    const previewWidth = {
        desktop: "100%",
        tablet: "768px",
        mobile: "375px",
    }[device];

    // Prepare Sandpack files
    const sandpackFiles = {
        ...frontCraftRuntime,

        "/App.tsx":
            generatedFiles["App.tsx"] || generatedCode,
    };

    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-5">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                    Live Preview
                </h2>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    {device.charAt(0).toUpperCase() + device.slice(1)}
                </span>
            </div>

            <div className="mt-5 flex-1 overflow-auto rounded-xl border border-gray-700 bg-[#0F172A] p-6">
                <div
                    className="mx-auto h-full overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300"
                    style={{ width: previewWidth }}
                >
                    {(generatedCode ||
                        Object.keys(generatedFiles).length > 0) ? (
                        <Sandpack
                            template="react-ts"
                            files={sandpackFiles}
                            customSetup={{
                                dependencies: {
                                    react: "^19.0.0",
                                    "react-dom": "^19.0.0",
                                },
                            }}
                            options={{
                                showNavigator: false,
                                showTabs: false,
                                showLineNumbers: true,
                                showConsole: true,
                                editorHeight: 500,
                            }}
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-[#0F172A] text-gray-400">
                            Generate a UI to see the live preview.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}