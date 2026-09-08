"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
    <section className="relative overflow-hidden bg-[#FFFFFF] py-16 sm:py-20 lg:py-24">
      <Container className="max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="relative text-center w-full">
          {/* Section Header (Centered) */}
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50/90 px-4 py-1.5 mb-4 shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#3A1494]">
                Officially Recognised
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-black tracking-tight text-slate-950 leading-tight">
              Government Certified{" "}
              <span className="text-[#3A1494]">Institution</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
              Recognised by official government initiatives &amp; accredited ministries
            </p>
          </div>

          {/* Mobile Auto-Carousel */}
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
                  <Image
                    src={certs[currentIndex].src}
                    alt={certs[currentIndex].label}
                    width={240}
                    height={96}
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

          {/* Desktop: Spaced towards the edges */}
          <div className="hidden sm:flex sm:mt-16 lg:mt-20 w-full items-center justify-between gap-6 lg:gap-10">
            {/* Left Logo: Moved towards left edge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex justify-start items-center transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={certs[0].src}
                alt={certs[0].label}
                width={280}
                height={140}
                className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] object-contain object-left"
              />
            </motion.div>

            {/* Center Logo: Dead center */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex justify-center items-center transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={certs[1].src}
                alt={certs[1].label}
                width={280}
                height={140}
                className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] object-contain mx-auto"
              />
            </motion.div>

            {/* Right Logo: Moved towards right edge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex justify-end items-center transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={certs[2].src}
                alt={certs[2].label}
                width={280}
                height={140}
                className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] object-contain object-right"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default GovCertSection;
