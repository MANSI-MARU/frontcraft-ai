"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    FolderKanban,
    Sparkles,
    Settings,
    LogOut,
} from "lucide-react";
import { logout } from "@/services/auth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";


const menuItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Projects",
        href: "/dashboard/projects",
        icon: FolderKanban,
    },
    {
        name: "AI Builder",
        href: "/dashboard/builder",
        icon: Sparkles,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <aside className="flex h-screen w-64 flex-col border-r border-gray-800 bg-[#111827] p-6">
            <div className="flex items-center gap-3 mb-10">
                <Image
                    src="/logo.png"
                    alt="FrontCraft AI"
                    width={42}
                    height={42}
                />

                <div>
                    <h2 className="text-lg font-bold">
                        FrontCraft AI
                    </h2>

                    <p className="text-xs text-gray-400">
                        AI Frontend Studio
                    </p>
                </div>
            </div>

            <nav className="flex-1 space-y-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${pathname === item.href
                                ? "bg-purple-600 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <Icon size={20} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={handleLogout}
                className="mt-6 flex items-center gap-3 rounded-lg px-4 py-3 text-red-400 hover:bg-red-600 hover:text-white transition"
            >
                <LogOut size={20} />
                Logout
            </button>

        </aside>
    );
}