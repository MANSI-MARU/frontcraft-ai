"use client";

import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
export default function LoginForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await login(email, password);

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-5">

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Password
                </label>

                <div className="relative">

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 pr-12 text-white outline-none transition focus:border-indigo-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>

                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                    Forgot Password?
                </button>
            </div>
            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold text-white transition hover:opacity-90"
            >
                {loading ? "Signing In..." : "Sign In"}

            </button>
            <div className="pt-4 text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <a
                    href="/signup"
                    className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                    Sign Up
                </a>
            </div>
        </form>
    );
}