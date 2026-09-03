import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Trophy, ShieldCheck, Flame, Download, Rocket } from "lucide-react";
import Header from "@/components/header/Header";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ApplyButton from "@/components/common/ApplyButton";
import CategorySubNav from "@/components/category/CategorySubNav";
import PhaseAccordion from "@/components/category/PhaseAccordion";
import CategorySidebar from "@/components/category/CategorySidebar";
import CategoryFaqAccordion from "@/components/category/CategoryFaqAccordion";
import MobileEnrollBar from "@/components/category/MobileEnrollBar";
import ProgramHeroCard from "@/components/category/ProgramHeroCard";
import { learningSystemCourses } from "@/data/home";
import { megaMenuData } from "@/data/navigation";

const categoryLinks = megaMenuData.columns.find((column) => column.title === "Learn by Category")?.links ?? [];

function getCourse(slug: string) {
  return learningSystemCourses.find((course) => course.href === `/categories/${slug}`);
}

function getCategoryMeta(slug: string) {
  const link = categoryLinks.find((link) => link.href === `/categories/${slug}`);
  if (link) return link;
  const course = getCourse(slug);
  if (course) return { label: course.title, href: course.href };
  return null;
}

export function generateStaticParams() {
  const courseSlugs = learningSystemCourses.map((c) => ({
    slug: c.href.replace("/categories/", ""),
  }));
  const categorySlugs = categoryLinks.map((link) => ({
    slug: link.href.replace("/categories/", ""),
  }));
  const uniqueSlugs = Array.from(new Set([...courseSlugs.map((s) => s.slug), ...categorySlugs.map((s) => s.slug)]));
  return uniqueSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCategoryMeta(slug);
  if (!meta) return {};

  return {
    title: `${meta.label} | TREQO`,
    description: `Explore TREQO's ${meta.label} track — live mentorship, practical deliverables, and verified career portfolios.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getCategoryMeta(slug);
  if (!meta) notFound();

  const course = getCourse(slug);
  const detail = course?.detail;

  return (
    <main className="pt-14 lg:pt-0 pb-16 lg:pb-0">
      <Header variant="standard" />

      {detail && course ? (
        <section className="relative overflow-hidden border-b border-border-subtle bg-surface pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20">
          {/* Subtle atmospheric gradient in background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl"
          />

          <Container>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div>
                {/* Cohort Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase shadow-xs">
                    {detail.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-alt px-3 py-1 text-[11px] font-semibold text-text-secondary">
                    <Flame className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
                    {detail.batch}
                  </span>
                </div>

                {/* Course Title & Headline */}
                <h1 className="mt-4 text-3xl font-black tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                  {course.title}
                </h1>
                <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
                  {detail.description}
                </p>

                {/* Stat Grid (Fast Scanning) */}
                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 sm:max-w-xl">
                  {detail.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border-subtle/80 bg-surface-alt/40 p-3 sm:px-4 sm:py-3.5 transition-colors"
                    >
                      <p className="text-[10px] font-bold tracking-wider text-text-secondary uppercase sm:text-[11px]">
                        {stat.label}
                      </p>
                      <p className="mt-0.5 text-sm font-black text-text-primary sm:text-base">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Call to Actions on Mobile & Desktop */}
                <div className="mt-6 flex flex-col gap-2.5 sm:max-w-md sm:flex-row">
                  <ApplyButton courseName={course.title} size="lg" fullWidth className="font-bold shadow-md">
                    {detail.applyCtaLabel}
                  </ApplyButton>
                  <Button
                    href="/curriculum/new-age-digital-marketing-curriculum.pdf"
                    download="New Age Digital Marketing - Curriculum.pdf"
                    target="_blank"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    className="font-semibold"
                    icon={<Download className="h-4 w-4 text-brand-primary" aria-hidden="true" />}
                  >
                    {detail.breakdownCtaLabel}
                  </Button>
                </div>
              </div>

              {/* Program Visual Showcase Card (Interactive) */}
              <div className="flex">
                <ProgramHeroCard />
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <section className="relative overflow-hidden bg-[#f3f2f7] pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              backgroundImage: "radial-gradient(rgba(58,22,147,0.12) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <Container className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-xs font-semibold text-brand-primary shadow-sm">
              {meta.icon ? <meta.icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              {meta.label}
            </span>

            <h1 className="mt-5 max-w-3xl text-3xl leading-[1.1] font-black tracking-tight text-text-primary uppercase sm:text-4xl lg:text-5xl">
              {course ? (
                course.title
              ) : (
                <>
                  <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                    {meta.label}
                  </span>{" "}
                  Track
                </>
              )}
            </h1>

            <p className="mt-4 max-w-xl text-sm text-text-secondary sm:text-base">
              {course
                ? course.description
                : `We're putting the finishing touches on the ${meta.label} learning track. Join the waitlist and we'll let you know the moment it opens.`}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ApplyButton
                courseName={`${meta.label} Track`}
                size="lg"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Start Learning Now
              </ApplyButton>
              <Button href="/#courses" variant="secondary">
                Explore Programs
              </Button>
            </div>
          </Container>
        </section>
      )}

      {detail && course ? (
        <>
          <CategorySubNav
            applyHref="/start-learning"
            tabs={[
              { id: "overview", label: "Overview" },
              { id: "phases", label: detail.phasesNavLabel },
              { id: "challenge", label: detail.challengeNavLabel },
              { id: "proof", label: "Proof" },
              { id: "faqs", label: "FAQs" },
            ]}
          />

          <section className="pt-8 pb-16 sm:pt-12 sm:pb-24">
            <Container>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:gap-14">
                <div className="flex flex-col gap-12 sm:gap-16 lg:order-1 lg:col-start-1">
                  {/* 1. Overview */}
                  <section id="overview" className="scroll-mt-36 sm:scroll-mt-40">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-primary">
                        Overview
                      </span>
                    </div>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-text-primary">
                      {detail.overview.whoForHeading}
                    </h2>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {detail.overview.whoFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* 2. Phases */}
                  <section id="phases" className="scroll-mt-36 sm:scroll-mt-40">
                    <PhaseAccordion groups={detail.phases.groups} />
                  </section>

                  {/* 3. The CEO Challenge */}
                  <section id="challenge" className="scroll-mt-36 sm:scroll-mt-40">
                    <div className="rounded-2xl border border-border-subtle bg-surface-alt/60 p-6 sm:p-8">
                      <h2 className="text-xl sm:text-2xl font-black text-text-primary">
                        {detail.challenge.heading}
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {detail.challenge.description}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2 text-xs sm:text-sm text-text-primary font-medium">
                        {detail.challenge.bullets.map((b, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* 4. Proof */}
                  <section id="proof" className="scroll-mt-36 sm:scroll-mt-40">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-primary">
                        Proof & Results
                      </span>
                    </div>
                    <h2 className="mt-2 text-xl sm:text-2xl font-black text-text-primary">
                      {detail.proof.heading}
                    </h2>
                    <p className="mt-1.5 text-xs sm:text-sm text-text-secondary">
                      {detail.proof.description}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {detail.proof.stats.map((st, i) => (
                        <div key={i} className="rounded-xl border border-border-subtle bg-white p-3.5 sm:p-4 text-center">
                          <p className="text-xl sm:text-2xl font-black text-brand-primary">{st.value}</p>
                          <p className="mt-1 text-[11px] sm:text-xs text-text-secondary font-medium">{st.label}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 5. FAQs */}
                  <section id="faqs" className="scroll-mt-36 sm:scroll-mt-40">
                    <CategoryFaqAccordion faqs={detail.faqs} />
                  </section>
                </div>

                {/* Sidebar on desktop / Tablet info */}
                <CategorySidebar
                  sidebar={detail.sidebar}
                  courseTitle={course.title}
                  className="lg:col-start-2 lg:row-start-1"
                />
              </div>
            </Container>
          </section>

          {/* Sticky Mobile Conversion Bar on viewport bottom */}
          <MobileEnrollBar
            batch={detail.batch}
            applyLabel={detail.applyCtaLabel}
            courseTitle={course.title}
          />
        </>
      ) : null}

      {/* Bottom CTA Card */}
      {course ? (
        <section className="pb-16 sm:pb-24">
          <Container>
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b0849] via-[#2c0e78] to-[#3A1494] p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-white/10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                {/* Left 6 cols: Core Offer & CTAs */}
                <div className="flex flex-col items-start text-left lg:col-span-6">
                  <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-amber-300 backdrop-blur-xs">
                    Applications Open · Batch 2
                  </span>

                  <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-[1.15]">
                    Ready to master {meta.label} with real market budgets?
                  </h3>

                  <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-white/80 max-w-lg">
                    Graduate with an industry-grade portfolio of real client campaigns, verified credentials, and live mentorship with active marketing leaders.
                  </p>

                  {/* CTAs */}
                  <div className="mt-7 flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <ApplyButton
                      courseName={course.title}
                      variant="secondary"
                      size="lg"
                      className="border-transparent bg-white text-[#3A1494] hover:bg-white/90 font-black shadow-lg"
                      icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    >
                      Enroll for Batch 2
                    </ApplyButton>

                    <Button
                      href="/curriculum/new-age-digital-marketing-curriculum.pdf"
                      download="New Age Digital Marketing - Curriculum.pdf"
                      target="_blank"
                      variant="secondary"
                      size="lg"
                      className="border-white/20 bg-white/10 text-white hover:bg-white/20 font-bold backdrop-blur-xs"
                      icon={<Download className="h-4 w-4" aria-hidden="true" />}
                    >
                      Download Syllabus
                    </Button>
                  </div>

                  <p className="mt-3 text-[11px] text-white/60 font-medium">
                    Small cohort size to guarantee 1-on-1 mentor reviews for every phase.
                  </p>
                </div>

                {/* Right 6 cols: 4 Key Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:col-span-6">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-300">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Live Agency Sprints</h4>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">
                      Work on real ₹5L+ brand budgets and live ad accounts, not simulated case studies.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/20 text-amber-300">
                        <Trophy className="h-4 w-4" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">CEO Challenge</h4>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">
                      Defend your strategic campaign live in front of agency founders and brand CEOs.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-400/20 text-purple-300">
                        <ShieldCheck className="h-4 w-4" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Modern AI Stack</h4>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">
                      AI workflows, Meta Ads Manager, GA4 attribution, SEO & growth loops from week 1.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-400/20 text-blue-300">
                        <Rocket className="h-4 w-4" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Direct Placements</h4>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">
                      Access to our hiring network of 40+ partner brands and portfolio review sprints.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white">4 Months</p>
                  <p className="text-[11px] text-white/70 font-medium">Full Stack Online</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-amber-300">30+</p>
                  <p className="text-[11px] text-white/70 font-medium">Real Client Briefs</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-emerald-400">₹8.5 LPA</p>
                  <p className="text-[11px] text-white/70 font-medium">Avg Batch 1 Package</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                  <p className="text-[11px] text-white/70 font-medium">Portfolio Graded</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
