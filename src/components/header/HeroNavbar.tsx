"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import DesktopHeader from "./DesktopHeader";
import { cn } from "@/lib/utils";

export default function HeroNavbar() {
  const [isSticky, setIsSticky] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    function update() {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      // When the top of the navbar anchor touches or scrolls past the top of viewport:
      setIsSticky(rect.top <= 0);
      ticking.current = false;
    }

    function handleScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={anchorRef} className="relative w-full h-[72px]">
      <nav
        aria-label="Desktop Navigation"
        className={cn(
          "w-full transition-all duration-300 ease-out",
          isSticky
            ? "fixed inset-x-0 top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
            : "absolute inset-x-0 top-0 bg-white/95 backdrop-blur-md border-y border-slate-200/90 shadow-xs"
        )}
      >
        <Container>
          <DesktopHeader variant="hero" isAtTop={isSticky} />
        </Container>
      </nav>
    </div>
  );
}

