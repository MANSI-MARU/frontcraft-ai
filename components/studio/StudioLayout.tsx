"use client";

import { useEffect, useState } from "react";


import PromptPanel from "./PromptPanel";
import PreviewPanel from "./PreviewPanel";
import PropertiesPanel from "./PropertiesPanel";
import BottomPanel from "./BottomPanel";
import FileExplorer from "./FileExplorer";
import SandpackWorkspace from "./SandpackWorkspace";

export default function StudioLayout() {
    const [leftWidth, setLeftWidth] = useState(() => {
        if (typeof window === "undefined") return 300;

        return Number(
            localStorage.getItem("leftWidth")
        ) || 300;
    });
    const [rightWidth, setRightWidth] = useState(() => {
        if (typeof window === "undefined") return 320;

        return Number(
            localStorage.getItem("rightWidth")
        ) || 320;
    });
    useEffect(() => {
        localStorage.setItem(
            "rightWidth",
            rightWidth.toString()
        );
    }, [rightWidth]);
    useEffect(() => {
        localStorage.setItem(
            "leftWidth",
            leftWidth.toString()
        );
    }, [leftWidth]);

    return (
        <SandpackWorkspace>
            <div className="flex flex-1 flex-col gap-4">
                {/* Top Workspace */}
                <div
                    className="flex gap-4"
                    style={{ height: "700px" }}
                >
                    {/* Left Sidebar */}
                    <div
                        style={{ width: leftWidth }}
                        className="flex flex-col gap-4"
                    >
                        <div className="h-[420px]">
                            <PromptPanel />
                        </div>

                        <div className="flex-1">
                            <FileExplorer />
                        </div>
                    </div>
                    <div
                        className="group relative w-2 cursor-col-resize"
                        onMouseDown={(e) => {
                            const startX = e.clientX;
                            const startWidth = leftWidth;

                            const handleMouseMove = (event: MouseEvent) => {
                                setLeftWidth(
                                    Math.max(
                                        250,
                                        startWidth + (event.clientX - startX)
                                    )
                                );
                            };

                            const handleMouseUp = () => {
                                window.removeEventListener("mousemove", handleMouseMove);
                                window.removeEventListener("mouseup", handleMouseUp);
                            };

                            window.addEventListener("mousemove", handleMouseMove);
                            window.addEventListener("mouseup", handleMouseUp);
                        }}
                    >
                        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded bg-gray-600 transition-all duration-200 group-hover:bg-purple-500 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
                    </div>
                    {/* Preview */}
                    <div className="flex-1">
                        <PreviewPanel />
                    </div>
                    <div
                        className="group relative w-2 cursor-col-resize"
                        onMouseDown={(e) => {
                            const startX = e.clientX;
                            const startWidth = rightWidth;

                            const handleMouseMove = (event: MouseEvent) => {
                                setRightWidth(
                                    Math.max(
                                        280,
                                        startWidth - (event.clientX - startX)
                                    )
                                );
                            };

                            const handleMouseUp = () => {
                                window.removeEventListener("mousemove", handleMouseMove);
                                window.removeEventListener("mouseup", handleMouseUp);
                            };

                            window.addEventListener("mousemove", handleMouseMove);
                            window.addEventListener("mouseup", handleMouseUp);
                        }}
                    >
                        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded bg-gray-600 transition-all duration-200 group-hover:bg-purple-500 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
                    </div>
                    {/* Properties */}
                    <div
                        style={{ width: rightWidth }}
                    >
                        <PropertiesPanel />
                    </div>
                </div>

                <BottomPanel />
            </div>
        </SandpackWorkspace>
    );
}