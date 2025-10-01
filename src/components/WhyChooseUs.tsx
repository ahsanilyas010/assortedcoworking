import { MapPin, Users2, Clock, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Easily accessible location in the heart of the city with excellent connectivity",
  },
  {
    icon: Users2,
    title: "Professional Community",
    description: "Network with like-minded professionals and grow your business together",
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Work on your schedule with 24/6 access to the workspace",
  },
  {
    icon: Sparkles,
    title: "Clean & Productive",
    description: "Maintained to the highest standards for your comfort and productivity",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of comfort, convenience, and community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-lg gradient-primary flex items-center justify-center mb-4 shadow-lg">
                <benefit.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
