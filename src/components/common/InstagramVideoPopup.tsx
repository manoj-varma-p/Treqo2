"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Video, Play } from "lucide-react";

export default function InstagramVideoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const DURATION = 36.7; // 36.5 seconds duration

  // Detect if user is in Hero section
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // Visible when hero section is still on screen
        setIsInHero(rect.bottom > 100);
      } else {
        setIsInHero(window.scrollY < 650);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-pop from right edge 1.0s after landing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 36.5-second auto-close timer when opened
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

  const isVisible = isInHero || isOpen;

  return (
    <AnimatePresence>
      {isVisible && (
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

          {/* The Single Interactive Morphing Container - moves strictly from right edge to center */}
          <motion.div
            initial={{
              opacity: 0,
              left: "100%",
              x: "-100%",
              top: "84%",
              y: "-50%",
              width: "168px",
              height: "46px",
            }}
            animate={
              isOpen
                ? {
                    opacity: 1,
                    left: "50%",
                    x: "-50%",
                    top: "50%",
                    y: "-50%",
                    width: "min(380px, calc(100vw - 32px))",
                    height: "min(530px, 82vh)",
                    backgroundColor: "#000000",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "0px",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)",
                  }
                : {
                    opacity: 1,
                    left: "100%",
                    x: "-100%",
                    top: "84%",
                    y: "-50%",
                    width: "168px",
                    height: "46px",
                    backgroundColor: "#2c0e78",
                    borderColor: "rgba(192, 132, 252, 0.35)",
                    borderRadius: "6px 0px 0px 6px",
                    boxShadow: "0 10px 25px -5px rgba(58, 20, 148, 0.45)",
                  }
            }
            exit={{
              opacity: 0,
              left: "100%",
              x: "-100%",
              transition: { duration: 0.2 },
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 28,
              mass: 0.75,
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
                  className="w-full h-full flex items-center justify-between px-3 py-1 bg-gradient-to-r from-[#3A1494] via-[#2c0e78] to-[#1e0a52] text-white hover:from-[#4b1aa6] hover:to-[#3A1494] transition-all group"
                >
                  {/* Small Video Icon with pulse dot */}
                  <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-white/10 border border-white/20 shadow-xs group-hover:scale-105 group-hover:bg-white/20 transition-all">
                    <Video size={13} className="text-white sm:hidden" />
                    <Video size={14} className="text-white hidden sm:block" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                    </span>
                  </div>

                  <div className="flex flex-col items-start text-left pl-0.5 whitespace-nowrap">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-white leading-tight">
                      Watch Video
                    </span>
                    <span className="text-[9px] font-semibold text-purple-200/90 leading-tight">
                      TREQO Reel
                    </span>
                  </div>

                  <Play size={11} className="text-purple-200 group-hover:translate-x-0.5 transition-transform shrink-0 ml-auto pr-0.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
