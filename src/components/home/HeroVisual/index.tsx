"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, CheckCircle2, Download } from "lucide-react";

export default function HeroVisual() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [course, setCourse] = useState("New Age Digital Marketing");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div id="apply" className="w-full max-w-md mx-auto lg:max-w-none scroll-mt-28">
      <div id="fees" className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-lg scroll-mt-28">
        {/* Form Body */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center p-8 text-center sm:p-10">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Brochure is ready!
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Click below to download the complete 12-phase curriculum PDF:
            </p>
            <a
              href="/curriculum/new-age-digital-marketing-curriculum.pdf"
              download="New Age Digital Marketing - Curriculum.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#3A1494] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#2e0f77] active:scale-95 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download Curriculum (PDF)</span>
            </a>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 text-xs font-semibold text-[#3A1494] underline underline-offset-2"
            >
              Download another copy
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 p-6 sm:p-7">
            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-xs sm:text-sm font-bold text-slate-800">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs sm:text-sm font-bold text-slate-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs sm:text-sm font-bold text-slate-800">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 "
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20"
              />
            </div>

            {/* Course of interest */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="course" className="text-xs sm:text-sm font-bold text-slate-800">
                Course of interest
              </label>
              <div className="relative">
                <select
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-900 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20"
                >
                  <option value="New Age Digital Marketing">New Age Digital Marketing</option>
                  <option value="Fundamentals of Digital Marketing">Fundamentals of Digital Marketing</option>
                  <option value="4M Program">4M Program</option>
                  <option value="Treqo PGDM">Treqo PGDM</option>
                  <option value="Campus Edition">Campus Edition</option>
                  <option value="The Founder Semester">The Founder Semester</option>
                  <option value="Performance & Growth Specialist">Performance &amp; Growth Specialist</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* CTA Submit Button */}
            <button
              type="submit"
              className="mt-1 w-full rounded-xl bg-[#3A1494] py-3.5 px-4 text-center text-sm sm:text-base font-extrabold text-white shadow-xs transition-all hover:bg-[#2c0e78] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A1494] focus-visible:ring-offset-2"
            >
              Get the brochure
            </button>

            {/* Footer Disclaimer */}
            <p className="text-xs leading-relaxed text-slate-500">
              No spam. One call from an advisor, and we&apos;ll tell you honestly if this isn&apos;t for you.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
