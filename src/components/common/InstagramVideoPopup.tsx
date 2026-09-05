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
  const [timeLeft, setTimeLeft] = useState(35);
  const DURATION = 35; // 35 seconds preview duration

  // Trigger entrance after 1.2s on initial landing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setTimeLeft(DURATION);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // 35-second countdown timer: automatically closes and settles to right-edge icon
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsOpen(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setTimeLeft(DURATION);
    setIsOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Video Modal - slides smoothly from right edge and settles in center */}
            <motion.div
              initial={{ opacity: 0, x: "100vw", scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: "100vw", scale: 0.85 }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 220,
                mass: 0.9,
              }}
              className="relative z-10 flex flex-col w-full max-w-[340px] sm:max-w-[380px] rounded-3xl border border-white/20 bg-slate-950 text-white shadow-2xl overflow-hidden ring-1 ring-white/10"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shadow-md">
                    <InstagramIcon size={14} className="text-white" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold tracking-tight text-white">
                      TREQO Reel
                    </span>
                    <span className="text-[10px] text-white/60 font-medium">
                      35s Preview · {timeLeft}s left
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href="https://www.instagram.com/reel/DZcndZohT3l/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open on Instagram"
                    className="rounded-lg p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    title="Open on Instagram"
                  >
                    <ExternalLink size={15} />
                  </a>
                  <button
                    onClick={handleClose}
                    aria-label="Close video"
                    className="rounded-lg p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Close and minimize"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* 35s Countdown Progress Bar */}
              <div className="w-full h-1 bg-white/10 overflow-hidden">
                <motion.div
                  key={isOpen ? "open" : "closed"}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: DURATION, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888]"
                />
              </div>

              {/* Video Iframe Container */}
              <div className="relative w-full h-[450px] sm:h-[490px] bg-black overflow-hidden flex items-center justify-center">
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
          </div>
        )}
      </AnimatePresence>

      {/* Docked Icon on Right Edge when closed or after 35s */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={handleOpen}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            aria-label="Watch Instagram video"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2.5 rounded-l-2xl border-y border-l border-white/20 bg-gradient-to-r from-slate-900 to-slate-950 px-3.5 py-3 text-white shadow-2xl hover:from-[#3A1494] hover:to-slate-900 transition-all duration-300 cursor-pointer group"
          >
            {/* Pulsing indicator & Instagram Logo */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shadow-md group-hover:scale-110 transition-transform">
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
