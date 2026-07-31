import { saveProjectWorkspace } from "./project";
import { useAIStore } from "@/store/aiStore";

export async function autoSaveWorkspace() {
    const {
        projectId,
        generatedFiles,
        history,
        activeFile,
        openTabs,
        device,
    } = useAIStore.getState();

    if (!projectId) return;

    await saveProjectWorkspace(projectId, {
        generatedFiles,
        history,
        activeFile,
        openTabs,
        device,
    });
}