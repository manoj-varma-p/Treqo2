"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import IconButton from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import { tutors } from "@/data/home";

const AVATAR_GRADIENTS = [
  "from-[#16213e] via-[#1a3ba8] to-[#2563eb]",
  "from-[#1e3a8a] via-[#3b82f6] to-[#1d4ed8]",
  "from-[#0f172a] via-[#1e293b] to-[#334155]",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TaughtBy() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const card = scroller.querySelector<HTMLElement>("[data-slide]");
    const styles = card ? window.getComputedStyle(scroller) : null;
    const gap = styles ? parseFloat(styles.columnGap || styles.gap || "0") : 0;
    const amount = card ? card.offsetWidth + gap : scroller.clientWidth * 0.85;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const atEnd = scroller.scrollLeft >= maxScroll - 4;
    const atStart = scroller.scrollLeft <= 4;

    if (direction === 1 && atEnd) {
      scroller.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (direction === -1 && atStart) {
      scroller.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    scroller.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section id="tutors" className="relative overflow-hidden bg-[#fafbfe] py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
            PRACTITIONER MENTORSHIP
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-[1.12] tracking-tight text-slate-950">
            Taught by people still doing the work.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Not retired professors or theoretical instructors. Active founders, growth leads, and marketing strategists.
          </p>
        </div>

        {/* Tutors Carousel / Grid */}
        <div className="relative mt-10 lg:mt-12">
          <div
            ref={scrollerRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 sm:gap-5 overflow-x-auto scroll-smooth px-12 sm:px-16 lg:px-0 pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {tutors.map((tutor, index) => (
              <div
                key={tutor.name}
                data-slide
                className="group relative aspect-[3/4] w-[230px] xs:w-[250px] sm:w-[280px] md:w-[30%] lg:w-[calc((100%-4*1.25rem)/4.5)] shrink-0 snap-center overflow-hidden rounded-2xl shadow-xs transition-transform duration-300 hover:shadow-md"
              >
                {/* Photo placeholder */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-transform duration-300 group-hover:scale-105",
                    AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]
                  )}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 text-lg font-bold text-white backdrop-blur-sm sm:h-20 sm:w-20 sm:text-xl">
                    {initials(tutor.name)}
                  </span>
                </div>

                <span className="absolute top-3 right-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  {tutor.mentored}
                </span>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-10">
                  <p className="text-sm sm:text-base font-bold text-white leading-tight">
                    {tutor.name}
                  </p>
                  <p className="text-xs text-white/75 mt-1">
                    {tutor.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <IconButton
            aria-label="Previous tutors"
            icon={<ChevronLeft className="h-4 w-4" aria-hidden="true" />}
            onClick={() => scrollByCard(-1)}
            className="absolute top-1/2 left-0.5 sm:left-1 lg:-left-5 z-20 -translate-y-1/2 bg-white/95 border border-slate-200/90 shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          />
          <IconButton
            aria-label="Next tutors"
            icon={<ChevronRight className="h-4 w-4" aria-hidden="true" />}
            onClick={() => scrollByCard(1)}
            className="absolute top-1/2 right-0.5 sm:right-1 lg:-right-5 z-20 -translate-y-1/2 bg-white/95 border border-slate-200/90 shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          />
        </div>
      </Container>
    </section>
  );
}
