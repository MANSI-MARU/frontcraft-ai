"use client";

import { FileText } from "lucide-react";
import { useAIStore } from "@/store/aiStore";

export default function FileExplorer() {
    const {
        generatedFiles,
        activeFile,
        setActiveFile,
    } = useAIStore();

    const files = Object.keys(generatedFiles);

    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-5">
            <h2 className="text-lg font-semibold text-white">
                Files
            </h2>

            <div className="mt-5 space-y-2">
                {files.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No files generated.
                    </p>
                ) : (
                    files.map((file) => (
                        <button
                            key={file}
                            onClick={() => setActiveFile(file)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${activeFile === file
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-300 hover:bg-[#1E293B]"
                                }`}
                        >
                            <FileText className="h-4 w-4" />
                            <span className="truncate">{file}</span>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}