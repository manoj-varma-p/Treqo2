import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { getLayoutSettingsFromDb, getTrackingSettingsFromDb } from "@/lib/content-db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const layout = await getLayoutSettingsFromDb();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || layout.canonicalUrl || "https://treqo.org";
  const rawTemplate = layout.titleTemplate?.trim();
  const siteTitle = layout.siteTitle || "TREQO";
  const validTemplate =
    rawTemplate && rawTemplate !== "%s |" && rawTemplate !== "%s" && rawTemplate.includes("%s")
      ? rawTemplate
      : `%s | ${siteTitle}`;

  return {
    applicationName: siteTitle,
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: validTemplate,
    },
    description:
      layout.metaDescription ||
      "TREQO is a digital marketing learning system built around 70% doing, live brand projects, and capstone revenue proof.",
    keywords: layout.metaKeywords || [
      "Digital Marketing Course",
      "Performance Marketing",
      "Growth Marketing",
      "Marketing School Hyderabad",
      "Live Ad Campaigns",
      "Treqo",
    ],
    authors: [{ name: layout.authorName || "Treqo School of Modern Learning" }],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteUrl,
      siteName: layout.siteTitle || "TREQO",
      title:
        layout.ogTitle ||
        layout.siteTitle ||
        "TREQO: LEARN THE SKILLS. BUILD THE MINDSET. BREAK THE PATTERN.",
      description:
        layout.ogDescription ||
        layout.metaDescription ||
        "TREQO is a digital marketing learning system built around 70% doing, live brand projects, and capstone revenue proof.",
      images: layout.ogImage ? [{ url: layout.ogImage }] : [{ url: "/icon.svg" }],
    },
    twitter: {
      card: layout.twitterCard || "summary_large_image",
      title:
        layout.twitterTitle ||
        layout.ogTitle ||
        layout.siteTitle ||
        "TREQO: The Marketing School",
      description:
        layout.twitterDescription ||
        layout.metaDescription ||
        "LEARN THE SKILLS. BUILD THE MINDSET. BREAK THE PATTERN.",
    },
    robots: {
      index: layout.robotsIndex !== false,
      follow: layout.robotsFollow !== false,
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: "/icon.svg",
      apple: "/icon.svg",
    },
    verification: layout.googleSiteVerification
      ? { google: layout.googleSiteVerification }
      : undefined,
  };
}

import { ApplyModalProvider } from "@/context/ApplyModalContext";
import ApplyModal from "@/components/modal/ApplyModal";
import CurriculumModal from "@/components/modal/CurriculumModal";
import AnalyticsTracker from "@/components/common/AnalyticsTracker";
import CookieConsentBanner from "@/components/common/CookieConsentBanner";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [layout, tracking] = await Promise.all([
    getLayoutSettingsFromDb(),
    getTrackingSettingsFromDb(),
  ]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || layout.canonicalUrl || "https://treqo.org";
  const siteName = layout.siteTitle || "TREQO";
  const gaId = tracking.gaMeasurementId?.trim() || "G-BLPP9TW5NP";
  const metaPixelId = tracking.metaPixelId?.trim();
  const clarityId = tracking.clarityProjectId?.trim();
  const gtmId = tracking.googleTagManagerId?.trim();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    alternateName: ["Treqo", "TREQO", "Treqo Marketing School"],
    url: siteUrl,
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}

        {/* Meta (Facebook) Pixel */}
        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* Microsoft Clarity */}
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ApplyModalProvider>
          <AnalyticsTracker />
          {children}
          <CookieConsentBanner />
          <ApplyModal />
          <CurriculumModal />
        </ApplyModalProvider>
      </body>
    </html>
  );
}
