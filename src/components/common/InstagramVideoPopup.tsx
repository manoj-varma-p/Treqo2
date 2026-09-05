"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

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
  const DURATION = 37; // 37 seconds duration

  // Trigger entrance after 1.2s on initial landing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // 37-second auto-close timer: automatically closes and settles to right-edge icon
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, DURATION * 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Video Modal - straight/sharp edges, pure video only */}
            <motion.div
              initial={{ opacity: 0, x: "100vw" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100vw" }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 220,
                mass: 0.9,
              }}
              className="relative z-10 flex flex-col w-full max-w-[340px] sm:max-w-[370px] bg-black text-white shadow-2xl border border-white/20 rounded-none overflow-hidden"
            >
              {/* Floating Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close video"
                className="absolute top-2.5 right-2.5 z-30 flex h-7 w-7 items-center justify-center bg-black/80 hover:bg-black text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer shadow-md"
                title="Close"
              >
                <X size={15} />
              </button>

              {/* Pure Video Container */}
              <div className="relative w-full h-[470px] sm:h-[510px] bg-black overflow-hidden flex items-center justify-center">
                <iframe
                  src="https://www.instagram.com/reel/DZcndZohT3l/embed"
                  className="w-full h-full border-0 rounded-none"
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

      {/* Docked Icon on Right Edge when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={handleOpen}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            aria-label="Watch Instagram video"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2.5 border-y border-l border-white/20 bg-gradient-to-r from-slate-900 to-slate-950 px-3.5 py-3 text-white shadow-2xl hover:from-[#3A1494] hover:to-slate-900 transition-all duration-300 cursor-pointer group rounded-none"
          >
            {/* Pulsing indicator & Instagram Logo */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shadow-md group-hover:scale-110 transition-transform">
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
