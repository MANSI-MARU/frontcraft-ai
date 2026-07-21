import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#0B1220] text-white">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1">
                <Navbar />
                {children}
            </main>
        </div>
    );
}