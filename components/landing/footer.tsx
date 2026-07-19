import Container from "@/components/common/container";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0B1220] py-16">
            <Container>

                <div className="grid gap-10 md:grid-cols-4">

                    {/* Brand */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 text-lg font-bold text-white">
                                F
                            </div>

                            <span className="text-xl font-bold text-white">
                                FrontCraft AI
                            </span>

                        </div>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            Build production-ready frontend applications using AI.
                            Generate, preview, customize and export modern React
                            interfaces in seconds.
                        </p>

                    </div>

                    {/* Product */}

                    <div>

                        <h3 className="text-lg font-semibold text-white">
                            Product
                        </h3>

                        <ul className="mt-5 space-y-3 text-gray-400">

                            <li className="cursor-pointer text-gray-400 transition-colors duration-300 hover:text-indigo-400">
                                Features
                            </li>

                            <li className="cursor-pointer text-gray-400 transition-colors duration-300 hover:text-indigo-400">
                                Templates
                            </li>

                            <li className="cursor-pointer text-gray-400 transition-colors duration-300 hover:text-indigo-400">
                                Pricing
                            </li>

                            <li className="cursor-pointer text-gray-400 transition-colors duration-300 hover:text-indigo-400">
                                Documentation
                            </li>

                        </ul>

                    </div>

                    {/* Resources */}

                    <div>

                        <h3 className="text-lg font-semibold text-white">
                            Resources
                        </h3>

                        <ul className="mt-5 space-y-3 text-gray-400">

                            <li className="hover:text-white cursor-pointer">
                                Blog
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Help Center
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Community
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Contact
                            </li>

                        </ul>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="text-lg font-semibold text-white">
                            Follow Us
                        </h3>

                        <ul className="mt-5 space-y-3 text-gray-400">

                            <li className="hover:text-white cursor-pointer">
                                GitHub
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                LinkedIn
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Twitter
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Discord
                            </li>

                        </ul>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-14 border-t border-white/10 pt-8">

                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                        <p className="text-sm text-gray-500">
                            © 2026 FrontCraft AI. All rights reserved.
                        </p>

                        <div className="flex gap-6 text-sm text-gray-500">

                            <span className="cursor-pointer hover:text-white">
                                Privacy
                            </span>

                            <span className="cursor-pointer hover:text-white">
                                Terms
                            </span>

                            <span className="cursor-pointer hover:text-white">
                                Cookies
                            </span>

                        </div>

                    </div>

                </div>

            </Container>
        </footer>
    );
}