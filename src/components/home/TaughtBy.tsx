"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import IconButton from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import { taughtByContent, tutors } from "@/data/home";

const TABS = ["Tutors", "Framework", "Toolkit"] as const;
type Tab = (typeof TABS)[number];

const AVATAR_GRADIENTS = [
  "from-brand-primary-deep via-brand-primary to-brand-secondary",
  "from-brand-primary via-brand-secondary to-brand-primary-dark",
  "from-brand-secondary via-brand-primary to-brand-primary-deep",
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
  const [activeTab, setActiveTab] = useState<Tab>("Tutors");
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
    <section className="relative overflow-hidden bg-surface pt-10 pb-14 sm:pt-10 sm:pb-16 lg:pt-15 lg:pb-20">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem]">
            {taughtByContent.heading.line1}
            <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {taughtByContent.heading.line2}
            </span>
          </h2>

          <p className="text-sm text-text-secondary sm:text-base">{taughtByContent.description}</p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5">
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  aria-current={isActive}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-brand-primary text-text-inverse shadow-[0_10px_20px_-6px_rgba(58,22,147,0.6)]"
                      : "border border-border-subtle bg-surface text-text-secondary hover:border-brand-primary/40 hover:text-brand-primary"
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "Tutors" && (
          <div className="mt-8 lg:mt-8">
            <h3 className="text-lg font-bold text-text-primary sm:text-xl">{taughtByContent.subheading}</h3>

            <div className="relative mt-8">
              <div
                ref={scrollerRef}
                className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
              >
                {tutors.map((tutor, index) => (
                  <div
                    key={tutor.name}
                    data-slide
                    className="group relative aspect-[3/4] w-[46%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[30%] lg:w-[calc((100%-4*1.25rem)/4.5)]"
                  >
                    {/* Photo placeholder — swap for the real headshot per tutor */}
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

                    <span className="absolute top-3 right-3 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                      {tutor.mentored}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-8 sm:p-4 sm:pt-10">
                      <p className="text-sm font-bold text-white sm:text-base">{tutor.name}</p>
                      <p className="text-xs text-white/70">{tutor.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <IconButton
                aria-label="Previous tutors"
                icon={<ChevronLeft className="h-4 w-4" aria-hidden="true" />}
                onClick={() => scrollByCard(-1)}
                className="absolute top-1/2 left-2 z-10 -translate-y-1/2 shadow-[0_10px_25px_-8px_rgba(20,18,31,0.35)] sm:left-3"
              />
              <IconButton
                aria-label="Next tutors"
                icon={<ChevronRight className="h-4 w-4" aria-hidden="true" />}
                onClick={() => scrollByCard(1)}
                className="absolute top-1/2 right-2 z-10 -translate-y-1/2 shadow-[0_10px_25px_-8px_rgba(20,18,31,0.35)] sm:right-3"
              />
            </div>
          </div>
        )}

        {activeTab === "Framework" && (
          <div className="mt-12 flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-border-subtle text-sm text-text-secondary lg:mt-16">
            Framework details coming soon.
          </div>
        )}

        {activeTab === "Toolkit" && (
          <div className="mt-12 flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-border-subtle text-sm text-text-secondary lg:mt-16">
            Toolkit details coming soon.
          </div>
        )}
      </Container>
    </section>
  );
}
