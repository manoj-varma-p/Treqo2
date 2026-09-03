"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import AnnouncementBanner from "./AnnouncementBanner";
import { cn } from "@/lib/utils";

interface HeaderProps {
  variant?: "hero" | "standard";
}

export default function Header({ variant = "standard" }: HeaderProps) {
  const [pastHero, setPastHero] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    if (variant !== "hero") return;

    const wrapper = document.getElementById("hero-wrapper");
    const navEl = navRef.current;
    if (!wrapper) return;

    function update() {
      if (!wrapper) return;
      const navHeight = navEl?.offsetHeight ?? 72;
      // When the top of viewport touches the top of the navbar located at the bottom of hero:
      const threshold = wrapper.offsetTop + wrapper.offsetHeight - navHeight;
      const isPast = window.scrollY >= threshold;
      setPastHero(isPast);
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
  }, [variant]);

  if (variant === "standard") {
    return (
      <>
        <AnnouncementBanner />
        <header role="banner" className="fixed top-0 inset-x-0 z-50 lg:sticky lg:top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="w-full">
            <Container>
              <div className="hidden lg:block">
                <DesktopHeader variant="standard" isAtTop={true} />
              </div>
              <div className="lg:hidden">
                <MobileHeader variant="standard" />
              </div>
            </Container>
          </div>
        </header>
      </>
    );
  }

  // variant === "hero":
  // On desktop: Sits in the bottom of hero section, then goes to top and settles when scrolling further
  return (
    <header
      ref={navRef}
      role="banner"
      className={cn(
        "hidden lg:block w-full transition-all duration-200",
        pastHero
          ? "fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "absolute inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-y border-slate-200/90 shadow-xs"
      )}
    >
      <Container>
        <DesktopHeader variant="hero" isAtTop={pastHero} />
      </Container>
    </header>
  );
}
