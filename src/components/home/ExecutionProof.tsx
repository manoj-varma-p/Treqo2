"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    tag: "FOUNDER",
    name: "Somu Shekar",
    description: "Never went job-hunting. Co-founded Gesture Co while still in the course.",
  },
  {
    tag: "FOUNDER",
    name: "Subhani",
    description: "Turned his capstone into a company. Founded JASS Media.",
  },
  {
    tag: "PLACED IN 30 DAYS",
    name: "Dikshtha",
    description: "At Bristle Tech within a month of finishing.",
  },
  {
    tag: "HIRED ON PORTFOLIO",
    name: "Harshit",
    description: "Placed at TCS on the strength of the work, not the résumé.",
  },
];

const companies = [
  "Gesture Co",
  "JASS Media",
  "Bristle Tech",
  "TCS",
];

export default function ExecutionProof() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInteracting = useRef(false);
  const interactionTimer = useRef<NodeJS.Timeout | null>(null);

  function scrollToCard(index: number) {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  }

  function handleTouchStart() {
    isInteracting.current = true;
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
  }

  function handleTouchEnd() {
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, 2500);
  }

  function handleScroll() {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = container.children;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const distance = Math.abs(card.offsetLeft - container.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    setActiveIndex(closestIndex);
  }

  // Auto-scroll every 2 seconds in a continuous loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (isInteracting.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % outcomes.length;
        scrollToCard(next);
        return next;
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      if (interactionTimer.current) clearTimeout(interactionTimer.current);
    };
  }, []);

  return (
    <section id="placements" className="bg-white py-16 sm:py-20 lg:py-24 scroll-mt-16 sm:scroll-mt-20">
      <Container>
        {/* Section Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12 lg:items-end">
          <div className="flex flex-col items-start lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
              BATCH 1 · ALREADY HAPPENED
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-[3rem] font-black leading-[1.1] tracking-tight text-slate-950">
              Four names. All checkable.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              One batch is a small sample and we won&apos;t dress it up as an industry statistic. What we will say: every outcome below is a person you can look up.
            </p>
          </div>
        </div>

        {/* Mobile: Sideways finger scroll + 2s auto-loop with reduced block size */}
        <div className="sm:hidden mt-8">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {outcomes.map((item) => (
              <div
                key={item.name}
                className="w-[220px] shrink-0 snap-center flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs"
              >
                {/* Portrait Placeholder formatted for 4:5 vertical images */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-slate-200/80 bg-[#f4f6f9]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #eef2f7 0, #eef2f7 10px, #f8fafc 10px, #f8fafc 20px)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div className="rounded-md border border-slate-300/80 bg-white/90 px-2.5 py-0.5 text-center shadow-2xs backdrop-blur-xs">
                      <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                        PORTRAIT · 4:5
                      </span>
                    </div>
                  </div>
                </div>

                {/* Compact Card Body */}
                <div className="p-3.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#1e3a8a]">
                    {item.tag}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {outcomes.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToCard(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  activeIndex === i ? "w-6 bg-[#3A1494]" : "w-1.5 bg-slate-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 4 Outcome Cards Grid */}
        <div className="hidden sm:grid mt-10 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {outcomes.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:shadow-md hover:border-slate-300"
            >
              {/* Top 4:5 Portrait Placeholder */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-slate-200/80 bg-[#f4f6f9]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #eef2f7 0, #eef2f7 14px, #f8fafc 14px, #f8fafc 28px)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <div className="rounded-md border border-slate-300/80 bg-white/90 px-3 py-1 text-center shadow-2xs backdrop-blur-xs">
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      PORTRAIT · 4:5
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#1e3a8a]">
                  {item.tag}
                </span>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics & Quote Divider Row */}
        <div className="mt-12 pt-8 sm:pt-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
            {/* Left Metrics */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 lg:col-span-5">
              <div>
                <span className="block text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                  100%
                </span>
                <span className="mt-1 block text-xs sm:text-sm text-slate-500 font-medium">
                  of Batch 1 placed or founding
                </span>
              </div>

              <div>
                <span className="block text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                  ₹5L+
                </span>
                <span className="mt-1 block text-xs sm:text-sm text-slate-500 font-medium">
                  earned for a client, mid-course
                </span>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 max-w-2xl">
                That ₹5L came out of Gesture Co&apos;s Diwali campaign briefed, built, run and reported by students who hadn&apos;t graduated yet. Batch 2 gets measured against it.
              </p>
            </div>
          </div>
        </div>

        {/* Where Batch 1 Went Logos */}
        <div className="mt-8">
          <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">
            WHERE BATCH 1 WENT
          </span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
            {companies.map((company) => (
              <div
                key={company}
                className="flex items-center justify-center rounded-xl border border-slate-200/90 bg-white py-3.5 px-4 text-center text-xs sm:text-sm font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
