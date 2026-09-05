"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramVideoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Trigger popup entrance after 1.2s on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {/* Expanded Instagram Video Popup */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 120, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 120, scale: 0.85 }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col w-[300px] sm:w-[330px] rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-slate-950 text-white shadow-2xl overflow-hidden ring-1 ring-black/10"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shadow-xs">
                  <InstagramIcon size={13} className="text-white" />
                </span>
                <span className="text-xs font-bold tracking-tight text-white/90">
                  TREQO Reel
                </span>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href="https://www.instagram.com/reel/DZcndZohT3l/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in Instagram"
                  className="rounded-lg p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  title="Open on Instagram"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  onClick={handleClose}
                  aria-label="Close video"
                  className="rounded-lg p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Minimize"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Video Iframe Container */}
            <div className="relative w-full h-[430px] sm:h-[470px] bg-black overflow-hidden flex items-center justify-center">
              <iframe
                src="https://www.instagram.com/reel/DZcndZohT3l/embed"
                className="w-full h-full border-0"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media; autoplay; clipboard-write;"
                title="TREQO Instagram Reel"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Docked Icon on Right Edge when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={handleOpen}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            aria-label="Watch Instagram video"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 rounded-l-2xl border-y border-l border-white/20 bg-gradient-to-r from-slate-900 to-slate-950 px-3.5 py-3 text-white shadow-xl hover:from-[#3A1494] hover:to-slate-900 transition-all duration-300 cursor-pointer group"
          >
            {/* Pulsing indicator & Instagram Logo */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shadow-md group-hover:scale-105 transition-transform">
              <InstagramIcon size={16} className="text-white" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-500" />
              </span>
            </div>

            <div className="hidden sm:flex flex-col items-start text-left pr-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                Watch Reel
              </span>
              <span className="text-[9px] font-medium text-white/70">
                TREQO Highlights
              </span>
            </div>

            <Play size={12} className="text-white/80 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
