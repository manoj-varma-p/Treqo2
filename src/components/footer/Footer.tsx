"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { useApplyModal } from "@/context/ApplyModalContext";

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
  isApplyAction?: boolean;
}

const coursesLinks: FooterLink[] = [
  { label: "New Age Digital Marketing", href: "/categories/digital-marketing" },
  { label: "Fundamentals of Digital Marketing", href: "/#course-fundamentals" },
  { label: "4M Program", href: "/#course-4m-program" },
  { label: "Treqo PGDM", href: "/#course-pgdm" },
  { label: "Campus Edition", href: "/#course-campus-edition" },
  { label: "The Founder Semester", href: "/#course-founder-semester" },
  { label: "Performance & Growth Specialist", href: "/#course-performance-growth" },
];

const schoolLinks: FooterLink[] = [
  { label: "The CEO Challenge & Method", href: "/#method" },
  { label: "Why Treqo", href: "/#why-treqo" },
  { label: "Batch 1 Outcomes", href: "/#placements" },
  { label: "Mentors & Faculty", href: "/#tutors" },
  { label: "Verified Certifications", href: "/#certs" },
  { label: "Frequently Asked Questions", href: "/#faq" },
];

const talkLinks: FooterLink[] = [
  { label: "Apply for Batch 2", href: "/#apply", isApplyAction: true },
  { label: "Fee Plans & Structure", href: "/#fees" },
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
    <footer className="bg-[#0a0f24] text-slate-400 pt-16 sm:pt-20 pb-12 border-t border-slate-900">
      <Container>
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Column 1: Brand & Contact info */}
          <div className="flex flex-col items-start lg:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <span className="text-2xl font-black tracking-tight text-white leading-none">
                TREQO
              </span>
            </Link>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-400 max-w-sm">
              Treqo — The Marketing School. A brand of TAC School of Modern Learning Pvt. Ltd.
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Plot+No.+286,+4th+Floor,+Road+No+16,+Ayyappa+Society+Main+Rd,+Madhapur,+Telangana+500081"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-xs leading-relaxed text-slate-400 hover:text-white transition-colors max-w-sm"
            >
              <span className="font-semibold text-slate-300">Campus Address:</span><br />
              Plot No. 286, 4th Floor, Road No 16, Ayyappa Society Main Rd, Madhapur, Telangana 500081
            </a>

            <div className="mt-6 flex flex-col gap-1.5 text-xs sm:text-sm">
              <a
                href="tel:+919948000491"
                className="font-bold text-white hover:text-[#FBBF24] transition-colors"
              >
                +91 99480 00491
              </a>
              <a
                href="mailto:admission@treqo.org"
                className="text-slate-400 hover:text-white transition-colors"
              >
                admission@treqo.org
              </a>
              <a
                href="https://treqo.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                treqo.org
              </a>
            </div>
          </div>

          {/* Column 2: Courses */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FBBF24]">
              COURSES
            </span>
            <ul className="flex flex-col gap-2.5 mt-1 text-xs sm:text-sm">
              {coursesLinks.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
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

          {/* Column 3: The School */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FBBF24]">
              THE SCHOOL
            </span>
            <ul className="flex flex-col gap-2.5 mt-1 text-xs sm:text-sm">
              {schoolLinks.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
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

          {/* Column 4: Talk to Us / Admissions */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FBBF24]">
              TALK TO US
            </span>
            <ul className="flex flex-col gap-2.5 mt-1 text-xs sm:text-sm">
              {talkLinks.map((link) => (
                <li key={link.label}>
                  {link.isApplyAction ? (
                    <button
                      type="button"
                      onClick={() => openApplyModal()}
                      className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.label}
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
        <div className="mt-14 border-t border-slate-800/70 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TAC School of Modern Learning Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
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
