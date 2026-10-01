import {
  Megaphone,
  Building2,
  GraduationCap,
  Rocket,
  TrendingUp,
  BookOpen,
  FileText,
  Wrench,
  LayoutTemplate,
  FolderKanban,
  Mic2,
} from "lucide-react";
import type { MegaMenuData, NavItem } from "@/types/navigation";

export const announcementBannerData = {
  badge: "BATCH 2 · 50 SEATS",
  text: "Enrollments close on 4th October 2026.",
  linkText: "Explore the courses",
  linkHref: "/#courses",
};

export const primaryNavItems: NavItem[] = [
  { key: "courses", label: "Courses", href: "/#courses" },
  { key: "method", label: "Method", href: "/#method" },
  { key: "placements", label: "Placements", href: "/#placements" },
  { key: "why-treqo", label: "Why Treqo", href: "/#why-treqo" },
  { key: "blog", label: "Blog", href: "/blog", isHighlighted: true, badge: "New" },
  { key: "faq", label: "FAQ", href: "/#faq" },
];

export const megaMenuData: MegaMenuData = {
  columns: [
    {
      title: "Programs by Track",
      links: [
        { label: "New Age Digital Marketing", href: "/new-digital-marketing-program", icon: Megaphone },
        { label: "Campus Edition (On Campus)", href: "/courses/4m-program", icon: Building2 },
        { label: "Treqo PGDM in Marketing", href: "/courses/pgdm", icon: GraduationCap },
        { label: "The Founder Semester", href: "/courses/founder-semester", icon: Rocket },
        { label: "Performance & Growth", href: "/courses/performance-growth", icon: TrendingUp },
        { label: "Fundamentals of Marketing", href: "/courses/fundamentals", icon: BookOpen },
      ],
    },
    {
      title: "By Experience Level",
      links: [
        { label: "Freshers & Career Switchers", href: "/new-digital-marketing-program" },
        { label: "In-Person Studio Learners", href: "/courses/4m-program" },
        { label: "Beginners & College Students", href: "/courses/fundamentals" },
        { label: "Working Marketers (Upskill)", href: "/courses/performance-growth" },
        { label: "Senior Leads & Executives", href: "/courses/pgdm" },
        { label: "Early-Stage Founders", href: "/courses/founder-semester" },
      ],
    },
    {
      title: "Career Paths",
      links: [
        { label: "Performance Marketing Lead", href: "/#placements" },
        { label: "Growth Marketing Specialist", href: "/#placements" },
        { label: "Brand & Creative Strategist", href: "/#placements" },
        { label: "SEO & Content Lead", href: "/#placements" },
        { label: "Social Media & Media Buyer", href: "/#placements" },
        { label: "Founder & Venture Builder", href: "/#placements" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog & Field Notes", href: "/blog", icon: BookOpen },
        { label: "Verified Certifications", href: "/#certs", icon: FileText },
        { label: "Curriculum Syllabus (PDF)", href: "/curriculum/new-age-digital-marketing-curriculum.pdf", icon: Wrench },
        { label: "Practitioner Mentors", href: "/#tutors", icon: LayoutTemplate },
        { label: "The CEO Challenge Method", href: "/#method", icon: FolderKanban },
        { label: "Frequently Asked Questions", href: "/#faq", icon: Mic2 },
      ],
    },
  ],
  promo: {
    eyebrow: "Not sure where to start?",
    heading: "Find the right skill track for you.",
    ctaLabel: "Apply for Batch 2",
    ctaHref: "/#apply",
  },
};

export const navExtras = {
  searchLabel: "Search",
  searchPlaceholder: "Search courses, career paths...",
  ctaLabel: "Apply now",
  ctaHref: "/#apply",
};
