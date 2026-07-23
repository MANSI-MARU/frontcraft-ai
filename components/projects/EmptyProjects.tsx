import { FolderPlus } from "lucide-react";

export default function EmptyProjects() {
    return (
        <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 bg-[#111827] p-12 text-center">
            <div className="mb-4 rounded-full bg-blue-600/10 p-4">
                <FolderPlus className="h-10 w-10 text-blue-500" />
            </div>

            <h2 className="text-2xl font-semibold text-white">
                No Projects Yet
            </h2>

            <p className="mt-2 max-w-md text-gray-400">
                Create your first project to start building amazing frontend applications with FrontCraft AI.
            </p>
        </div>
    );
}