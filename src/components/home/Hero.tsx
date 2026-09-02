import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import HeroActions from "./HeroActions";
import HeroStats from "./HeroStats";
import HeroVisual from "./HeroVisual";
import { heroContent } from "@/data/home";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-0 overflow-hidden bg-[#fafbfe] pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-20"
    >
      <Container>
        {/* Main 2-column Hero content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Left Column: Eyebrow, Title, Description, CTA Buttons, Checkpoints */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Eyebrow badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-slate-200/90 bg-white px-4 py-1 text-xs sm:text-sm font-medium text-slate-700 shadow-2xs">
              {heroContent.eyebrow}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.65rem] font-black leading-[1.08] tracking-tight text-slate-950">
              {heroContent.headline.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Description Paragraph */}
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
              {heroContent.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8">
              <HeroActions />
            </div>

            {/* Highlights / Checkpoints List */}
            {heroContent.highlights && heroContent.highlights.length > 0 && (
              <ul className="mt-8 flex flex-col gap-3">
                {heroContent.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-600">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <HeroVisual />
          </div>
        </div>

        {/* Bottom Metrics / Stats Bar */}
        <div className="mt-14 sm:mt-18">
          <HeroStats />
        </div>
      </Container>
    </section>
  );
}
