"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useAIStore } from "@/store/aiStore";
import { frontCraftRuntime } from "@/lib/runtime/runtime";
import { toast } from "sonner";
import EditorTabs from "./EditorTabs";

const isFileMap = (value: any): value is Record<string, string> => {
    return (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value).length > 0 &&
        Object.keys(value).every(
            (key) => typeof value[key] === "string" && key.includes(".")
        )
    );
};

export default function BottomPanel() {
    const {
        generatedCode,
        generatedFiles,
        activeFile,
        history,
        restoreHistory,
        isModified,
        loading,
        setGeneratedCode,
        setGeneratedFiles,
        setIsModified,
        setLoading,
        addHistory,
    } = useAIStore();

    const currentCode =
        generatedFiles[activeFile] ?? "";
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

            console.log("========== AI CHAT ==========");
            console.log("Active File:", activeFile);
            console.log("Generated Files:", generatedFiles);
            console.log("=============================");
            const filesToSend = {
                ...generatedFiles,
                "styles.css": generatedFiles["styles.css"] ?? frontCraftRuntime["/styles.css"],
            };

            const response = await fetch("/api/modify-ui", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    files: filesToSend,
                    activeFile,
                    instruction: chatMessage,
                }),
            });

            const contentType = response.headers.get("content-type") || "";
            const data = contentType.includes("application/json")
                ? await response.json()
                : { error: await response.text() };

            if (!response.ok) {
                console.error("modify-ui failed", response.status, data);
                throw new Error(
                    data.error ||
                    `Failed to modify UI${data.rawResponse ? ": " + data.rawResponse : ""}`
                );
            }

            const files = isFileMap(data.files)
                ? data.files
                : isFileMap(data)
                    ? data
                    : null;

            if (!files) {
                console.error("modify-ui response missing files", data);
                throw new Error(
                    data.error ||
                    `AI did not return files.${data.rawResponse ? " Raw: " + data.rawResponse : ""}`
                );
            }

            setGeneratedFiles(files);

            setGeneratedCode(files[activeFile] ?? "");

            setIsModified(true);

            toast.success("UI updated successfully!");
            addHistory(chatMessage, data.files);

            setChatMessage("");
        } catch (error) {
            console.error(error);

            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to update UI.";

            toast.error(message);
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
                    <div className="h-[500px] overflow-y-auto bg-[#0F172A] p-4">

                        {history.length === 0 ? (
                            <div className="flex h-full items-center justify-center text-gray-500">
                                No history available.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {history.map((item) => (
                                    <div
                                        key={item.id}
                                        className="cursor-pointer rounded-lg border border-gray-700 bg-[#111827] p-4 hover:border-purple-500"
                                    >
                                        <h3 className="font-medium text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-400">
                                            {item.timestamp}
                                        </p>
                                        <p className="mt-2 text-xs text-green-400">
                                            Files: {Object.keys(item.files).length}
                                        </p>

                                        <p className="text-xs text-blue-400">
                                            App.tsx Length: {item.files["App.tsx"]?.length}
                                        </p>
                                        <button
                                            onClick={() => {
                                                console.log("Button clicked:", item.id);
                                                restoreHistory(item.id);
                                            }}
                                            className="mt-3 rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700"
                                        >
                                            Restore Version
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );

}