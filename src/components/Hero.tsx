import { useState, useEffect, useRef } from "react";
import { ArrowDown, Users, Clock, Star, Wifi } from "lucide-react";

const WORDS = ["Productive", "Creative", "Professional", "Inspiring"];

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 10}s`,
  duration: `${7 + Math.random() * 9}s`,
  size: `${1.5 + Math.random() * 3}px`,
  opacity: 0.15 + Math.random() * 0.5,
}));

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < word.length) {
      timeout = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 110);
    } else if (!isDeleting && displayText.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 55);
    } else {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050e1a 0%, #0d2244 40%, #1b3a6b 100%)" }}
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/3 -left-1/4 w-3/4 h-3/4 rounded-full animate-blob-morph"
          style={{
            background: "radial-gradient(circle, rgba(27,58,107,0.6) 0%, transparent 70%)",
            filter: "blur(70px)",
            transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
        <div
          className="absolute -bottom-1/3 -right-1/4 w-3/4 h-3/4 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(240,112,48,0.25) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "blob-morph 18s ease-in-out infinite reverse",
            transform: `translate(${-mousePos.x * 0.15}px, ${-mousePos.y * 0.15}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(90,158,62,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "blob-morph 22s ease-in-out infinite",
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: p.left,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animation: `particle-up ${p.duration} ${p.delay} linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div style={{ animation: "slide-up 0.9s ease forwards" }}>
            <div
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full text-sm text-white/70"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Now Open · D-12 Markaz, Islamabad
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Your{" "}
              <span className="block">
                <span
                  style={{
                    background: "linear-gradient(90deg, hsl(20 89% 60%), hsl(20 89% 78%), hsl(20 89% 60%))",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gradient-text-shift 3s ease-in-out infinite",
                  }}
                >
                  {displayText || " "}
                </span>
                <span
                  className="inline-block align-middle ml-1 w-0.5 bg-orange-400"
                  style={{ height: "1em", animation: "none", opacity: displayText.length % 2 === 0 ? 1 : 0, transition: "opacity 0.1s" }}
                />
              </span>
              <span className="text-white">Co-Working Space</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-lg leading-relaxed">
              Work smarter in flexible, air-conditioned spaces designed for modern professionals. Islamabad's most productive workspace.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="relative overflow-hidden px-8 py-4 rounded-full font-semibold text-white text-base transition-all duration-300 shimmer-btn"
                style={{
                  background: "linear-gradient(135deg, hsl(20 89% 56%) 0%, hsl(20 89% 44%) 100%)",
                  boxShadow: "0 0 30px rgba(240,112,48,0.45), 0 4px 20px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 70px rgba(240,112,48,0.8), 0 0 140px rgba(240,112,48,0.3), 0 4px 20px rgba(0,0,0,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px) scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px rgba(240,112,48,0.45), 0 4px 20px rgba(0,0,0,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                }}
              >
                Book a Free Tour →
              </button>

              <button
                onClick={() => scrollTo("pricing")}
                className="px-8 py-4 rounded-full font-semibold text-white text-base transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                }}
              >
                See Pricing
              </button>
            </div>
          </div>

          {/* Right — glass card */}
          <div
            className="hidden lg:block"
            style={{
              animation: "slide-in-right 1s ease 0.4s both",
              transform: `translate(${mousePos.x * 0.08}px, ${mousePos.y * 0.08}px)`,
              transition: "transform 0.35s ease-out",
            }}
          >
            <div
              className="relative ml-auto max-w-xs"
            >
              <div
                className="rounded-3xl p-7"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">
                  Live Stats
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Users,  value: "80+",    label: "Members",  glow: "rgba(27,58,107,0.6)" },
                    { icon: Clock,  value: "24/7",   label: "Access",   glow: "rgba(90,158,62,0.5)" },
                    { icon: Star,   value: "5★",     label: "Rating",   glow: "rgba(240,112,48,0.5)" },
                    { icon: Wifi,   value: "100Mbps",label: "WiFi Speed",glow:"rgba(27,58,107,0.6)" },
                  ].map(({ icon: Icon, value, label, glow }) => (
                    <div
                      key={label}
                      className="text-center p-4 rounded-2xl transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${glow}`;
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                        (e.currentTarget as HTMLElement).style.transform = "";
                      }}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2 text-orange-400" />
                      <div className="text-xl font-bold text-white">{value}</div>
                      <div className="text-white/40 text-xs mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-5 p-4 rounded-2xl"
                  style={{
                    background: "rgba(240,112,48,0.12)",
                    border: "1px solid rgba(240,112,48,0.25)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/70 text-xs">Monthly spots available</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="h-1.5 rounded-full w-[65%] animate-glow-orange"
                      style={{ background: "linear-gradient(90deg, hsl(20 89% 56%), hsl(94 42% 49%))" }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div
                className="absolute -top-5 -right-5 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl animate-float"
                style={{
                  background: "linear-gradient(135deg, hsl(20 89% 56%), hsl(20 89% 44%))",
                  boxShadow: "0 10px 30px rgba(240,112,48,0.5)",
                }}
              >
                ☕
              </div>
              <div
                className="absolute -bottom-5 -left-5 w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(215 71% 40%), hsl(215 71% 28%))",
                  boxShadow: "0 10px 30px rgba(27,58,107,0.5)",
                  animation: "float 5s ease-in-out 1.5s infinite",
                }}
              >
                💼
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2"
        style={{ animation: "bounce-soft 2.5s ease-in-out infinite" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs uppercase tracking-widest font-semibold">Scroll</span>
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center p-1.5"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <div className="w-1.5 h-3 rounded-full bg-white/40" style={{ animation: "float 1.5s ease-in-out infinite" }} />
          </div>
          <ArrowDown className="w-4 h-4 text-white/20" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
