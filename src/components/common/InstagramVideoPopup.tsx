"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Video, Play } from "lucide-react";

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

              {/* Pure Video Container with Autoplay permissions */}
              <div className="relative w-full h-[470px] sm:h-[510px] bg-black overflow-hidden flex items-center justify-center">
                <iframe
                  src="https://www.instagram.com/reel/DZcndZohT3l/embed/?autoplay=1"
                  className="w-full h-full border-0 rounded-none"
                  scrolling="no"
                  allowTransparency={true}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write;"
                  title="TREQO Instagram Reel"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Docked Icon on Right Edge when closed - positioned between navbar and form */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={handleOpen}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            aria-label="Watch video reel"
            className="fixed right-0 top-[84%] -translate-y-1/2 z-50 flex items-center gap-2 border-y border-l border-purple-400/30 bg-gradient-to-r from-[#3A1494] via-[#2c0e78] to-[#1e0a52] px-2.5 sm:px-3 py-2 text-white shadow-xl shadow-purple-950/25 hover:from-[#4b1aa6] hover:to-[#3A1494] transition-all duration-300 cursor-pointer group rounded-none"
          >
            {/* Small Video Icon with pulse dot */}
            <div className="relative flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center bg-white/10 border border-white/20 shadow-xs group-hover:scale-105 group-hover:bg-white/20 transition-all">
              <Video size={13} className="text-white sm:hidden" />
              <Video size={14} className="text-white hidden sm:block" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
            </div>

            <div className="flex flex-col items-start text-left pr-0.5">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white leading-tight">
                Watch Video
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold text-purple-200/80 leading-tight">
                TREQO Reel
              </span>
            </div>

            <Play size={10} className="text-purple-200 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
