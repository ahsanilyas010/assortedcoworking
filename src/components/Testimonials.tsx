import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Hamza R.",
    role: "Freelance Developer",
    text: "Best coworking space in Islamabad by far! The night shift option is perfect for my US client projects. Fiber internet never drops, and the fingerprint entry gives me peace of mind when I work late.",
    rating: 5,
    avatar: "H",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Sara M.",
    role: "Startup Founder",
    text: "We moved our 3-person team here after struggling with home distractions. The private room is affordable and having 24/7 access means we can work whenever inspiration strikes. Highly recommended!",
    rating: 5,
    avatar: "S",
    color: "from-accent to-orange-500",
  },
  {
    name: "Usman K.",
    role: "Graphic Designer",
    text: "I tried three coworking spaces in Islamabad before finding Assorted. The day pass at PKR 1,500 is unbeatable value. Free tea & coffee, super fast WiFi, and the vibe is just right for creative work.",
    rating: 5,
    avatar: "U",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Fatima A.",
    role: "Remote Marketing Manager",
    text: "As a woman working late hours, the CCTV-secured premises and fingerprint-only entry give me complete confidence. The community events have introduced me to amazing professionals too!",
    rating: 5,
    avatar: "F",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Ali Z.",
    role: "University Student & Intern",
    text: "The 10-day flex pass suits my schedule perfectly — I only pay for the days I need. D-12 Markaz location is super convenient, and the quiet environment helps me focus on my projects way better than any café.",
    rating: 5,
    avatar: "A",
    color: "from-rose-500 to-pink-500",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
    ))}
  </div>
);

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.span
            className="inline-block text-sm font-bold text-accent tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Member Reviews
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            What Our Members{" "}
            <span className="text-gradient">Say About Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Freelancers, startup teams, and remote workers love working from Assorted Coworking in D-12 Islamabad
          </p>

          {/* Aggregate rating */}
          <motion.div
            className="inline-flex items-center gap-3 mt-6 bg-card border border-border rounded-full px-6 py-3"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Stars count={5} />
            <span className="font-black text-xl">5.0</span>
            <span className="text-muted-foreground text-sm">· 5 reviews</span>
          </motion.div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group"
            >
              {/* Subtle bg on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${review.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

              {/* Quote icon */}
              <Quote className={`w-8 h-8 bg-gradient-to-br ${review.color} bg-clip-text text-transparent opacity-30`} />

              <Stars count={review.rating} />

              <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{review.text}"</p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                  {review.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm mb-4">Ready to join our community?</p>
          <motion.button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Claim Your Free 1-Day Trial →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
