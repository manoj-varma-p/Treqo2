"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

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
    <div className="w-full max-w-md mx-auto lg:max-w-none">
      <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-lg">
        {/* Deep Blue Header Banner */}
        <div className="bg-[#3A1494] px-6 py-6 sm:px-7 sm:py-7">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Download the brochure
          </h2>
          <p className="mt-1 text-xs sm:text-sm font-normal text-white/85">
            Full 18-phase syllabus, fees and batch dates
          </p>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center p-8 text-center sm:p-10">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Brochure is on its way!
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              We&apos;ve sent the complete 18-phase syllabus and batch details to <strong>{email || "your email"}</strong>.
            </p>
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
              className="mt-1 w-full rounded-xl bg-[#f5a623] py-3.5 px-4 text-center text-sm sm:text-base font-extrabold text-slate-950 shadow-xs transition-all hover:bg-[#e59816] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a623] focus-visible:ring-offset-2"
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
