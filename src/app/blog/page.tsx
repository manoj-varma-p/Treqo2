"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts, BLOG_CATEGORIES, type BlogPost } from "@/data/blogs";

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"latest" | "shortest" | "saved">("latest");
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState<number>(0);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const [savedPostIds, setSavedPostIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("treqo_saved_blogs");
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "subscribed">("idle");

  function toggleBookmark(postId: string) {
    setSavedPostIds((prev) => {
      const next = prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId];
      try {
        localStorage.setItem("treqo_saved_blogs", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  // Multi-featured articles list
  const featuredArticles = useMemo(() => {
    const list = blogPosts.filter((p) => p.featured);
    return list.length > 0 ? list : [blogPosts[0]];
  }, []);

  const currentFeatured = featuredArticles[activeFeaturedIndex] || featuredArticles[0];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogPosts.length };
    for (const p of blogPosts) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered and sorted posts
  const filteredPosts = useMemo(() => {
    let result = blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesTag =
        !selectedTag || post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSaved = sortBy !== "saved" || savedPostIds.includes(post.id);

      return matchesCategory && matchesTag && matchesSearch && matchesSaved;
    });

    if (sortBy === "shortest") {
      result = [...result].sort((a, b) => {
        const timeA = parseInt(a.readTime, 10) || 0;
        const timeB = parseInt(b.readTime, 10) || 0;
        return timeA - timeB;
      });
    }

    return result;
  }, [selectedCategory, selectedTag, searchQuery, sortBy, savedPostIds]);

  // Total reading time calculation
  const totalReadTimeMinutes = useMemo(() => {
    return filteredPosts.reduce((acc, p) => {
      const minutes = parseInt(p.readTime, 10) || 5;
      return acc + minutes;
    }, 0);
  }, [filteredPosts]);

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

      <main className="flex-1 pt-14 lg:pt-0 pb-16 sm:pb-20">
        {/* Top Hero Section: Mobile-optimized, Centered, No Symbols */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200/90 py-8 sm:py-16 lg:py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center px-1 sm:px-0">
              {/* Top Badge: Pure text */}
              <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-[#3A1494]">
                TREQO FIELD NOTES & BLOG
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

              {/* Centered Search Bar */}
              <div className="mx-auto mt-6 sm:mt-8 w-full max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles and topics..."
                    className="w-full rounded-full border border-slate-200 bg-white py-2.5 sm:py-3 pl-4 sm:pl-5 pr-12 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:border-[#3A1494] focus:outline-none focus:ring-1 focus:ring-[#3A1494] shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile-Friendly Category Swiper (Horizontal on mobile, wrapped on desktop) */}
              <div className="mt-4 sm:mt-5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
                {BLOG_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat && sortBy !== "saved";
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        if (sortBy === "saved") setSortBy("latest");
                      }}
                      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer select-none ${
                        isActive
                          ? "bg-[#3A1494] text-white shadow-xs"
                          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}

                {/* Saved Stories Filter Pill */}
                <button
                  type="button"
                  onClick={() => setSortBy(sortBy === "saved" ? "latest" : "saved")}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer select-none ${
                    sortBy === "saved"
                      ? "bg-[#3A1494] text-white shadow-xs"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100"
                  }`}
                >
                  <span>Saved</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      sortBy === "saved"
                        ? "bg-white/20 text-white"
                        : "bg-purple-100 text-[#3A1494]"
                    }`}
                  >
                    {savedPostIds.length}
                  </span>
                </button>
              </div>

              {/* Active Tag Filter Indicator */}
              {selectedTag && (
                <div className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-3 py-1 text-xs font-semibold text-[#3A1494]">
                  <span>Tag: {selectedTag}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedTag(null)}
                    className="font-bold underline hover:opacity-75 cursor-pointer ml-1"
                  >
                    Clear tag
                  </button>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Main Content Container */}
        <Container className="mt-6 sm:mt-14">
          {/* Featured Dispatch Showcase */}
          {selectedCategory === "All" && !selectedTag && !searchQuery && sortBy !== "saved" && currentFeatured && (
            <div className="mb-8 sm:mb-12">
              <div className="mb-3 sm:mb-4 flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#3A1494]">
                  FEATURED DISPATCH
                </span>

                {/* Multi-Featured Switcher */}
                {featuredArticles.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {featuredArticles.map((art, idx) => (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => setActiveFeaturedIndex(idx)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition-all cursor-pointer ${
                          activeFeaturedIndex === idx
                            ? "bg-[#3A1494] text-white"
                            : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xs sm:shadow-sm transition-all hover:shadow-xl hover:shadow-purple-950/8">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left: Image Container */}
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-slate-100 min-h-[220px] sm:min-h-[300px]">
                    <Image
                      src={currentFeatured.coverImage}
                      alt={currentFeatured.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-xs border border-white/50 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-[#3A1494] shadow-xs">
                        {currentFeatured.category}
                      </span>
                    </div>
                  </div>

                  {/* Right: Copy & Actions */}
                  <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-10 lg:col-span-5">
                    <div>
                      <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
                        <span>{currentFeatured.publishedAt}</span>
                        <span>·</span>
                        <span>{currentFeatured.readTime}</span>
                      </div>

                      <h2 className="mt-2.5 sm:mt-3 text-lg sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight leading-snug group-hover:text-[#3A1494] transition-colors">
                        <Link href={`/blog/${currentFeatured.slug}`}>
                          {currentFeatured.title}
                        </Link>
                      </h2>

                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                        {currentFeatured.excerpt}
                      </p>

                      {/* Interactive Tags */}
                      <div className="mt-3.5 sm:mt-4 flex flex-wrap gap-1.5">
                        {currentFeatured.tags.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTag(t)}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-700 hover:border-[#3A1494] hover:bg-purple-50 hover:text-[#3A1494] transition-colors cursor-pointer"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8 flex items-center justify-between border-t border-slate-100 pt-4 sm:pt-5">
                      <div className="flex items-center gap-2.5">
                        <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                          <Image
                            src={currentFeatured.author.avatar}
                            alt={currentFeatured.author.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 leading-none">
                            {currentFeatured.author.name}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-500 line-clamp-1">
                            {currentFeatured.author.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewPost(currentFeatured)}
                          className="rounded-lg border border-slate-200 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold text-slate-700 hover:border-purple-300 hover:bg-purple-50 hover:text-[#3A1494] active:bg-slate-100 transition-colors cursor-pointer"
                        >
                          Summary
                        </button>
                        <Link
                          href={`/blog/${currentFeatured.slug}`}
                          className="rounded-lg bg-[#3A1494] px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#2c0e78] active:scale-95 transition-all"
                        >
                          Read
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Sorting & Metadata Bar */}
          <div className="mb-5 sm:mb-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-3 sm:pb-4">
            <div>
              <h3 className="text-base sm:text-xl font-black tracking-tight text-slate-900">
                {sortBy === "saved"
                  ? "Saved Reading List"
                  : selectedTag
                  ? `Articles tagged with "${selectedTag}"`
                  : searchQuery
                  ? `Search results for "${searchQuery}"`
                  : selectedCategory === "All"
                  ? "All Articles"
                  : `${selectedCategory} Articles`}
              </h3>
              <p className="mt-0.5 text-[11px] sm:text-xs font-semibold text-slate-500">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} · ~{totalReadTimeMinutes} min read
              </p>
            </div>

            {/* Sort Switcher */}
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-0.5 sm:p-1 shadow-2xs self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSortBy("latest")}
                className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  sortBy === "latest"
                    ? "bg-[#3A1494] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Latest
              </button>
              <button
                type="button"
                onClick={() => setSortBy("shortest")}
                className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  sortBy === "shortest"
                    ? "bg-[#3A1494] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Shortest Read
              </button>
            </div>
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-xs">
              <h4 className="text-base font-bold text-slate-900">
                {sortBy === "saved" ? "Your saved reading list is empty" : "No articles found"}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                {sortBy === "saved"
                  ? "Click 'Save' on any article card to build your personalized reading list."
                  : "We could not find any articles matching your active search or filters."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedTag(null);
                  setSortBy("latest");
                }}
                className="mt-4 sm:mt-5 inline-flex items-center rounded-xl bg-[#3A1494] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#2c0e78] cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            /* Responsive Grid of Interactive Blog Cards (1 col mobile, 2 sm, 3 lg) */
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onTagClick={(tag) => setSelectedTag(tag)}
                  onQuickPreview={(p) => setPreviewPost(p)}
                  isBookmarked={savedPostIds.includes(post.id)}
                  onToggleBookmark={(id) => toggleBookmark(id)}
                />
              ))}
            </div>
          )}

          {/* Interactive Newsletter Box */}
          <div className="mt-12 sm:mt-20 overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50 via-white to-purple-50/40 p-6 sm:p-12 text-center shadow-sm">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-[#3A1494]">
              WEEKLY FIELD NOTES
            </span>
            <h3 className="mt-3 text-xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Get practical growth breakdowns in your inbox
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              No generic fluff or automated spam. Just real campaign tear-downs, attribution playbooks, and verified lessons from running live budgets.
            </p>

            {newsletterStatus === "subscribed" ? (
              <div className="mx-auto mt-5 sm:mt-6 max-w-md rounded-xl sm:rounded-2xl bg-white border border-emerald-200 p-3.5 sm:p-4 shadow-xs animate-in fade-in duration-300">
                <p className="text-xs sm:text-sm font-bold text-emerald-800">
                  You are subscribed to Treqo Field Notes. Check your inbox soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="mx-auto mt-5 sm:mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
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

      {/* Interactive Quick Summary Modal / Mobile Bottom Sheet */}
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
            {/* Mobile Drag Indicator Pill */}
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

            {/* Core Takeaway Callout */}
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
