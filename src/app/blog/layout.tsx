import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Notes & Blog: Real Budgets & Practical Growth Insights | TREQO",
  description:
    "Field notes, growth breakdowns, and tactical playbooks from practitioners running real ad accounts, building attribution systems, and defending unit economics out loud.",
  openGraph: {
    title: "Field Notes & Blog: TREQO",
    description:
      "Practical marketing playbooks, live budget experiments, and attribution breakdowns from TREQO practitioners.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes & Blog: TREQO",
    description: "Practical marketing playbooks and live budget experiments from practitioners.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
