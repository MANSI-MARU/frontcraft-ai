"use client";

import { useEffect, useState } from "react";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { FolderPlus } from "lucide-react";
import { getProjects } from "@/services/project";
import { useAuth } from "@/contexts/AuthContext";
import ProjectGrid from "@/components/projects/ProjectGrid";
import EmptyProjects from "@/components/projects/EmptyProjects";

export default function ProjectsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useAuth();

    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProjects = async () => {
            if (!user) return;

            try {
                const data = await getProjects(user.uid);
                console.log("Projects from Firestore:", data);
                console.log("Projects:", data);
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [user]);
    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Projects
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Create and manage your frontend projects.
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-medium text-white transition hover:bg-purple-700"
                >
                    <FolderPlus size={20} />
                    New Project
                </button>
            </div>
            {projects.length === 0 && <EmptyProjects />}

            {projects.length > 0 && (
                <ProjectGrid projects={projects} />
            )}

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>

    );
}