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
  isAtTop?: boolean;
}

export default function DesktopHeader({ variant = "standard", isAtTop = true }: DesktopHeaderProps) {
  const { openApplyModal } = useApplyModal();
  const [coursesOpen, setCoursesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mega menu immediately if navbar leaves the top
  useEffect(() => {
    if (!isAtTop && coursesOpen) {
      setCoursesOpen(false);
    }
  }, [isAtTop, coursesOpen]);

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

  function handleCoursesToggle() {
    if (!isAtTop) {
      // If navbar is not at top yet, scroll smoothly to #courses section
      const target = document.getElementById("courses");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    setCoursesOpen((prev) => !prev);
  }

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
    <div ref={dropdownRef} className="relative flex w-full h-[72px] items-center justify-between">
      {/* Left side: Logo (settles into navbar when scrolled) + Divider + Courses pill dropdown */}
      <div className="flex items-center">
        <div
          className={cn(
            "flex items-center transition-all duration-500 ease-out overflow-hidden will-change-[max-width,opacity,transform]",
            variant === "hero" && !isAtTop
              ? "max-w-0 opacity-0 -translate-x-6 scale-95 pointer-events-none mr-0"
              : "max-w-[160px] opacity-100 translate-x-0 scale-100 mr-4"
          )}
        >
          <Logo />
          <div
            className={cn(
              "ml-4 h-6 w-px bg-slate-300 shrink-0 transition-opacity duration-300",
              variant === "hero" && !isAtTop ? "opacity-0" : "opacity-100"
            )}
            aria-hidden="true"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleCoursesToggle}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/90 bg-slate-50/80 px-4 py-1.5 text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-[#3A1494]/40 hover:bg-slate-100 hover:text-[#3A1494] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A1494] cursor-pointer"
          >
            <span>Courses</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-slate-600 transition-transform duration-200",
                coursesOpen && isAtTop && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>
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

      {/* Full-width Mega Menu Dropdown */}
      {coursesOpen && isAtTop && (
        <div className="absolute top-full left-0 right-0 w-full z-50 pt-2">
          <CoursesMegaMenu
            onClose={() => setCoursesOpen(false)}
            onNavClick={handleNavClick}
          />
        </div>
      )}
    </div>
  );
}

