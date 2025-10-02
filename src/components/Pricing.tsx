import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Day Pass",
    price: "1,500 PKR",
    period: "/day",
    description: "Perfect for daily workspace needs",
    features: [
      "High-Speed WiFi",
      "Free Tea & Coffee",
      "Comfortable, Air-Conditioned Space",
      "Meeting Room Access (if needed)",
      "Quiet & Productive Environment",
      "Power Backup",
      "Flexible Timings"
    ],
    badge: null
  },
  {
    name: "Monthly Plan",
    price: "20,000 PKR",
    period: "/month",
    description: "Perfect for professionals and startups",
    features: [
      "AC Room",
      "Private Meeting Room",
      "High-Speed WiFi",
      "Silent Environment",
      "Tea & Coffee",
      "24/7 Open"
    ],
    badge: "MOST POPULAR"
  }
];

const Pricing = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section id="pricing" className="py-20">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">Choose the plan that works best for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, planIndex) => (
            <div 
              key={planIndex}
              className={`bg-card rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300 ${
                plan.badge ? 'border-2 border-primary' : 'border border-border'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="bg-accent text-center py-2">
                  <span className="text-accent-foreground font-semibold">{plan.badge}</span>
                </div>
              )}

              {/* Pricing Header */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="px-8 pb-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="hero" size="lg" className="w-full" onClick={scrollToContact}>
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>;
};
export default Pricing;