import { Snowflake, Users, Wifi, Volume2 } from "lucide-react";

const highlights = [
  {
    icon: Snowflake,
    title: "Air-Conditioned Rooms",
    description: "Stay cool and comfortable all day long",
  },
  {
    icon: Users,
    title: "Private Meeting Room",
    description: "Professional space for your discussions",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Lightning-fast internet connectivity",
  },
  {
    icon: Volume2,
    title: "Silent Environment",
    description: "Peaceful workspace for maximum focus",
  },
];

const Highlights = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-lg">
                <item.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
