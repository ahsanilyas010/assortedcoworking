import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SlidingBanner from "@/components/SlidingBanner";
import Highlights from "@/components/Highlights";
import Pricing from "@/components/Pricing";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SlidingBanner />
      <Highlights />
      <About />
      <Gallery />
      <Pricing />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
