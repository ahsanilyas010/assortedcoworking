import { Check, Zap, Crown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const plans = [
  {
    name: "Day Pass",
    price: "1,500",
    currency: "PKR",
    period: "/ day",
    description: "Perfect for trying us out or occasional visits.",
    badge: "BEST VALUE",
    BadgeIcon: Zap,
    features: [
      "High-Speed WiFi",
      "Free Tea & Coffee",
      "Air-Conditioned Space",
      "Quiet & Productive Environment",
      "Flexible Timings",
    ],
    primary: false,
    glowColor: "rgba(90,158,62,0.5)",
    accentColor: "hsl(94 42% 49%)",
    badgeBg: "linear-gradient(135deg, hsl(94 42% 49%), hsl(94 42% 38%))",
  },
  {
    name: "Monthly Plan",
    price: "20,000",
    currency: "PKR",
    period: "/ month",
    description: "The full Assorted experience for dedicated professionals.",
    badge: "MOST POPULAR",
    BadgeIcon: Crown,
    features: [
      "Private AC Room",
      "Private Meeting Room",
      "100 Mbps High-Speed WiFi",
      "Silent Environment",
      "Unlimited Tea & Coffee",
      "24/7 Access",
    ],
    primary: true,
    glowColor: "rgba(240,112,48,0.55)",
    accentColor: "hsl(20 89% 56%)",
    badgeBg: "linear-gradient(135deg, hsl(20 89% 56%), hsl(20 89% 44%))",
  },
];

const PricingCard = ({
  plan,
  delay,
}: {
  plan: (typeof plans)[0];
  delay: number;
}) => {
  const ref = useScrollReveal("reveal-scale");

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div
        className="relative rounded-3xl overflow-hidden transition-all duration-400 h-full"
        style={{
          padding: plan.primary ? "2px" : "1px",
          background: plan.primary
            ? "linear-gradient(135deg, hsl(20 89% 56%), hsl(215 71% 31%), hsl(94 42% 49%), hsl(20 89% 56%))"
            : "linear-gradient(135deg, hsl(94 42% 49%), hsl(215 71% 31%))",
          backgroundSize: "300% 300%",
          animation: plan.primary ? "border-rotate 4s ease-in-out infinite" : "none",
          boxShadow: plan.primary ? "0 20px 60px rgba(240,112,48,0.25)" : "0 8px 30px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 30px 70px ${plan.glowColor}`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = plan.primary
            ? "0 20px 60px rgba(240,112,48,0.25)"
            : "0 8px 30px rgba(0,0,0,0.08)";
        }}
      >
        <div className="bg-white rounded-3xl h-full flex flex-col">
          {/* Badge */}
          <div
            className="flex items-center justify-center gap-2 py-3"
            style={{ background: plan.badgeBg }}
          >
            <plan.BadgeIcon className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">
              {plan.badge}
            </span>
          </div>

          <div className="p-8 flex flex-col flex-1">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-gray-400 text-base font-medium self-start mt-2">{plan.currency}</span>
                <span
                  className="text-5xl font-black leading-none"
                  style={{ color: plan.accentColor }}
                >
                  {plan.price}
                </span>
                <span className="text-gray-400 text-base self-end mb-1">{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3.5 mb-8 flex-1">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 group">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{ background: `${plan.accentColor}20` }}
                  >
                    <Check className="w-3 h-3" style={{ color: plan.accentColor }} />
                  </div>
                  <span className="text-gray-600 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative overflow-hidden w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all duration-300"
              style={{
                background: plan.primary
                  ? "linear-gradient(135deg, hsl(20 89% 56%), hsl(20 89% 44%))"
                  : "linear-gradient(135deg, hsl(94 42% 49%), hsl(94 42% 38%))",
                boxShadow: `0 8px 20px ${plan.glowColor}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 35px ${plan.glowColor}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${plan.glowColor}`;
              }}
            >
              <span className="relative z-10">Get Started Today</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const headRef = useScrollReveal("reveal");
  const noteRef = useScrollReveal("reveal");

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-50 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,112,48,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="section-container">
        <div ref={headRef} className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ background: "rgba(27,58,107,0.08)", color: "hsl(215 71% 31%)" }}
          >
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple,{" "}
            <span style={{ color: "hsl(20 89% 56%)" }}>Transparent</span> Plans
          </h2>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            No hidden fees. Pick the plan that fits your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} delay={i * 150} />
          ))}
        </div>

        <div ref={noteRef} className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            🎁 First-time visitors get a{" "}
            <strong className="text-orange-500">free 1-day trial</strong>. Come see it for yourself!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
