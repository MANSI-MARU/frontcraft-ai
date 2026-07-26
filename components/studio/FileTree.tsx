"use client";

import { useState } from "react";
import { useAIStore } from "@/store/aiStore";
import {
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
    FileText,
} from "lucide-react";

interface FileNode {
    name: string;
    path: string;
    children?: FileNode[];
}

interface FileTreeProps {
    nodes: FileNode[];
    level?: number;
}

export default function FileTree({
    nodes,
    level = 0,
}: FileTreeProps) {
    return (
        <div>
            {nodes.map((node) => (
                <TreeNode
                    key={node.path}
                    node={node}
                    level={level}
                />
            ))}
        </div>
    );
}

function TreeNode({
    node,
    level,
}: {
    node: FileNode;
    level: number;
}) {
    const [open, setOpen] = useState(true);
    const {
        activeFile,
        openTabs,
        setActiveFile,
        setOpenTabs,
    } = useAIStore();

    const isFolder = !!node.children;

    return (
        <div>
            <div
                className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition

${activeFile === node.path
                        ? "bg-purple-600 text-white"
                        : "hover:bg-[#1E293B]"
                    }
`}
                style={{
                    paddingLeft: `${level * 16}px`,
                }}
                onClick={() => {
                    if (isFolder) {
                        setOpen(!open);
                        return;
                    }

                    setActiveFile(node.path);

                    if (!openTabs.includes(node.path)) {
                        setOpenTabs([
                            ...openTabs,
                            node.path,
                        ]);
                    }
                }}
            >
                {isFolder ? (
                    open ? (
                        <ChevronDown
                            size={16}
                            className="text-white"
                        />
                    ) : (
                        <ChevronRight
                            size={16}
                            className="text-white"
                        />
                    )
                ) : (
                    <span className="w-4" />
                )}

                {isFolder ? (
                    open ? (
                        <FolderOpen
                            size={16}
                            className="text-yellow-400"
                        />
                    ) : (
                        <Folder
                            size={16}
                            className="text-yellow-400"
                        />
                    )
                ) : (
                    <FileText
                        size={16}
                        className={
                            activeFile === node.path
                                ? "text-white"
                                : "text-gray-400"
                        }
                    />
                )}

                <span
                    className={
                        activeFile === node.path
                            ? "text-white font-medium"
                            : "text-gray-300"
                    }
                >
                    {node.name}
                </span>
            </div>

            {open &&
                node.children && (
                    <FileTree
                        nodes={node.children}
                        level={level + 1}
                    />
                )}
        </div>
    );
}