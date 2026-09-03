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
    <div className="flex w-full items-center justify-between gap-4">
      {/* FILLED NAVBAR CONTAINER */}
      <div
        ref={dropdownRef}
        className="relative flex flex-1 items-center justify-between rounded-full border border-slate-200/90 bg-white px-6 py-2.5 shadow-sm transition-all"
      >
        {/* Left side: Logo + Divider + Courses dropdown */}
        <div className="flex items-center gap-4">
          <Logo />
          <div className="h-5 w-px bg-slate-200" aria-hidden="true" />
          <div>
            <button
              type="button"
              onClick={handleCoursesToggle}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold text-slate-800 transition-all hover:border-[#3A1494]/40 hover:bg-purple-50/60 hover:text-[#3A1494] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A1494] cursor-pointer"
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

        {/* Center/Right inside Navbar: Nav links */}
        <nav aria-label="Desktop Navigation" className="flex items-center gap-7">
          {primaryNavItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs sm:text-sm font-semibold text-slate-700 transition-colors hover:text-[#3A1494]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Full-width Mega Menu Dropdown */}
        {coursesOpen && isAtTop && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 w-full z-50">
            <CoursesMegaMenu
              onClose={() => setCoursesOpen(false)}
              onNavClick={handleNavClick}
            />
          </div>
        )}
      </div>

      {/* OUTSIDE THE NAVBAR: 'Let's talk' Standalone Action Button */}
      <button
        type="button"
        onClick={() => openApplyModal()}
        className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#3A1494] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-[#2c0e78] hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span>Let&apos;s talk</span>
        <span className="text-amber-300 font-black">→</span>
      </button>
    </div>
  );
}

