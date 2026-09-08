import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Zap, Building2 } from "lucide-react";

const plans = [
  {
    name: "Day Pass",
    price: "1,500",
    period: "/day",
    description: "Flexible hot desk — walk in, work, leave",
    badge: null,
    icon: Zap,
    color: "from-blue-600 to-indigo-600",
    features: [
      "High-Speed WiFi",
      "Free Tea & Coffee",
      "Air-Conditioned Space",
      "Quiet Environment",
      "Flexible Timings",
    ],
  },
  {
    name: "Monthly Membership",
    price: "20,000",
    period: "/month",
    description: "Private office with 24/7 access — your dedicated workspace",
    badge: "MOST POPULAR",
    icon: Building2,
    color: "from-accent to-orange-500",
    features: [
      "Private AC Room",
      "Meeting Room Access",
      "High-Speed WiFi",
      "Silent Environment",
      "Unlimited Tea & Coffee",
      "24/7 Open Access",
    ],
  },
];

const PricingCard = ({ plan, index }: { plan: typeof plans[0]; index: number }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const Icon = plan.icon;
  const isPopular = !!plan.badge;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-3xl overflow-hidden ${
        isPopular
          ? "border-2 border-accent shadow-2xl"
          : "border border-border shadow-lg"
      }`}
      style={{
        boxShadow: isPopular
          ? "0 20px 60px rgba(243,111,43,0.2), 0 0 0 2px rgba(243,111,43,0.3)"
          : "0 8px 30px rgba(0,0,0,0.08)",
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          className="bg-gradient-to-r from-accent to-orange-500 text-white text-center py-2.5 text-sm font-bold tracking-wider"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ⭐ {plan.badge} ⭐
        </motion.div>
      )}

      <div className="bg-card p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-semibold text-muted-foreground">PKR</span>
            <motion.span
              className={`text-5xl font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3, type: "spring", bounce: 0.4 }}
            >
              {plan.price}
            </motion.span>
            <span className="text-muted-foreground font-medium">{plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, i) => (
            <motion.li
              key={feature}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.4 + i * 0.06 }}
            >
              <motion.div
                className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}
                whileHover={{ scale: 1.3, rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
              <span className="text-sm font-medium">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          onClick={scrollToContact}
          className={`w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${plan.color} relative overflow-hidden`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <span className="relative">Get Started Today</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-5 py-2 text-sm font-semibold mb-5"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Zap className="w-4 h-4" />
            Simple Pricing
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Affordable Coworking Space{" "}
            <span className="text-gradient">Prices in Islamabad</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Day pass from PKR 1,500 · Monthly membership from PKR 20,000 — flexible plans for freelancers, startups & remote teams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-muted-foreground mt-10 text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          🎁 Free 1-day trial pass for new members — experience Islamabad's best coworking space before you commit!
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
