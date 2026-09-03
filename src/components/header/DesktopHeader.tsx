"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";
import CoursesMegaMenu from "./CoursesMegaMenu";
import { primaryNavItems, navExtras } from "@/data/navigation";
import { useApplyModal } from "@/context/ApplyModalContext";
import { cn } from "@/lib/utils";

interface DesktopHeaderProps {
  variant?: "hero" | "standard";
}

export default function DesktopHeader({ variant = "standard" }: DesktopHeaderProps) {
  const { openApplyModal } = useApplyModal();
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

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
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
    <div className="flex w-full h-[72px] items-center justify-between">
      {/* Left side: Logo + Divider + Courses pill dropdown */}
      <div className="flex items-center gap-4">
        <Logo />
        <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setCoursesOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/90 bg-slate-50/80 px-4 py-1.5 text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-[#3A1494]/40 hover:bg-slate-100 hover:text-[#3A1494] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A1494] cursor-pointer"
          >
            <span>Courses</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-slate-600 transition-transform duration-200",
                coursesOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>

          {coursesOpen && (
            <CoursesMegaMenu
              onClose={() => setCoursesOpen(false)}
              onNavClick={handleNavClick}
            />
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
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-semibold text-slate-800 transition-colors hover:text-[#3A1494]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => openApplyModal()}
          className="inline-flex items-center justify-center rounded-xl bg-[#3A1494] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#2c0e78] hover:shadow-md active:scale-[0.98] cursor-pointer"
        >
          {navExtras.ctaLabel}
        </button>
      </div>
    </div>
  );
}

