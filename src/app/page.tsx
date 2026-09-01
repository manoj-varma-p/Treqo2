import Header from "@/components/header/Header";
import Hero from "@/components/home/Hero";
import WhyTreqqo from "@/components/home/WhyTreqqo";
import LearningSystem from "@/components/home/LearningSystem";
import ExecutionProof from "@/components/home/ExecutionProof";
import ToolsShowcase from "@/components/home/ToolsShowcase";
import TaughtBy from "@/components/home/TaughtBy";
import CertificateShowcase from "@/components/home/CertificateShowcase";
import AlumniShowcase from "@/components/home/AlumniShowcase";
import FaqSection from "@/components/home/FaqSection";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <LearningSystem />
      <WhyTreqqo />
      <ExecutionProof />
      <ToolsShowcase />
      <TaughtBy />
      <CertificateShowcase />
      <AlumniShowcase />
      <FaqSection />
    </main>
  );
}
