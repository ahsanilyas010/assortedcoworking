import { Coffee, Wifi, Users, Clock, Star, Zap, Shield, MapPin } from "lucide-react";

const items = [
  { icon: Coffee,  text: "Free Tea & Coffee" },
  { icon: Wifi,    text: "100 Mbps High-Speed WiFi" },
  { icon: Users,   text: "Visit Us Today — Get a Free 1-Day Trial!" },
  { icon: Clock,   text: "24/7 Access Available" },
  { icon: Star,    text: "5-Star Rated Workspace" },
  { icon: Zap,     text: "Air-Conditioned Rooms" },
  { icon: Shield,  text: "Safe & Secure Environment" },
  { icon: MapPin,  text: "D-12 Markaz, Islamabad" },
];

const repeated = [...items, ...items];

const SlidingBanner = () => (
  <div
    className="relative overflow-hidden py-4 select-none"
    style={{
      background: "linear-gradient(135deg, hsl(20 89% 52%), hsl(20 89% 44%))",
      boxShadow: "0 4px 30px rgba(240,112,48,0.4)",
    }}
  >
    {/* Shimmer overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "border-rotate 3s linear infinite",
      }}
    />

    <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
      {repeated.map(({ icon: Icon, text }, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2.5 px-8 text-white font-bold text-base md:text-lg"
        >
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <Icon className="w-3.5 h-3.5 text-white" />
          </span>
          {text}
          <span className="ml-6 text-white/40">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default SlidingBanner;
