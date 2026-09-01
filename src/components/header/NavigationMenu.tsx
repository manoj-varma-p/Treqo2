"use client";

import type { KeyboardEvent, RefObject } from "react";
import Link from "next/link";
import { Grid2x2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

interface NavigationMenuProps {
  items: NavItem[];
  activeHref: string;
  megaMenuOpen: boolean;
  megaMenuTriggerRef: RefObject<HTMLButtonElement | null>;
  onToggleMegaMenu: () => void;
  onMegaMenuKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function NavigationMenu({
  items,
  activeHref,
  megaMenuOpen,
  megaMenuTriggerRef,
  onToggleMegaMenu,
  onMegaMenuKeyDown,
  className,
}: NavigationMenuProps) {
  return (
    <nav aria-label="Primary" className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        if (item.hasMegaMenu) {
          return (
            <button
              key={item.key}
              ref={megaMenuTriggerRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={megaMenuOpen}
              aria-controls="mega-menu-panel"
              onClick={onToggleMegaMenu}
              onKeyDown={onMegaMenuKeyDown}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200",
                megaMenuOpen
                  ? "bg-brand-primary text-text-inverse shadow-[0_10px_20px_-8px_rgba(67,56,202,0.65)]"
                  : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
              )}
            >
              <Grid2x2 className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              {item.label}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform duration-200", megaMenuOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
          );
        }

        const isActive = item.href === activeHref;
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200",
              isActive
                ? "bg-surface-alt text-brand-primary"
                : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
