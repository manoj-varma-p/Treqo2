"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Container from "@/components/ui/Container";
import IconButton from "@/components/ui/IconButton";
import { learningSystemContent, learningSystemCourses } from "@/data/home";

export default function LearningSystem() {
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
    <section className="relative overflow-hidden bg-[#f3f2f7] pt-10 pb-8 sm:pt-10 sm:pb-8 lg:pt-15 lg:pb-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(58,22,147,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-3xl leading-[1.1] font-extrabold tracking-tight text-text-primary uppercase sm:text-4xl lg:text-[2.75rem]">
            {learningSystemContent.heading.line1}
            <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {learningSystemContent.heading.line2}
            </span>
          </h2>

          <p className="max-w-sm text-sm text-text-secondary sm:text-base lg:text-right">
            {learningSystemContent.description}
          </p>
        </div>

        <div className="relative mt-10 lg:mt-14">
          <div
            ref={scrollerRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
          >
            {learningSystemCourses.map((course) => (
              <div
                key={course.title}
                data-slide
                className="group w-[82%] shrink-0 snap-start rounded-2xl border border-border-subtle bg-surface p-3 sm:w-[46%] lg:w-[calc((100%-4.5rem)/3.5)]"
              >
                {/* Video placeholder — swap for the real embed/thumbnail per course */}
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-surface-alt via-brand-primary/10 to-brand-secondary/20">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(58,22,147,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(58,22,147,0.12) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-3 py-1 text-[11px] font-semibold text-brand-primary shadow-sm backdrop-blur-sm">
                    {course.category}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-brand-primary shadow-[0_12px_30px_-8px_rgba(58,22,147,0.5)] transition-transform duration-200 group-hover:scale-105">
                      <Play className="h-5 w-5 translate-x-0.5 fill-current" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                <div className="p-3 pt-4">
                  <h3 className="line-clamp-2 min-h-11 text-base font-bold text-text-primary sm:min-h-14 sm:text-lg">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 min-h-10 text-sm leading-relaxed text-text-secondary">
                    {course.description}
                  </p>

                  <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-border-subtle pt-3">
                    {course.features.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <li
                          key={feature.label}
                          className="flex items-center gap-2 text-xs font-medium text-text-secondary"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          {feature.label}
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href={course.href}
                    className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-primary-dark"
                  >
                    Enroll Now
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <IconButton
            aria-label="Previous courses"
            icon={<ChevronLeft className="h-4 w-4" aria-hidden="true" />}
            onClick={() => scrollByCard(-1)}
            className="absolute top-1/2 left-2 z-10 -translate-y-1/2 shadow-[0_10px_25px_-8px_rgba(20,18,31,0.35)] sm:left-3"
          />
          <IconButton
            aria-label="Next courses"
            icon={<ChevronRight className="h-4 w-4" aria-hidden="true" />}
            onClick={() => scrollByCard(1)}
            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 shadow-[0_10px_25px_-8px_rgba(20,18,31,0.35)] sm:right-3"
          />
          
        </div>
      </Container>
    </section>
  );
}
