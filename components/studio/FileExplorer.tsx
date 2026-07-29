"use client";

import { FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { useAIStore } from "@/store/aiStore";
import FileTree from "./FileTree";
import { ExplorerNode } from "@/types/project";
function buildFileTree(files: string[]): ExplorerNode[] {
    const root: ExplorerNode[] = [];

    files.forEach((filePath) => {
        const parts = filePath
            .split("/")
            .filter(Boolean);

        let current = root;

        parts.forEach((part, index) => {
            const fullPath = parts
                .slice(0, index + 1)
                .join("/");

            let existing = current.find(
                (node) => node.name === part
            );

            if (!existing) {
                const isFolder =
                    filePath.endsWith("/") &&
                    index === parts.length - 1;

                existing = {
                    id: fullPath,
                    name: part,
                    path: fullPath,
                    type:
                        isFolder || index < parts.length - 1
                            ? "folder"
                            : "file",
                    children:
                        isFolder || index < parts.length - 1
                            ? []
                            : undefined,
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
        createFolder,
    } = useAIStore();
    const [showNewFile, setShowNewFile] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [showNewFolder, setShowNewFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const files = Object.keys(generatedFiles).sort();
    console.log("Generated Files:", generatedFiles);
    console.log("Files:", files);

    const tree = useMemo(() => {
        return buildFileTree(files);
    }, [files]);

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

                    <button
                        onClick={() => setShowNewFolder(true)}
                        className="rounded bg-gray-700 px-2 py-1 text-xs text-white transition hover:bg-gray-600"
                    >
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
                                console.log("Creating:", newFileName);

                                if (!newFileName.trim()) return;

                                console.log("Creating file:", newFileName);

                                createFile(newFileName.trim());

                                console.log("After create");

                                setNewFileName("");
                                setShowNewFile(false);
                            }
                        }
                        }
                        className="w-full rounded border border-gray-600 bg-[#1f2937] px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                    />
                </div>
            )}
            {showNewFolder && (
                <div className="border-b border-gray-700 p-3">
                    <input
                        autoFocus
                        type="text"
                        placeholder="components"
                        value={newFolderName}
                        onChange={(e) =>
                            setNewFolderName(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (!newFolderName.trim()) return;

                                createFolder(newFolderName.trim());

                                setNewFolderName("");
                                setShowNewFolder(false);
                            }

                            if (e.key === "Escape") {
                                setShowNewFolder(false);
                                setNewFolderName("");
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