import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-coworking.jpg";

const WORDS = ["Productive", "Inspiring", "Connected", "Creative"];

const Particle = ({ index }: { index: number }) => {
  const size = Math.random() * 4 + 2;
  const x = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = Math.random() * 10 + 8;
  const opacity = Math.random() * 0.5 + 0.2;

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ width: size, height: size, left: `${x}%`, bottom: "-10px", opacity }}
      animate={{ y: [0, -(window.innerHeight + 100)], opacity: [opacity, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroImage}
          alt="Assorted Coworking space"
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 animated-gradient opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="blob absolute -top-32 -right-32 w-96 h-96 opacity-20"
          style={{
            background: "linear-gradient(135deg, hsl(20 95% 54%), hsl(35 90% 60%))",
          }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="blob-slow absolute -bottom-20 -left-20 w-80 h-80 opacity-15"
          style={{
            background: "linear-gradient(135deg, hsl(215 80% 28%), hsl(200 80% 50%))",
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Orbit decorations */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="relative w-48 h-48">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-white/20"
              style={{ scale: 1 + i * 0.4 }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
            />
          ))}
          {[0, 120, 240].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
              style={{
                transformOrigin: "center",
              }}
              animate={{ rotate: [deg, deg + 360] }}
              transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute w-3 h-3 rounded-full bg-accent"
                style={{ transform: `translateX(80px)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 section-container"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-white rounded-full px-5 py-2 mb-8 text-sm font-semibold tracking-wide backdrop-blur-sm"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Best Coworking Space · D-12 Markaz, Islamabad
          </motion.div>

          {/* H1 — primary keyword target */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Islamabad's Most{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className="text-gradient inline-block"
                    initial={{ y: 40, opacity: 0, rotateX: -30 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -40, opacity: 0, rotateX: 30 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              Coworking Space
            </motion.h1>
          </div>

          <motion.p
            className="text-lg md:text-xl text-white/75 mb-10 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Shared office space in D-12 Markaz, Zarpar Arcade — flexible day passes, private offices & meeting rooms for freelancers, startups & remote teams.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="pulse-ring h-14 px-10 text-base rounded-full bg-accent hover:bg-accent/90 text-white font-bold shadow-lg border-0"
                onClick={scrollToContact}
              >
                Book Your Spot Free →
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                className="h-14 px-10 text-base rounded-full border-2 border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold"
                onClick={scrollToAbout}
              >
                Explore the Space
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex gap-8 mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            {[
              { value: "30+", label: "Members" },
              { value: "24/7", label: "Access" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5"
          animate={{ borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
