"use client";

import { useEffect, useRef, useState } from "react";
import { useAIStore } from "@/store/aiStore";
import {
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
    FileText,
} from "lucide-react";
import { ExplorerNode } from "@/types/project";

interface FileTreeProps {
    nodes: ExplorerNode[];
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
    node: ExplorerNode;
    level: number;
}) {
    const [open, setOpen] = useState(true);

    const {
        activeFile,
        openTabs,
        setActiveFile,
        setOpenTabs,
        renameFile,
        deleteFile
    } = useAIStore();
    const [isEditing, setIsEditing] = useState(false);
    const [fileName, setFileName] = useState(node.name);
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({
        x: 0,
        y: 0,
    });
    const menuRef = useRef<HTMLDivElement>(null);

    const isFolder = node.type === "folder";
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener(
                "click",
                handleClickOutside
            );
        };
    }, []);
    console.log(node.name, isEditing);

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
                onDoubleClick={() => {
                    console.log("Double Click");
                    setIsEditing(true);
                }}
                onContextMenu={(e) => {
                    e.preventDefault();

                    setMenuPosition({
                        x: e.clientX,
                        y: e.clientY,
                    });

                    setShowMenu(true);
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

                {isEditing ? (
                    <input
                        autoFocus
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const parts = node.path.split("/");
                                parts[parts.length - 1] = fileName;

                                const newPath = parts.join("/");

                                renameFile(node.path, newPath);
                                setIsEditing(false);
                            }

                            if (e.key === "Escape") {
                                setFileName(node.name);
                                setIsEditing(false);
                            }
                        }}

                        className="w-full rounded border border-gray-500 bg-transparent px-1 text-sm text-white outline-none"
                    />
                ) : (
                    <span
                        className={
                            activeFile === node.path
                                ? "text-white font-medium"
                                : "text-gray-300"
                        }
                    >
                        {node.name}
                    </span>
                )}


            </div>

            {open &&
                node.children && (
                    <FileTree
                        nodes={node.children}
                        level={level + 1}
                    />
                )}
            {showMenu && (
                <div
                    ref={menuRef}
                    className="fixed z-50 w-40 rounded-md border border-gray-700 bg-[#1E293B] py-1 shadow-xl"
                    style={{
                        left: menuPosition.x,
                        top: menuPosition.y,
                    }}
                >
                    <button
                        onClick={() => {
                            setShowMenu(false);
                            setIsEditing(true);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700"
                    >
                        ✏️ Rename
                    </button>

                    <button
                        className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700"
                    >
                        📄 Duplicate
                    </button>

                    <button
                        onClick={() => {
                            deleteFile(node.path);
                            setShowMenu(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
                    >
                        🗑️ Delete
                    </button>
                </div>
            )}
        </div>
    );
}