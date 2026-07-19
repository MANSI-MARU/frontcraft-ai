import Container from "@/components/common/container";

export default function Showcase() {
    return (
        <section className="py-24">
            <Container>

                <div className="text-center">

                    <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
                        AI Showcase
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-white">
                        Watch FrontCraft AI Build Your UI
                    </h2>

                    <p className="mx-auto mt-4 max-w-3xl text-gray-400">
                        Turn a simple prompt into production-ready React components,
                        live previews and reusable frontend code.
                    </p>

                </div>
                <div className="mt-20 rounded-3xl border border-white/10 bg-[#0B1220] p-8">
                    <div className="mt-20 grid gap-6 lg:grid-cols-2">

                        <div className="min-h-[260px] rounded-2xl border border-white/10 bg-[#111827] p-6">

                            <p className="text-sm font-semibold text-indigo-400">
                                📝 Prompt
                            </p>

                            <div className="mt-4 rounded-xl bg-[#0B1220] p-4">

                                <p className="text-gray-300">
                                    Create a modern SaaS dashboard with authentication,
                                    analytics cards and dark mode.
                                </p>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

                            <p className="text-sm font-semibold text-indigo-400">
                                🤖 AI Processing
                            </p>

                            <div className="mt-4 rounded-xl bg-[#0B1220] p-4 space-y-4">

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Analyzing Prompt</span>
                                    <span className="text-green-400">✓</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Generating Components</span>
                                    <span className="text-yellow-400">●</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Optimizing Layout</span>
                                    <span className="text-gray-500">Waiting</span>
                                </div>

                            </div>

                        </div>

                        <div className="min-h-[260px] rounded-2xl border border-white/10 bg-[#111827] p-6">

                            <p className="text-sm font-semibold text-indigo-400">
                                💻 Generated Code
                            </p>

                            <div className="mt-4 rounded-xl bg-[#0B1220] p-4">

                                <pre className="overflow-x-auto text-sm leading-7 text-green-400">
                                    {`export default function Dashboard() {
  return (
    <main>
      <Navbar />
      <Analytics />
      <Charts />
    </main>
  );
}`}
                                </pre>

                            </div>

                        </div>

                        <div className="min-h-[260px] rounded-2xl border border-white/10 bg-[#111827] p-6">

                            <p className="text-sm font-semibold text-indigo-400">
                                🖥 Live Preview
                            </p>

                            <div className="mt-4 rounded-xl bg-[#0B1220] p-5">

                                <div className="rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold text-white">
                                    Dashboard
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-2">

                                    <div className="h-16 rounded bg-[#1F2937]"></div>

                                    <div className="h-16 rounded bg-[#1F2937]"></div>

                                    <div className="h-16 rounded bg-[#1F2937]"></div>

                                </div>

                                <div className="mt-4 h-28 rounded bg-[#1F2937]"></div>

                            </div>

                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
}