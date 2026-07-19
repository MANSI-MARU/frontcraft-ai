import Container from "@/components/common/container";

export default function StudioPreview() {
    return (
        <section className="mt-20">
            <Container>
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-2xl">

                    {/* Window Header */}
                    <div className="flex items-center gap-2 border-b border-white/10 bg-[#0f172a] px-6 py-4">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />

                        <span className="ml-6 text-sm text-gray-400">
                            FrontCraft AI Studio
                        </span>
                    </div>

                    {/* Body */}
                    <div className="grid h-[500px] grid-cols-12">

                        {/* Explorer */}
                        <div className="col-span-2 border-r border-white/10 bg-[#0f172a] p-4">
                            <>
                                <h3 className="mb-4 text-sm font-semibold text-gray-400">
                                    Explorer
                                </h3>
                                <div className="space-y-1 text-sm">

                                    <div className="cursor-pointer rounded-md px-2 py-1 text-yellow-400 hover:bg-white/10">
                                        📂 src
                                    </div>

                                    <div className="ml-4 cursor-pointer rounded-md px-2 py-1 text-yellow-400 hover:bg-white/10">
                                        📂 app
                                    </div>

                                    <div className="ml-8 cursor-pointer rounded-md px-2 py-1 text-gray-300 hover:bg-white/10">
                                        📄 page.tsx
                                    </div>

                                    <div className="ml-8 cursor-pointer rounded-md px-2 py-1 text-gray-300 hover:bg-white/10">
                                        📄 layout.tsx
                                    </div>

                                    <div className="ml-4 cursor-pointer rounded-md px-2 py-1 text-yellow-400 hover:bg-white/10">
                                        📂 components
                                    </div>

                                    <div className="ml-8 cursor-pointer rounded-md px-2 py-1 text-gray-300 hover:bg-white/10">
                                        📄 hero.tsx
                                    </div>

                                    <div className="ml-8 cursor-pointer rounded-md px-2 py-1 text-gray-300 hover:bg-white/10">
                                        📄 navbar.tsx
                                    </div>

                                    <div className="ml-8 cursor-pointer rounded-md px-2 py-1 text-gray-300 hover:bg-white/10">
                                        📄 studio-preview.tsx
                                    </div>

                                </div>
                            </>
                        </div>

                        {/* Editor */}
                        <div className="col-span-6 border-r border-white/10 bg-[#111827] p-4">
                            <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-xs">

                                <div className="rounded-t-md bg-[#1f2937] px-3 py-2 text-gray-400">
                                    page.tsx
                                </div>

                                <div className="rounded-t-md bg-indigo-600 px-3 py-2 text-white">
                                    hero.tsx
                                </div>

                                <div className="rounded-t-md bg-[#1f2937] px-3 py-2 text-gray-400">
                                    navbar.tsx
                                </div>

                            </div>

                            <pre className="text-sm leading-7 text-green-400">
                                {`export default function Hero() {
return (
    <section>
      <h1>
        Build Frontends
      </h1>
    </section>
  );
}`}
                            </pre>
                        </div>

                        {/* Preview */}
                        <div className="col-span-4 bg-[#0f172a] p-4">
                            <h3 className="mb-4 text-sm font-semibold text-gray-400">
                                Live Preview
                            </h3>

                            <div className="rounded-xl bg-[#1f2937] p-5">

                                <div className="flex flex-col items-center text-center">

                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-lg font-bold text-white">
                                        F
                                    </div>

                                    <h4 className="text-lg font-bold text-white">
                                        FrontCraft AI
                                    </h4>

                                    <p className="mt-2 text-xs text-gray-400">
                                        Build Stunning Frontends with AI
                                    </p>

                                    <button className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-500">
                                        Get Started
                                    </button>

                                    <div className="mt-6 w-full rounded-lg bg-[#111827] p-3">

                                        <div className="mb-2 h-2 w-full rounded bg-gray-700"></div>

                                        <div className="mb-2 h-2 w-4/5 rounded bg-gray-700"></div>

                                        <div className="mb-2 h-2 w-2/3 rounded bg-gray-700"></div>

                                        <div className="mt-4 rounded-md border border-indigo-500/30 bg-indigo-500/10 p-2 text-center text-xs text-indigo-300">
                                            ✨ AI Generated
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-t border-white/10 bg-[#111827] px-6 py-4">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-semibold text-white">
                                ✨ AI Assistant
                            </p>

                            <p className="text-xs text-gray-400">
                                Generating Hero Component...
                            </p>

                        </div>

                        <span className="text-sm font-semibold text-indigo-400">
                            98%
                        </span>

                    </div>

                    <div className="mt-3 h-2 rounded-full bg-gray-700">

                        <div className="h-2 w-[98%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>

                    </div>

                </div>


            </Container>
        </section>
    );
}