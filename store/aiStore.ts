import { create } from "zustand";

export interface GeneratedFiles {
    [filePath: string]: string;
}

interface AIStore {
    prompt: string;

    // Current single-file support
    generatedCode: string;

    // New multi-file support
    generatedFiles: GeneratedFiles;

    // Currently selected file
    activeFile: string;
    isModified: boolean;

    loading: boolean;
    error: string | null;

    device: "desktop" | "tablet" | "mobile";

    setPrompt: (prompt: string) => void;
    setGeneratedCode: (code: string) => void;
    setGeneratedFiles: (files: GeneratedFiles) => void;
    setActiveFile: (file: string) => void;
    setIsModified: (modified: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setDevice: (
        device: "desktop" | "tablet" | "mobile"
    ) => void;
}

export const useAIStore = create<AIStore>((set) => ({
    prompt: "",

    generatedCode: "",

    generatedFiles: {},

    // Default selected file
    activeFile: "App.tsx",
    isModified: false,

    loading: false,
    error: null,

    device: "desktop",

    setPrompt: (prompt) =>
        set({
            prompt,
        }),

    setGeneratedCode: (generatedCode) =>
        set({
            generatedCode,
        }),

    setGeneratedFiles: (generatedFiles) =>
        set({
            generatedFiles,
        }),

    setActiveFile: (activeFile) =>
        set({
            activeFile,
        }),
    setIsModified: (isModified) =>
        set({
            isModified,
        }),

    setLoading: (loading) =>
        set({
            loading,
        }),

    setError: (error) =>
        set({
            error,
        }),

    setDevice: (device) =>
        set({
            device,
        }),
}));