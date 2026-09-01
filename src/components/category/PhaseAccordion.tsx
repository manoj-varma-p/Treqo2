"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CoursePhaseGroup } from "@/types/home";
import { cn } from "@/lib/utils";

interface PhaseAccordionProps {
  groups: CoursePhaseGroup[];
}

export default function PhaseAccordion({ groups }: PhaseAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  let lessonNumber = 0;

  return (
    <div className="mt-6 flex flex-col gap-3">
      {groups.map((group, index) => {
        const isOpen = openIndex === index;
        const startNumber = lessonNumber + 1;
        lessonNumber += group.lessons.length;

        return (
          <div
            key={group.eyebrow}
            className="overflow-hidden rounded-2xl border border-border-subtle bg-surface"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 bg-surface-alt px-5 py-4 text-left"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold tracking-wide text-brand-primary uppercase">
                  {group.eyebrow}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-text-primary sm:text-base">
                  {group.heading}
                </p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-text-secondary">{group.range}</span>
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 text-text-secondary transition-transform duration-200", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            {isOpen ? (
              <ul className="flex flex-col gap-1 px-5 py-4">
                {group.lessons.map((lesson, lessonIndex) => (
                  <li
                    key={lesson}
                    className="flex items-baseline gap-3 rounded-lg px-2 py-1.5 text-sm text-text-secondary"
                  >
                    <span className="font-mono text-xs text-brand-primary">
                      {String(startNumber + lessonIndex).padStart(2, "0")}
                    </span>
                    {lesson}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
