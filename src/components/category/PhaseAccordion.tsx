"use client";

import { useState, useMemo } from "react";
import { ChevronDown, SlidersHorizontal, ChevronsUpDown } from "lucide-react";
import type { CoursePhaseGroup } from "@/types/home";
import { cn } from "@/lib/utils";

interface PhaseAccordionProps {
  groups: CoursePhaseGroup[];
}

const filterTabs = [
  { id: "all", label: "All 12", range: [1, 12] },
  { id: "foundations", label: "01-04 Foundations", range: [1, 4] },
  { id: "execution", label: "05-08 Channels", range: [5, 8] },
  { id: "scale", label: "09-12 Growth & AI", range: [9, 12] },
];

export default function PhaseAccordion({ groups }: PhaseAccordionProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);

  const filteredGroups = useMemo(() => {
    const tab = filterTabs.find((t) => t.id === activeFilter);
    if (!tab || tab.id === "all") return groups.map((g, idx) => ({ group: g, originalIndex: idx }));

    const [start, end] = tab.range;
    return groups
      .map((g, idx) => ({ group: g, originalIndex: idx }))
      .filter((_, idx) => idx + 1 >= start && idx + 1 <= end);
  }, [activeFilter, groups]);

  function toggleIndex(idx: number) {
    setExpandedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  }

  function toggleAll() {
    if (expandedIndices.length === filteredGroups.length) {
      setExpandedIndices([]);
    } else {
      setExpandedIndices(filteredGroups.map((item) => item.originalIndex));
    }
  }

  const allExpanded =
    filteredGroups.length > 0 &&
    filteredGroups.every((item) => expandedIndices.includes(item.originalIndex));

  return (
    <div className="mt-5 flex flex-col gap-3">
      {/* Dynamic Controls Bar on Mobile & Desktop */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-b border-border-subtle/80 pb-3">
        {/* Dynamic Category Filter Pills */}
        <div className="scrollbar-hide flex items-center gap-1.5 overflow-x-auto py-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition-all select-none active:scale-95",
                activeFilter === tab.id
                  ? "bg-brand-primary text-white shadow-xs"
                  : "bg-surface-alt text-text-secondary hover:bg-slate-200/80 hover:text-text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Expand / Collapse Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
          <span className="text-[11px] font-semibold text-text-secondary">
            Showing <strong className="text-text-primary">{filteredGroups.length}</strong> of 12
          </span>
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-1 rounded-lg border border-border-subtle bg-surface px-2.5 py-1 text-[11px] font-bold text-text-secondary hover:text-brand-primary hover:border-brand-primary/40 active:scale-95 transition-all"
          >
            <ChevronsUpDown className="h-3 w-3" aria-hidden="true" />
            <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-2.5">
        {filteredGroups.map(({ group, originalIndex }) => {
          const isOpen = expandedIndices.includes(originalIndex);
          const phaseNum = group.range || String(originalIndex + 1).padStart(2, "0");
          const isHighlighted = phaseNum === "05" || group.heading.toUpperCase().includes("MARKET EXECUTION");

          return (
            <div
              key={group.range || group.eyebrow || originalIndex}
              className={cn(
                "overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-250",
                isHighlighted
                  ? "border-[#3A1494] bg-gradient-to-r from-purple-50/90 via-indigo-50/40 to-amber-50/30 shadow-md ring-2 ring-[#3A1494]/20"
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
                      ? "bg-[#3A1494] text-white ring-2 ring-[#FBBF24] shadow-xs"
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
