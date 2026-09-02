import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles, Trophy, ShieldCheck, Flame } from "lucide-react";
import Header from "@/components/header/Header";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CategorySubNav from "@/components/category/CategorySubNav";
import PhaseAccordion from "@/components/category/PhaseAccordion";
import CategorySidebar from "@/components/category/CategorySidebar";
import CategoryFaqAccordion from "@/components/category/CategoryFaqAccordion";
import MobileEnrollBar from "@/components/category/MobileEnrollBar";
import { learningSystemCourses } from "@/data/home";
import { megaMenuData } from "@/data/navigation";

const categoryLinks = megaMenuData.columns.find((column) => column.title === "Learn by Category")?.links ?? [];

function getCategoryMeta(slug: string) {
  return categoryLinks.find((link) => link.href === `/categories/${slug}`);
}

function getCourse(slug: string) {
  return learningSystemCourses.find((course) => course.href === `/categories/${slug}`);
}

export function generateStaticParams() {
  return categoryLinks.map((link) => ({ slug: link.href.replace("/categories/", "") }));
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
    title: `${meta.label} Courses | TREQO`,
    description: `Explore TREQO's ${meta.label} learning track — live mentorship, hands-on projects and career support.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getCategoryMeta(slug);
  if (!meta) notFound();

  const course = getCourse(slug);
  const detail = course?.detail;

  return (
    <main className="pb-16 lg:pb-0">
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
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase shadow-xs">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {detail.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface-alt px-3 py-0.5 text-[11px] font-semibold tracking-wide text-text-secondary uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {detail.batch}
                  </span>
                </div>

                {/* Course Title */}
                <h1 className="mt-4 text-3xl leading-[1.08] font-black tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                  {course.title}
                </h1>

                {/* Description */}
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
                  {detail.description}
                </p>

                {/* Key Quick Stats Cards */}
                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:max-w-md sm:gap-3">
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
                  <Button href="/start-learning" size="lg" fullWidth className="font-bold shadow-md">
                    {detail.applyCtaLabel}
                  </Button>
                  <Button href="/start-learning" variant="secondary" size="lg" fullWidth className="font-semibold">
                    {detail.breakdownCtaLabel}
                  </Button>
                </div>
              </div>

              {/* Program Visual Showcase Card */}
              <div className="flex">
                <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-[#1b0b47] via-[#2a1065] to-[#120730] p-5 sm:p-7 shadow-[0_20px_50px_-20px_rgba(27,11,71,0.5)] text-white">
                  {/* Mesh / Grid Glow overlay */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />

                  {/* Header Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-white/90 backdrop-blur-xs">
                      <Flame className="h-3 w-3 text-amber-400" aria-hidden="true" />
                      12-Phase Curriculum
                    </span>
                    <span className="text-[11px] font-semibold text-white/70">
                      Cohort Model
                    </span>
                  </div>

                  {/* Center Card Content */}
                  <div className="relative z-10 my-6 sm:my-8 flex flex-col gap-3">
                    <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white/10 text-white shadow-inner backdrop-blur-md">
                      <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-amber-300" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                      Master modern marketing by doing the actual work.
                    </h2>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                      Zero multiple choice exams. You run live budgets, deploy actual ad copy, and defend campaign ROI in front of industry leaders.
                    </p>
                  </div>

                  {/* Outcome Highlight Pills */}
                  <div className="relative z-10 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                    <div className="rounded-lg bg-white/5 p-2 text-center backdrop-blur-xs">
                      <p className="text-base sm:text-lg font-black text-amber-300">12</p>
                      <p className="text-[10px] font-semibold text-white/70">Phases</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2 text-center backdrop-blur-xs">
                      <p className="text-base sm:text-lg font-black text-emerald-300">30+</p>
                      <p className="text-[10px] font-semibold text-white/70">Projects</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2 text-center backdrop-blur-xs">
                      <p className="text-base sm:text-lg font-black text-sky-300">100%</p>
                      <p className="text-[10px] font-semibold text-white/70">Portfolio</p>
                    </div>
                  </div>
                </div>
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
              <Button href="/start-learning" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                Start Learning Now
              </Button>
              <Button href="/career-paths" variant="secondary">
                Explore Career Paths
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
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
                      {detail.overview.whoForHeading}
                    </h2>
                    <ul className="mt-5 flex flex-col gap-2.5 sm:gap-3">
                      {detail.overview.whoFor.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 rounded-xl border border-border-subtle/80 bg-surface-alt/30 p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed text-text-secondary"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                          <span className="font-medium text-text-primary/90">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* How It Differs */}
                    <div className="mt-6 rounded-2xl border border-border-subtle bg-surface p-4 sm:p-6 shadow-xs">
                      <p className="text-[10px] sm:text-[11px] font-bold tracking-wider text-text-secondary uppercase">
                        How This Learning System Differs
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        {detail.overview.differentiators.map((item) => (
                          <div
                            key={item.label}
                            className="rounded-xl border border-border-subtle/70 bg-surface-alt/40 p-3 sm:p-4"
                          >
                            <p className="text-xl sm:text-2xl font-black text-brand-primary">{item.value}</p>
                            <p className="mt-1 text-[11px] sm:text-xs font-semibold text-text-secondary">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* 2. The 12 Phases */}
                  <section id="phases" className="scroll-mt-36 sm:scroll-mt-40">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-primary">
                        Curriculum
                      </span>
                    </div>
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
                      {detail.phases.heading}
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed text-text-secondary sm:text-sm sm:leading-relaxed">
                      {detail.phases.intro}
                    </p>

                    <PhaseAccordion groups={detail.phases.groups} />
                  </section>

                  {/* 3. The CEO Challenge */}
                  <section id="challenge" className="scroll-mt-36 sm:scroll-mt-40">
                    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border-subtle bg-gradient-to-br from-slate-950 via-[#181126] to-[#251246] p-5 sm:p-8 text-white shadow-xl">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-amber-300">
                          <Trophy className="h-3 w-3" aria-hidden="true" />
                          Capstone Evaluation
                        </span>
                      </div>
                      <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl text-white">
                        {detail.challenge.heading}
                      </h2>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/80">
                        {detail.challenge.description}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                        {detail.challenge.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs"
                          >
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* 4. Proof / Outcomes */}
                  <section id="proof" className="scroll-mt-36 sm:scroll-mt-40">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-primary">
                        Results
                      </span>
                    </div>
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
                      {detail.proof.heading}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-text-secondary">
                      {detail.proof.description}
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
                      {detail.proof.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-border-subtle bg-surface p-4 sm:p-5 text-center shadow-xs"
                        >
                          <p className="text-2xl font-black text-brand-primary sm:text-3xl">{stat.value}</p>
                          <p className="mt-1 text-[11px] sm:text-xs font-semibold text-text-secondary">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 5. FAQs */}
                  <section id="faqs" className="scroll-mt-36 sm:scroll-mt-40">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-primary">
                        Got Questions?
                      </span>
                    </div>
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
                      Frequently Asked Questions
                    </h2>
                    <CategoryFaqAccordion faqs={detail.faqs} />
                  </section>
                </div>

                {/* Sidebar on desktop / Tablet info */}
                <CategorySidebar sidebar={detail.sidebar} className="lg:col-start-2 lg:row-start-1" />
              </div>
            </Container>
          </section>

          {/* Sticky Mobile Conversion Bar on viewport bottom */}
          <MobileEnrollBar
            batch={detail.batch}
            applyLabel={detail.applyCtaLabel}
            applyHref="/start-learning"
          />
        </>
      ) : null}

      {/* Bottom CTA Card */}
      {course ? (
        <section className="pb-16 sm:pb-24">
          <Container>
            <div className="flex flex-col items-center gap-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-[#2f117a] to-brand-primary-dark px-5 py-10 sm:px-12 sm:py-14 text-center text-white shadow-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-white/90">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Applications Open
              </span>
              <h3 className="max-w-lg text-2xl font-black tracking-tight text-white sm:text-3xl">
                Ready to start your {meta.label} journey?
              </h3>
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/85">
                {["Live mentorship", "12 Real-world phases", "CEO Challenge review"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                href="/start-learning"
                variant="secondary"
                size="lg"
                className="mt-2 border-transparent bg-white text-brand-primary hover:bg-white/90 font-bold shadow-md"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Enroll for Batch 2
              </Button>
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
