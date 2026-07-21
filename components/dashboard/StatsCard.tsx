import { ReactNode } from "react";

type StatsCardProps = {
    title: string;
    value: string;
    icon: ReactNode;
};

export default function StatsCard({
    title,
    value,
    icon,
}: StatsCardProps) {
    return (
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-6 shadow-lg transition hover:border-purple-500">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">
                        {value}
                    </h2>
                </div>

                <div className="rounded-lg bg-purple-600 p-3">
                    {icon}
                </div>
            </div>
        </div>
    );
}