"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Phone, Sparkles, ChevronRight, Layers } from "lucide-react";
import Logo from "./Logo";
import IconButton from "@/components/ui/IconButton";
import { primaryNavItems, navExtras } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  variant?: "hero" | "standard";
}

const featuredTracks = [
  { label: "Digital Marketing", href: "/categories/digital-marketing", badge: "Batch 2" },
  { label: "Full Stack Development", href: "/categories/development", badge: "Waitlist" },
  { label: "Product & UI/UX Design", href: "/categories/design", badge: "Waitlist" },
];

export default function MobileHeader({ variant = "standard" }: MobileHeaderProps) {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        openButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setOpen(false);
    if (href.startsWith("/#") || href.startsWith("#")) {
      const id = href.includes("#") ? href.split("#")[1] : "";
      if (id && typeof window !== "undefined" && window.location.pathname === "/") {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${id}`);
        }
      }
    }
  }

  return (
    <div className="flex h-14 w-full items-center justify-between">
      {/* Brand Logo */}
      <Logo />

      {/* Right controls: Compact CTA & Menu Toggle */}
      <div className="flex items-center gap-2">
        <Link
          href={navExtras.ctaHref}
          onClick={(e) => handleNavClick(e, navExtras.ctaHref)}
          className="inline-flex items-center gap-1 rounded-full bg-brand-primary px-3 py-1 text-[11px] font-bold text-white shadow-xs active:scale-95 transition-transform"
        >
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          <span>Apply</span>
        </Link>

        <button
          ref={openButtonRef}
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 active:scale-90 transition-transform"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Dynamic Slide-Down Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="flex max-h-[92vh] flex-col overflow-y-auto rounded-b-3xl bg-white shadow-2xl animate-in slide-in-from-top-4 duration-250"
          >
            {/* Top Bar inside Menu */}
            <div className="flex h-14 items-center justify-between border-b border-slate-100 px-5">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 active:scale-90 transition-transform"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col p-5">
              {/* Featured Learning Tracks */}
              <div className="mb-5">
                <p className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                  Learning Tracks
                </p>
                <div className="mt-2.5 flex flex-col gap-1.5">
                  {featuredTracks.map((track) => (
                    <Link
                      key={track.href}
                      href={track.href}
                      onClick={(e) => handleNavClick(e, track.href)}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-surface-alt/60 px-3.5 py-2.5 active:bg-surface-alt transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">{track.label}</span>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                          track.badge === "Batch 2"
                            ? "bg-brand-primary text-white"
                            : "bg-slate-200 text-slate-600"
                        )}
                      >
                        {track.badge}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Main Nav Links */}
              <p className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                Explore
              </p>
              <nav aria-label="Mobile Navigation" className="mt-2 flex flex-col divide-y divide-slate-100 border-y border-slate-100">
                {primaryNavItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 active:text-brand-primary transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </Link>
                ))}
              </nav>

              {/* Quick Action & Contact */}
              <div className="mt-5 flex flex-col gap-2.5">
                <Link
                  href={navExtras.ctaHref}
                  onClick={(e) => handleNavClick(e, navExtras.ctaHref)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-bold text-white shadow-md active:scale-98 transition-transform"
                >
                  <span>Apply for Batch 2</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <a
                  href="tel:+919948000491"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 active:bg-slate-50"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />
                  <span>Call Admissions: +91 99480 00491</span>
                </a>
              </div>
            </div>
          </div>

          {/* Backdrop Click */}
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
