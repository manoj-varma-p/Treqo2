import {
  Megaphone,
  Code2,
  Palette,
  Briefcase,
  BarChart3,
  Bot,
  BookOpen,
  FileText,
  Wrench,
  LayoutTemplate,
  FolderKanban,
  Mic2,
} from "lucide-react";
import type { MegaMenuData, NavItem } from "@/types/navigation";

export const primaryNavItems: NavItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "explore", label: "Explore", href: "/explore", hasMegaMenu: true },
  { key: "career-paths", label: "Career Paths", href: "/career-paths" },
  { key: "community", label: "Community", href: "/community" },
];

export const megaMenuData: MegaMenuData = {
  columns: [
    {
      title: "Learn by Category",
      links: [
        { label: "Digital Marketing", href: "/categories/digital-marketing", icon: Megaphone },
        { label: "Development", href: "/categories/development", icon: Code2 },
        { label: "Design", href: "/categories/design", icon: Palette },
        { label: "Business", href: "/categories/business", icon: Briefcase },
        { label: "Data & Analytics", href: "/categories/data-analytics", icon: BarChart3 },
        { label: "AI & Automation", href: "/categories/ai-automation", icon: Bot },
      ],
    },
    {
      title: "Popular Courses",
      links: [
        { label: "SEO Mastery", href: "/courses/seo-mastery" },
        { label: "Google Ads Pro", href: "/courses/google-ads-pro" },
        { label: "Meta Ads Expert", href: "/courses/meta-ads-expert" },
        { label: "UI/UX Design", href: "/courses/ui-ux-design" },
        { label: "React Development", href: "/courses/react-development" },
        { label: "Python for Beginners", href: "/courses/python-for-beginners" },
      ],
    },
    {
      title: "Career Paths",
      links: [
        { label: "Digital Marketer", href: "/career-paths/digital-marketer" },
        { label: "Full Stack Developer", href: "/career-paths/full-stack-developer" },
        { label: "UI/UX Designer", href: "/career-paths/ui-ux-designer" },
        { label: "Data Analyst", href: "/career-paths/data-analyst" },
        { label: "Social Media Manager", href: "/career-paths/social-media-manager" },
        { label: "E-commerce Specialist", href: "/career-paths/e-commerce-specialist" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog & Insights", href: "/resources/blog", icon: BookOpen },
        { label: "Guides & Tutorials", href: "/resources/guides", icon: FileText },
        { label: "Free Tools", href: "/resources/tools", icon: Wrench },
        { label: "Templates", href: "/resources/templates", icon: LayoutTemplate },
        { label: "Case Studies", href: "/resources/case-studies", icon: FolderKanban },
        { label: "Podcast", href: "/resources/podcast", icon: Mic2 },
      ],
    },
  ],
  promo: {
    eyebrow: "Not sure where to start?",
    heading: "Find the right skill for you.",
    ctaLabel: "Take Skill Quiz",
    ctaHref: "/skill-quiz",
  },
};

export const navExtras = {
  searchLabel: "Search",
  searchPlaceholder: "Search courses, career paths...",
  ctaLabel: "Start Learning",
  ctaHref: "/start-learning",
};
