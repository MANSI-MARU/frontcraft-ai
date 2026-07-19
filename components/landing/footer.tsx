import Container from "@/components/common/container";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0B1220] py-16">
            <Container>

                <div className="grid gap-10 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-lg font-bold text-white">
                                F
                            </div>

                            <span className="text-xl font-bold text-white">
                                FrontCraft AI
                            </span>
                        </div>

                        <p className="mt-4 text-sm text-gray-400">
                            AI-powered frontend development studio for building modern web applications.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold text-white">Product</h3>

                        <ul className="mt-4 space-y-2 text-gray-400">
                            <li>Features</li>
                            <li>Templates</li>
                            <li>Pricing</li>
                            <li>Documentation</li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-white">Resources</h3>

                        <ul className="mt-4 space-y-2 text-gray-400">
                            <li>Blog</li>
                            <li>Help Center</li>
                            <li>Community</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold text-white">Follow Us</h3>

                        <ul className="mt-4 space-y-2 text-gray-400">
                            <li>GitHub</li>
                            <li>LinkedIn</li>
                            <li>Twitter</li>
                            <li>Discord</li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
                    © 2026 FrontCraft AI. All rights reserved.
                </div>

            </Container>
        </footer>
    );
}