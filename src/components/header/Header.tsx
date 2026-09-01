"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { cn } from "@/lib/utils";

interface HeaderProps {
  /**
   * "hero" (default): desktop nav rests as a pill straddling the Hero/next-section
   * seam (absolute + translate-y-1/2) until scroll passes that seam, at which point
   * it switches to a fixed bar pinned near the top of the viewport — hiding on
   * scroll-down and reappearing on scroll-up. Requires an element with id="hero"
   * in the same positioned ancestor.
   *
   * "standard": desktop nav docks as a plain sticky bar at the top of the page
   * from the start — no hero measurement, no straddle/hide behavior. Use this on
   * interior pages that don't have a Hero section to straddle.
   *
   * Mobile always keeps its own always-visible sticky top bar — see MobileHeader.
   */
  variant?: "hero" | "standard";
}

/**
 * Both variants live inside <main> (see page.tsx) so the "relative" wrapper
 * around Header+Hero can be scoped to exactly Hero's height — role="banner"
 * restores the landmark semantics a <header> would otherwise lose by being
 * a descendant of <main>.
 */
export default function Header({ variant = "hero" }: HeaderProps) {
  const [pastHero, setPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (variant !== "hero") return;

    const heroEl = document.getElementById("hero");
    lastScrollY.current = window.scrollY;

    function update() {
      const currentY = window.scrollY;
      const threshold = (heroEl?.offsetTop ?? 0) + (heroEl?.offsetHeight ?? 0) - 40;
      const isPast = currentY > threshold;

      setPastHero(isPast);
      setHidden(isPast && currentY > lastScrollY.current);

      lastScrollY.current = currentY;
      ticking.current = false;
    }

    function handleScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "z-50 lg:hidden",
          variant === "standard"
            ? "sticky top-0 border-b border-border-subtle bg-surface/90 backdrop-blur-xl"
            : "sticky top-3 sm:top-4"
        )}
      >
        <Container>
          <MobileHeader variant={variant} />
        </Container>
      </header>

      <header
        role="banner"
        className={cn(
          "z-40 hidden lg:block",
          variant === "standard"
            ? "sticky top-0 border-b border-border-subtle bg-surface/90 backdrop-blur-xl"
            : cn(
                pastHero ? "fixed inset-x-0 top-4 transition-transform duration-300 ease-out" : "absolute inset-x-0 bottom-0 translate-y-1/2",
                pastHero && hidden && "-translate-y-24"
              )
        )}
      >
        <Container>
          <DesktopHeader variant={variant} />
        </Container>
      </header>
    </>
  );
}
