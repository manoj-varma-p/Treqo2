"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CategorySubNavProps {
  tabs: { id: string; label: string }[];
  applyHref: string;
}

const SCROLL_OFFSET = 150;

export default function CategorySubNav({ tabs, applyHref }: CategorySubNavProps) {
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
    <div className="sticky top-16 z-30 border-y border-border-subtle bg-surface-muted/95 backdrop-blur-sm sm:top-[76px] lg:top-20">
      <Container className="flex items-center gap-4">
        <nav
          aria-label="Program sections"
          className="scrollbar-hide flex min-w-0 flex-1 items-center gap-6 overflow-x-auto py-3.5"
        >
          {tabs.map((tab) => (
            <a
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              href={`#${tab.id}`}
              onClick={(event) => handleTabClick(event, tab.id)}
              aria-current={activeId === tab.id ? "true" : undefined}
              className={cn(
                "shrink-0 border-b-2 pb-1 text-sm font-semibold whitespace-nowrap transition-colors",
                activeId === tab.id
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              {tab.label}
            </a>
          ))}
        </nav>

        <Button href={applyHref} size="md" className="shrink-0">
          Apply now
        </Button>
      </Container>
    </div>
  );
}
