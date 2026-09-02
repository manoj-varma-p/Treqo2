"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { primaryNavItems, navExtras } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface DesktopHeaderProps {
  variant?: "hero" | "standard";
}

export default function DesktopHeader({ variant = "standard" }: DesktopHeaderProps) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!coursesOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCoursesOpen(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setCoursesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [coursesOpen]);

  return (
    <div className="flex w-full items-center justify-between py-4">
      {/* Left side: Logo + Divider + Courses pill dropdown */}
      <div className="flex items-center gap-4">
        <Logo />
        <div className="h-6 w-px bg-slate-200" aria-hidden="true" />
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setCoursesOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <span>Courses</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-slate-500 transition-transform duration-200",
                coursesOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>

          {coursesOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-fade-in">
              <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                <Link
                  href="#courses"
                  onClick={() => setCoursesOpen(false)}
                  className="rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  Digital Marketing & Growth
                </Link>
                <Link
                  href="#courses"
                  onClick={() => setCoursesOpen(false)}
                  className="rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  Performance & Meta Ads
                </Link>
                <Link
                  href="#courses"
                  onClick={() => setCoursesOpen(false)}
                  className="rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  Brand Strategy & Content
                </Link>
                <Link
                  href="#courses"
                  onClick={() => setCoursesOpen(false)}
                  className="rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  Product Marketing
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Nav links + Apply now CTA button */}
      <div className="flex items-center gap-8">
        <nav aria-label="Desktop Navigation" className="flex items-center gap-7">
          {primaryNavItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={navExtras.ctaHref}
          className="inline-flex items-center justify-center rounded-lg bg-[#16213e] px-5 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-[0.98]"
        >
          {navExtras.ctaLabel}
        </Link>
      </div>
    </div>
  );
}

