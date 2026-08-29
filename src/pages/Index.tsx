import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SlidingBanner from "@/components/SlidingBanner";
import Highlights from "@/components/Highlights";
import Pricing from "@/components/Pricing";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 5}px, ${mouse.y - 5}px)`;
      }
    };

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.1;
      ring.y += (mouse.y - ring.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x - 18}px, ${ring.y - 18}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.transform += " scale(2)";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0.6";
    };

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2.5 h-2.5 rounded-full"
        style={{
          background: "hsl(20 89% 56%)",
          boxShadow: "0 0 10px rgba(240,112,48,0.8)",
          willChange: "transform",
          transition: "transform 0.05s linear",
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-9 h-9 rounded-full opacity-60"
        style={{
          border: "2px solid hsl(20 89% 56%)",
          willChange: "transform",
          transition: "opacity 0.2s",
        }}
      />
    </>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Header />
      <Hero />
      <SlidingBanner />
      <Highlights />
      <Pricing />
      <WhyChooseUs />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
