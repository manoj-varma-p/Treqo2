import AnnouncementBanner from "@/components/header/AnnouncementBanner";
import MobileHeader from "@/components/header/MobileHeader";
import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import LearningSystem from "@/components/home/LearningSystem";
import WhyTreqqo from "@/components/home/WhyTreqqo";
import ExecutionProof from "@/components/home/ExecutionProof";
import TaughtBy from "@/components/home/TaughtBy";
import Certifications from "@/components/home/Certifications";
import SixDecisions from "@/components/home/SixDecisions";
import FaqSection from "@/components/home/FaqSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top Announcement Banner */}
      <AnnouncementBanner />

      {/* Mobile Top Header (Fixed on mobile) */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <Container>
          <MobileHeader variant="standard" />
        </Container>
      </div>

      <main className="flex-1 pt-14 lg:pt-0">
        <Hero />
        <LearningSystem />
        <WhyTreqqo />
        <ExecutionProof />
        <TaughtBy />
        <Certifications />
        <SixDecisions />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
