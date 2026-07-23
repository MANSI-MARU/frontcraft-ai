"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectById } from "@/services/project";
import PromptPanel from "@/components/studio/PromptPanel";
import PreviewPanel from "@/components/studio/PreviewPanel";
import PropertiesPanel from "@/components/studio/PropertiesPanel";
import BottomPanel from "@/components/studio/BottomPanel";
import WorkspaceHeader from "@/components/studio/WorkspaceHeader";

export default function ProjectPage() {
    const params = useParams();

    const [project, setProject] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            console.log("Params:", params);
            console.log("Project ID:", params.projectId);
            try {
                const data = await getProjectById(
                    params.projectId as string
                );

                console.log(data);

                setProject(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (params.projectId) {
            fetchProject();
        }
    }, [params.projectId]);
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-white">
                Loading project...
            </div>
        );
    }
    return (
        <div className="flex h-[calc(100vh-64px)] flex-col gap-4 bg-[#0B1120] p-6">

            <WorkspaceHeader project={project} />

            <div className="grid flex-1 grid-cols-12 gap-4">

                <div className="col-span-3">
                    <PromptPanel />
                </div>

                <div className="col-span-6">
                    <PreviewPanel />
                </div>

                <div className="col-span-3">
                    <PropertiesPanel />
                </div>

            </div>

            <BottomPanel />

        </div>
    );
}