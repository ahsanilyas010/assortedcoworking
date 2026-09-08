import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Users2, Clock, Sparkles, Shield, Coffee } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Zarpar Arcade, D-12 Markaz — the heart of Islamabad with superb connectivity",
    stat: "5 min",
    statLabel: "from city center",
    color: "from-rose-500 to-pink-500",
    delay: 0,
  },
  {
    icon: Users2,
    title: "Thriving Community",
    description: "Join 80+ entrepreneurs, freelancers and startup founders growing together",
    stat: "80+",
    statLabel: "active members",
    color: "from-violet-500 to-purple-500",
    delay: 0.1,
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Work on your own schedule — our space adapts to your lifestyle, not the other way",
    stat: "24/7",
    statLabel: "access available",
    color: "from-blue-500 to-cyan-500",
    delay: 0.2,
  },
  {
    icon: Sparkles,
    title: "Spotless Spaces",
    description: "Maintained to hotel-level standards — clean, fresh and ready when you arrive",
    stat: "100%",
    statLabel: "satisfaction rate",
    color: "from-accent to-yellow-500",
    delay: 0.3,
  },
  {
    icon: Coffee,
    title: "Free Refreshments",
    description: "Unlimited tea and coffee included — fuel your best work without the tab",
    stat: "∞",
    statLabel: "cups of coffee",
    color: "from-amber-500 to-orange-500",
    delay: 0.4,
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "CCTV-monitored premises with secure access for your complete peace of mind",
    stat: "24/7",
    statLabel: "monitored",
    color: "from-green-500 to-emerald-500",
    delay: 0.5,
  },
];

const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[0]; index: number }) => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const Icon = benefit.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: benefit.delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative bg-card rounded-2xl p-7 border border-border overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Animated ring behind icon */}
      <div className="relative w-16 h-16 mb-5">
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.color} opacity-20`}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
        />
        <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Stat badge */}
      <motion.div
        className={`absolute top-6 right-6 text-right`}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: benefit.delay + 0.3 }}
      >
        <div className={`text-2xl font-black bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
          {benefit.stat}
        </div>
        <div className="text-xs text-muted-foreground">{benefit.statLabel}</div>
      </motion.div>

      <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
        {benefit.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>

      {/* Animated underline */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${benefit.color}`}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: benefit.delay + 0.3, transformOrigin: "left" }}
      />
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-background" />

      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-sm font-bold text-accent tracking-widest uppercase mb-4"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
            transition={{ duration: 0.8 }}
          >
            Our Advantages
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Why Professionals{" "}
            <span className="text-gradient">Choose Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The perfect blend of comfort, convenience, and community — crafted for your success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
