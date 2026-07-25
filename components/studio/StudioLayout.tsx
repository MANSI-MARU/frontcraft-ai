"use client";

import PromptPanel from "./PromptPanel";
import PreviewPanel from "./PreviewPanel";
import PropertiesPanel from "./PropertiesPanel";
import BottomPanel from "./BottomPanel";
import FileExplorer from "./FileExplorer";
import SandpackWorkspace from "./SandpackWorkspace";

export default function StudioLayout() {
    return (
        <SandpackWorkspace>
            <div className="flex flex-1 flex-col gap-4">

                {/* Top Workspace */}
                <div className="grid grid-cols-12 gap-4">

                    {/* Left Sidebar */}
                    <div className="col-span-3 flex flex-col gap-4">
                        <div className="h-[420px]">
                            <PromptPanel />
                        </div>

                        <div className="flex-1">
                            <FileExplorer />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="col-span-6">
                        <PreviewPanel />
                    </div>

                    {/* Properties */}
                    <div className="col-span-3">
                        <PropertiesPanel />
                    </div>

                </div>

                <BottomPanel />

            </div>
        </SandpackWorkspace>
    );
}