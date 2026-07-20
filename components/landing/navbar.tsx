import Link from "next/link";
import Image from "next/image";

import { navigation } from "@/constants/navigation";
import Container from "@/components/common/container";
import GradientButton from "@/components/common/gradient-button";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
            <Container>
                <nav className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">

                        <Image
                            src="/logo.png"
                            alt="FrontCraft AI"
                            width={42}
                            height={42}
                            priority
                            className="rounded-xl"
                        />

                        <span className="text-xl font-bold tracking-tight">
                            FrontCraft AI
                        </span>

                    </Link>

                    {/* Navigation */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navigation.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="text-sm text-muted-foreground transition hover:text-white"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="hidden items-center gap-4 md:flex">
                        <button className="text-sm text-muted-foreground hover:text-white transition">
                            Sign In
                        </button>

                        <GradientButton>
                            Get Started
                        </GradientButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white text-xl">
                        ☰
                    </button>
                </nav>
            </Container>
        </header>
    );
}