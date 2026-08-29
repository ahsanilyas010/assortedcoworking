import { Facebook, Linkedin, Instagram, MapPin, Phone, Mail, ArrowUp } from "lucide-react";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const socials = [
  { Icon: Facebook,  href: "#", label: "Facebook",  color: "rgba(59,89,152,0.6)" },
  { Icon: Instagram, href: "#", label: "Instagram", color: "rgba(225,48,108,0.5)" },
  { Icon: Linkedin,  href: "#", label: "LinkedIn",  color: "rgba(0,119,181,0.6)" },
];

const links = [
  { label: "Home",    id: "home" },
  { label: "About Us", id: "about" },
  { label: "Pricing", id: "pricing" },
  { label: "Contact", id: "contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "#040b16" }}>
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ display: "block" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            fill="#050e1a"
          />
        </svg>
      </div>

      {/* Ambient glows */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(27,58,107,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,112,48,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="section-container pt-24 pb-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl font-black mb-3"
              style={{
                background: "linear-gradient(90deg, hsl(20 89% 60%), hsl(20 89% 80%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Assorted Coworking
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Premium coworking solutions for modern professionals and growing teams in Islamabad.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = color;
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${color}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  <Icon className="w-4 h-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {links.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-white/40 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-1.5"
                  >
                    <span
                      className="w-1 h-1 rounded-full inline-block"
                      style={{ background: "hsl(20 89% 56%)" }}
                    />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: "Zarpar Arcade, Office #27, D-12 Markaz, Islamabad",
                  color: "hsl(20 89% 56%)",
                },
                {
                  icon: Phone,
                  text: "+92 321 8526405",
                  href: "tel:+923218526405",
                  color: "hsl(94 42% 49%)",
                },
                {
                  icon: Mail,
                  text: "hello@assorted.business",
                  href: "mailto:hello@assorted.business",
                  color: "hsl(215 71% 50%)",
                },
              ].map(({ icon: Icon, text, href, color }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
                  {href ? (
                    <a href={href} className="text-white/40 hover:text-white/80 text-sm transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="text-white/40 text-sm">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/25 text-xs">
            © {year} Assorted Coworking. All rights reserved.
          </p>

          {/* Back to top */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 text-white/30 hover:text-white text-xs transition-all duration-200 group"
          >
            Back to top
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover:-translate-y-1"
              style={{
                background: "rgba(240,112,48,0.2)",
                border: "1px solid rgba(240,112,48,0.3)",
              }}
            >
              <ArrowUp className="w-3 h-3 text-orange-400" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
