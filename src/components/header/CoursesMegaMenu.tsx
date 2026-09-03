"use client";

import Link from "next/link";
import {
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
  Flame,
  Clock,
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
    icon: Rocket,
    iconColor: "text-[#FBBF24]",
    isFlagship: true,
    isLocked: false,
  },
  {
    id: "fundamentals",
    title: "Fundamentals of Digital Marketing",
    href: "/categories/fundamentals",
    badge: "COMING SOON",
    badgeColor: "bg-slate-900 text-amber-300 border border-amber-400/30",
    duration: "6 modules · Self-paced",
    description: "The door in. Learn what digital marketing is & how funnels work.",
    icon: BookOpen,
    iconColor: "text-amber-500",
    isLocked: true,
  },
  {
    id: "4m-program",
    title: "4M Program",
    href: "/categories/4m-program",
    badge: "OPEN · ON-CAMPUS",
    badgeColor: "bg-purple-100 text-purple-700 font-bold",
    duration: "4 months · In-person",
    description: "Full-stack marketing condensed at our Madhapur studio floor.",
    icon: Building2,
    iconColor: "text-purple-600",
    isLocked: false,
  },
  {
    id: "pgdm",
    title: "Treqo PGDM",
    href: "/categories/pgdm",
    badge: "COMING SOON",
    badgeColor: "bg-slate-900 text-amber-300 border border-amber-400/30",
    duration: "12 months · Hybrid",
    description: "Post Graduate Diploma built for graduates targeting senior roles.",
    icon: GraduationCap,
    iconColor: "text-indigo-600",
    isLocked: true,
  },
  {
    id: "campus-edition",
    title: "Campus Edition",
    href: "/categories/campus-edition",
    badge: "COMING SOON",
    badgeColor: "bg-slate-900 text-amber-300 border border-amber-400/30",
    duration: "4 months · Online",
    description: "Runs alongside your BBA/MBA without colliding with exams.",
    icon: Zap,
    iconColor: "text-blue-500",
    isLocked: true,
  },
  {
    id: "founder-semester",
    title: "The Founder Semester",
    href: "/categories/founder-semester",
    badge: "COMING SOON",
    badgeColor: "bg-slate-900 text-amber-300 border border-amber-400/30",
    duration: "4 months · Online",
    description: "Marketing & growth for founders launching or scaling ventures.",
    icon: Rocket,
    iconColor: "text-emerald-500",
    isLocked: true,
  },
  {
    id: "performance-growth",
    title: "Performance & Growth Specialist",
    href: "/categories/performance-growth",
    badge: "COMING SOON",
    badgeColor: "bg-slate-900 text-amber-300 border border-amber-400/30",
    duration: "3 months · Online",
    description: "Deep dive into Meta, Google Ads & full-funnel attribution.",
    icon: TrendingUp,
    iconColor: "text-rose-500",
    isLocked: true,
  },
];

export default function CoursesMegaMenu({ onClose, onNavClick }: CoursesMegaMenuProps) {
  const { openApplyModal, openCurriculumModal } = useApplyModal();

  const flagship = coursesData[0];
  const otherCourses = coursesData.slice(1);

  return (
    <div
      role="region"
      aria-label="Courses Mega Menu"
      className="w-full border-t border-slate-200 bg-white py-6 shadow-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_3fr_1fr] lg:gap-8 items-stretch">
          {/* Column 1: Featured Flagship Course */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#3A1494]/20 bg-gradient-to-br from-purple-50/70 via-white to-amber-50/40 p-5 shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#3A1494] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  <Flame className="h-3 w-3 text-amber-300" />
                  <span>{flagship.badge}</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500">{flagship.duration}</span>
              </div>

              <h3 className="mt-3 text-lg font-black tracking-tight text-slate-950">
                {flagship.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {flagship.description}
              </p>

              <div className="mt-4 flex flex-col gap-1.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>30+ Real Brand Case Briefs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>100% Portfolio Graded Capstone</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between">
              <Link
                href={flagship.href}
                onClick={(e) => {
                  onClose();
                  onNavClick(e, flagship.href);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3A1494] hover:text-[#2c0e78] transition-colors"
              >
                <span>View Full Curriculum</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  openApplyModal(flagship.title);
                }}
                className="rounded-lg bg-[#3A1494] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#2c0e78] active:scale-95 transition-all cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Column 2: All Other Learning Tracks */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  All Specialized Tracks
                </span>
                <span className="text-[11px] text-slate-400">
                  Choose your stage
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {otherCourses.map((course) => {
                  const Icon = course.icon;
                  return course.isLocked ? (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        openApplyModal(course.title);
                      }}
                      className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-left transition-all hover:border-amber-300/60 hover:bg-white hover:shadow-xs cursor-pointer"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-2xs group-hover:border-amber-400/40">
                        <Icon className={`h-4 w-4 ${course.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                            {course.title}
                          </p>
                        </div>
                        <div className="mt-0.5 flex items-center gap-1.5">
                          <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.2 text-[9px] font-bold uppercase ${course.badgeColor}`}>
                            <Clock className="h-2.5 w-2.5" />
                            {course.badge}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <Link
                      key={course.id}
                      href={course.href}
                      onClick={(e) => {
                        onClose();
                        onNavClick(e, course.href);
                      }}
                      className="group flex items-start gap-3 rounded-xl border border-purple-100 bg-purple-50/30 p-3 transition-all hover:border-[#3A1494]/30 hover:bg-white hover:shadow-xs cursor-pointer"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-purple-200 shadow-2xs group-hover:border-[#3A1494]/30">
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

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Want personalized course advice?
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openApplyModal();
                }}
                className="text-xs font-bold text-[#3A1494] hover:underline cursor-pointer"
              >
                Talk to an advisor →
              </button>
            </div>
          </div>

          {/* Column 3: Admissions & Syllabus Sidebar */}
          <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-950 via-[#18102a] to-[#2b105a] p-5 text-white shadow-md">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-amber-300">
                <Flame className="h-3 w-3 text-amber-300" />
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

              <button
                type="button"
                onClick={() => {
                  onClose();
                  openCurriculumModal(flagship.title, "/curriculum/new-age-digital-marketing-curriculum.pdf");
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 py-2 text-xs font-semibold text-white/90 hover:bg-white/15 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Syllabus (PDF)</span>
              </button>

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
    </div>
  );
}
