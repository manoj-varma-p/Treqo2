"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { executionContent, executionPillars } from "@/data/home";
import { cn } from "@/lib/utils";

export default function ExecutionProof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pillar = executionPillars[activeIndex];

  return (
    <section className="relative overflow-hidden pt-10 pb-14 sm:pt-10 sm:pb-16 lg:pt-15 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(58,22,147,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-text-primary uppercase sm:text-4xl lg:text-[2.75rem]">
            {executionContent.heading.line1}
            <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {executionContent.heading.line2}
            </span>
          </h2>

          <p className="text-sm text-text-secondary sm:text-base">{executionContent.description}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12">
          {/* Content panel */}
          <div key={activeIndex} className="animate-fade-up flex flex-col justify-center">
            <p className="text-xs font-bold tracking-widest text-brand-primary uppercase sm:text-sm">
              {String(activeIndex + 1).padStart(2, "0")} {pillar.label}
            </p>

            <h3 className="mt-3 text-2xl leading-tight font-extrabold tracking-tight text-text-primary uppercase sm:text-3xl">
              {pillar.heading}
            </h3>

            <blockquote className="mt-5 rounded-r-lg border-l-4 border-brand-primary bg-surface px-4 py-3 text-sm font-medium text-text-primary italic">
              &ldquo;{pillar.quote}&rdquo;
            </blockquote>

            <ul className="mt-5 space-y-2.5">
              {pillar.bullets.map((bullet) => (
                <li key={bullet.label} className="text-sm leading-relaxed text-text-secondary">
                  <span className="font-bold text-text-primary">{bullet.label}: </span>
                  {bullet.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical nav */}
          <div className="flex flex-col gap-1.5 rounded-2xl bg-surface p-2 shadow-[0_20px_45px_-30px_rgba(20,18,31,0.35)] sm:p-3">
            {executionPillars.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.navTitle}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-current={isActive}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left transition-colors duration-200",
                    isActive ? "bg-brand-primary/5" : "hover:bg-surface-alt"
                  )}
                >
                  <span
                    className={cn(
                      "h-9 w-1 shrink-0 rounded-full transition-colors duration-200",
                      isActive ? "bg-brand-primary" : "bg-border-subtle group-hover:bg-brand-primary/40"
                    )}
                    aria-hidden="true"
                  />

                  <div className="flex flex-1 flex-col gap-1">
                    <span
                      className={cn(
                        "text-base font-extrabold tracking-tight uppercase transition-colors duration-200 sm:text-lg",
                        isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
                      )}
                    >
                      {item.navTitle}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] font-bold tracking-widest uppercase transition-colors duration-200 sm:text-xs",
                        isActive ? "text-brand-primary" : "text-text-secondary/60"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>

                  <ArrowRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-200",
                      isActive
                        ? "translate-x-0 text-brand-primary opacity-100"
                        : "-translate-x-1 text-text-secondary opacity-0 group-hover:translate-x-0 group-hover:opacity-40"
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:mt-14">
          <Link
            href={executionContent.secondaryCta.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-primary/25 px-7 py-3.5 text-sm font-semibold text-brand-primary transition-colors duration-200 hover:border-brand-primary hover:bg-brand-primary/5 sm:w-auto"
          >
            {executionContent.secondaryCta.label}
          </Link>
          <Link
            href={executionContent.primaryCta.href}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(58,22,147,0.6)] transition-colors duration-200 hover:bg-brand-primary-dark sm:w-auto"
          >
            {executionContent.primaryCta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
