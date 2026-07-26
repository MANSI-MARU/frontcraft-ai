"use client";

import { X, FileText } from "lucide-react";
import { useAIStore } from "@/store/aiStore";

export default function EditorTabs() {
    const {
        openTabs,
        activeFile,
        setActiveFile,
        setOpenTabs,
    } = useAIStore();
    console.log(openTabs);

    const closeTab = (file: string) => {
        const updatedTabs = openTabs.filter(
            (tab) => tab !== file
        );

        setOpenTabs(updatedTabs);

        if (activeFile === file && updatedTabs.length > 0) {
            setActiveFile(updatedTabs[0]);
        }
    };

    return (
        <div className="flex items-center border-b border-gray-800 bg-[#111827]">
            {openTabs.map((file) => (
                <div
                    key={file}
                    onClick={() => setActiveFile(file)}
                    className={`flex cursor-pointer items-center gap-2 border-r border-gray-800 px-4 py-3 text-sm transition ${activeFile === file
                        ? "bg-[#1E293B] text-white"
                        : "text-gray-400 hover:bg-[#1E293B]"
                        }`}
                >
                    <FileText size={14} />

                    <span>
                        {file.split("/").pop()}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeTab(file);
                        }}
                        className="rounded p-1 hover:bg-gray-700"
                    >
                        <X size={12} />
                    </button>
                </div>
            ))}
        </div>
    );
}