import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://treqo.org"),
  title: "TREQO: Leave with Skills you can implement, Not just a certificate.",
  description:
    "TREQO is a digital marketing learning system built around 70% doing, live brand projects, and capstone revenue proof.",
  keywords: [
    "Digital Marketing Course",
    "Performance Marketing",
    "Growth Marketing",
    "Marketing School Hyderabad",
    "Live Ad Campaigns",
    "Treqo",
  ],
  authors: [{ name: "Treqo School of Modern Learning" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://treqo.org",
    siteName: "TREQO",
    title: "TREQO:Leave with Skills you can implement. Not just a certificate",
    description:
      "TREQO is a digital marketing learning system built around 70% doing, live brand projects, and capstone revenue proof.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TREQO: The Marketing School",
    description: "Leave with Skills you can implement. Not just a certificate",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

import { ApplyModalProvider } from "@/context/ApplyModalContext";
import ApplyModal from "@/components/modal/ApplyModal";
import CurriculumModal from "@/components/modal/CurriculumModal";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-BLPP9TW5NP"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BLPP9TW5NP');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <ApplyModalProvider>
          {children}
          <ApplyModal />
          <CurriculumModal />
        </ApplyModalProvider>
      </body>
    </html>
  );
}
