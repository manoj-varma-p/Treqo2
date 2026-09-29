import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "TREQO Administration",
  },
  description: "TREQO HQ Admin Console and Admissions Portal",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
