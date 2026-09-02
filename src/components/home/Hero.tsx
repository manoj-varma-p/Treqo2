import Container from "@/components/ui/Container";
import HeroNavbar from "@/components/header/HeroNavbar";
import HeroActions from "./HeroActions";
import HeroStats from "./HeroStats";
import HeroVisual from "./HeroVisual";
import { heroContent } from "@/data/home";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-[#fafbfe] pt-6 pb-12 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-0"
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

            {/* Reshaped Stats Table in place of description paragraph */}
            <HeroStats className="mt-6" />

            {/* Action Buttons */}
            <div className="mt-8">
              <HeroActions />
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Form) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <HeroVisual />
          </div>
        </div>
      </Container>

      {/* NAVBAR UNDER THE FORM (Desktop only) */}
      <div className="hidden lg:block mt-8 sm:mt-10">
        <HeroNavbar />
      </div>
    </section>
  );
}
