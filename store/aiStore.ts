import { create } from "zustand";

interface AIStore {
    prompt: string;
    generatedCode: string;
    loading: boolean;
    error: string | null;

    setPrompt: (prompt: string) => void;
    setGeneratedCode: (code: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAIStore = create<AIStore>((set) => ({
    prompt: "",
    generatedCode: "",
    loading: false,
    error: null,

    setPrompt: (prompt) =>
        set({
            prompt,
        }),

    setGeneratedCode: (generatedCode) =>
        set({
            generatedCode,
        }),

    setLoading: (loading) =>
        set({
            loading,
        }),

    setError: (error) =>
        set({
            error,
        }),
}));