"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface CategorySubNavProps {
  tabs: { id: string; label: string }[];
  applyHref?: string;
}

const SCROLL_OFFSET = 140;

export default function CategorySubNav({ tabs }: CategorySubNavProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    function handleScroll() {
      const scrollPosition = window.scrollY + SCROLL_OFFSET + 1;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) {
          current = section.id;
        }
      }

      setActiveId(current);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  useEffect(() => {
    tabRefs.current[activeId ?? ""]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeId]);

  function handleTabClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET + 1;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }

  return (
    <div className="sticky top-14 lg:top-[72px] z-30 border-y border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
      <Container className="relative flex items-center">
        {/* Mobile Left & Right edge gradient fades for horizontal scroll hints */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-4 bg-gradient-to-r from-white to-transparent sm:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-4 bg-gradient-to-l from-white to-transparent sm:hidden"
        />

        <nav
          aria-label="Program sections"
          className="scrollbar-hide flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto py-2 sm:gap-6 sm:py-3"
        >
          {tabs.map((tab) => {
            const isActive = activeId === tab.id;
            return (
              <a
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                href={`#${tab.id}`}
                onClick={(event) => handleTabClick(event, tab.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "shrink-0 select-none whitespace-nowrap text-xs sm:text-sm font-semibold transition-all",
                  // Mobile pill style
                  "rounded-full px-3 py-1.5 sm:rounded-none sm:px-0 sm:py-0 sm:border-b-2 sm:pb-1",
                  isActive
                    ? "bg-brand-primary text-white shadow-xs sm:bg-transparent sm:text-brand-primary sm:border-brand-primary sm:shadow-none"
                    : "bg-slate-100 text-text-secondary hover:bg-slate-200/70 hover:text-text-primary sm:bg-transparent sm:border-transparent sm:hover:bg-transparent"
                )}
              >
                {tab.label}
              </a>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
