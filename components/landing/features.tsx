import Container from "@/components/common/container";
import { features } from "@/constants/features";

export default function Features() {
    return (
        <section className="py-24">
            <Container>

                <div className="text-center">

                    <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
                        Features
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-white">
                        Everything You Need to Build Faster
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                        FrontCraft AI combines AI, frontend development, live preview,
                        and export tools into one powerful workspace.
                    </p>

                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature, index) => (

                        <div
                            key={feature.title}
                            className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 ${index === 0
                                ? "border-indigo-500 bg-gradient-to-br from-indigo-500/20 to-[#111827]"
                                : "border-white/10 bg-[#111827] hover:border-indigo-500/40 hover:bg-[#1a2235]"
                                }`}
                        >

                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-600/20 text-2xl">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-gray-400">
                                {feature.description}
                            </p>
                            <button className="mt-6 text-sm font-medium text-indigo-400 transition hover:text-indigo-300">
                                Learn More →
                            </button>
                        </div>

                    ))}

                </div>

            </Container>
        </section>
    );
}