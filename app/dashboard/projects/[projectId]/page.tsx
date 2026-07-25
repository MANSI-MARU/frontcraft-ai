"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectById } from "@/services/project";
import WorkspaceHeader from "@/components/studio/WorkspaceHeader";
import StudioLayout from "@/components/studio/StudioLayout";

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


            <StudioLayout />
        </div>
    );
}