"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const certs = [
  { src: "/msme.png", label: "MSME Registered", sub: "Ministry of MSME, Govt. of India" },
  { src: "/001.png", label: "Recognized by DPIIT", sub: "Department for Promotion of Industry and Internal Trade" },
  { src: "/dpiit.png", label: "DPIIT Recognised", sub: "Startup India, Govt. of India" },
];

export function GovCertSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
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

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 items-center">
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
