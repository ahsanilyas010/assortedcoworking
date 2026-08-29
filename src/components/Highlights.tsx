import { Snowflake, Users, Wifi, Volume2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  {
    icon: Snowflake,
    title: "Air-Conditioned",
    description: "Stay cool and comfortable all day long in our fully climate-controlled spaces.",
    color: "hsl(215 71% 31%)",
    glow: "rgba(27,58,107,0.6)",
    bg: "rgba(27,58,107,0.08)",
    emoji: "❄️",
  },
  {
    icon: Users,
    title: "Private Meeting Room",
    description: "Professional, soundproof space for your most important discussions.",
    color: "hsl(20 89% 56%)",
    glow: "rgba(240,112,48,0.6)",
    bg: "rgba(240,112,48,0.08)",
    emoji: "🤝",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Lightning-fast 100 Mbps internet for seamless connectivity.",
    color: "hsl(94 42% 49%)",
    glow: "rgba(90,158,62,0.6)",
    bg: "rgba(90,158,62,0.08)",
    emoji: "⚡",
  },
  {
    icon: Volume2,
    title: "Silent Environment",
    description: "Peaceful, distraction-free workspace designed for maximum focus.",
    color: "hsl(215 71% 31%)",
    glow: "rgba(27,58,107,0.6)",
    bg: "rgba(27,58,107,0.08)",
    emoji: "🔇",
  },
];

const TiltCard = ({
  item,
  delay,
}: {
  item: (typeof highlights)[0];
  delay: number;
}) => {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-y * 16}deg) rotateY(${x * 16}deg) translateZ(12px) scale(1.03)`;
    card.style.boxShadow = `0 25px 50px ${item.glow}, 0 0 0 1px rgba(255,255,255,0.05)`;
    const shine = card.querySelector<HTMLElement>(".card-shine");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateZ(0) scale(1)";
    card.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
    const shine = card.querySelector<HTMLElement>(".card-shine");
    if (shine) shine.style.background = "none";
  };

  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="relative bg-white rounded-2xl p-7 cursor-default overflow-hidden transition-all duration-200"
        style={{
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.04)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* Shine layer */}
        <div className="card-shine absolute inset-0 pointer-events-none rounded-2xl transition-all duration-150" />

        {/* Icon */}
        <div className="relative mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-1"
            style={{ background: item.bg }}
          >
            <item.icon className="w-8 h-8" style={{ color: item.color }} />
          </div>
          {/* Pulse rings */}
          <div
            className="absolute top-0 left-0 w-16 h-16 rounded-2xl animate-pulse-ring"
            style={{ border: `2px solid ${item.color}`, opacity: 0.4 }}
          />
          <div
            className="absolute top-0 left-0 w-16 h-16 rounded-2xl animate-pulse-ring"
            style={{ border: `2px solid ${item.color}`, opacity: 0.2, animationDelay: "0.5s" }}
          />
          <span className="absolute -top-2 -right-2 text-2xl">{item.emoji}</span>
        </div>

        <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl transition-all duration-500 group-hover:w-full"
          style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
        />
      </div>
    </div>
  );
};

const Highlights = () => {
  const headRef = useScrollReveal("reveal");

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#f8fafc" }}>
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(27,58,107,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="section-container">
        <div ref={headRef} className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ background: "rgba(240,112,48,0.1)", color: "hsl(20 89% 56%)" }}
          >
            Amenities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to{" "}
            <span style={{ color: "hsl(20 89% 56%)" }}>Thrive</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Premium amenities that make every workday exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <TiltCard key={i} item={item} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
