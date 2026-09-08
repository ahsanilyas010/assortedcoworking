import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import interiorImage from "@/assets/assorted-coworking-interior-islamabad.jpg";

const stats = [
  { value: 30, suffix: "+", label: "Happy Members", color: "from-blue-500 to-indigo-500" },
  { value: 24, suffix: "/7", label: "Access Hours", color: "from-accent to-orange-500" },
  { value: 100, suffix: "%", label: "Satisfaction", color: "from-green-500 to-emerald-500" },
  { value: 1, suffix: "+ yr", label: "of Excellence", color: "from-purple-500 to-pink-500" },
];

const Counter = ({ value, suffix, color }: { value: number; suffix: string; color: string }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {count}{suffix}
      </div>
    </div>
  );
};

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [textRef, textInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        className="blob absolute -top-40 -left-40 w-96 h-96 bg-primary/5 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="blob-slow absolute -bottom-20 right-0 w-72 h-72 bg-accent/8 pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="section-container relative z-10">
        {/* Stats row */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
              className="relative bg-card rounded-2xl p-6 border border-border text-center overflow-hidden group"
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <Counter value={stat.value} suffix={stat.suffix} color={stat.color} />
              <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -60 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Real interior photo with floating overlays */}
            <div className="relative rounded-3xl overflow-hidden aspect-square max-w-lg mx-auto">
              <img
                src={interiorImage}
                alt="Assorted Coworking interior - Beautiful coworking space in D-12 Islamabad with circle window and plant wall"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

              {/* Floating cards inside illustration */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Top decoration */}
                <div className="flex justify-between items-start">
                  <motion.div
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="text-white/60 text-xs mb-1">Current Occupancy</div>
                    <div className="text-white font-bold text-lg">22 / 30 Seats</div>
                    <div className="mt-2 h-1.5 bg-white/20 rounded-full">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: "0%" }}
                        animate={textInView ? { width: "73%" } : {}}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  >
                    <div className="text-white/60 text-xs mb-1">WiFi Speed</div>
                    <div className="text-accent font-black text-2xl">1 Gbps</div>
                    <div className="text-white/50 text-xs">Fiber Optic</div>
                  </motion.div>
                </div>

                {/* Center big text */}
                <div className="text-center">
                  <motion.div
                    className="text-7xl font-black text-white/10 select-none"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    WORK
                  </motion.div>
                </div>

                {/* Bottom decoration */}
                <div className="flex justify-between items-end">
                  <motion.div
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white text-sm font-semibold">Open Now</span>
                    </div>
                    <div className="text-white/50 text-xs mt-1">D-12 Markaz</div>
                  </motion.div>

                  <motion.div
                    className="bg-accent rounded-2xl p-4 shadow-lg"
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <div className="text-white font-bold text-sm">Free Trial</div>
                    <div className="text-white/80 text-xs">1 Day Pass</div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-primary rounded-2xl p-5 shadow-2xl border border-primary/50"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-white/70 text-xs">Est.</div>
              <div className="text-white font-black text-2xl">2024</div>
              <div className="text-accent text-xs font-bold">Islamabad</div>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="inline-block text-sm font-bold text-accent tracking-widest uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={textInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Our Story
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              More Than a Desk.{" "}
              <span className="text-gradient">A Community.</span>
            </h2>

            {[
              "At Assorted Coworking — Islamabad's most vibrant coworking space — we believe work is more than just a desk and a chair. Located in the heart of D-12 Markaz, Zarpar Arcade, our shared office space brings entrepreneurs, freelancers, startups, and professionals together under one roof.",
              "We offer flexible hot desks, private offices for rent, and meeting rooms equipped with high-speed fiber WiFi and modern amenities. With 30 seats across shared and private spaces, whether you need a day pass coworking space or a full monthly membership with 24/7 access, we have the perfect plan for you.",
              "More than just an affordable office space in Islamabad, we host networking events and community sessions that connect like-minded professionals. Ideal for remote workers, student interns, small teams, and anyone seeking the best coworking space near D-12 Markaz.",
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-muted-foreground leading-relaxed mb-5 text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12 }}
              >
                {text}
              </motion.p>
            ))}

            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-4 px-8 py-4 rounded-2xl bg-primary text-white font-bold relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(20,70,180,0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/15"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">Join Our Community →</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
