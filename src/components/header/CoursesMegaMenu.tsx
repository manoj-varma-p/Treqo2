"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Download,
  Phone,
  GraduationCap,
  Zap,
  Building2,
  Rocket,
  TrendingUp,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { useApplyModal } from "@/context/ApplyModalContext";

interface CoursesMegaMenuProps {
  onClose: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const coursesData = [
  {
    id: "digital-marketing",
    title: "New Age Digital Marketing",
    href: "/categories/digital-marketing",
    badge: "BATCH 2 · OPEN",
    badgeColor: "bg-[#3A1494] text-white",
    duration: "4 months · Online",
    description: "The flagship. 18 phases, 30+ real brand projects, AI in the workflow.",
    icon: Sparkles,
    iconColor: "text-[#FBBF24]",
    isFlagship: true,
  },
  {
    id: "fundamentals",
    title: "Fundamentals of Digital Marketing",
    href: "/#course-fundamentals",
    badge: "FREE",
    badgeColor: "bg-[#FBBF24] text-black font-black",
    duration: "6 modules · Self-paced",
    description: "The door in. Learn what digital marketing is & how funnels work.",
    icon: BookOpen,
    iconColor: "text-amber-500",
  },
  {
    id: "4m-program",
    title: "4M Program",
    href: "/#course-4m-program",
    badge: "ON-CAMPUS",
    badgeColor: "bg-purple-100 text-purple-700",
    duration: "4 months · In-person",
    description: "Full-stack marketing condensed at our Madhapur studio floor.",
    icon: Building2,
    iconColor: "text-purple-600",
  },
  {
    id: "pgdm",
    title: "Treqo PGDM",
    href: "/#course-pgdm",
    badge: "HYBRID",
    badgeColor: "bg-slate-100 text-slate-700",
    duration: "12 months · Hybrid",
    description: "Post Graduate Diploma built for graduates targeting senior roles.",
    icon: GraduationCap,
    iconColor: "text-indigo-600",
  },
  {
    id: "campus-edition",
    title: "Campus Edition",
    href: "/#course-campus-edition",
    badge: "STUDENTS",
    badgeColor: "bg-blue-100 text-blue-700",
    duration: "4 months · Online",
    description: "Runs alongside your BBA/MBA without colliding with exams.",
    icon: Zap,
    iconColor: "text-blue-500",
  },
  {
    id: "founder-semester",
    title: "The Founder Semester",
    href: "/#course-founder-semester",
    badge: "FOUNDERS",
    badgeColor: "bg-emerald-100 text-emerald-700",
    duration: "4 months · Online",
    description: "Marketing & growth for founders launching or scaling ventures.",
    icon: Rocket,
    iconColor: "text-emerald-500",
  },
  {
    id: "performance-growth",
    title: "Performance & Growth Specialist",
    href: "/#course-performance-growth",
    badge: "GROWTH",
    badgeColor: "bg-rose-100 text-rose-700",
    duration: "3 months · Online",
    description: "Deep dive into Meta, Google Ads & full-funnel attribution.",
    icon: TrendingUp,
    iconColor: "text-rose-500",
  },
];

export default function CoursesMegaMenu({ onClose, onNavClick }: CoursesMegaMenuProps) {
  const { openApplyModal } = useApplyModal();

  const flagship = coursesData[0];
  const otherCourses = coursesData.slice(1);

  return (
    <div className="absolute top-full left-0 mt-3 w-[880px] rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="grid grid-cols-12 gap-6">
        {/* Left 8 Cols: Course Tracks Grid */}
        <div className="col-span-8 flex flex-col gap-4">
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Explore All Programs
              </span>
              <p className="text-xs text-slate-500">
                Live mentorship & real-world client briefs
              </p>
            </div>
            <Link
              href="/#courses"
              onClick={(e) => {
                onClose();
                onNavClick(e, "/#courses");
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#3A1494] hover:underline"
            >
              <span>View full comparison</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Featured Flagship Card */}
          <Link
            href={flagship.href}
            onClick={() => onClose()}
            className="group relative flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-gradient-to-r from-purple-50/70 via-indigo-50/40 to-white p-4 transition-all hover:border-[#3A1494]/40 hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3A1494] text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 text-[#FBBF24]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#3A1494] transition-colors">
                  {flagship.title}
                </span>
                <span className="rounded-md bg-[#3A1494] px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                  {flagship.badge}
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {flagship.duration}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {flagship.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#3A1494] group-hover:translate-x-1 transition-all mt-1" />
          </Link>

          {/* 2-Column Grid for Other Tracks */}
          <div className="grid grid-cols-2 gap-2.5">
            {otherCourses.map((course) => {
              const Icon = course.icon;
              return (
                <Link
                  key={course.id}
                  href={course.href}
                  onClick={(e) => {
                    onClose();
                    onNavClick(e, course.href);
                  }}
                  className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition-all hover:border-slate-300 hover:bg-white hover:shadow-xs"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-2xs group-hover:border-[#3A1494]/30">
                    <Icon className={`h-4 w-4 ${course.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-xs font-bold text-slate-900 group-hover:text-[#3A1494] transition-colors">
                        {course.title}
                      </p>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold uppercase ${course.badgeColor}`}>
                        {course.badge}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Highlight & Action Sidebar */}
        <div className="col-span-4 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-950 via-[#18102a] to-[#2b105a] p-5 text-white shadow-md">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-amber-300">
              <Sparkles className="h-3 w-3" />
              Admissions Open
            </span>

            <h4 className="mt-3 text-base font-black tracking-tight text-white leading-snug">
              Batch 2 Admissions Now Enrolling
            </h4>

            <ul className="mt-3.5 space-y-2 text-xs text-white/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Live CEO Challenge Capstone</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>1-on-1 Mentor Evaluation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Verified Career Portfolio</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-2.5 border-t border-white/15 pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                openApplyModal();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FBBF24] py-2.5 text-xs font-black text-black shadow-md hover:bg-amber-300 active:scale-95 transition-all cursor-pointer"
            >
              <span>Apply for Batch 2</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <a
              href="/curriculum/new-age-digital-marketing-curriculum.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Syllabus (PDF)</span>
            </a>

            <a
              href="tel:+919948000491"
              className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-emerald-400" />
              <span>Admissions: +91 99480 00491</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
