import Container from "@/components/ui/Container";
import HeroNavbar from "@/components/header/HeroNavbar";
import HeroActions from "./HeroActions";
import HeroStats from "./HeroStats";
import Logo from "@/components/header/Logo";
import { getHomePageContent } from "@/lib/cms";
import HeroImageSlider from "./HeroImageSlider";

export default async function Hero() {
  const homeContent = await getHomePageContent();
  const hero = homeContent.hero;
  const eyebrow = hero.eyebrow?.trim() || "India's leading Marketing School";

  const fallbackSliderImages = [
    "/images/hero-slider/hero-slide-1.webp",
    "/images/hero-slider/hero-slide-2.webp",
    "/images/hero-slider/hero-slide-3.webp",
    "/images/hero-slider/hero-slide-4.webp",
    "/images/hero-slider/hero-slide-5.webp",
  ];

  const sliderImages =
    hero.sliderImages && hero.sliderImages.length > 0
      ? hero.sliderImages
      : fallbackSliderImages;

  return (
    <section
      id="hero"
      className="relative bg-[#FDFAF6] pt-3 pb-8 sm:pt-4 sm:pb-10 lg:pt-4 lg:pb-0 text-[#1A0A1A] overflow-hidden"
    >
      {/* Architectural Grid Background - seamlessly spans entire hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Continuous architectural grid lines across entire canvas */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 13, 59, 0.045) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 13, 59, 0.045) 1px, transparent 1px)
            `,
            backgroundSize: "10px 10px",
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          }}
        />
        {/* Soft edge gradient to blend gently into the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFAF6]/80" />
        {/* Ambient subtle plum atmospheric glow */}
        <div className="absolute top-12 left-1/4 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[#8C6A8C]/12 blur-[140px]" />
      </div>

      {/* Hero Full Background Visual Artwork (Desktop) - Balanced proportions with comfortable margin */}
      <div className="pointer-events-none absolute right-3 lg:right-6 xl:right-10 top-5 lg:top-7 xl:top-9 bottom-[92px] xl:bottom-[104px] z-0 hidden lg:flex items-center justify-end overflow-visible w-[50%] lg:w-[47%] xl:w-[45%] 2xl:w-[44%]">
        {/* Ambient colorful plum & champagne glow orbs directly behind the artwork */}
        <div
          aria-hidden="true"
          className="absolute right-[8%] bottom-[12%] -z-10 h-[380px] w-[380px] rounded-full bg-[#3B0D3B]/18 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="absolute right-[24%] top-[12%] -z-10 h-[320px] w-[320px] rounded-full bg-[#8C6A8C]/20 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="absolute right-[10%] top-[25%] -z-10 h-[220px] w-[220px] rounded-full bg-[#F5EDE0] blur-[70px]"
        />

        {/* Full Image Artwork shifted neatly with 2-second crossfade loop */}
        <div className="relative h-full w-full max-w-[580px] xl:max-w-[660px] 2xl:max-w-[720px] flex items-center justify-end -translate-y-1.5 lg:-translate-y-2.5 xl:-translate-y-3">
          <HeroImageSlider
            images={sliderImages}
            alt="Treqo Modern Digital Marketing - Practical Cohort"
            sizes="(min-width: 1536px) 720px, (min-width: 1280px) 660px, 580px"
            className="relative h-full w-full"
            imageClassName="object-contain object-right drop-shadow-[0_20px_45px_rgba(59,13,59,0.15)] select-none"
            intervalMs={2000}
            fadeDurationMs={700}
          />
        </div>
      </div>

      <Container className="relative z-10">
        {/* Desktop Top Header / Logo - seamlessly integrated into the hero canvas */}
        <div className="hidden lg:flex items-center justify-between pt-2 pb-6 sm:pb-8">
          <Logo variant="dark" />
        </div>

        {/* Main Hero content block */}
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          {/* Highlighted Eyebrow Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3B0D3B]/15 bg-white/85 px-3.5 py-1 text-xs sm:text-sm font-extrabold text-[#1A0A1A] shadow-2xs backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0CA30C] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0CA30C]" />
            </span>
            <span>{eyebrow}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[3.35rem] font-black leading-[1.12] tracking-tight">
            {hero.headlineLines.map((line, idx) => {
              const isLast = idx === hero.headlineLines.length - 1;

              if (!isLast) {
                return (
                  <span key={line} className="block text-[#1A0A1A] tracking-tight">
                    {line}
                  </span>
                );
              }

              // Last line: Attractive yet simple accent with subtle curved underline
              return (
                <span key={line} className="relative inline-block mt-1 text-[#5A2A5A] tracking-tight">
                  <span className="relative z-10">{line}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 320 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full text-[#8C6A8C] opacity-80"
                  >
                    <path
                      d="M2 9C90 3.5 230 3 318 8"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              );
            })}
          </h1>

          {/* Description Text */}
          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#5A4A5A] font-medium">
            {hero.description}
          </p>

          {/* Highlighted text line after subtitles */}
          {hero.highlightText && (
            <p className="mt-2 text-base sm:text-lg font-extrabold text-[#3B0D3B] tracking-tight">
              {hero.highlightText}
            </p>
          )}

          {/* Action Buttons */}
          <div className="mt-7">
            <HeroActions
              primaryCtaLabel={hero.primaryCtaLabel}
              primaryCtaHref={hero.primaryCtaHref}
              secondaryCtaLabel={hero.secondaryCtaLabel}
              watchVideoLabel={hero.watchVideoLabel}
            />
          </div>

          {/* Mobile/Tablet view of the hero artwork */}
          <div className="mt-8 relative w-full flex items-center justify-center lg:hidden">
            <div className="relative w-full max-w-lg aspect-[947/846]">
              <HeroImageSlider
                images={sliderImages}
                alt="Treqo Modern Digital Marketing - Practical Cohort"
                sizes="(max-width: 768px) 100vw, 600px"
                className="relative h-full w-full"
                imageClassName="object-contain object-center drop-shadow-xl select-none"
                intervalMs={2000}
                fadeDurationMs={700}
              />
            </div>
          </div>

          {/* Stats Table under buttons */}
          <HeroStats className="mt-8" stats={homeContent.stats} />
        </div>
      </Container>

      {/* NAVBAR (Desktop only - sits flush at bottom of hero above the scroller) */}
      <div className="relative z-20 mt-3 sm:mt-4 lg:mt-4">
        <div className="hidden lg:block">
          <HeroNavbar />
        </div>
      </div>
    </section>
  );
}
