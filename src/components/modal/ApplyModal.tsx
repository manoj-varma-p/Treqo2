"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X, CheckCircle2, ChevronDown, Sparkles, Download, Phone, ArrowRight } from "lucide-react";
import { useApplyModal } from "@/context/ApplyModalContext";

const availableCourses = [
  "New Age Digital Marketing",
  "Fundamentals of Digital Marketing",
  "4M Program",
  "Treqo PGDM",
  "Campus Edition",
  "The Founder Semester",
  "Performance & Growth Specialist",
];

export default function ApplyModal() {
  const { isOpen, courseName, closeApplyModal } = useApplyModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [selectedCourse, setSelectedCourse] = useState(courseName);
  const [background, setBackground] = useState("College Student / Recent Graduate");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (courseName) {
      setSelectedCourse(courseName);
    }
  }, [courseName]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      return;
    }

    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeApplyModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeApplyModal]);

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          course: selectedCourse,
          background,
          source: "Apply for Batch 2 Modal",
        }),
      });
    } catch (err) {
      console.error("Apply submission error:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  function handleReset() {
    setName("");
    setEmail("");
    setPhone("+91 ");
    setSubmitted(false);
    closeApplyModal();
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dim & Blur Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={closeApplyModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95 duration-200 my-auto"
      >
        {/* Top Header */}
        <div className="relative bg-[#3A1494] px-6 py-6 sm:px-8 sm:py-7 text-white">
          <button
            type="button"
            onClick={closeApplyModal}
            aria-label="Close modal"
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 active:scale-95 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            <Sparkles className="h-3.5 w-3.5 text-[#FBBF24]" aria-hidden="true" />
            <span>Batch 2 · Now Enrolling</span>
          </div>

          <h2 id="apply-modal-title" className="mt-2.5 text-2xl sm:text-3xl font-black tracking-tight text-white">
            Apply for Batch 2
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/85">
            Leave with work you can show in an interview, not a certificate.
          </p>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center p-8 text-center sm:p-10 animate-in fade-in duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Application Received!
            </h3>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-sm">
              Thank you, <span className="font-bold text-slate-900">{name || "Applicant"}</span>! Our admissions team will review your application for <span className="font-semibold text-[#3A1494]">{selectedCourse}</span> and reach out at <span className="font-semibold text-slate-900">{phone}</span> to schedule a 20-minute discussion.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full">
              <a
                href="/curriculum/new-age-digital-marketing-curriculum.pdf"
                download="New Age Digital Marketing - Curriculum.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#3A1494] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#2c0e78] active:scale-98 transition-all"
              >
                <Download className="h-4 w-4" />
                <span>Download Curriculum (PDF)</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 sm:p-8">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-fullName" className="text-xs sm:text-sm font-bold text-slate-800">
                Full name <span className="text-rose-500">*</span>
              </label>
              <input
                id="modal-fullName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20 transition-all"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-email" className="text-xs sm:text-sm font-bold text-slate-800">
                Email address <span className="text-rose-500">*</span>
              </label>
              <input
                id="modal-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20 transition-all"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-phone" className="text-xs sm:text-sm font-bold text-slate-800">
                Phone / WhatsApp number <span className="text-rose-500">*</span>
              </label>
              <input
                id="modal-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20 transition-all"
              />
            </div>

            {/* Course of interest */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-course" className="text-xs sm:text-sm font-bold text-slate-800">
                Program of interest
              </label>
              <div className="relative">
                <select
                  id="modal-course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-900 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20 transition-all cursor-pointer"
                >
                  {availableCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Current Background */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-background" className="text-xs sm:text-sm font-bold text-slate-800">
                Current background
              </label>
              <div className="relative">
                <select
                  id="modal-background"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-900 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20 transition-all cursor-pointer"
                >
                  <option value="College Student / Recent Graduate">College Student / Recent Graduate</option>
                  <option value="Working Professional (Marketing)">Working Professional (Marketing)</option>
                  <option value="Career Switcher (Non-Marketing)">Career Switcher (Non-Marketing)</option>
                  <option value="Founder / Business Owner">Founder / Business Owner</option>
                  <option value="Freelancer / Consultant">Freelancer / Consultant</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-xl bg-[#3A1494] py-3.5 px-4 text-center text-sm sm:text-base font-bold text-white shadow-md hover:bg-[#2c0e78] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A1494] focus-visible:ring-offset-2 transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Submitting application...</span>
              ) : (
                <>
                  <span>Submit Application</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Disclaimer */}
            <p className="text-[11px] leading-relaxed text-slate-500 text-center">
              No spam. 20-minute admissions discussion only. We&apos;ll be honest if the program isn&apos;t a fit.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
