"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
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
  },
  {
    id: "fundamentals",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    previewLabel: "SELF-PACED MODULE SCREEN",
    badge: { text: "FREE", variant: "amber" },
    meta: "6 modules · Self-paced",
    title: "Fundamentals of Digital Marketing",
    description:
      "The door in. What digital marketing is, how funnels behave, and what to settle before you pay for anything.",
    actionText: "Start free →",
    actionHref: "/#apply",
    tags: ["All", "Short", "Students"],
  },
  {
    id: "4m-program",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    previewLabel: "MADHAPUR STUDIO FLOOR",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "4 months · On campus",
    title: "4M Program",
    description:
      "Full-stack marketing, condensed and in person. Brand strategy through performance in four months.",
    actionText: "Join waitlist →",
    actionHref: "/#apply",
    tags: ["All", "Short"],
  },
  {
    id: "pgdm",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    previewLabel: "COHORT SESSION",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "12 months · Hybrid",
    title: "Treqo PGDM",
    description:
      "Post Graduate Diploma in New Age Marketing. Built for graduates ready for senior marketing roles.",
    actionText: "Join waitlist →",
    actionHref: "/#apply",
    tags: ["All", "PG"],
  },
  {
    id: "campus-edition",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    previewLabel: "STUDENT AT DESK",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "4 months · Online",
    title: "Campus Edition",
    description:
      "The flagship, timed to run alongside a BBA or MBA without colliding with your semester exams.",
    actionText: "Join waitlist →",
    actionHref: "/#apply",
    tags: ["All", "Students"],
  },
  {
    id: "founder-semester",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    previewLabel: "FOUNDER PITCH SESSION",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "4 months · Online",
    title: "The Founder Semester",
    description:
      "Marketing and entrepreneurship for people who want to launch, scale, or run their own venture.",
    actionText: "Join waitlist →",
    actionHref: "/#apply",
    tags: ["All", "Short", "Flagship"],
  },
  {
    id: "performance-growth",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    previewLabel: "LIVE MEDIA DASHBOARD",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "3 months · Online",
    title: "Performance & Growth Specialist",
    description:
      "Deep dive into Meta, Google Ads, and attribution models for direct response growth.",
    actionText: "Join waitlist →",
    actionHref: "/#apply",
    tags: ["All", "Short"],
  },
];

const filterCategories = ["All", "Flagship", "Short", "PG", "Students"];

export default function LearningSystem() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPrograms =
    activeFilter === "All"
      ? programs
      : programs.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="courses" className="bg-surface-alt/40 py-16 sm:py-24 border-t border-slate-200/80 scroll-mt-20">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-brand-primary">
            Curriculum & Tracks
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Choose Your Learning Path
          </h2>
          <p className="mt-3 max-w-2xl text-xs sm:text-base text-slate-600">
            From zero-to-one fundamentals to executive masteries, engineered with real client deliverables.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer",
                  activeFilter === cat
                    ? "bg-[#3A1494] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Program Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              id={`course-${program.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-all duration-300 scroll-mt-28"
            >
              {/* Card Image Header */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
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
                  <Link
                    href={program.actionHref}
                    className="text-xs sm:text-sm font-bold text-[#3A1494] hover:text-[#2c0e78] transition-colors inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{program.actionText}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
