import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import BenefitsSection from "@/components/BenefitsSection";
import SolutionsSection from "@/components/SolutionsSection";
import UseCasesSection from "@/components/UseCasesSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <div id="beneficios">
          <BenefitsSection />
        </div>
        <div id="soluciones">
          <SolutionsSection />
        </div>
        <div id="casos">
          <UseCasesSection />
        </div>
        <TestimonialSection />
        <div id="contacto">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
