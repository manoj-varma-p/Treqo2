"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import { faqContent, faqCategories } from "@/data/home";
import { cn } from "@/lib/utils";

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState(faqCategories.length - 1);
  const [openIndex, setOpenIndex] = useState(0);
  const category = faqCategories[activeCategory];

  function selectCategory(index: number) {
    setActiveCategory(index);
    setOpenIndex(0);
  }

  return (
    <section className="relative overflow-hidden bg-[#f3f2f7] pt-10 pb-14 sm:pt-10 sm:pb-16 lg:pt-15 lg:pb-20">
      <Container>
        <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-text-primary sm:text-4xl">
          {faqContent.heading.line1}{" "}
          <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {faqContent.heading.line2}
          </span>
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-[300px_1fr] lg:gap-8">
          {/* Category list */}
          <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {faqCategories.map((item, index) => {
              const isActive = index === activeCategory;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => selectCategory(index)}
                  aria-current={isActive}
                  className={cn(
                    "shrink-0 rounded-2xl px-5 py-4 text-left text-sm font-semibold transition-colors duration-200 lg:w-full lg:shrink",
                    isActive
                      ? "bg-brand-primary text-white shadow-[0_10px_25px_-8px_rgba(58,22,147,0.5)]"
                      : "bg-surface text-text-primary hover:bg-surface-alt"
                  )}
                >
                  <span className="block max-w-[220px]">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ accordion */}
          <div className="flex flex-col gap-3">
            {category.faqs.map((faq, index) => {
              const isOpen = index === openIndex;
              return (
                <div key={faq.question} className="rounded-2xl bg-surface">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="text-sm font-semibold text-text-primary sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200",
                        isOpen && "rotate-180 text-brand-primary"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary sm:px-6 sm:pb-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center lg:mt-10">
          <Link
            href={faqContent.cta.href}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-primary/25 px-7 py-3 text-sm font-semibold text-brand-primary transition-colors duration-200 hover:border-brand-primary hover:bg-brand-primary/5"
          >
            {faqContent.cta.label}
            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
