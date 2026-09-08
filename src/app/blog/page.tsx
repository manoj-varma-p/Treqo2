"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts, BLOG_CATEGORIES } from "@/data/blogs";

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9fd] text-slate-900">
      <Header variant="standard" />

      <main className="flex-1 pt-14 lg:pt-0 pb-20">
        {/* Top Hero Section: Neatly Centered, Zero Empty Space, No Symbols */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200/90 py-12 sm:py-16 lg:py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge: Pure text without symbols */}
              <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1 text-xs font-bold text-[#3A1494]">
                TREQO FIELD NOTES & BLOG
              </span>

              {/* Main Headline */}
              <h1 className="mt-4 text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-950 leading-[1.12]">
                Real Budgets. Real Stakes.
                <span className="block text-[#3A1494]">Practical Growth Insights.</span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Field notes, growth breakdowns, and tactical playbooks from practitioners running real ad accounts, building attribution systems, and defending unit economics out loud.
              </p>

              {/* Centered Search Bar */}
              <div className="mx-auto mt-8 w-full max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles and topics..."
                    className="w-full rounded-full border border-slate-200 bg-white py-3 pl-5 pr-10 text-xs sm:text-sm text-slate-900 placeholder:text-slate-600 focus:border-[#3A1494] focus:outline-none focus:ring-1 focus:ring-[#3A1494] shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Centered Category Pills */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {BLOG_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer select-none ${
                        isActive
                          ? "bg-[#3A1494] text-white shadow-xs"
                          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Main Content Area */}
        <Container className="mt-10 sm:mt-14">
          {/* Featured Post Spotlight (When no search/category filter active) */}
          {selectedCategory === "All" && !searchQuery && featuredPost && (
            <div className="mb-12">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3A1494]">
                  FEATURED DISPATCH
                </span>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-purple-950/5">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left: Image */}
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-slate-100 min-h-[280px]">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-xs border border-white/50 px-3 py-1 text-xs font-bold text-[#3A1494] shadow-xs">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:col-span-5">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                        <span>{featuredPost.publishedAt}</span>
                        <span>·</span>
                        <span>{featuredPost.readTime}</span>
                      </div>

                      <h2 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight leading-tight group-hover:text-[#3A1494] transition-colors">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>

                      {/* Clean tags without hashtag symbols */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {featuredPost.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 leading-none">
                            {featuredPost.author.name}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-600">
                            {featuredPost.author.role}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center text-xs font-bold text-[#3A1494] hover:underline"
                      >
                        Read article
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Header for Articles Grid */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : selectedCategory === "All"
                ? "All Articles"
                : `${selectedCategory} Articles`}
            </h3>
            <span className="text-xs font-semibold text-slate-600">
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
              <h4 className="text-base font-bold text-slate-900">
                No articles found
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                We could not find any articles matching your search query. Try clearing your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-5 inline-flex items-center rounded-xl bg-[#3A1494] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#2c0e78] cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            /* Responsive Grid of Blog Cards */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Bottom Newsletter Card */}
          <div className="mt-16 sm:mt-20 overflow-hidden rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50 via-white to-purple-50/40 p-8 sm:p-12 text-center shadow-sm">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-[#3A1494]">
              WEEKLY FIELD NOTES
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Get practical growth breakdowns in your inbox
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              No generic fluff or automated spam. Just real campaign tear-downs, attribution playbooks, and verified lessons from running live budgets.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! You have been subscribed to Treqo Field Notes.");
              }}
              className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-600 focus:border-[#3A1494] focus:outline-none focus:ring-1 focus:ring-[#3A1494]"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#3A1494] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#2c0e78] active:scale-95 transition-all cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
