import { Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import { whyTreqqoContent } from "@/data/home";
import WhyTreqqoCard from "./WhyTreqqoCard";
import WhyTreqqoWave from "./WhyTreqqoWave";

export default function WhyTreqqo() {
  return (
    <section className="relative z-0 overflow-hidden bg-brand-primary-deep pt-10 pb-14 sm:pt-10 sm:pb-16 lg:pt-15 lg:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 h-[380px] w-[380px] rounded-full bg-brand-secondary/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-primary/40 blur-3xl" />
      </div>

      <WhyTreqqoWave />

      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white sm:text-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {whyTreqqoContent.eyebrow}
          </span>

          <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {whyTreqqoContent.heading}
          </h2>

          <p className="text-base text-white/70 sm:text-lg">{whyTreqqoContent.description}</p>
        </div>

        <WhyTreqqoCard />
      </Container>
    </section>
  );
}
