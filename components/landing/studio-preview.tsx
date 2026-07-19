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

                                <ul className="space-y-3 text-sm text-gray-300">
                                    <li>📁 app</li>
                                    <li>📁 components</li>
                                    <li>📁 assets</li>
                                    <li>📁 public</li>
                                    <li>📁 styles</li>
                                    <li>📄 page.tsx</li>
                                    <li>📄 layout.tsx</li>
                                </ul>
                            </>
                        </div>

                        {/* Editor */}
                        <div className="col-span-6 border-r border-white/10 bg-[#111827] p-4">
                            <h3 className="mb-4 text-sm font-semibold text-gray-400">
                                Hero.tsx
                            </h3>

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

                                <div className="mb-4 h-8 w-32 rounded bg-indigo-600"></div>

                                <div className="space-y-3">
                                    <div className="h-4 w-full rounded bg-gray-700"></div>
                                    <div className="h-4 w-4/5 rounded bg-gray-700"></div>
                                    <div className="h-4 w-2/3 rounded bg-gray-700"></div>
                                </div>

                                <button className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white">
                                    Get Started
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
}