"use client";

import { useState } from "react";
import Container from "@/components/common/container";
import { faqs } from "@/constants/faq";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24">
            <Container>

                <div className="text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
                        FAQ
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-white">
                        Frequently Asked Questions
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                        Everything you need to know about FrontCraft AI.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-4xl space-y-4">

                    {faqs.map((faq, index) => (
                        <div
                            key={faq.question}
                            className="rounded-2xl border border-white/10 bg-[#111827]"
                        >

                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className="flex w-full items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-semibold text-white">
                                    {faq.question}
                                </span>

                                <span className="text-2xl text-indigo-400">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="border-t border-white/10 px-6 pb-6 pt-4">
                                    <p className="text-gray-400">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}

                        </div>
                    ))}

                </div>

            </Container>
        </section>
    );
}