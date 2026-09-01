"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { whyTreqqoPillars } from "@/data/home";
import { cn } from "@/lib/utils";

export default function WhyTreqqoCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pillar = whyTreqqoPillars[activeIndex];
  const Icon = pillar.icon;

  return (
    <div className="mt-2 lg:mt-4">
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-3 sm:mb-8">
        {whyTreqqoPillars.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Fragment key={item.label}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-current={isActive}
                className={cn(
                  "rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm",
                  isActive
                    ? "bg-brand-primary text-text-inverse shadow-[0_10px_20px_-6px_rgba(58,22,147,0.6)]"
                    : "border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </button>
              {index < whyTreqqoPillars.length - 1 && (
                <ChevronRight className="hidden h-4 w-4 shrink-0 text-white/25 sm:block" aria-hidden="true" />
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Card */}
      <div className="rounded-3xl bg-surface p-5 shadow-[0_30px_60px_-20px_rgba(9,5,26,0.55)] sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:min-h-[480px] lg:grid-cols-2 lg:gap-10">
          {/* Visual panel */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary-deep via-brand-primary to-brand-primary-dark lg:aspect-auto lg:h-full">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 animate-spin-slow">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-secondary/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            </div>

            <div key={activeIndex} className="animate-scale-in relative flex h-full flex-col items-center justify-center gap-5 p-8">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm sm:h-24 sm:w-24">
                <Icon className="h-9 w-9 sm:h-11 sm:w-11" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-center text-xs font-bold tracking-wide text-white uppercase sm:text-sm">
                {pillar.label}
              </span>
            </div>
          </div>

          {/* Content panel */}
          <div key={activeIndex} className="animate-fade-up flex flex-col justify-center">
            <p className="text-xs font-bold tracking-widest text-brand-primary uppercase sm:text-sm">
              {String(activeIndex + 1).padStart(2, "0")} {pillar.label}
            </p>

            <h3 className="mt-3 text-2xl leading-tight font-extrabold tracking-tight text-text-primary uppercase sm:text-3xl">
              {pillar.heading}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">{pillar.description}</p>

            <blockquote className="mt-5 rounded-r-lg border-l-4 border-brand-primary bg-surface-alt px-4 py-3 text-sm font-medium text-text-primary italic">
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
        </div>
      </div>

      {/* CTAs */}
      <div className="relative mt-8 sm:mt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-secondary/25 blur-3xl"
        />
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/start-learning"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-primary-dark px-7 py-4 text-base font-semibold text-white shadow-[0_20px_45px_-15px_rgba(139,92,246,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-12px_rgba(139,92,246,0.65)] active:translate-y-0 sm:w-auto"
          >
            Start Learning Now
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <Link
            href="/career-paths"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/10 sm:w-auto"
          >
            Explore Career Paths
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
