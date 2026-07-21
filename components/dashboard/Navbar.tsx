"use client";

import { Bell, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <header className="flex h-20 items-center justify-between border-b border-gray-800 bg-[#0F172A] px-8">
            {/* Left */}
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Dashboard
                </h1>

                <p className="text-sm text-gray-400">
                    Welcome back 👋
                </p>
            </div>

            {/* Center */}
            <div className="relative hidden w-96 md:block">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />

                <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full rounded-lg border border-gray-700 bg-[#1E293B] py-2 pl-10 pr-4 text-white outline-none focus:border-purple-500"
                />
            </div>

            {/* Right */}
            <div className="flex items-center gap-5">
                <button className="rounded-lg bg-[#1E293B] p-2 hover:bg-[#334155]">
                    <Bell size={20} />
                </button>

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-semibold">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>

                    <div className="hidden md:block">
                        <p className="text-sm font-semibold">
                            {user?.email}
                        </p>

                        <p className="text-xs text-gray-400">
                            FrontCraft User
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}