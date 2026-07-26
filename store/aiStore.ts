import { create } from "zustand";

export interface GeneratedFiles {
    [filePath: string]: string;
}

interface AIStore {
    prompt: string;

    generatedCode: string;

    generatedFiles: GeneratedFiles;

    activeFile: string;
    openTabs: string[];
    isModified: boolean;

    loading: boolean;
    error: string | null;

    device: "desktop" | "tablet" | "mobile";

    setPrompt: (prompt: string) => void;
    setGeneratedCode: (code: string) => void;
    setGeneratedFiles: (files: GeneratedFiles) => void;
    setActiveFile: (file: string) => void;
    setOpenTabs: (tabs: string[]) => void;
    setIsModified: (modified: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setDevice: (
        device: "desktop" | "tablet" | "mobile"
    ) => void;

    createFile: (path: string) => void;
    createFolder: (path: string) => void;
    renameFile: (oldPath: string, newPath: string) => void;
    deleteFile: (path: string) => void;
    updateFileContent: (
        path: string,
        content: string
    ) => void;
}

export const useAIStore = create<AIStore>((set) => ({
    prompt: "",

    generatedCode: "",

    generatedFiles: {},

    activeFile: "App.tsx",
    openTabs: ["App.tsx"],
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

    setOpenTabs: (openTabs) =>
        set({
            openTabs,
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

    createFile: (path) =>
        set((state) => {
            if (state.generatedFiles[path]) {
                return state;
            }

            return {
                generatedFiles: {
                    ...state.generatedFiles,
                    [path]: "",
                },

                activeFile: path,

                openTabs: state.openTabs.includes(path)
                    ? state.openTabs
                    : [...state.openTabs, path],
            };
        }),

    createFolder: () => { },

    renameFile: () => { },

    deleteFile: () => { },

    updateFileContent: () => { },
}));