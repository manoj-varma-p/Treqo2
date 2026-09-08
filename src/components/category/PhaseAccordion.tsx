"use client";

import { useState } from "react";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import type { CoursePhaseGroup } from "@/types/home";
import { cn } from "@/lib/utils";

interface PhaseAccordionProps {
  groups: CoursePhaseGroup[];
}

export default function PhaseAccordion({ groups = [] }: PhaseAccordionProps) {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);

  function toggleIndex(idx: number) {
    setExpandedIndices((prev) =>
      prev.length === 1 && prev[0] === idx ? [] : [idx]
    );
  }

  function toggleAll() {
    if (expandedIndices.length === groups.length) {
      setExpandedIndices([]);
    } else {
      setExpandedIndices(groups.map((_, idx) => idx));
    }
  }

  const allExpanded =
    groups.length > 0 &&
    groups.every((_, idx) => expandedIndices.includes(idx));

  return (
    <div className="mt-5 flex flex-col gap-3">
      {/* Controls Bar on Mobile & Desktop */}
      <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          Curriculum Phases ({groups.length})
        </span>

        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs font-bold text-text-secondary hover:text-brand-primary hover:border-brand-primary/40 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronsUpDown className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
        </button>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-2.5">
        {groups.map((group, originalIndex) => {
          const isOpen = expandedIndices.includes(originalIndex);
          const phaseNum = group.range || String(originalIndex + 1).padStart(2, "0");
          const isHighlighted = phaseNum === "05" || group.heading.toUpperCase().includes("MARKET EXECUTION");

          return (
            <div
              key={group.range || group.eyebrow || originalIndex}
              className={cn(
                "overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-250",
                isHighlighted
                  ? "border-[#3A1494] bg-gradient-to-r from-purple-50/90 via-indigo-50/40 to-indigo-50/30 shadow-md ring-2 ring-[#3A1494]/20"
                  : isOpen
                  ? "border-brand-primary/40 bg-surface shadow-[0_8px_24px_-12px_rgba(58,22,147,0.18)] ring-1 ring-brand-primary/20"
                  : "border-border-subtle bg-surface hover:border-slate-300"
              )}
            >
              <button
                type="button"
                onClick={() => toggleIndex(originalIndex)}
                aria-expanded={isOpen}
                className={cn(
                  "flex w-full items-center gap-3 sm:gap-4 px-3.5 py-3 sm:px-5 sm:py-3.5 text-left transition-colors select-none",
                  isHighlighted
                    ? "bg-transparent"
                    : isOpen
                    ? "bg-brand-primary/[0.03]"
                    : "bg-surface-alt/50 hover:bg-surface-alt active:bg-surface-alt/80"
                )}
              >
                {/* Phase Number Badge */}
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-all sm:h-9 sm:w-9 sm:text-sm",
                    isHighlighted
                      ? "bg-[#3A1494] text-white ring-2 ring-purple-300 shadow-xs"
                      : isOpen
                      ? "bg-brand-primary text-white shadow-xs scale-105"
                      : "bg-slate-200/80 text-slate-700"
                  )}
                >
                  {phaseNum}
                </div>

                {/* Phase Eyebrow & Title */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-extrabold tracking-wider uppercase",
                      isHighlighted ? "text-[#3A1494]" : "text-brand-primary"
                    )}>
                      {group.eyebrow}
                    </span>
                    {isHighlighted && (
                      <span className="inline-flex items-center rounded-full bg-[#3A1494] px-2 py-0.5 text-[9px] font-black tracking-wider uppercase text-white shadow-2xs">
                        Key Milestone
                      </span>
                    )}
                  </div>
                  <h3 className={cn(
                    "mt-0.5 text-xs sm:text-sm font-bold tracking-tight leading-snug",
                    isHighlighted ? "text-slate-950 font-black sm:text-base text-[#3A1494]" : "text-text-primary"
                  )}>
                    {group.heading}
                  </h3>
                </div>

                {/* Chevron */}
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 sm:h-8 sm:w-8",
                    isOpen
                      ? "rotate-180 bg-brand-primary/10 text-brand-primary"
                      : isHighlighted
                      ? "bg-[#3A1494]/10 text-[#3A1494]"
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
                  <div className="border-t border-border-subtle/70 bg-surface px-3.5 py-3.5 sm:px-5 sm:py-4">
                    <div className="flex flex-col gap-2.5">
                      {group.lessons.map((lesson) => (
                        <div
                          key={lesson}
                          className="flex flex-col gap-2.5 rounded-xl border border-border-subtle/70 bg-surface-alt/40 p-3 sm:p-4"
                        >
                          {/* Deliverable Header */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] sm:text-xs font-bold tracking-wide text-brand-primary uppercase">
                              Core Deliverable & Skill
                            </span>
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              Portfolio Graded
                            </span>
                          </div>

                          {/* Lesson Description */}
                          <p className="text-xs sm:text-sm leading-relaxed text-text-primary/90 font-medium">
                            {lesson}
                          </p>
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
    </div>
  );
}
