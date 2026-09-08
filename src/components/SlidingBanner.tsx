import { motion } from "framer-motion";
import { Zap, Star, Coffee, Wifi } from "lucide-react";

const ITEMS = [
  { icon: Zap, text: "Visit Us Today & Get a Free 1-Day Trial!" },
  { icon: Star, text: "Islamabad's Most Vibrant Coworking Space" },
  { icon: Coffee, text: "Free Tea & Coffee for Every Member" },
  { icon: Wifi, text: "Blazing-Fast WiFi — Always On, Always Reliable" },
  { icon: Star, text: "24/7 Access · D-12 Markaz Islamabad" },
];

const BannerItem = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="inline-flex items-center gap-4 px-10">
    <motion.div
      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="w-4 h-4 text-white" />
    </motion.div>
    <span className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">{text}</span>
    <span className="text-white/40 text-2xl mx-4">✦</span>
  </div>
);

const SlidingBanner = () => {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden py-5" style={{ background: "linear-gradient(135deg, hsl(20 95% 48%), hsl(20 90% 38%))" }}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="shimmer absolute inset-0 opacity-30" />
      </div>

      {/* Dots decoration */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-orange-700/50 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-orange-700/50 to-transparent z-10" />

      <div className="animate-slide-banner whitespace-nowrap">
        <div className="inline-block">
          {repeated.map((item, i) => (
            <BannerItem key={i} icon={item.icon} text={item.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingBanner;
