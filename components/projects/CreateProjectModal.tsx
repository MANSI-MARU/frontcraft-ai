"use client";

import { useState } from "react";
import { createProject } from "@/services/project";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type CreateProjectModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CreateProjectModal({
    isOpen,
    onClose,
}: CreateProjectModalProps) {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleCreateProject = async () => {
        if (!user) return;

        if (!projectName.trim()) {
            toast.error("Please enter a project name.");
            return;
        }

        try {
            setLoading(true);

            await createProject(
                user.uid,
                projectName,
                description
            );

            setProjectName("");
            setDescription("");

            onClose();

            toast.success("Project created successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create project.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-lg rounded-xl bg-[#111827] p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-white">
                    Create New Project
                </h2>

                <p className="mt-2 text-gray-400">
                    Give your project a name to get started.
                </p>

                <div className="mt-6 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Project Name
                        </label>

                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="My Awesome Project"
                            className="w-full rounded-lg border border-gray-700 bg-[#1F2937] px-4 py-3 text-white outline-none focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optional"
                            className="w-full rounded-lg border border-gray-700 bg-[#1F2937] px-4 py-3 text-white outline-none focus:border-purple-500"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-600 px-5 py-2 text-white hover:bg-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreateProject}
                        disabled={loading}
                        className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Project"}
                    </button>
                </div>
            </div>
        </div>
    );
}