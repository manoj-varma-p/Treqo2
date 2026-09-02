import AnnouncementBanner from "@/components/header/AnnouncementBanner";
import MobileHeader from "@/components/header/MobileHeader";
import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import LearningSystem from "@/components/home/LearningSystem";
import WhyTreqqo from "@/components/home/WhyTreqqo";
import ExecutionProof from "@/components/home/ExecutionProof";
import TaughtBy from "@/components/home/TaughtBy";
import SixDecisions from "@/components/home/SixDecisions";
import FaqSection from "@/components/home/FaqSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top Announcement Banner */}
      <AnnouncementBanner />

      {/* Mobile Top Header (always accessible on mobile) */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-100">
        <Container>
          <MobileHeader variant="standard" />
        </Container>
      </div>

      <main className="flex-1">
        <Hero />
        <LearningSystem />
        <WhyTreqqo />
        <ExecutionProof />
        <TaughtBy />
        <SixDecisions />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
