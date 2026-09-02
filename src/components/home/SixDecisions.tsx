import Container from "@/components/ui/Container";

const decisions = [
  {
    num: "01",
    title: "70% doing",
    description:
      "The ratio is enforced, not aspirational. Every phase closes on a live problem, and theory alone doesn't clear it.",
  },
  {
    num: "02",
    title: "Clients with something to lose",
    description:
      "You work on brands with real customers to disappoint. Fictional case studies teach confidence about risk you never carried.",
  },
  {
    num: "03",
    title: "A fixed sequence",
    description:
      "You can't position a brand you haven't understood. No à-la-carte modules the order is the curriculum.",
  },
  {
    num: "04",
    title: "AI from phase one",
    description:
      "In the workflow from the start, not bolted on as a final module nobody remembers.",
  },
  {
    num: "05",
    title: "Defended out loud",
    description:
      "Your numbers, your logic, your revenue plan pushed on in front of people. That's the interview rehearsal.",
  },
  {
    num: "06",
    title: "50 seats, capped",
    description:
      "Small enough that there's nowhere to hide, and small enough that we know what you're bad at by week three.",
  },
];

export default function SixDecisions() {
  return (
    <section id="why-treqo" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-start max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
            WHY TREQO
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-[3rem] font-black leading-[1.08] tracking-tight text-slate-950">
            Six decisions we<br />
            made differently
          </h2>
        </div>

        {/* 6 Decisions Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {decisions.map((item) => (
            <div
              key={item.num}
              className="flex flex-col justify-start rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs transition-all duration-200 hover:shadow-md hover:border-slate-300"
            >
              <span className="inline-flex w-fit items-center justify-center rounded-md bg-[#f0ecfc] px-2.5 py-1 text-xs font-bold text-[#3A1494]">
                {item.num}
              </span>
              <h3 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
