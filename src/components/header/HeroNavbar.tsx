"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Container from "@/components/ui/Container";
import DesktopHeader from "./DesktopHeader";
import { cn } from "@/lib/utils";

export default function HeroNavbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [mounted, setMounted] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    setMounted(true);

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

  const navContent = (
    <nav
      aria-label="Desktop Navigation"
      className={cn(
        "w-full transition-all duration-200",
        isSticky
          ? "fixed inset-x-0 top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "relative bg-white/95 backdrop-blur-md border-y border-slate-200/90 shadow-xs"
      )}
    >
      <Container>
        <DesktopHeader variant="hero" isAtTop={isSticky} />
      </Container>
    </nav>
  );

  return (
    <div ref={anchorRef} className="relative w-full">
      {isSticky ? (
        <>
          {/* Placeholder so content below does not jump */}
          <div className="h-[72px] w-full" aria-hidden="true" />
          {mounted && createPortal(navContent, document.body)}
        </>
      ) : (
        navContent
      )}
    </div>
  );
}

