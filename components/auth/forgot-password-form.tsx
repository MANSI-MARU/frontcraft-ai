"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/services/auth";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await forgotPassword(email);

            setSuccess(
                "Password reset email sent successfully. Please check your inbox."
            );
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                />
            </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-sm text-green-500">
                    {success}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-gray-400">
                Remember your password?{" "}
                <Link
                    href="/login"
                    className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                    Back to Login
                </Link>
            </p>

        </form>
    );
}