"use client";

import Container from "@/components/ui/Container";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import AnnouncementBanner from "./AnnouncementBanner";
import { cn } from "@/lib/utils";

interface HeaderProps {
  variant?: "hero" | "standard";
}

export default function Header({ variant = "standard" }: HeaderProps) {
  return (
    <header role="banner" className="w-full bg-white z-40 border-b border-slate-100">
      <AnnouncementBanner />
      <div className="w-full">
        <Container>
          <div className="hidden lg:block">
            <DesktopHeader variant={variant} />
          </div>
          <div className="lg:hidden">
            <MobileHeader variant={variant} />
          </div>
        </Container>
      </div>
    </header>
  );
}
