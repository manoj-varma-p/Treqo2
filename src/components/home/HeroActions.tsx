import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import { heroContent } from "@/data/home";

export default function HeroActions() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Button
        href={heroContent.primaryCta.href}
        size="lg"
        fullWidth
        icon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
        className="sm:w-auto"
      >
        {heroContent.primaryCta.label}
      </Button>

      <Link
        href={heroContent.secondaryCta.href}
        className="group inline-flex items-center gap-3 rounded-full py-1 pr-2 text-base font-semibold text-text-primary transition-colors hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-brand-primary/30 text-brand-primary transition-colors group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-text-inverse">
          <Play className="h-4 w-4 translate-x-0.5 fill-current" aria-hidden="true" />
        </span>
        {heroContent.secondaryCta.label}
      </Link>
    </div>
  );
}
