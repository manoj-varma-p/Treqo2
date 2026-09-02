"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import IconButton from "@/components/ui/IconButton";
import { primaryNavItems, navExtras } from "@/data/navigation";

interface MobileHeaderProps {
  variant?: "hero" | "standard";
}

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

  return (
    <div className="flex items-center justify-between py-3">
      <Logo />
      <div className="flex items-center gap-3">
        <Link
          href={navExtras.ctaHref}
          className="inline-flex items-center justify-center rounded-lg bg-[#3A1494] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs"
        >
          {navExtras.ctaLabel}
        </Link>
        <IconButton
          ref={openButtonRef}
          aria-label="Open menu"
          icon={<Menu className="h-5 w-5 text-slate-700" aria-hidden="true" />}
          onClick={() => setOpen(true)}
        />
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="animate-fade-in absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="animate-slide-up absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 pb-8 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <IconButton
                ref={closeButtonRef}
                aria-label="Close menu"
                icon={<X className="h-5 w-5" aria-hidden="true" />}
                onClick={() => setOpen(false)}
              />
            </div>

            <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-4 text-base font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="#courses"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Browse Courses
              </Link>
              <Link
                href={navExtras.ctaHref}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-xl bg-[#3A1494] py-3 text-sm font-semibold text-white shadow-xs"
              >
                {navExtras.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
