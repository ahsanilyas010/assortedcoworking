import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Sun, Sunset, Moon, Clock, Calendar, CalendarDays, Armchair, Lock, Users, Zap, Wifi, Coffee, Printer, Wind, Fingerprint, Shield, Leaf } from "lucide-react";

const AMENITIES = [
  { icon: Wifi, label: "High Speed WiFi" },
  { icon: Coffee, label: "Tea & Coffee" },
  { icon: Printer, label: "Printing" },
  { icon: Wind, label: "Air Conditioned" },
  { icon: Fingerprint, label: "Fingerprint Entry" },
];

const SHIFT_PLANS = [
  {
    name: "Day Shift",
    hours: "9AM to 5PM",
    price: "15,000",
    icon: Sun,
    color: "from-blue-600 to-indigo-600",
    barColor: "bg-blue-600",
    barStart: 0,
    barWidth: 44,
    badge: null,
  },
  {
    name: "Afternoon Shift",
    hours: "2PM to 10PM",
    price: "13,500",
    icon: Sunset,
    color: "from-accent to-orange-500",
    barColor: "bg-accent",
    barStart: 28,
    barWidth: 44,
    badge: null,
  },
  {
    name: "Night Shift",
    hours: "5PM to 3AM",
    sub: "Built for US hours.",
    price: "12,000",
    icon: Moon,
    color: "from-green-600 to-emerald-500",
    barColor: "bg-green-600",
    barStart: 44,
    barWidth: 56,
    badge: null,
  },
  {
    name: "24 Hour Access",
    hours: "Come and go any time, all month",
    price: "18,000",
    icon: Clock,
    color: "from-primary to-blue-800",
    barColor: "bg-primary",
    barStart: 0,
    barWidth: 100,
    badge: "BEST VALUE",
  },
];

const FLEXIBLE_PLANS = [
  {
    name: "Day Pass",
    desc: "Full access for one day",
    price: "1,500",
    period: "",
    icon: Calendar,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "10 Day Flex Pass",
    desc: "Use any 10 days within a month",
    price: "10,000",
    period: "/ month",
    icon: CalendarDays,
    color: "from-green-600 to-teal-600",
  },
  {
    name: "Dedicated Desk",
    desc: "Your own reserved seat, 24/7 access",
    price: "22,000",
    period: "/ month",
    icon: Armchair,
    color: "from-green-700 to-emerald-700",
  },
];

const PRIVATE_PLANS = [
  {
    name: "Private Room",
    desc: "Lockable team office with 24/7 access",
    price: "65,000",
    period: "/ month",
    icon: Lock,
    color: "from-primary to-blue-800",
    highlight: true,
  },
  {
    name: "Meeting Room Access",
    desc: "Add to any membership",
    price: "+ 5,000",
    period: "/ month",
    icon: Users,
    color: "from-primary to-indigo-700",
    highlight: false,
  },
];

const VALUE_PROPS = [
  { icon: Shield, title: "Secure & Safe", desc: "Fingerprint entry and 24/7 access", color: "from-primary to-blue-800" },
  { icon: Leaf, title: "Quiet & Productive", desc: "Focus in a calm, professional setting", color: "from-green-600 to-emerald-500" },
  { icon: Users, title: "Community", desc: "Connect, collaborate and grow together", color: "from-accent to-orange-500" },
  { icon: Armchair, title: "Comfort & Convenience", desc: "Ergonomic seating, modern interiors", color: "from-blue-600 to-indigo-600" },
];

const scrollToContact = () =>
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

