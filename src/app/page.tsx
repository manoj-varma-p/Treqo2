import Header from "@/components/header/Header";
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
      <Header />
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
