"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface ProgramCard {
  id: string;
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
    previewLabel: "SELF-PACED MODULE SCREEN",
    badge: { text: "FREE", variant: "amber" },
    meta: "6 modules · Self-paced",
    title: "Fundamentals of Digital Marketing",
    description:
      "The door in. What digital marketing is, how funnels behave, and what to settle before you pay for anything.",
    actionText: "Start free →",
    actionHref: "#free-course",
    tags: ["All", "Short", "Students"],
  },
  {
    id: "4m-program",
    previewLabel: "MADHAPUR STUDIO FLOOR",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "4 months · On campus",
    title: "4M Program",
    description:
      "Full-stack marketing, condensed and in person. Brand strategy through performance in four months.",
    actionText: "Join waitlist →",
    actionHref: "#waitlist-4m",
    tags: ["All", "Short"],
  },
  {
    id: "pgdm",
    previewLabel: "COHORT SESSION",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "12 months · Hybrid",
    title: "Treqo PGDM",
    description:
      "Post Graduate Diploma in New Age Marketing. Built for graduates ready for senior marketing roles.",
    actionText: "Join waitlist →",
    actionHref: "#waitlist-pgdm",
    tags: ["All", "PG"],
  },
  {
    id: "campus-edition",
    previewLabel: "STUDENT AT DESK",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "4 months · Online",
    title: "Campus Edition",
    description:
      "The flagship, timed to run alongside a BBA or MBA without colliding with your semester exams.",
    actionText: "Join waitlist →",
    actionHref: "#waitlist-campus",
    tags: ["All", "Students"],
  },
  {
    id: "founder-semester",
    previewLabel: "FOUNDER PITCH SESSION",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "4 months · Online",
    title: "The Founder Semester",
    description:
      "Marketing and entrepreneurship for people who want to launch, scale, or run their own venture.",
    actionText: "Join waitlist →",
    actionHref: "#waitlist-founder",
    tags: ["All", "Short", "Flagship"],
  },
  {
    id: "performance-growth",
    previewLabel: "LIVE MEDIA DASHBOARD",
    badge: { text: "BUILDING", variant: "gray" },
    meta: "3 months · Online",
    title: "Performance & Growth Specialist",
    description:
      "Deep dive into Meta, Google Ads, and attribution models for direct response growth.",
    actionText: "Join waitlist →",
    actionHref: "#waitlist-growth",
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
    <section id="courses" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col items-start max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.12] tracking-tight text-slate-950">
            One is open. Six are being built. We&apos;d rather say so.
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
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
                  "rounded-full px-4.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-150",
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

        {/* 3x2 Grid of Program Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:shadow-md hover:border-slate-300"
            >
              {/* Top Diagonal Striped Visual Box */}
              <div className="relative h-36 sm:h-40 w-full overflow-hidden border-b border-slate-200/80 bg-[#f4f6f9]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #eef2f7 0, #eef2f7 14px, #f8fafc 14px, #f8fafc 28px)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <div className="rounded-md border border-slate-300/80 bg-white/90 px-3 py-1 text-center shadow-2xs backdrop-blur-xs">
                    <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      {program.previewLabel}
                    </span>
                  </div>
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
                  <h3 className="mt-3 text-lg sm:text-xl font-bold tracking-tight text-slate-900">
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
                    className="text-xs sm:text-sm font-bold text-[#3A1494] hover:text-[#2c0e78] transition-colors inline-flex items-center"
                  >
                    {program.actionText}
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
