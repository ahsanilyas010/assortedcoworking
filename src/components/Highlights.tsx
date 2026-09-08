import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Snowflake, Users, Wifi, Volume2 } from "lucide-react";

const highlights = [
  {
    icon: Snowflake,
    title: "Air-Conditioned",
    description: "Stay cool and comfortable all day long in our climate-controlled rooms",
    color: "from-blue-500 to-cyan-400",
    glow: "rgba(59,130,246,0.4)",
  },
  {
    icon: Users,
    title: "Meeting Rooms",
    description: "Professional private spaces for your team discussions and client calls",
    color: "from-purple-500 to-pink-400",
    glow: "rgba(168,85,247,0.4)",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Lightning-fast fiber internet for smooth video calls and uploads",
    color: "from-accent to-orange-400",
    glow: "rgba(243,111,43,0.4)",
  },
  {
    icon: Volume2,
    title: "Silent Zone",
    description: "Carefully curated peaceful environment for maximum focus",
    color: "from-green-500 to-emerald-400",
    glow: "rgba(34,197,94,0.4)",
  },
];

const HighlightCard = ({ item, index }: { item: typeof highlights[0]; index: number }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative bg-card rounded-2xl p-7 border border-border overflow-hidden cursor-default"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ boxShadow: `inset 0 0 40px ${item.glow}` }}
      />

      {/* Animated corner accent */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
      />

      {/* Icon */}
      <motion.div
        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg`}
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-8 h-8 text-white" />
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} blur-md opacity-50`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        />
      </motion.div>

      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
        {item.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>

      {/* Bottom line animation */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${item.color}`}
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : {}}
        transition={{ duration: 0.8, delay: index * 0.12 + 0.4 }}
      />
    </motion.div>
  );
};

const Highlights = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Everything You <span className="text-gradient">Need to Thrive</span>
          </h2>
          <p className="text-muted-foreground">Premium amenities, zero compromise</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <HighlightCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
