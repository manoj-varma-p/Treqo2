import AnnouncementBanner from "@/components/header/AnnouncementBanner";
import MobileHeader from "@/components/header/MobileHeader";
import Logo from "@/components/header/Logo";
import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import KeywordsTicker from "@/components/home/KeywordsTicker";
import LearningSystem from "@/components/home/LearningSystem";
import WhyTreqqo from "@/components/home/WhyTreqqo";
import TaughtBy from "@/components/home/TaughtBy";
import Certifications from "@/components/home/Certifications";
import SixDecisions from "@/components/home/SixDecisions";
import GovCertSection from "@/components/home/GovCertSection";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";
import Footer from "@/components/footer/Footer";
import InstagramVideoPopup from "@/components/common/InstagramVideoPopup";
import { getHomePageContent, getGeneralSettings, getTutors, getCourses } from "@/lib/cms";
import { getPageSeoByPath, getLayoutSettingsFromDb } from "@/lib/content-db";
import type { Metadata } from "next";

const DEFAULT_HOME_KEYWORDS = [
  "digital marketing course near me",
  "digital marketing courses in Hyderabad",
  "Online marketing classes",
  "Best Digital marketing course in Hyderabad",
  "Digital marketing course fee",
  "online digital marketing course with certificate",
  "learn digital marketing online",
  "new age digital marketing course",
  "performance marketing course",
  "digital marketing course with placement",
];

export async function generateMetadata(): Promise<Metadata> {
  const [pageSeo, layout] = await Promise.all([
    getPageSeoByPath("/"),
    getLayoutSettingsFromDb(),
  ]);

  const siteTitle = layout.siteTitle || "TREQO";
  const activeTitle = pageSeo?.title || pageSeo?.metaTitle || siteTitle;
  const activeDescription =
    pageSeo?.metaDescription?.trim() ||
    layout.metaDescription?.trim() ||
    "TREQO is a digital marketing learning system built around 70% doing, live brand projects, and capstone revenue proof.";

  const activeKeywords =
    pageSeo?.metaKeywords && pageSeo.metaKeywords.length > 0
      ? pageSeo.metaKeywords
      : layout.metaKeywords && layout.metaKeywords.length > 0
      ? layout.metaKeywords
      : DEFAULT_HOME_KEYWORDS;

  return {
    title: activeTitle,
    description: activeDescription,
    keywords: activeKeywords,
    openGraph: {
      title: activeTitle,
      description: activeDescription,
      type: "website",
      siteName: siteTitle,
    },
    twitter: {
      title: activeTitle,
      description: activeDescription,
    },
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [homeContent, generalSettings, tutors, courses] = await Promise.all([
    getHomePageContent(),
    getGeneralSettings(),
    getTutors(),
    getCourses(),
  ]);

  const visibility = homeContent.sectionVisibility || {};

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFAF6] text-[#1A0A1A]">
      {/* Top Announcement Banner */}
      {visibility.announcementBanner !== false && <AnnouncementBanner />}

      {/* Mobile Top Header (Sticky on mobile) */}
      <div className="lg:hidden sticky top-0 inset-x-0 z-50 bg-[#FDFAF6]/95 backdrop-blur-md border-b border-[#F5EDE0] shadow-xs text-[#1A0A1A]">
        <Container>
          <MobileHeader variant="standard" theme="light" />
        </Container>
      </div>

      <main className="flex-1">
        {visibility.hero !== false && <Hero />}
        {visibility.keywordsTicker !== false && <KeywordsTicker />}
        {visibility.courses !== false && <LearningSystem initialPrograms={courses} />}
        {visibility.govCerts !== false && <GovCertSection content={homeContent.govCerts} />}
        {visibility.whyTreqqo !== false && <WhyTreqqo content={homeContent.whyTreqqo} />}
        {visibility.mentors !== false && <TaughtBy tutors={tutors} sectionContent={homeContent.mentors} />}
        {visibility.certifications !== false && <Certifications content={homeContent.certifications} />}
        {visibility.sixDecisions !== false && <SixDecisions content={homeContent.sixDecisions} />}
        {visibility.faqs !== false && <FaqSection />}
        {visibility.finalCta !== false && <FinalCta />}
      </main>
      <Footer settings={generalSettings} />
      <InstagramVideoPopup />
    </div>
  );
}
