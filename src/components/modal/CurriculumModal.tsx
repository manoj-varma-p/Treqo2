"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X, CheckCircle2, Download, ArrowRight, FileText } from "lucide-react";
import { useApplyModal } from "@/context/ApplyModalContext";

export default function CurriculumModal() {
  const { isCurriculumOpen, curriculumCourse, curriculumPdfUrl, closeCurriculumModal } = useApplyModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isCurriculumOpen) {
      setSubmitted(false);
      return;
    }

    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeCurriculumModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCurriculumOpen, closeCurriculumModal]);

  if (!isCurriculumOpen) return null;

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
          course: curriculumCourse,
          source: "Curriculum Download Form",
        }),
      });

      // Automatically trigger file download
      const downloadLink = document.createElement("a");
      downloadLink.href = curriculumPdfUrl || "/curriculum/new-age-digital-marketing-curriculum.pdf";
      downloadLink.download = `${curriculumCourse.replace(/\s+/g, "_")}_Curriculum.pdf`;
      downloadLink.target = "_blank";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error("Curriculum download submission error:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  function handleClose() {
    setName("");
    setEmail("");
    setPhone("+91 ");
    setSubmitted(false);
    closeCurriculumModal();
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dim & Blur Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="curriculum-modal-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95 duration-200 my-auto"
      >
        {/* Top Header */}
        <div className="relative bg-[#3A1494] px-6 py-6 sm:px-8 sm:py-7 text-white">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 active:scale-95 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-amber-300 backdrop-blur-xs mb-2">
            <FileText className="h-3 w-3" />
            <span>Curriculum Breakdown</span>
          </div>

          <h2 id="curriculum-modal-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white pr-10">
            Download Curriculum
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/85">
            Get the full week-by-week phase roadmap, deliverables & toolstack.
          </p>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center p-8 text-center sm:p-12 animate-in fade-in duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
              Submitted
            </h3>
            <p className="mt-2 text-sm text-slate-600 max-w-xs leading-relaxed">
              Your curriculum download has started automatically.
            </p>

            <a
              href={curriculumPdfUrl || "/curriculum/new-age-digital-marketing-curriculum.pdf"}
              download={`${curriculumCourse.replace(/\s+/g, "_")}_Curriculum.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#3A1494] hover:underline"
            >
              <Download className="h-4 w-4" />
              <span>Click here if the download didn&apos;t begin</span>
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="mt-8 rounded-full bg-slate-900 px-7 py-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 sm:p-8">
            {/* Target Program (Locked) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-800">
                Program
              </label>
              <div className="flex items-center justify-between rounded-xl border border-[#3A1494]/20 bg-purple-50/70 px-4 py-3 shadow-2xs">
                <span className="text-sm font-bold text-[#3A1494]">
                  {curriculumCourse}
                </span>
                <span className="rounded-md bg-[#3A1494] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  Syllabus PDF
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="curriculum-fullName" className="text-xs sm:text-sm font-bold text-slate-800">
                Full name <span className="text-rose-500">*</span>
              </label>
              <input
                id="curriculum-fullName"
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
              <label htmlFor="curriculum-email" className="text-xs sm:text-sm font-bold text-slate-800">
                Email address <span className="text-rose-500">*</span>
              </label>
              <input
                id="curriculum-email"
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
              <label htmlFor="curriculum-phone" className="text-xs sm:text-sm font-bold text-slate-800">
                WhatsApp / Phone number <span className="text-rose-500">*</span>
              </label>
              <input
                id="curriculum-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#3A1494] focus:outline-none focus:ring-2 focus:ring-[#3A1494]/20 transition-all"
              />
            </div>

            {/* Submit CTA */}
            <div className="mt-2 flex flex-col gap-2.5">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3A1494] px-5 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#2c0e78] hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Download className="h-4 w-4 text-amber-300" />
                    <span>Download Curriculum</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400">
                🔒 Your contact info is private. No spam, only your course curriculum.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
