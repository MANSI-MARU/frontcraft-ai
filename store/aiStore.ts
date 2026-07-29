import { create } from "zustand";
export interface HistoryItem {
    id: string;
    title: string;
    timestamp: string;
    files: Record<string, string>;
}

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
    history: HistoryItem[];
    projectVersion: number;

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
    addHistory: (title: string, files: GeneratedFiles) => void;
    restoreHistory: (id: string) => void;
    incrementProjectVersion: () => void;

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

    history: [],
    projectVersion: 0,

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
    addHistory: (title, files) =>
        set((state) => ({
            history: [
                {
                    id: crypto.randomUUID(),
                    title,
                    timestamp: new Date().toLocaleTimeString(),
                    files: structuredClone(files),
                },
                ...state.history,
            ],
        })),
    restoreHistory: (id) =>
        set((state) => {
            console.log("========== RESTORE ==========");
            console.log("restoreHistory called");
            console.log("ID:", id);

            const version = state.history.find(
                (item) => item.id === id
            );

            console.log("Version:", version);
            console.log("Current Files:", state.generatedFiles);
            console.log("History Files:", version?.files);

            if (!version) {
                return state;
            }
            console.log(
                "Button.tsx:",
                version.files["components/Button.tsx"]
            );
            return {
                generatedFiles: structuredClone(version.files),
                activeFile: "App.tsx",
                openTabs: ["App.tsx"],
                generatedCode:
                    version.files["App.tsx"] ?? "",
                isModified: false,
                projectVersion: state.projectVersion + 1,
            };
        }),

    incrementProjectVersion: () =>
        set((state) => ({
            projectVersion: state.projectVersion + 1,
        })),


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

    createFolder: (path) =>
        set((state) => {
            // Always store folders with a trailing "/"
            const folderPath = path.endsWith("/")
                ? path
                : `${path}/`;

            // Don't create if it already exists
            if (state.generatedFiles[folderPath]) {
                return state;
            }

            return {
                generatedFiles: {
                    ...state.generatedFiles,
                    [folderPath]: "",
                },
            };
        }),

    renameFile: (oldPath, newPath) =>
        set((state) => {
            if (!state.generatedFiles[oldPath]) {
                return state;
            }

            const updatedFiles = {
                ...state.generatedFiles,
            };

            updatedFiles[newPath] =
                updatedFiles[oldPath];

            delete updatedFiles[oldPath];

            const updatedTabs =
                state.openTabs.map((tab) =>
                    tab === oldPath ? newPath : tab
                );

            return {
                generatedFiles: updatedFiles,
                activeFile:
                    state.activeFile === oldPath
                        ? newPath
                        : state.activeFile,
                openTabs: updatedTabs,
            };
        }),

    deleteFile: (path) =>
        set((state) => {
            const updatedFiles = {
                ...state.generatedFiles,
            };

            delete updatedFiles[path];

            const updatedTabs = state.openTabs.filter(
                (tab) => tab !== path
            );

            const newActiveFile =
                state.activeFile === path
                    ? updatedTabs.length > 0
                        ? updatedTabs[0]
                        : ""
                    : state.activeFile;

            return {
                generatedFiles: updatedFiles,
                openTabs: updatedTabs,
                activeFile: newActiveFile,
            };
        }),

    updateFileContent: () => { },
}));