const ShiftRow = ({ plan, index, inView }: { plan: typeof SHIFT_PLANS[0]; index: number; inView: boolean }) => {
  const Icon = plan.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      className={`relative rounded-2xl border bg-card p-4 md:p-5 ${
        plan.badge ? "border-accent shadow-lg shadow-accent/10" : "border-border"
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-5 bg-accent text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wider uppercase">
          {plan.badge}
        </span>
      )}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 shadow`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm md:text-base">{plan.name}</div>
            <div className="text-xs text-muted-foreground">{plan.hours}{plan.sub ? ` · ${plan.sub}` : ""}</div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-xs text-muted-foreground">PKR </span>
          <span className={`text-xl md:text-2xl font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>{plan.price}</span>
          <span className="text-xs text-muted-foreground"> / month</span>
        </div>
      </div>
      {/* Shift bar */}
      <div className="mt-3 relative h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`absolute top-0 h-full rounded-full ${plan.barColor}`}
          style={{ left: `${plan.barStart}%`, width: 0 }}
          animate={inView ? { width: `${plan.barWidth}%` } : {}}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const MiniCard = ({
  plan,
  index,
  inView,
  accent = false,
}: {
  plan: { name: string; desc: string; price: string; period: string; icon: React.ElementType; color: string; highlight?: boolean };
  index: number;
  inView: boolean;
  accent?: boolean;
}) => {
  const Icon = plan.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`rounded-2xl p-5 border flex flex-col gap-3 ${
        plan.highlight
          ? "bg-primary text-white border-primary shadow-xl shadow-primary/20"
          : "bg-card border-border"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${plan.highlight ? "bg-white/20" : `bg-gradient-to-br ${plan.color}`} flex items-center justify-center flex-shrink-0 shadow`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className={`font-bold text-sm ${plan.highlight ? "text-white" : ""}`}>{plan.name}</div>
          <div className={`text-xs ${plan.highlight ? "text-white/70" : "text-muted-foreground"}`}>{plan.desc}</div>
        </div>
      </div>
      <div className={`text-right border-t pt-3 ${plan.highlight ? "border-white/20" : "border-border"}`}>
        <span className={`text-xs ${plan.highlight ? "text-white/70" : "text-muted-foreground"}`}>PKR </span>
        <span className={`text-2xl font-black ${plan.highlight ? "text-white" : `bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}`}>{plan.price}</span>
        {plan.period && <span className={`text-xs ml-1 ${plan.highlight ? "text-white/70" : "text-muted-foreground"}`}>{plan.period}</span>}
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-5 py-2 text-sm font-semibold mb-5"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Zap className="w-4 h-4" />
            Rate Card 2026
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Coworking Space{" "}
            <span className="text-gradient">Prices in Islamabad</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Day pass from PKR 1,500 · Shift memberships from PKR 12,000 — every plan includes WiFi, tea & coffee, printing, AC & fingerprint entry
          </p>
        </motion.div>

        {/* Amenities strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {AMENITIES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium">
              <Icon className="w-4 h-4 text-primary" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Shift Memberships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-black text-lg tracking-wide uppercase">Shift Memberships</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-sm text-muted-foreground mb-5">Every plan includes all amenities above.</p>
        </motion.div>

        <div className="grid gap-3 mb-12">
          {SHIFT_PLANS.map((plan, i) => (
            <ShiftRow key={plan.name} plan={plan} index={i} inView={inView} />
          ))}
        </div>

        {/* Flexible Plans + Private side by side */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Flexible Plans */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="font-black text-lg tracking-wide uppercase">Flexible Plans</span>
              <div className="flex-1 h-px bg-border" />
            </motion.div>
            <div className="grid gap-4">
              {FLEXIBLE_PLANS.map((plan, i) => (
                <MiniCard key={plan.name} plan={plan} index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Private & Add-Ons */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="font-black text-lg tracking-wide uppercase">Private & Add-Ons</span>
              <div className="flex-1 h-px bg-border" />
            </motion.div>
            <div className="grid gap-4">
              {PRIVATE_PLANS.map((plan, i) => (
                <MiniCard key={plan.name} plan={plan} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {VALUE_PROPS.map((prop, i) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.65 + i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 bg-card border border-border rounded-2xl p-5"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prop.color} flex items-center justify-center shadow`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm">{prop.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{prop.desc}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Included features + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="bg-card border border-border rounded-3xl p-8 text-center"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">Everything included in every plan</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
            {[
              "High-Speed WiFi",
              "Tea & Coffee",
              "Printing",
              "Air Conditioning",
              "Fingerprint Entry",
              "Quiet Environment",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm font-medium">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <motion.button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-accent hover:bg-accent/90 text-white font-bold text-base shadow-lg relative overflow-hidden"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="absolute inset-0 bg-white/15"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative">Book Your Space Today →</span>
          </motion.button>
          <p className="text-xs text-muted-foreground mt-4">🎁 Free 1-day trial pass for new members — no commitment</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
