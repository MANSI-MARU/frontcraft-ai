"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import StatsCard from "@/components/dashboard/StatsCard";

import {
    FolderKanban,
    LayoutGrid,
    Boxes,
    Sparkles,
} from "lucide-react";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white">
                Welcome Back 👋
            </h1>

            <p className="mt-2 text-gray-400">
                Build beautiful frontend applications with AI.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    title="Projects"
                    value="0"
                    icon={<FolderKanban size={26} />}
                />

                <StatsCard
                    title="Templates"
                    value="0"
                    icon={<LayoutGrid size={26} />}
                />

                <StatsCard
                    title="Components"
                    value="0"
                    icon={<Boxes size={26} />}
                />

                <StatsCard
                    title="AI Generations"
                    value="0"
                    icon={<Sparkles size={26} />}
                />
                
            </div>
            
        </div>
    );
}