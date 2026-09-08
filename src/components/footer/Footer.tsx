"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { useApplyModal } from "@/context/ApplyModalContext";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
  isApplyAction?: boolean;
}

const schoolLinks: FooterLink[] = [
  { label: "Method & Challenge", href: "/#method" },
  { label: "Why Treqo", href: "/#why-treqo" },
  { label: "Batch 1 Outcomes", href: "/#placements" },
  { label: "Mentors & Faculty", href: "/#tutors" },
  { label: "Verified Certifications", href: "/#certs" },
  { label: "Frequently Asked Questions", href: "/#faq" },
];

const talkLinks: FooterLink[] = [
  { label: "Apply for Batch 2", href: "/#apply", isApplyAction: true },
  {
    label: "Visit Madhapur Campus",
    href: "https://www.google.com/maps/search/?api=1&query=Plot+No.+286,+4th+Floor,+Road+No+16,+Ayyappa+Society+Main+Rd,+Madhapur,+Telangana+500081",
    isExternal: true,
  },
  { label: "admission@treqo.org", href: "mailto:admission@treqo.org", isExternal: true },
  { label: "+91 99480 00491", href: "tel:+919948000491", isExternal: true },
];

export default function Footer() {
  const { openApplyModal } = useApplyModal();

  return (
    <footer className="bg-[#0a0f24] text-slate-400 pt-10 sm:pt-16 lg:pt-20 pb-10 border-t border-slate-900">
      <Container>
        {/* Mobile Version: Compact Layout without Courses */}
        <div className="md:hidden flex flex-col space-y-6">
          {/* Brand & Social Header */}
          <div>
            <div className="flex items-center justify-between">
              <Link href="/" className="inline-flex items-center">
                <span className="text-2xl font-black tracking-tight text-white leading-none">
                  TREQO
                </span>
              </Link>
              <a
                href="https://instagram.com/treqo.ed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Treqo on Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-slate-300 hover:text-purple-400 transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              The Marketing School · Treqo School of Modern Learning Pvt. Ltd.
            </p>

            <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
              Madhapur Studio Floor: Plot 286, Rd 16, Ayyappa Society, Hyderabad 500081
            </p>
          </div>

          {/* 2-Column Links Grid on Mobile: The School & Talk to Us */}
          <div className="grid grid-cols-2 gap-5 border-t border-slate-800/70 pt-5">
            {/* The School Column */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 block mb-2.5">
                THE SCHOOL
              </span>
              <ul className="flex flex-col gap-2 text-xs">
                {schoolLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors block leading-snug"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Talk to Us Column */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 block mb-2.5">
                TALK TO US
              </span>
              <ul className="flex flex-col gap-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => openApplyModal()}
                    className="text-left font-bold text-purple-400 hover:underline cursor-pointer leading-snug"
                  >
                    Apply for Batch 2 →
                  </button>
                </li>
                {talkLinks.slice(1).map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-slate-400 hover:text-white transition-colors block leading-snug"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors block leading-snug"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Version: 3-Column Balanced Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Column 1: Brand & Contact Info */}
          <div className="flex flex-col items-start lg:col-span-6">
            <Link href="/" className="inline-flex items-center">
              <span className="text-2xl font-black tracking-tight text-white leading-none">
                TREQO
              </span>
            </Link>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-400 max-w-md">
              Treqo — The Marketing School. Treqo School of Modern Learning Pvt. Ltd.
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Plot+No.+286,+4th+Floor,+Road+No+16,+Ayyappa+Society+Main+Rd,+Madhapur,+Telangana+500081"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-xs leading-relaxed text-slate-400 hover:text-white transition-colors max-w-md"
            >
              <span className="font-semibold text-slate-300">Campus Address:</span><br />
              Plot No. 286, 4th Floor, Road No 16, Ayyappa Society Main Rd, Madhapur, Telangana 500081
            </a>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400">
                FOLLOW US
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://instagram.com/treqo.ed"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Treqo on Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-slate-300 hover:border-purple-400 hover:text-purple-400 hover:scale-110 active:scale-95 transition-all shadow-xs"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: The School */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400">
              THE SCHOOL
            </span>
            <ul className="flex flex-col gap-2.5 mt-1 text-xs sm:text-sm">
              {schoolLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Talk to Us / Admissions */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400">
              TALK TO US
            </span>
            <ul className="flex flex-col gap-2.5 mt-1 text-xs sm:text-sm">
              {talkLinks.map((link) => (
                <li key={link.label}>
                  {link.isApplyAction ? (
                    <button
                      type="button"
                      onClick={() => openApplyModal()}
                      className="text-left font-bold text-purple-400 hover:underline transition-colors cursor-pointer"
                    >
                      {link.label} →
                    </button>
                  ) : link.isExternal ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="mt-8 md:mt-14 border-t border-slate-800/70 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 Treqo School of Modern Learning Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <Link href="/#hero" className="hover:text-slate-400 transition-colors">
              Back to top ↑
            </Link>
            <a
              href="mailto:admission@treqo.org?subject=Privacy%20Policy%20Inquiry"
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="mailto:admission@treqo.org?subject=Terms%20of%20Service%20Inquiry"
              className="hover:text-slate-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
