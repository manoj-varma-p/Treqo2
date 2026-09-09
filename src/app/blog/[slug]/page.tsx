import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blogs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Treqo Blog",
    };
  }

  return {
    title: `${post.title} | Treqo Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts from same or other categories
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9fd] text-slate-900">
      <Header variant="standard" />

      <main className="flex-1 pb-16 sm:pb-20">
        <article>
          {/* Header Section: Mobile-optimized padding & typography */}
          <header className="relative bg-white border-b border-slate-200/90 py-6 sm:py-14">
            <Container className="max-w-4xl px-4 sm:px-6">
              {/* Back to Blog breadcrumb */}
              <div className="mb-4 sm:mb-6 flex items-center gap-2">
                <Link
                  href="/blog"
                  className="text-xs font-bold text-[#3A1494] hover:underline"
                >
                  Back to all dispatches
                </Link>
                <span className="text-slate-300">/</span>
                <span className="text-xs font-semibold text-slate-500 line-clamp-1">
                  {post.category}
                </span>
              </div>

              {/* Category & Read Time (No symbols) */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-[#3A1494]">
                  {post.category}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {post.readTime}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-semibold text-slate-500">
                  {post.publishedAt}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-3 sm:mt-4 text-xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-[1.2] sm:leading-[1.18]">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="mt-3 sm:mt-4 text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
                {post.excerpt}
              </p>

              {/* Author Row */}
              <div className="mt-6 sm:mt-8 flex items-center justify-between border-t border-slate-100 pt-4 sm:pt-6">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative h-9 w-9 sm:h-11 sm:w-11 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
                      {post.author.name}
                    </p>
                    <p className="mt-0.5 text-[10px] sm:text-xs text-slate-500">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {post.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Container>
          </header>

          {/* Featured Image */}
          <div className="bg-white pb-6 sm:pb-14">
            <Container className="max-w-4xl px-4 sm:px-6">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-3xl border border-slate-200 shadow-sm sm:shadow-md">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            </Container>
          </div>

          {/* Article Body */}
          <Container className="max-w-3xl px-4 sm:px-6">
            {/* Key Takeaway Box - No symbols */}
            <div className="mb-6 sm:mb-10 rounded-xl sm:rounded-2xl border border-purple-200/80 bg-purple-50/50 p-4 sm:p-7 shadow-2xs">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A1494]">
                CORE TAKEAWAY
              </div>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-semibold text-slate-900 leading-relaxed">
                Theory without real capital is just speculation. To build an unassailable career in high-growth companies, ground your skills in live budgets, clean attribution models, and defensible ROI.
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-lg text-slate-700 leading-relaxed font-normal">
              {post.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Quote block */}
            <div className="my-6 sm:my-10 border-l-4 border-[#3A1494] bg-white p-4 sm:p-7 rounded-r-xl sm:rounded-r-2xl border border-slate-200/80 shadow-xs">
              <p className="text-xs sm:text-lg font-bold text-slate-900 italic leading-relaxed">
                &ldquo;A right answer with no evidence behind it does not pass. You submit the numbers, you defend the unit economics, and you own the outcome.&rdquo;
              </p>
              <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A1494]">
                The Treqo Operating Standard
              </p>
            </div>

            {/* Tags footer - Pure text without hashtag symbols */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-1.5 sm:gap-2 border-t border-slate-200 pt-4 sm:pt-6">
              <span className="text-xs font-bold text-slate-500">Tags:</span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </Container>
        </article>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 sm:mt-20 border-t border-slate-200 bg-white py-10 sm:py-20">
            <Container className="px-4 sm:px-6">
              <div className="mb-6 sm:mb-10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3A1494]">
                    KEEP READING
                  </span>
                  <h3 className="mt-0.5 sm:mt-1 text-xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    Related Dispatches
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-[#3A1494] hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rPost) => (
                  <BlogCard key={rPost.id} post={rPost} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
