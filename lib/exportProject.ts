import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useAIStore } from "@/store/aiStore";
import { packageJson } from "./templates/packageJson";
import { viteConfig } from "./templates/viteConfig";
import { tsConfig } from "./templates/tsConfig";
import { indexHtml } from "./templates/indexHtml";
import { mainTsx } from "./templates/mainTsx";

export async function exportProject() {
    const zip = new JSZip();

    // Get all generated files from Zustand
    const { generatedFiles } = useAIStore.getState();

    console.log("Generated Files:", generatedFiles);

    // Add every generated file into src/
    Object.entries(generatedFiles).forEach(([path, content]) => {
        zip.file(`src/${path}`, content as string);
    });
    zip.file(
        "package.json",
        JSON.stringify(packageJson, null, 2)
    );
    zip.file("vite.config.ts", viteConfig);
    zip.file("tsconfig.json", tsConfig);
    zip.file("index.html", indexHtml);
    zip.file("src/main.tsx", mainTsx);

    const blob = await zip.generateAsync({
        type: "blob",
    });

    saveAs(blob, "FrontCraftAI.zip");
}