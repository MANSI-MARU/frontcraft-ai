"use client";
import { useState } from "react";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { FolderPlus } from "lucide-react";

export default function ProjectsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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

            <div className="mt-10 rounded-xl border border-dashed border-gray-700 bg-[#111827] p-16 text-center">
                <FolderPlus
                    size={60}
                    className="mx-auto text-purple-500"
                />

                <h2 className="mt-5 text-2xl font-semibold text-white">
                    No Projects Yet
                </h2>

                <p className="mt-3 text-gray-400">
                    Create your first project to start building with
                    FrontCraft AI.
                </p>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-8 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
                >
                    Create Project
                </button>
                <CreateProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
}