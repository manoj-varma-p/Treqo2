"use client";

interface CeoChallengeCardProps {
  heading?: string;
  tagline?: string;
  description?: string;
}

export default function CeoChallengeCard({
  heading = "The CEO Challenge",
  tagline = "“One Real Problem. One Instant Solution.”",
  description = "Every module ends with a pressure-test scenario. No Googling. You make the call – go, pivot, or kill. Revenue is truth. Speed beats perfection.",
}: CeoChallengeCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#28144e] border border-purple-900/40 p-6 sm:p-7 md:p-8 shadow-md">
      {/* Subtle top-left ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full bg-[#38BDF8]/10 blur-2xl"
      />

      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl md:text-[26px] font-black tracking-tight text-[#38BDF8]">
          {heading}
        </h3>

        <p className="mt-1 text-sm sm:text-base font-semibold italic text-[#38BDF8]">
          {tagline}
        </p>

        <p className="mt-3.5 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed text-slate-200/95 max-w-4xl">
          {description}
        </p>
      </div>
    </div>
  );
}
