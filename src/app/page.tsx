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
import FaqSection from "@/components/home/FaqSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top Announcement Banner */}
      <AnnouncementBanner />

      {/* Desktop Top Bar with Logo (Outside and in top, navbar remains in place below) */}
      <div className="hidden lg:block w-full border-b border-slate-100 bg-white/95 py-4">
        <Container>
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200/80 px-3 py-0.5 text-[11px] font-bold text-slate-600">
                Batch 2 · Now Enrolling
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Top Header (Fixed on mobile) */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
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
