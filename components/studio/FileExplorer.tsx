"use client";

import { FileText } from "lucide-react";
import { useState } from "react";
import { useAIStore } from "@/store/aiStore";
import FileTree from "./FileTree";

interface FileNode {
    name: string;
    path: string;
    children?: FileNode[];
}
function buildFileTree(files: string[]): FileNode[] {
    const root: FileNode[] = [];

    files.forEach((filePath) => {
        const parts = filePath.split("/");

        let current = root;

        parts.forEach((part, index) => {
            const fullPath = parts
                .slice(0, index + 1)
                .join("/");

            let existing = current.find(
                (node) => node.name === part
            );

            if (!existing) {
                existing = {
                    name: part,
                    path: fullPath,
                    children:
                        index === parts.length - 1
                            ? undefined
                            : [],
                };

                current.push(existing);
            }

            if (existing.children) {
                current = existing.children;
            }
        });
    });

    return root;
}
export default function FileExplorer() {
    const {
        generatedFiles,
        createFile,
    } = useAIStore();
    const [showNewFile, setShowNewFile] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const files = Object.keys(generatedFiles).sort();

    const tree = buildFileTree(files);

    console.log(tree);


    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-300">
                    Explorer
                </h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => setShowNewFile(true)}
                        className="rounded bg-purple-600 px-2 py-1 text-xs text-white transition hover:bg-purple-700"
                    >
                        + File
                    </button>

                    <button className="rounded bg-gray-700 px-2 py-1 text-xs text-white transition hover:bg-gray-600">
                        + Folder
                    </button>
                </div>
            </div>
            {showNewFile && (
                <div className="border-b border-gray-700 p-3">
                    <input
                        autoFocus
                        type="text"
                        placeholder="components/Navbar.tsx"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (!newFileName.trim()) return;

                                createFile(newFileName.trim());

                                setNewFileName("");
                                setShowNewFile(false);
                            }

                            if (e.key === "Escape") {
                                setShowNewFile(false);
                                setNewFileName("");
                            }
                        }}
                        className="w-full rounded border border-gray-600 bg-[#1f2937] px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                    />
                </div>
            )}
            {/* Tree */}
            <div className="flex-1 overflow-auto p-4">
                <FileTree nodes={tree} />
            </div>
        </div>
    );
}