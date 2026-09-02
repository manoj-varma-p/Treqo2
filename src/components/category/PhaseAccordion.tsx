"use client";

import { useState } from "react";
import { ChevronDown, Sparkles, CheckCircle2 } from "lucide-react";
import type { CoursePhaseGroup } from "@/types/home";
import { cn } from "@/lib/utils";

interface PhaseAccordionProps {
  groups: CoursePhaseGroup[];
}

export default function PhaseAccordion({ groups }: PhaseAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  let cumulativeLessonCount = 0;

  return (
    <div className="mt-6 flex flex-col gap-2.5 sm:gap-3">
      {groups.map((group, index) => {
        const isOpen = openIndex === index;
        const phaseNum = group.range || String(index + 1).padStart(2, "0");
        const startNumber = cumulativeLessonCount + 1;
        cumulativeLessonCount += group.lessons.length;

        return (
          <div
            key={group.range || group.eyebrow || index}
            className={cn(
              "overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-200",
              isOpen
                ? "border-brand-primary/40 bg-surface shadow-[0_8px_24px_-12px_rgba(58,22,147,0.18)] ring-1 ring-brand-primary/20"
                : "border-border-subtle bg-surface hover:border-slate-300"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center gap-3 sm:gap-4 px-4 py-3.5 text-left transition-colors sm:px-5 sm:py-4 select-none",
                isOpen ? "bg-brand-primary/[0.03]" : "bg-surface-alt/60 hover:bg-surface-alt"
              )}
            >
              {/* Phase Number Badge */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors sm:h-9 sm:w-9 sm:text-sm",
                  isOpen
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-slate-200/80 text-slate-700"
                )}
              >
                {phaseNum}
              </div>

              {/* Phase Eyebrow & Title */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider text-brand-primary uppercase sm:text-[11px]">
                    {group.eyebrow}
                  </span>
                </div>
                <h3 className="mt-0.5 text-xs font-bold tracking-tight text-text-primary sm:text-sm md:text-base leading-snug">
                  {group.heading}
                </h3>
              </div>

              {/* Chevron */}
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 sm:h-8 sm:w-8",
                  isOpen
                    ? "rotate-180 bg-brand-primary/10 text-brand-primary"
                    : "text-text-secondary hover:bg-slate-200/50"
                )}
                aria-hidden="true"
              >
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>

            {/* Smooth animated expand/collapse */}
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border-subtle/80 bg-surface px-4 py-4 sm:px-5 sm:py-5">
                  <div className="flex flex-col gap-2.5">
                    {group.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson}
                        className="flex flex-col gap-2 rounded-xl border border-border-subtle/60 bg-surface-alt/40 p-3.5 sm:p-4 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-wide text-brand-primary uppercase">
                            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                            Phase Focus & Deliverable
                          </span>
                          <span className="font-mono text-[10px] sm:text-xs font-semibold text-text-secondary">
                            #{String(startNumber + lessonIndex).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed text-text-secondary sm:text-text-primary/90 font-medium">
                          {lesson}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                          <span>Industry portfolio checkpoint included</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
