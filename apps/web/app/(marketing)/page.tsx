import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Testimonials } from "@/components/marketing/Testimonials";
import { WhyChooseUs } from "@/components/marketing/WhyChooseUs";
import { CTA } from "@/components/marketing/CTA";
import { FAQ } from "@/components/marketing/FAQ";
import { Footer } from "@/components/marketing/Footer";
import { Showcase } from "@/components/marketing/Showcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";

export default function Home() {
  return (
    <section className="items-center relative flex flex-col">
      <Navbar />
      <Hero />
      {/* Features mosaic as per wireframe */}
      <Showcase />
      {/* Simple three-step section */}
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </section>
  );
}
