"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <form className="space-y-5">

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
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
                        className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 pr-12 text-white outline-none transition focus:border-indigo-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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

            <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold text-white transition hover:opacity-90"
            >
                Sign In
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