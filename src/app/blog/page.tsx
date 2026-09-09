"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Container from "@/components/ui/Container";
import { blogPosts, type BlogPost } from "@/data/blogs";

export default function BlogIndexPage() {
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "subscribed">("idle");

  const post = blogPosts[0];

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("subscribed");
    }, 600);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9fd] text-slate-900">
      <Header variant="standard" />

      <main className="flex-1 pb-16 sm:pb-20">
        {/* Top Hero Section */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200/90 py-10 sm:py-16 lg:py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center px-1 sm:px-0">
              {/* Top Badge */}
              <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-[#3A1494]">
                TREQO FIELD NOTES &amp; BLOG
              </span>

              {/* Main Headline */}
              <h1 className="mt-3 sm:mt-4 text-2xl sm:text-4xl lg:text-[3.25rem] font-black tracking-tight text-slate-950 leading-[1.15] sm:leading-[1.12]">
                Real Budgets. Real Stakes.
                <span className="block text-[#3A1494]">Practical Growth Insights.</span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-2.5 sm:mt-4 max-w-2xl text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                Field notes, growth breakdowns, and tactical playbooks from practitioners running real ad accounts, building attribution systems, and defending unit economics out loud.
              </p>
            </div>
          </Container>
        </section>

        {/* Main Content Container: Single Flagship Article */}
        <Container className="mt-8 sm:mt-14 max-w-4xl">
          {post && (
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xs sm:shadow-sm transition-all hover:shadow-xl hover:shadow-purple-950/8">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left: Image Container */}
                <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-slate-100 min-h-[240px] sm:min-h-[340px]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-xs border border-white/50 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-[#3A1494] shadow-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Right: Copy & Actions */}
                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:col-span-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <span>{post.publishedAt}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="mt-2.5 sm:mt-3 text-lg sm:text-2xl font-black text-slate-950 tracking-tight leading-snug group-hover:text-[#3A1494] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>

                    {/* Interactive Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 flex items-center justify-between border-t border-slate-100 pt-4 sm:pt-5">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-none">
                          {post.author.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-500 line-clamp-1">
                          {post.author.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewPost(post)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-purple-300 hover:bg-purple-50 hover:text-[#3A1494] active:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Summary
                      </button>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="rounded-lg bg-[#3A1494] px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#2c0e78] active:scale-95 transition-all"
                      >
                        Read
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Newsletter Box */}
          <div className="mt-10 sm:mt-16 overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50 via-white to-purple-50/40 p-6 sm:p-10 text-center shadow-sm">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-[#3A1494]">
              WEEKLY FIELD NOTES
            </span>
            <h3 className="mt-3 text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Get practical growth breakdowns in your inbox
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              No generic fluff or automated spam. Just real campaign tear-downs, attribution playbooks, and verified lessons from running live budgets.
            </p>

            {newsletterStatus === "subscribed" ? (
              <div className="mx-auto mt-5 max-w-md rounded-xl sm:rounded-2xl bg-white border border-emerald-200 p-3.5 sm:p-4 shadow-xs animate-in fade-in duration-300">
                <p className="text-xs sm:text-sm font-bold text-emerald-800">
                  You are subscribed to Treqo Field Notes. Check your inbox soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:border-[#3A1494] focus:outline-none focus:ring-1 focus:ring-[#3A1494]"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="rounded-xl bg-[#3A1494] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#2c0e78] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </Container>
      </main>

      {/* Interactive Quick Summary Modal */}
      {previewPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewPost(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator */}
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-300 sm:hidden" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 sm:pb-4">
              <span className="rounded-full bg-purple-50 border border-purple-200 px-3 py-0.5 text-xs font-bold text-[#3A1494]">
                {previewPost.category}
              </span>
              <button
                type="button"
                onClick={() => setPreviewPost(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer p-1"
              >
                Close
              </button>
            </div>

            {/* Modal Title & Meta */}
            <div className="mt-3.5 sm:mt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span>{previewPost.publishedAt}</span>
                <span>·</span>
                <span>{previewPost.readTime}</span>
              </div>
              <h3 className="mt-1.5 sm:mt-2 text-base sm:text-xl font-black text-slate-950 tracking-tight leading-snug">
                {previewPost.title}
              </h3>
            </div>

            {/* Core Takeaway */}
            <div className="mt-3.5 sm:mt-4 rounded-xl border border-purple-200 bg-purple-50/60 p-3.5 sm:p-4">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#3A1494]">
                30-SECOND TAKEAWAY
              </span>
              <p className="mt-1 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {previewPost.excerpt}
              </p>
            </div>

            {/* Key Content Points */}
            <div className="mt-3.5 sm:mt-4 space-y-1.5 sm:space-y-2">
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wide">
                Key Points Covered
              </span>
              <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#3A1494] font-black">•</span>
                  <span>Real campaign execution vs theoretical case studies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3A1494] font-black">•</span>
                  <span>Unit economics, CAC thresholds, and attribution verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3A1494] font-black">•</span>
                  <span>Why top growth venture studios hire proof-of-work portfolios</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-6 flex items-center justify-end gap-2.5 sm:gap-3 border-t border-slate-100 pt-3.5 sm:pt-4">
              <button
                type="button"
                onClick={() => setPreviewPost(null)}
                className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <Link
                href={`/blog/${previewPost.slug}`}
                className="rounded-xl bg-[#3A1494] px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#2c0e78] transition-all"
              >
                Read Full Article
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
