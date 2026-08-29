import { MapPin, Users2, Clock, Sparkles, Coffee, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const benefits = [
  {
    icon: MapPin,
    title: "Prime Location",
    description: "D-12 Markaz, Islamabad. Easily accessible with ample parking and close to major transport links.",
    num: "01",
    color: "hsl(20 89% 56%)",
    bg: "rgba(240,112,48,0.15)",
  },
  {
    icon: Users2,
    title: "Pro Community",
    description: "Network with entrepreneurs, freelancers, and startups. Grow your circle inside our vibrant community.",
    num: "02",
    color: "hsl(94 42% 49%)",
    bg: "rgba(90,158,62,0.15)",
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Work on your own schedule. 24/6 access means you're never locked out when inspiration strikes.",
    num: "03",
    color: "hsl(215 71% 50%)",
    bg: "rgba(27,58,107,0.3)",
  },
  {
    icon: Sparkles,
    title: "Clean & Productive",
    description: "Maintained to the highest standards. Clean, organized, and always ready for your best work.",
    num: "04",
    color: "hsl(20 89% 56%)",
    bg: "rgba(240,112,48,0.15)",
  },
  {
    icon: Coffee,
    title: "Free Refreshments",
    description: "Unlimited tea and coffee included. Fuel your focus without leaving your seat.",
    num: "05",
    color: "hsl(94 42% 49%)",
    bg: "rgba(90,158,62,0.15)",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "CCTV monitored, secure access. Work with complete peace of mind in a safe environment.",
    num: "06",
    color: "hsl(215 71% 50%)",
    bg: "rgba(27,58,107,0.3)",
  },
];

const BenefitCard = ({ item, delay }: { item: typeof benefits[0]; delay: number }) => {
  const ref = useScrollReveal("reveal");

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div
        className="relative p-6 rounded-2xl group transition-all duration-300 h-full"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        {/* Big number */}
        <span
          className="absolute top-4 right-5 text-5xl font-black opacity-10 select-none"
          style={{ color: item.color }}
        >
          {item.num}
        </span>

        {/* Icon with pulse */}
        <div className="relative inline-block mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: item.bg }}
          >
            <item.icon className="w-7 h-7" style={{ color: item.color }} />
          </div>
          <div
            className="absolute inset-0 rounded-2xl animate-pulse-ring"
            style={{ border: `2px solid ${item.color}`, opacity: 0.4 }}
          />
          <div
            className="absolute inset-0 rounded-2xl animate-pulse-ring"
            style={{ border: `2px solid ${item.color}`, opacity: 0.2, animationDelay: "0.7s" }}
          />
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const headRef = useScrollReveal("reveal");

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #050e1a 0%, #0d2244 60%, #1b3a6b 100%)",
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,112,48,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(90,158,62,0.5) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="section-container relative">
        <div ref={headRef} className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ background: "rgba(240,112,48,0.15)", color: "hsl(20 89% 65%)" }}
          >
            Why Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why{" "}
            <span
              style={{
                background: "linear-gradient(90deg, hsl(20 89% 60%), hsl(20 89% 80%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Assorted Coworking?
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            The perfect blend of comfort, convenience, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <BenefitCard key={i} item={b} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
