"use client";

import {
    Plus,
    Sparkles,
    FileCode2,
    LayoutTemplate,
} from "lucide-react";


const actions = [
    {
        title: "New Project",
        description: "Start from scratch",
        icon: Plus,
    },
    {
        title: "AI Builder",
        description: "Generate UI with AI",
        icon: Sparkles,
    },
    {
        title: "Import Figma",
        description: "Convert design to code",
        icon: FileCode2,
    },
    {
        title: "Templates",
        description: "Browse templates",
        icon: LayoutTemplate,
    },
];

export default function QuickActions() {
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
                Quick Actions
            </h2>

            <p className="mt-2 text-gray-400">
                Start building your next frontend project.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={action.title}
                            className="rounded-xl border border-gray-800 bg-[#111827] p-6 text-left transition hover:border-purple-500 hover:-translate-y-1"
                        >
                            <div className="mb-4 inline-flex rounded-lg bg-purple-600 p-3">
                                <Icon size={24} />
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                {action.title}
                            </h3>

                            <p className="mt-2 text-sm text-gray-400">
                                {action.description}
                            </p>
                        </button>
                    );
                })}
            </div>
            
        </div>
    );
}