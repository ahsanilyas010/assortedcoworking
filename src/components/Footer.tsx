import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = ["Home", "About Us", "Pricing", "Contact"];
const NAV_IDS = ["home", "about", "pricing", "contact"];

const SOCIAL = [
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-blue-600" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-600" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:bg-blue-700" },
];

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: "hsl(220 30% 8%)" }}>
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="section-container relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Assorted Coworking" className="h-12 w-auto object-contain" />
              <div>
                <div className="text-white font-bold text-lg leading-tight">Assorted</div>
                <div className="text-accent text-sm font-semibold leading-tight">Coworking</div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Islamabad's best coworking space at D-12 Markaz, Zarpar Arcade. Flexible hot desks, private offices, meeting rooms & 24/7 access for freelancers, startups & remote teams.
            </p>
            <div className="flex gap-3">
              {SOCIAL.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 ${s.color}`}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-accent"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </h4>
            <ul className="space-y-3">
              {NAV.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <button
                    onClick={() => scrollTo(NAV_IDS[i])}
                    className="text-white/55 hover:text-white hover:translate-x-2 transition-all duration-200 text-sm font-medium flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-0 h-0.5 bg-accent group-hover:w-4 transition-all duration-300"
                    />
                    {item}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Find Us
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-accent"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: "FF 27, Zarpar Arcade, D-12 Markaz, Islamabad" },
                { icon: Phone, text: "+92 321 852 6405" },
                { icon: Mail, text: "hello@assorted.business" },
              ].map(({ icon: Icon, text }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-white/55"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/40 text-sm">
            © {year} Assorted Coworking. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Made with ❤️ in Islamabad
          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-xl bg-accent/20 hover:bg-accent flex items-center justify-center text-accent hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
