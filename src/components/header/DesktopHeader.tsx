"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import NavigationMenu from "./NavigationMenu";
import MegaMenu from "./MegaMenu";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { primaryNavItems, navExtras } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface DesktopHeaderProps {
  variant?: "hero" | "standard";
}

export default function DesktopHeader({ variant = "hero" }: DesktopHeaderProps) {
  const pathname = usePathname();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function handleClose() {
    setMegaMenuOpen(false);
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setMegaMenuOpen(true);
    }
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center gap-4 py-2.5 pr-3 pl-3",
          variant !== "standard" &&
            "rounded-full border border-border-subtle bg-surface/90 shadow-[0_20px_45px_-20px_rgba(20,18,31,0.28)] backdrop-blur-xl"
        )}
      >
        <NavigationMenu
          items={primaryNavItems}
          activeHref={pathname}
          megaMenuOpen={megaMenuOpen}
          megaMenuTriggerRef={triggerRef}
          onToggleMegaMenu={() => setMegaMenuOpen((prev) => !prev)}
          onMegaMenuKeyDown={handleTriggerKeyDown}
          className="flex-1 justify-start"
        />
        <div className="flex items-center gap-2.5">
          <IconButton aria-label="Search" icon={<Search className="h-4 w-4" aria-hidden="true" />} />
          <Button href={navExtras.ctaHref} icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            {navExtras.ctaLabel}
          </Button>
        </div>
      </div>

      <MegaMenu open={megaMenuOpen} onClose={handleClose} triggerRef={triggerRef} />
    </div>
  );
}
