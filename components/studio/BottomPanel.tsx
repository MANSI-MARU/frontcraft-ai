"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useAIStore } from "@/store/aiStore";
import { toast } from "sonner";
import EditorTabs from "./EditorTabs";

export default function BottomPanel() {
    const {
        generatedCode,
        generatedFiles,
        activeFile,
        isModified,
        loading,
        setGeneratedCode,
        setGeneratedFiles,
        setIsModified,
        setLoading,
    } = useAIStore();

    const currentCode =
        generatedFiles[activeFile] || generatedCode;
    const [activeTab, setActiveTab] = useState<
        "code" | "chat" | "console" | "history"
    >("code");
    const [chatMessage, setChatMessage] = useState("");
    const handleEditorChange = (value: string | undefined) => {
        if (!value) return;

        // Update single-file code (current compatibility)
        setGeneratedCode(value);

        // Update selected file
        setGeneratedFiles({
            ...generatedFiles,
            [activeFile]: value,
        });
        setIsModified(true);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentCode);

            toast.success("Code copied successfully!");

        } catch (error) {
            console.error(error);

            toast.error("Failed to copy code.");
        }
    };
    const handleDownload = () => {
        const blob = new Blob([currentCode], {
            type: "text/plain;charset=utf-8",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = activeFile;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        toast.success(`${activeFile} downloaded successfully!`);
    };

    const handleSendMessage = async () => {
        if (!chatMessage.trim()) return;

        try {
            setLoading(true);

            const response = await fetch("/api/modify-ui", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentCode,
                    instruction: chatMessage,
                }),
            });

            const data = await response.json();

            console.log("===== AI RESPONSE =====");
            console.log(data);
            console.log("======================");

            if (!response.ok) {
                throw new Error(data.error || "Failed to modify UI");
            }

            // Update the editor
            setGeneratedCode(data.code);

            setGeneratedFiles({
                ...generatedFiles,
                [activeFile]: data.code,
            });

            setIsModified(true);

            toast.success("UI updated successfully!");

            setChatMessage("");
        } catch (error) {
            console.error(error);

            toast.error("Failed to update UI.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">

                {/* Left Side */}
                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setActiveTab("code")}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === "code"
                            ? "bg-purple-600 text-white"
                            : "text-gray-400 hover:bg-gray-800"
                            }`}
                    >
                        Code
                    </button>

                    <button
                        onClick={() => setActiveTab("chat")}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === "chat"
                            ? "bg-purple-600 text-white"
                            : "text-gray-400 hover:bg-gray-800"
                            }`}
                    >
                        AI Chat
                    </button>

                    <button
                        onClick={() => setActiveTab("console")}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === "console"
                            ? "bg-purple-600 text-white"
                            : "text-gray-400 hover:bg-gray-800"
                            }`}
                    >
                        Console
                    </button>

                    <button
                        onClick={() => setActiveTab("history")}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === "history"
                            ? "bg-purple-600 text-white"
                            : "text-gray-400 hover:bg-gray-800"
                            }`}
                    >
                        History
                    </button>

                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">

                    <span className="rounded-md bg-gray-800 px-3 py-1 text-xs text-gray-300">
                        📄 {activeFile}
                    </span>

                    {isModified && (
                        <span className="text-xs font-medium text-yellow-400">
                            ● Modified
                        </span>
                    )}

                    <button
                        onClick={handleCopy}
                        className="rounded-md border border-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-800"
                    >
                        📋 Copy
                    </button>

                    <button
                        onClick={handleDownload}
                        className="rounded-md border border-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-800"
                    >
                        ⬇ Download
                    </button>

                    <button className="rounded-md border border-purple-500 bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700">
                        🔄 Refresh Preview
                    </button>

                </div>

            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-gray-800">

                {activeTab === "code" && (
                    <>
                        <EditorTabs />

                        {currentCode ? (
                            <Editor
                                height="500px"
                                defaultLanguage="typescript"
                                theme="vs-dark"
                                value={currentCode}
                                onChange={handleEditorChange}
                                beforeMount={(monaco) => {
                                    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                                        noSemanticValidation: true,
                                        noSyntaxValidation: false,
                                    });
                                }}
                                options={{
                                    minimap: {
                                        enabled: false,
                                    },
                                    fontSize: 14,
                                    automaticLayout: true,
                                    wordWrap: "on",
                                    scrollBeyondLastLine: false,
                                    formatOnPaste: true,
                                    formatOnType: true,
                                    tabSize: 2,
                                    renderValidationDecorations: "off",
                                    glyphMargin: false,
                                    folding: true,
                                }}
                            />
                        ) : (
                            <div className="flex h-[500px] items-center justify-center bg-[#0F172A] text-gray-500">
                                No code generated yet.
                            </div>
                        )}
                    </>
                )}
                : (
                <div className="flex h-[500px] items-center justify-center bg-[#0F172A] text-gray-500">
                    No code generated yet.
                </div>
                )


                {activeTab === "chat" && (
                    <div className="flex h-[500px] flex-col bg-[#0F172A]">

                        <div className="flex-1 overflow-auto p-6 text-gray-400">
                            <p className="text-sm">
                                👋 Welcome to FrontCraft AI Chat.
                            </p>

                            <p className="mt-2 text-sm">
                                Ask the AI to modify your generated UI.
                            </p>
                        </div>

                        <div className="border-t border-gray-800 p-4">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    placeholder="Example: Make the button blue..."
                                    className="flex-1 rounded-lg border border-gray-700 bg-[#111827] px-4 py-3 text-white outline-none focus:border-purple-500"
                                />

                                <button
                                    onClick={handleSendMessage}
                                    disabled={loading}
                                    className="rounded-lg bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {loading ? "Thinking..." : "Send"}
                                </button>
                            </div>
                        </div>

                    </div>
                )}

                {activeTab === "console" && (
                    <div className="flex h-[500px] items-center justify-center bg-[#0F172A] text-gray-500">
                        Console coming soon...
                    </div>
                )}

                {activeTab === "history" && (
                    <div className="flex h-[500px] items-center justify-center bg-[#0F172A] text-gray-500">
                        Version history coming soon...
                    </div>
                )}

            </div>
        </div>
    );

}