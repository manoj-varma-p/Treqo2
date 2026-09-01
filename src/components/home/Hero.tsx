import { Rocket } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/header/Logo";
import HeroActions from "./HeroActions";
import HeroBackgroundShape from "./HeroBackgroundShape";
import HeroStats from "./HeroStats";
import HeroVisual from "./HeroVisual";
import { heroContent } from "@/data/home";

export default function Hero() {
  return (
    <section id="hero" className="relative z-0 overflow-hidden pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[460px] w-[460px] rounded-full bg-brand-secondary/10 blur-3xl" />
      </div>

      <HeroBackgroundShape />

      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-10 lg:gap-y-6">
          {/* Intro: badge, heading, description, pills — column 1, row 1 on desktop */}
          <div className="lg:col-start-1 lg:row-start-1">
            <Logo className="mb-5 hidden lg:block" />

            <div className="animate-fade-up flex flex-col items-start gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-1.5 text-xs font-semibold text-brand-primary sm:text-sm">
                <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
                {heroContent.eyebrow}
              </span>

              <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-[3.35rem]">
                {heroContent.headline.lines.map((line, index) => (
                  <span key={line} className="block">
                    {index === heroContent.headline.emphasizedLine ? (
                      <span className="relative inline-block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                        {line}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary opacity-40"
                        />
                      </span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h1>

              <p className="max-w-lg text-base text-text-secondary sm:text-lg">{heroContent.description}</p>

              <ul className="flex flex-wrap gap-2.5">
                {heroContent.featurePills.map((pill) => {
                  const Icon = pill.icon;
                  return (
                    <li
                      key={pill.label}
                      className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-2 text-sm font-medium text-text-secondary"
                    >
                      <Icon className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                      {pill.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Visual: full-height right column on desktop; sits between heading and CTA on mobile */}
          <div className="animate-fade-in [animation-delay:200ms] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <HeroVisual />
          </div>

          {/* Actions + stats — column 1, row 2 on desktop */}
          <div className="flex flex-col items-start gap-6 lg:col-start-1 lg:row-start-2 lg:self-start">
            <HeroActions />
            {/* <HeroStats /> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
