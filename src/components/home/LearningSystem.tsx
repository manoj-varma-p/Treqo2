"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import Container from "@/components/ui/Container";
import { useApplyModal } from "@/context/ApplyModalContext";
import { cn } from "@/lib/utils";

interface ProgramCard {
  id: string;
  image: string;
  previewLabel: string;
  badge: {
    text: string;
    variant: "blue" | "amber" | "gray";
  };
  meta: string;
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
  tags: string[];
  isLocked?: boolean;
}

const programs: ProgramCard[] = [
  {
    id: "new-age-dm",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    previewLabel: "CLASSROOM · CEO CHALLENGE REVIEW",
    badge: { text: "OPEN · BATCH 2", variant: "blue" },
    meta: "4 months · Online",
    title: "New Age Digital Marketing",
    description:
      "The flagship. 18 phases, 30+ real brand projects, AI in the workflow from phase one. Batch 2 starts Sep 2026.",
    actionText: "View course →",
    actionHref: "/categories/digital-marketing",
    tags: ["All", "Flagship"],
    isLocked: false,
  },
  {
    id: "fundamentals",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    previewLabel: "SELF-PACED MODULE SCREEN",
    badge: { text: "LOCKED", variant: "gray" },
    meta: "6 modules · Self-paced",
    title: "Fundamentals of Digital Marketing",
    description:
      "The door in. What digital marketing is, how funnels behave, and what to settle before you pay for anything.",
    actionText: "Join waitlist →",
    actionHref: "/categories/fundamentals",
    tags: ["All", "Short", "Students"],
    isLocked: true,
  },
  {
    id: "4m-program",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    previewLabel: "MADHAPUR STUDIO FLOOR",
    badge: { text: "OPEN · ON CAMPUS", variant: "blue" },
    meta: "4 months · On campus",
    title: "4M Program",
    description:
      "Full-stack marketing, condensed and in person. Brand strategy through performance in four months.",
    actionText: "View course →",
    actionHref: "/categories/4m-program",
    tags: ["All", "Short", "Flagship"],
    isLocked: false,
  },
  {
    id: "pgdm",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    previewLabel: "COHORT SESSION",
    badge: { text: "LOCKED", variant: "gray" },
    meta: "12 months · Hybrid",
    title: "Treqo PGDM in Modern Marketing",
    description:
      "Post Graduate Diploma in New Age Marketing. Built for graduates ready for senior marketing roles.",
    actionText: "Join waitlist →",
    actionHref: "/categories/pgdm",
    tags: ["All", "PG"],
    isLocked: true,
  },
  {
    id: "campus-edition",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    previewLabel: "STUDENT AT DESK",
    badge: { text: "LOCKED", variant: "gray" },
    meta: "4 months · Online",
    title: "Campus Edition",
    description:
      "The flagship, timed to run alongside a BBA or MBA without colliding with your semester exams.",
    actionText: "Join waitlist →",
    actionHref: "/categories/campus-edition",
    tags: ["All", "Students"],
    isLocked: true,
  },
  {
    id: "founder-semester",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    previewLabel: "FOUNDER PITCH SESSION",
    badge: { text: "LOCKED", variant: "gray" },
    meta: "4 months · Online",
    title: "The Founder Semester",
    description:
      "Marketing and entrepreneurship for people who want to launch, scale, or run their own venture.",
    actionText: "Join waitlist →",
    actionHref: "/categories/founder-semester",
    tags: ["All", "Short", "Flagship"],
    isLocked: true,
  },
  {
    id: "performance-growth",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    previewLabel: "LIVE MEDIA DASHBOARD",
    badge: { text: "LOCKED", variant: "gray" },
    meta: "3 months · Online",
    title: "Performance & Growth Specialist",
    description:
      "Deep dive into Meta, Google Ads, and attribution models for direct response growth.",
    actionText: "Join waitlist →",
    actionHref: "/categories/performance-growth",
    tags: ["All", "Short"],
    isLocked: true,
  },
];

const filterCategories = ["All", "Flagship", "Short", "PG", "Students"];

export default function LearningSystem() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { openApplyModal } = useApplyModal();

  const filteredPrograms =
    activeFilter === "All"
      ? programs
      : programs.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="courses" className="bg-white py-16 sm:py-20 lg:py-24 border-t border-slate-200/80 scroll-mt-20">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col items-start max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.12] tracking-tight text-slate-950">
            Two are open. Five are locked. We&apos;d rather say so.
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Seven programs. Pick the one that matches your stage.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {filterCategories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "rounded-full px-4.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer",
                  isActive
                    ? "bg-[#3A1494] text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 3-Column Program Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              id={`course-${program.id}`}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 scroll-mt-28",
                program.isLocked
                  ? "border-slate-200/80 bg-slate-50/40"
                  : "border-slate-200/90"
              )}
            >
              {/* Card Image Header */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-500",
                    program.isLocked
                      ? "opacity-60 grayscale-[40%]"
                      : "opacity-90 group-hover:opacity-100 group-hover:scale-105"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Frosted Lock Overlay on Locked Courses */}
                {program.isLocked && (
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1.5px] flex items-center justify-center">
                    <div className="flex items-center gap-1.5 rounded-full bg-slate-900/90 border border-amber-400/40 px-3.5 py-1.5 text-xs font-bold text-amber-300 shadow-xl backdrop-blur-md">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Enrollment Locked</span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-md bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold tracking-wider text-white/90 uppercase border border-white/10">
                    {program.previewLabel}
                  </span>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  {/* Badge + Meta row */}
                  <div className="flex items-center gap-2.5">
                    {program.isLocked ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 border border-amber-400/30 px-2 py-0.5 text-[10px] font-black tracking-wide text-amber-300 uppercase">
                        <Lock className="h-3 w-3" />
                        <span>LOCKED</span>
                      </span>
                    ) : (
                      <>
                        {program.badge.variant === "blue" && (
                          <span className="inline-flex items-center rounded-md bg-[#3A1494] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                            {program.badge.text}
                          </span>
                        )}
                        {program.badge.variant === "amber" && (
                          <span className="inline-flex items-center rounded-md bg-[#FBBF24] px-2 py-0.5 text-[10px] font-black tracking-wide text-black uppercase">
                            {program.badge.text}
                          </span>
                        )}
                        {program.badge.variant === "gray" && (
                          <span className="inline-flex items-center rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 uppercase">
                            {program.badge.text}
                          </span>
                        )}
                      </>
                    )}
                    <span className="text-xs font-medium text-slate-500">
                      {program.meta}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#3A1494] transition-colors">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {program.description}
                  </p>
                </div>

                {/* Footer: Action Link */}
                <div className="mt-6 flex items-center justify-end border-t border-slate-100 pt-4">
                  {program.isLocked ? (
                    <button
                      type="button"
                      onClick={() => openApplyModal(program.title)}
                      className="text-xs sm:text-sm font-bold text-slate-500 hover:text-[#3A1494] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Lock className="h-3.5 w-3.5 text-amber-500" />
                      <span>Join waitlist →</span>
                    </button>
                  ) : (
                    <Link
                      href={program.actionHref}
                      className="text-xs sm:text-sm font-bold text-[#3A1494] hover:text-[#2c0e78] transition-colors inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>{program.actionText}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
