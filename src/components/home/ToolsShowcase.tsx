import Link from "next/link";
import Container from "@/components/ui/Container";
import { toolsContent, tools } from "@/data/home";
import { cn } from "@/lib/utils";

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  const Icon = tool.icon;
  return (
    <div className="relative flex w-[140px] shrink-0 flex-col items-center gap-2.5 rounded-xl border border-border-subtle bg-surface px-4 py-5 sm:w-[156px]">
      {tool.isAI && (
        <span className="absolute top-2 right-2 rounded-full bg-brand-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
          AI
        </span>
      )}
      <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", tool.color)}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-center text-sm font-semibold text-text-primary">{tool.name}</span>
    </div>
  );
}

export default function ToolsShowcase() {
  const half = Math.ceil(tools.length / 2);
  const rowOne = tools.slice(0, half);
  const rowTwo = tools.slice(half);

  return (
    <section className="relative overflow-hidden bg-[#f3f2f7] pt-10 pb-14 sm:pt-10 sm:pb-16 lg:pt-15 lg:pb-20">
      <Container>
        <h2 className="text-2xl leading-[1.15] font-extrabold tracking-tight text-text-primary sm:text-3xl lg:text-[2.5rem]">
          {toolsContent.heading.line1}{" "}
          <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {toolsContent.heading.line2}
          </span>
        </h2>
        <p className="mt-2 text-sm text-text-secondary sm:text-base">{toolsContent.description}</p>
      </Container>

      <div
        className="mt-8 flex flex-col gap-4 lg:mt-10"
        style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}
      >
        <div className="group overflow-hidden">
          <div className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused]">
            {[...rowOne, ...rowOne].map((tool, index) => (
              <ToolCard key={`${tool.name}-${index}`} tool={tool} />
            ))}
          </div>
        </div>

        <div className="group overflow-hidden">
          <div className="animate-marquee-reverse flex w-max gap-4 group-hover:[animation-play-state:paused]">
            {[...rowTwo, ...rowTwo].map((tool, index) => (
              <ToolCard key={`${tool.name}-${index}`} tool={tool} />
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div className="mt-8 flex justify-center lg:mt-10">
          <Link
            href={toolsContent.cta.href}
            className="inline-flex items-center justify-center rounded-full bg-brand-primary px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(58,22,147,0.6)] transition-colors duration-200 hover:bg-brand-primary-dark sm:text-base"
          >
            {toolsContent.cta.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
