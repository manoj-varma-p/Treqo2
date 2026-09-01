"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { megaMenuData } from "@/data/navigation";

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export default function MegaMenu({ open, onClose, triggerRef }: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      onClose();
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      id="mega-menu-panel"
      ref={panelRef}
      role="menu"
      aria-label="Explore Treqqo"
      className="animate-scale-in absolute top-[calc(100%+14px)] left-1/2 z-40 w-[min(1080px,calc(100vw-3rem))] origin-top -translate-x-1/2 rounded-3xl border border-border-subtle bg-surface p-8 shadow-[0_32px_64px_-24px_rgba(20,18,31,0.35)]"
    >
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_260px] gap-8">
        {megaMenuData.columns.map((column) => (
          <div key={column.title}>
            <p className="mb-4 text-xs font-bold tracking-wide text-brand-primary uppercase">{column.title}</p>
            <ul className="space-y-0.5">
              {column.links.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      role="menuitem"
                      onClick={onClose}
                      className="group flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-alt hover:text-text-primary"
                    >
                      <span className="flex items-center gap-2">
                        {Icon && (
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-alt text-brand-primary">
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        )}
                        {link.label}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="flex flex-col justify-between rounded-2xl bg-surface-alt p-6">
          <div>
            <p className="text-sm font-semibold text-text-secondary">{megaMenuData.promo.eyebrow}</p>
            <p className="mt-1 text-xl leading-snug font-bold text-text-primary">{megaMenuData.promo.heading}</p>
          </div>
          <div className="mt-6 flex items-end justify-between gap-3">
            <Link
              href={megaMenuData.promo.ctaHref}
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-text-inverse transition-colors hover:bg-brand-primary-dark"
            >
              {megaMenuData.promo.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Target className="h-10 w-10 shrink-0 text-brand-primary/30" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
