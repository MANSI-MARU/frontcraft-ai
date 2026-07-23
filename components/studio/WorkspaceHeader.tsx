import {
    Monitor,
    Tablet,
    Smartphone,
    Download,
    Rocket,
    CheckCircle,
    Folder,
} from "lucide-react";

interface WorkspaceHeaderProps {
    project: {
        id: string;
        name: string;
        description?: string;
    };
}

export default function WorkspaceHeader({
    project,
}: WorkspaceHeaderProps) {
    return (
        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
            {/* Top Row */}
            <div className="flex items-center justify-between">

                {/* Project Info */}
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-600/10 p-2">
                        <Folder className="h-6 w-6 text-purple-500" />
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold text-white">
                            {project.name}
                        </h1>

                        <p className="text-sm text-gray-400">
                            {project.description || "FrontCraft AI Workspace"}
                        </p>
                    </div>
                </div>

                {/* Save Status */}
                <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />

                    <span className="text-sm font-medium text-green-400">
                        Auto Saved
                    </span>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-5">

                {/* Device Switcher */}
                <div className="flex items-center gap-2">

                    <button className="rounded-lg bg-purple-600 px-4 py-2 text-white">
                        <Monitor className="h-5 w-5" />
                    </button>

                    <button className="rounded-lg bg-[#1E293B] p-2 text-gray-400 hover:bg-gray-700">
                        <Tablet className="h-5 w-5" />
                    </button>

                    <button className="rounded-lg bg-[#1E293B] p-2 text-gray-400 hover:bg-gray-700">
                        <Smartphone className="h-5 w-5" />
                    </button>

                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">

                    <button className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-gray-300 hover:bg-gray-800">
                        <Download className="h-4 w-4" />
                        Export
                    </button>

                    <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2 font-medium text-white hover:bg-purple-700">
                        <Rocket className="h-4 w-4" />
                        Deploy
                    </button>

                </div>

            </div>
        </div>
    );
}