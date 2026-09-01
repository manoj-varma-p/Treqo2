import HeroVisualImage from "./HeroVisualImage";
import CurrentPathCard from "./CurrentPathCard";
import LearningProgressCard from "./LearningProgressCard";
import ProjectCard from "./ProjectCard";
import CertificateCard from "./CertificateCard";
import DecorativeElements from "./DecorativeElements";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-100 pt-4 pb-20 sm:max-w-130 sm:pb-24 lg:mx-auto lg:max-w-150 lg:pt-4 lg:pb-6">
      {/* Atmospheric glow — soft, centered, behind everything */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand-primary) 0%, var(--brand-secondary) 45%, transparent 75%)",
          opacity: 0.32,
        }}
      />
      {/* Soft halo behind her head/shoulders */}
      <div
        aria-hidden="true"
        className="absolute top-[6%] left-[38%] -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-secondary/30 blur-3xl sm:h-48 sm:w-48"
      />
      <div
        aria-hidden="true"
        className="animate-float-slow absolute -top-6 -right-6 h-56 w-56 rounded-full bg-brand-secondary/30 blur-3xl sm:h-64 sm:w-64"
      />
      <div
        aria-hidden="true"
        className="animate-float-slower absolute -bottom-8 -left-12 h-64 w-64 rounded-full bg-brand-primary/25 blur-3xl sm:h-72 sm:w-72"
      />

      {/* Tiny orbiting particles — subtle, not decorative overload */}
      <div aria-hidden="true" className="absolute top-[8%] left-[6%] hidden h-2 w-2 rounded-full bg-brand-primary/40 lg:block" />
      <div aria-hidden="true" className="absolute top-[18%] -left-2 hidden h-1.5 w-1.5 rounded-full bg-brand-secondary/50 lg:block" />
      <div aria-hidden="true" className="absolute right-[4%] bottom-[22%] hidden h-2 w-2 rounded-full bg-brand-accent/40 lg:block" />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute top-[10%] -right-6 hidden h-24 w-24 text-brand-primary/20 lg:block"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
      </svg>

      <div className="relative aspect-1130/1024 w-full">
        <HeroVisualImage />
      </div>

      <DecorativeElements />

      <CurrentPathCard className="animate-fade-up absolute top-0 -left-4 [animation-delay:150ms] sm:top-4 sm:-left-8 lg:top-10 lg:-left-10" />
      <LearningProgressCard className="animate-fade-up absolute top-0 -right-3 [animation-delay:250ms] sm:-right-8 lg:-right-10" />
      <ProjectCard className="animate-fade-up absolute -left-3 bottom-32 [animation-delay:400ms] sm:-left-8 sm:bottom-36 lg:-left-13 lg:bottom-36" />
      <CertificateCard className="animate-fade-up absolute -right-4 bottom-10 [animation-delay:500ms] sm:-right-8 sm:bottom-12 lg:-right-11 lg:bottom-14" />
    </div>
  );
}
