"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import Logo from "./Logo";
import { primaryNavItems } from "@/data/navigation";
import { useApplyModal } from "@/context/ApplyModalContext";

interface MobileHeaderProps {
  variant?: "hero" | "standard";
}

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function MobileHeader({}: MobileHeaderProps = {}) {
  const { openApplyModal } = useApplyModal();
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
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

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setOpen(false);
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
    <div className="flex h-14 w-full items-center justify-between">
      {/* Brand Logo */}
      <Logo />

      {/* Right controls: Apply now CTA & Hamburger Toggle */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => openApplyModal()}
          className="inline-flex items-center justify-center rounded-full bg-[#3A1494] px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#2c0e78] active:scale-95 transition-all cursor-pointer"
        >
          <span>Apply now</span>
        </button>

        <button
          ref={openButtonRef}
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Slide-Down Mobile Drawer (Only the standard navbar options) */}
      {mounted && open && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="flex max-h-[85vh] flex-col overflow-y-auto rounded-b-3xl bg-white shadow-2xl animate-in slide-in-from-top-4 duration-250"
          >
            {/* Top Bar inside Drawer */}
            <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur-md px-5">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Menu Items: Exactly the same as normal desktop navbar */}
            <div className="flex flex-col p-5">
              <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-slate-100">
                {primaryNavItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between py-3.5 text-base font-semibold text-slate-900 active:text-[#3A1494] hover:text-[#3A1494] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="rounded-full bg-purple-100 border border-purple-200 px-2 py-0.5 text-[10px] font-bold text-[#3A1494]">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </Link>
                ))}
              </nav>


            </div>
          </div>

          {/* Backdrop Click */}
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>,
        document.body
      )}
    </div>
  );
}
