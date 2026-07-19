import Container from "@/components/common/container";
import { pricingPlans } from "@/constants/pricing";

export default function Pricing() {
    return (
        <section className="py-24">
            <Container>

                <div className="text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
                        Pricing
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-white">
                        Choose Your Plan
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                        Start free and upgrade whenever you're ready.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10 ${plan.featured
                                    ? "border-indigo-500 bg-gradient-to-br from-indigo-500/20 to-[#111827]"
                                    : "border-white/10 bg-[#111827]"
                                }`}
                        >
                            {plan.featured && (
                                <div className="mb-4 inline-flex rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                                    ⭐ Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-white">
                                {plan.name}
                            </h3>

                            <p className="mt-2 text-gray-400">
                                {plan.description}
                            </p>

                            <div className="mt-6 text-4xl font-bold text-white">
                                {plan.price}
                            </div>

                            <ul className="mt-8 space-y-3">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="text-gray-300"
                                    >
                                        ✔ {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500">
                                {plan.featured ? "Start Free Trial" : "Get Started"}
                            </button>

                        </div>
                    ))}

                </div>

            </Container>
        </section>
    );
}