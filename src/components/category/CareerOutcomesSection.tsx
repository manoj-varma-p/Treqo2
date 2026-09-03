"use client";

interface CareerRole {
  title: string;
  salary?: string;
  description?: string;
}

const roles: CareerRole[] = [
  {
    title: "Performance Marketing Manager",
    salary: "₹5-12 LPA",
    description: "Google + Meta campaigns, ROAS optimisation, budget management, customer acquisition at scale.",
  },
  {
    title: "Growth Marketing Specialist",
    salary: "₹6-15 LPA",
    description: "Full-funnel ownership, experiment-driven, data-heavy. The startup rocket fuel role.",
  },
  {
    title: "Brand Strategist / Manager",
    salary: "₹5-10 LPA",
    description: "Brand identity, positioning, communication strategy for FMCG, luxury, consumer brands.",
  },
  {
    title: "SEO & Content Lead",
    salary: "₹4-10 LPA",
    description: "Organic traffic, content engines, editorial calendars. Compound visibility over time.",
  },
  {
    title: "Social Media Manager",
    salary: "₹4-8 LPA",
    description: "Brand presence across platforms. Strategy + execution + community + paid social.",
  },
  {
    title: "Digital Marketing Analyst",
    salary: "₹5-10 LPA",
    description: "GA4, Looker Studio, attribution, cohort analysis. Data marketing decisions.",
  },
  {
    title: "CRM & Lifecycle Marketing",
  },
  {
    title: "Marketplace & E-com Lead",
  },
];

export default function CareerOutcomesSection() {
  const mainRoles = roles.slice(0, 6);
  const compactRoles = roles.slice(6);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div>
        <p className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-slate-600 uppercase">
          CAREER OUTCOMES
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Roles You Can Crack{" "}
          <span className="text-[#38BDF8]">at Top Companies</span>
        </h2>
        <div className="mt-3.5 h-1.5 w-16 rounded-full bg-[#1e1338]" />
      </div>

      {/* 2-Column Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {mainRoles.map((role) => (
          <div
            key={role.title}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200"
          >
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {role.title}
              </h3>
              {role.salary && (
                <p className="mt-1 text-xs sm:text-sm font-bold text-[#0284C7]">
                  {role.salary}
                </p>
              )}
              {role.description && (
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                  {role.description}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Compact Bottom Cards */}
        {compactRoles.map((role) => (
          <div
            key={role.title}
            className="flex items-center rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200"
          >
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              {role.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
