"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const certs = [
  { src: "/msme.png", label: "MSME Registered", sub: "Ministry of MSME, Govt. of India" },
  { src: "/001.png", label: "Recognized by DPIIT", sub: "Department for Promotion of Industry and Internal Trade" },
  { src: "/dpiit.png", label: "DPIIT Recognised", sub: "Startup India, Govt. of India" },
];

export function GovCertSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 2 seconds in a loop on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certs.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <div className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50/90 px-4 py-1.5 mb-3.5 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#3A1494]">
              Officially Recognised
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950">
            Government Certified{" "}
            <span className="text-[#3A1494]">Institution</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-medium">
            Recognised by official government initiatives & accredited ministries
          </p>

          {/* Mobile Auto-Carousel: Moves to left every 2 seconds in a loop with swipe option */}
          <div className="sm:hidden relative mt-8 flex flex-col items-center justify-center min-h-[160px] overflow-hidden">
            <div className="relative w-full h-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -30) {
                      setCurrentIndex((prev) => (prev + 1) % certs.length);
                    } else if (info.offset.x > 30) {
                      setCurrentIndex((prev) => (prev - 1 + certs.length) % certs.length);
                    }
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-2 cursor-grab active:cursor-grabbing"
                >
                  <img
                    src={certs[currentIndex].src}
                    alt={certs[currentIndex].label}
                    className="h-24 w-auto max-w-[240px] object-contain mx-auto"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {certs.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    currentIndex === i ? "w-6 bg-[#3A1494]" : "w-1.5 bg-slate-300"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Desktop: 3-column static grid */}
          <div className="hidden sm:grid sm:mt-16 sm:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 items-center">
            {certs.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={cert.src}
                  alt={cert.label}
                  className="h-24 sm:h-28 md:h-32 w-auto max-w-[220px] sm:max-w-[260px] object-contain mx-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default GovCertSection;
