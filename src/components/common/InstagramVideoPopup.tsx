"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Video, Play } from "lucide-react";

export default function InstagramVideoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const DURATION = 36.5; // 36.5 seconds duration

  // Trigger entrance after 1.2s on initial landing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // 36.5-second auto-close timer: automatically closes and settles to right-edge icon
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
      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* The Single Interactive Morphing Container */}
      <motion.div
        animate={
          isOpen
            ? {
                top: "50%",
                right: "50%",
                x: "50%",
                y: "-50%",
                width: "min(380px, calc(100vw - 32px))",
                height: "min(530px, 82vh)",
                backgroundColor: "#000000",
                borderColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)",
              }
            : {
                top: "84%",
                right: "0%",
                x: "0%",
                y: "-50%",
                width: "148px",
                height: "44px",
                backgroundColor: "#2c0e78",
                borderColor: "rgba(192, 132, 252, 0.3)",
                boxShadow: "0 10px 25px -5px rgba(58, 20, 148, 0.4)",
              }
        }
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 28,
          mass: 0.7,
        }}
        className="fixed z-50 flex flex-col overflow-hidden border cursor-pointer select-none"
        onClick={!isOpen ? handleOpen : undefined}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="modal-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.08 }}
              className="relative w-full h-full flex flex-col bg-black text-white cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                aria-label="Close video"
                className="absolute top-2.5 right-2.5 z-30 flex h-7 w-7 items-center justify-center bg-black/80 hover:bg-black text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer shadow-md"
                title="Close"
              >
                <X size={15} />
              </button>

              {/* Pure Video Container */}
              <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
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
          ) : (
            <motion.div
              key="button-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="w-full h-full flex items-center gap-2 px-2.5 sm:px-3 bg-gradient-to-r from-[#3A1494] via-[#2c0e78] to-[#1e0a52] text-white hover:from-[#4b1aa6] hover:to-[#3A1494] transition-all group"
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

              <div className="flex flex-col items-start text-left pr-0.5 whitespace-nowrap">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white leading-tight">
                  Watch Video
                </span>
                <span className="text-[8px] sm:text-[9px] font-semibold text-purple-200/80 leading-tight">
                  TREQO Reel
                </span>
              </div>

              <Play size={10} className="text-purple-200 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
