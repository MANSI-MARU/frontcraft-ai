"use client";

import { SandpackProvider } from "@codesandbox/sandpack-react";
import { ReactNode } from "react";
import { useAIStore } from "@/store/aiStore";

interface SandpackWorkspaceProps {
    children: ReactNode;
}

export default function SandpackWorkspace({
    children,
}: SandpackWorkspaceProps) {
    const { generatedCode, generatedFiles } = useAIStore();

    const files = {
        "/App.tsx":
            generatedFiles["App.tsx"] || generatedCode,

        "/index.tsx": `
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
`,
    };

    return (
        <SandpackProvider
            template="react-ts"
            files={files}
            customSetup={{
                dependencies: {
                    react: "^19.0.0",
                    "react-dom": "^19.0.0",
                },
            }}
        >
            {children}
        </SandpackProvider>
    );
}