import Link from "next/link";

import { navigation } from "@/constants/navigation";
import Container from "@/components/common/container";
import GradientButton from "@/components/common/gradient-button";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
            <Container>
                <nav className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white">
                            F
                        </div>

                        <span className="text-xl font-bold">
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