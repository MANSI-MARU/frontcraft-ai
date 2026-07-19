import Container from "@/components/common/container";
import { technologies } from "@/constants/technologies";

export default function TrustedBy() {
    return (
        <section className="py-20">
            <Container>

                <p className="text-center text-sm uppercase tracking-[0.3em] text-gray-500">
                    Built for modern frontend development
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {technologies.map((tech) => (
                        <div
                            key={tech.name}
                            className="rounded-xl border border-white/10 bg-[#111827] px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-[#1a2235] hover:shadow-lg hover:shadow-indigo-500/10"
                        >
                            <span className="mr-2">{tech.icon}</span>
                            {tech.name}
                        </div>
                    ))}
                </div>

            </Container>
        </section>
    );
}