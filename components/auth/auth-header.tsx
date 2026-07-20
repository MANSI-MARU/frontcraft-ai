import Link from "next/link";
import Image from "next/image";

type AuthHeaderProps = {
    title?: string;
    subtitle?: string;
};

export default function AuthHeader({
    title = "Welcome Back",
    subtitle = "Sign in to continue building with AI.",
}: AuthHeaderProps) {
    return (
        <div className="mb-8 text-center">

            <Link
                href="/"
                className="mx-auto mb-4 block w-fit"
            >
                <Image
                    src="/logo.png"
                    alt="FrontCraft AI Logo"
                    width={72}
                    height={72}
                    priority
                    className="drop-shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-transform duration-300 hover:scale-105"
                />
            </Link>

            <div className="mb-5">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    FrontCraft{" "}
                    <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
                        AI
                    </span>
                </h2>

                <p className="mt-1 text-xs uppercase tracking-[0.35em] text-gray-400">
                    AI Powered Frontend Studio
                </p>
            </div>

            <h1 className="text-3xl font-bold text-white">
                {title}
            </h1>

            <p className="mt-2 text-gray-400">
                {subtitle}
            </p>

        </div>
    );
}