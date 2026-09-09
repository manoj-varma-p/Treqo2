import Container from "@/components/ui/Container";

const submissions = [
  {
    tag: "SUBMIT 01",
    title: "The problem",
    description: "One sentence. If it takes three, you haven't found the problem yet.",
  },
  {
    tag: "SUBMIT 02",
    title: "The market logic",
    description: "Why this market behaves the way you claim. Assertion is not logic.",
  },
  {
    tag: "SUBMIT 03",
    title: "The experiment",
    description: "Something small, live and measurable. Report it even when it flopped.",
  },
  {
    tag: "SUBMIT 04",
    title: "The revenue plan",
    description: "Where the money comes from, how much, and by when.",
  },
];

export default function WhyTreqqo() {
  return (
    <section id="method" className="relative z-0 overflow-hidden bg-[#3A1494] bg-gradient-to-b from-[#3A1494] via-[#320f82] to-[#270b68] py-16 sm:py-20 lg:py-24 scroll-mt-16 sm:scroll-mt-20 text-white">
      {/* Background ambient lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[450px] w-[450px] rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-indigo-950/40 blur-3xl" />
      </div>

      <Container>
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12 lg:items-end">
          {/* Left: Eyebrow + Title */}
          <div className="flex flex-col items-start lg:col-span-7">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-purple-200 backdrop-blur-xs border border-white/20 shadow-2xs">
              THE CEO CHALLENGE
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[3.25rem] font-black leading-[1.08] tracking-tight text-white">
              Every phase ends<br />
              with a problem<br />
              someone actually has.
            </h2>
          </div>

          {/* Right: Subtitle description */}
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base leading-relaxed text-purple-100/90">
              70% doing, 30% theory enforced, not aspirational. A right answer with no evidence behind it does not pass. You submit four things and defend them out loud.
            </p>
          </div>
        </div>

        {/* Middle Content: 2x2 Submission Grid + Portrait Placeholder */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6 lg:items-stretch">
          {/* 2x2 Submissions */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {submissions.map((item) => (
              <div
                key={item.tag}
                className="flex flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-6 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:border-white/40"
              >
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-purple-200">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-purple-100/85">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Method 4:5 Portrait Frame */}
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-6 text-center lg:col-span-4 backdrop-blur-xs transition-colors hover:border-white/50">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-purple-200 leading-relaxed">
              METHOD · 4:5 PORTRAIT<br />
              STUDENT DEFENDING NUMBERS TO A PANEL
            </span>
          </div>
        </div>

        {/* Bottom Banner Card */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl bg-[#13072E] p-6 sm:p-8 lg:flex-row lg:items-center shadow-xl text-white border border-purple-400/20">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Phase 4 is a wall, not a checkpoint.
          </h3>
          <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-purple-200/90">
            Idea clarity is graded pass or rework. No partial credit, no parallel track. Nobody carries a weak idea into execution least of all the students in a hurry.
          </p>
        </div>
      </Container>
    </section>
  );
}
