import Link from "next/link";
import Container from "@/components/ui/Container";

const coursesLinks = [
  { label: "New Age Digital Marketing", href: "/categories/digital-marketing" },
  { label: "Fundamentals of Digital Marketing", href: "#free-course" },
  { label: "AI in Marketing", href: "#ai-marketing" },
  { label: "4M Program", href: "#waitlist-4m" },
  { label: "Treqo PGDM", href: "#waitlist-pgdm" },
  { label: "Campus Edition", href: "#waitlist-campus" },
  { label: "The Founder Semester", href: "#waitlist-founder" },
];

const schoolLinks = [
  { label: "The CEO Challenge", href: "#method" },
  { label: "Why Treqo", href: "#why-treqo" },
  { label: "Batch 1 outcomes", href: "#placements" },
  { label: "Campus", href: "#campus" },
  { label: "FAQ", href: "#faq" },
];

const talkLinks = [
  { label: "Get the brochure", href: "#brochure" },
  { label: "Fee plans", href: "#fees" },
  { label: "Book a campus visit", href: "#campus-visit" },
  { label: "Hire our students", href: "#hire" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0f24] text-slate-400 pt-16 sm:pt-20 pb-12 border-t border-slate-900">
      <Container>
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Column 1: Brand & Contact info */}
          <div className="flex flex-col items-start lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3A1494] text-white shadow-xs">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-6h2v6zm0-8h-2V6h2v2z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                treqo
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

          {/* Column 3: The School */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FBBF24]">
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

          {/* Column 4: Talk to Us */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FBBF24]">
              TALK TO US
            </span>
            <ul className="flex flex-col gap-2.5 mt-1 text-xs sm:text-sm">
              {talkLinks.map((link) => (
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
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="mt-14 border-t border-slate-800/70 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TAC School of Modern Learning Pvt. Ltd.</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link href="#terms" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
