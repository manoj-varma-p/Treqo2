"use client";

import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-950/5 hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-xs border border-white/40 px-2.5 py-1 text-[11px] font-bold text-[#3A1494] shadow-xs">
              {post.category}
            </span>
          </div>

          {/* Read Time without symbol */}
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center rounded-md bg-slate-950/70 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold text-white/90">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">
          <p className="text-[11px] font-semibold text-slate-600">
            {post.publishedAt}
          </p>

          <h3 className="mt-2 text-base sm:text-lg font-bold tracking-tight text-slate-950 leading-snug transition-colors group-hover:text-[#3A1494]">
            {post.title}
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags - Pure text without hashtag symbols */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Author info + Read text link */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 leading-none">
                  {post.author.name}
                </span>
                <span className="mt-0.5 text-[10px] text-slate-600 line-clamp-1">
                  {post.author.role}
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-[#3A1494] group-hover:underline">
              Read
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
