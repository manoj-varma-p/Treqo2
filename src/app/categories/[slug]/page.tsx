import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/header/Header";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CategorySubNav from "@/components/category/CategorySubNav";
import PhaseAccordion from "@/components/category/PhaseAccordion";
import CategorySidebar from "@/components/category/CategorySidebar";
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
    <main>
      <Header variant="standard" />

      {detail && course ? (
        <section className="border-b border-border-subtle bg-surface pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-md bg-brand-primary px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
                    {detail.badge}
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
                    {detail.batch}
                  </span>
                </div>

                <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-text-primary sm:text-5xl">
                  {course.title}
                </h1>

                <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
                  {detail.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
                  {detail.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border-subtle px-4 py-3"
                    >
                      <p className="text-[11px] font-semibold tracking-wide text-text-secondary uppercase">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-base font-bold text-text-primary">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-border-subtle sm:aspect-[16/11]"
                  style={{
                    backgroundColor: "var(--surface-alt)",
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, rgba(58,22,147,0.1) 0, rgba(58,22,147,0.1) 1px, transparent 1px, transparent 14px)",
                  }}
                >
                  <span className="rounded-lg bg-surface px-4 py-2 text-xs font-semibold tracking-wide text-text-secondary uppercase shadow-sm">
                    Program Cover Image
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <Button href="/start-learning" size="lg" fullWidth>
                    {detail.applyCtaLabel}
                  </Button>
                  <Button href="/start-learning" variant="secondary" size="lg" fullWidth>
                    {detail.breakdownCtaLabel}
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <section className="relative overflow-hidden bg-[#f3f2f7] pt-16 pb-20 sm:pt-20 lg:pb-28">
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

            <h1 className="mt-5 max-w-3xl text-3xl leading-[1.1] font-extrabold tracking-tight text-text-primary uppercase sm:text-4xl lg:text-5xl">
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
              { id: "fees", label: "Fees" },
              { id: "proof", label: "Proof" },
              { id: "faqs", label: "FAQs" },
            ]}
          />

          <section className="pt-10 pb-20 sm:pt-12 sm:pb-24">
            <Container>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
                <div className="flex flex-col gap-16 lg:order-1 lg:col-start-1">
                  <section id="overview" className="scroll-mt-40">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                      {detail.overview.whoForHeading}
                    </h2>
                    <ul className="mt-5 flex flex-col gap-3">
                      {detail.overview.whoFor.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-brand-primary" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 rounded-2xl border border-border-subtle p-6">
                      <p className="text-[11px] font-semibold tracking-wide text-text-secondary uppercase">
                        How it differs
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
                        {detail.overview.differentiators.map((item) => (
                          <div key={item.label}>
                            <p className="text-2xl font-extrabold text-text-primary sm:text-3xl">{item.value}</p>
                            <p className="mt-1 text-xs text-text-secondary sm:text-sm">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section id="phases" className="scroll-mt-40">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                      {detail.phases.heading}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                      {detail.phases.intro}
                    </p>

                    <PhaseAccordion groups={detail.phases.groups} />
                  </section>

                  <section id="challenge" className="scroll-mt-40">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                      {detail.challenge.heading}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                      {detail.challenge.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-3">
                      {detail.challenge.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-full border border-border-subtle px-4 py-2 text-xs font-semibold text-text-primary sm:text-sm"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section id="fees" className="scroll-mt-40">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                      {detail.fees.heading}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                      {detail.fees.description}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {detail.fees.plans.map((plan) => (
                        <div key={plan.name} className="rounded-2xl border border-border-subtle p-6">
                          <p className="text-sm font-semibold text-text-secondary">{plan.name}</p>
                          <p className="mt-1 text-2xl font-extrabold text-text-primary">{plan.price}</p>
                          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{plan.description}</p>
                          <ul className="mt-4 flex flex-col gap-2">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="proof" className="scroll-mt-40">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
                      {detail.proof.heading}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                      {detail.proof.description}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {detail.proof.stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-border-subtle p-5 text-center">
                          <p className="text-2xl font-extrabold text-brand-primary sm:text-3xl">{stat.value}</p>
                          <p className="mt-1 text-xs text-text-secondary sm:text-sm">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="faqs" className="scroll-mt-40">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">FAQs</h2>
                    <div className="mt-5 flex flex-col divide-y divide-border-subtle border-t border-border-subtle">
                      {detail.faqs.map((faq) => (
                        <div key={faq.question} className="py-5">
                          <p className="text-sm font-semibold text-text-primary sm:text-base">{faq.question}</p>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <CategorySidebar sidebar={detail.sidebar} className="lg:col-start-2 lg:row-start-1" />
              </div>
            </Container>
          </section>
        </>
      ) : null}

      {course ? (
        <section className="pb-20 sm:pb-24">
          <Container>
            <div className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-brand-primary to-brand-primary-dark px-6 py-12 text-center sm:px-12">
              <h3 className="max-w-lg text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to start your {meta.label} journey?
              </h3>
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
                {["Live mentorship", "Hands-on projects", "Career support"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                href="/start-learning"
                variant="secondary"
                className="border-transparent bg-white text-brand-primary hover:bg-white/90"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Enroll Now
              </Button>
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
