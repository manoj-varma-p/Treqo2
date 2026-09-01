"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import Logo from "./Logo";
import IconButton from "@/components/ui/IconButton";
import Button from "@/components/ui/Button";
import { primaryNavItems, navExtras } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  variant?: "hero" | "standard";
}

export default function MobileHeader({ variant = "hero" }: MobileHeaderProps) {
  const pathname = usePathname();
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
    <div className="relative">
      <div
        className={cn(
          "flex items-center justify-between py-2 pr-2 pl-4",
          variant !== "standard" &&
            "rounded-full border border-border-subtle bg-surface/90 shadow-[0_16px_36px_-18px_rgba(20,18,31,0.28)] backdrop-blur-xl"
        )}
      >
        <Logo />
        <IconButton
          ref={openButtonRef}
          aria-label="Open menu"
          icon={<Menu className="h-5 w-5" aria-hidden="true" />}
          onClick={() => setOpen(true)}
        />
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="animate-fade-in absolute inset-0 bg-text-primary/40 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="animate-slide-up absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface p-6 pb-8 shadow-[0_-20px_60px_-20px_rgba(20,18,31,0.35)]"
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

            <nav aria-label="Primary" className="flex flex-col gap-1.5">
              {primaryNavItems.map((item) => {
                const isActive = item.href === pathname;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex min-h-13 items-center rounded-2xl px-4 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-surface-alt text-brand-primary"
                        : "text-text-primary hover:bg-surface-alt"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <label className="mt-4 flex min-h-13 items-center gap-3 rounded-2xl border border-border-subtle px-4 text-text-secondary focus-within:border-brand-primary/50">
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="sr-only">{navExtras.searchLabel}</span>
              <input
                type="search"
                placeholder={navExtras.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-base text-text-primary placeholder:text-text-secondary focus:outline-none"
              />
            </label>

            <Button
              href={navExtras.ctaHref}
              size="lg"
              fullWidth
              className="mt-4"
              icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              {navExtras.ctaLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
