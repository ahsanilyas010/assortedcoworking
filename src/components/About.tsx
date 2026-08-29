import { useEffect, useState } from "react";
import { useInView, useScrollReveal } from "@/hooks/useScrollReveal";

function useCountUp(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const update = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * target));
      if (t < 1) requestAnimationFrame(update);
      else setCount(target);
    };
    requestAnimationFrame(update);
  }, [active, target, duration]);

  return count;
}

const stats = [
  { target: 80, suffix: "+", label: "Happy Members", color: "hsl(20 89% 56%)" },
  { target: 24, suffix: "/7", label: "Hour Access", color: "hsl(94 42% 49%)" },
  { target: 100, suffix: "%", label: "Satisfaction", color: "hsl(215 71% 31%)" },
  { target: 1, suffix: "+", label: "Year of Excellence", color: "hsl(20 89% 56%)" },
];

const StatCounter = ({ stat, active }: { stat: typeof stats[0]; active: boolean }) => {
  const count = useCountUp(stat.target, 2000, active);
  return (
    <div className="text-center p-6 rounded-2xl bg-white shadow-md border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div
        className="text-4xl font-black mb-1"
        style={{ color: stat.color }}
      >
        {count}{stat.suffix}
      </div>
      <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
    </div>
  );
};

const About = () => {
  const textRef = useScrollReveal("reveal-left");
  const [statsRef, statsInView] = useInView(0.3);
  const headRef = useScrollReveal("reveal");

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "#f8fafc" }}
    >
      {/* Decorative large text in background */}
      <div
        className="absolute -top-4 -right-8 text-[12rem] font-black select-none pointer-events-none leading-none"
        style={{ color: "rgba(27,58,107,0.04)" }}
      >
        ABOUT
      </div>

      {/* Blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(27,58,107,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="section-container relative">
        <div ref={headRef} className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ background: "rgba(240,112,48,0.1)", color: "hsl(20 89% 56%)" }}
          >
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About{" "}
            <span style={{ color: "hsl(20 89% 56%)" }}>Assorted Coworking</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div ref={textRef} className="space-y-5">
            {[
              <>
                At <strong style={{ color: "hsl(20 89% 56%)" }}>Assorted Coworking</strong>, we believe work is more than just a desk and a chair — it's about community, creativity, and growth. Located in the heart of D-12 Markaz, Islamabad, our space brings entrepreneurs, freelancers, startups, and professionals together under one roof.
              </>,
              <>
                We offer flexible workspaces, private offices, and meeting rooms equipped with modern amenities to help you stay productive and inspired. Whether you're building your business, working remotely, or collaborating with a team, we provide the environment you need to thrive.
              </>,
              <>
                More than just a workspace, we host events, networking sessions, and opportunities that connect like-minded individuals and spark new ideas. Our mission: create a vibrant community where people work smarter, grow faster, and succeed together.
              </>,
            ].map((para, i) => (
              <p
                key={i}
                className="text-gray-600 leading-relaxed text-base"
                style={{
                  borderLeft: i === 0 ? "3px solid hsl(20 89% 56%)" : "none",
                  paddingLeft: i === 0 ? "1rem" : "0",
                }}
              >
                {para}
              </p>
            ))}

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 mt-4 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(215 71% 31%), hsl(215 71% 22%))",
                boxShadow: "0 8px 20px rgba(27,58,107,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 15px 35px rgba(27,58,107,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(27,58,107,0.3)";
              }}
            >
              Join Our Community →
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((s, i) => (
                <StatCounter key={i} stat={s} active={statsInView} />
              ))}
            </div>

            {/* Quote card */}
            <div
              className="rounded-2xl p-6 text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(215 71% 31%), hsl(215 71% 22%))",
                boxShadow: "0 20px 50px rgba(27,58,107,0.35)",
              }}
            >
              <div
                className="absolute -top-6 -right-6 text-8xl opacity-10 select-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                "
              </div>
              <p className="text-white/85 italic text-base leading-relaxed relative z-10">
                "Join us and discover a coworking experience built around innovation, collaboration, and comfort."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: "rgba(240,112,48,0.3)" }}
                >
                  AC
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">Assorted Coworking</div>
                  <div className="text-white/50 text-xs">D-12 Markaz, Islamabad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
