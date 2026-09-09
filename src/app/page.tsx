import AnnouncementBanner from "@/components/header/AnnouncementBanner";
import MobileHeader from "@/components/header/MobileHeader";
import Logo from "@/components/header/Logo";
import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import LearningSystem from "@/components/home/LearningSystem";
import WhyTreqqo from "@/components/home/WhyTreqqo";
import ExecutionProof from "@/components/home/ExecutionProof";
import TaughtBy from "@/components/home/TaughtBy";
import Certifications from "@/components/home/Certifications";
import SixDecisions from "@/components/home/SixDecisions";
import GovCertSection from "@/components/home/GovCertSection";
import FaqSection from "@/components/home/FaqSection";
import Footer from "@/components/footer/Footer";
import InstagramVideoPopup from "@/components/common/InstagramVideoPopup";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top Announcement Banner */}
      <AnnouncementBanner />

      {/* Desktop Top: Logo only */}
      <div className="hidden lg:block w-full pt-6 pb-2">
        <Container>
          <Logo />
        </Container>
      </div>

      {/* Mobile Top Header (Sticky on mobile) */}
      <div className="lg:hidden sticky top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <Container>
          <MobileHeader variant="standard" />
        </Container>
      </div>

      <main className="flex-1">
        <Hero />
        <LearningSystem />
        <GovCertSection />
        <WhyTreqqo />
        <ExecutionProof />
        <TaughtBy />
        <Certifications />
        <SixDecisions />
        <FaqSection />
      </main>
      <Footer />
      <InstagramVideoPopup />
    </div>
  );
}
