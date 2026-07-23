interface ProjectCardProps {
    project: {
        id: string;
        name: string;
        description?: string;
        createdAt?: any;
    };
}
import Link from "next/link";
import { Folder } from "lucide-react";

export default function ProjectCard({
    project,
}: ProjectCardProps) {
    return (
        <div className="rounded-xl border border-gray-700 bg-[#111827] p-6">
            <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-600/10 p-2">
                    <Folder className="h-5 w-5 text-purple-500" />
                </div>

                <h2 className="text-xl font-semibold text-white">
                    {project.name}
                </h2>
            </div>

            <p className="mt-2 text-gray-400">
                {project.description || "No description"}
            </p>
            <p className="mt-4 text-xs text-gray-500">
                Created:{" "}
                {project.createdAt?.seconds
                    ? new Date(project.createdAt.seconds * 1000).toLocaleDateString()
                    : "Just now"}
            </p>
            <div className="mt-6 border-t border-gray-700 pt-4">
                <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="text-sm font-medium text-purple-400 hover:text-purple-300"
                >
                    Open Project →
                </Link>
            </div>
        </div>

    );

}