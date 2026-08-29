import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = [
  { label: "Home",    id: "home" },
  { label: "About",   id: "about" },
  { label: "Pricing", id: "pricing" },
  { label: "Contact", id: "contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: "rgba(5,14,26,0.85)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
            }
          : { background: "transparent" }
      }
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Assorted Coworking" className="h-20 w-auto object-contain" />
            <span
              className="text-xl md:text-2xl font-bold hidden sm:block"
              style={{
                background: "linear-gradient(90deg, hsl(20 89% 65%), hsl(20 89% 80%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Assorted Coworking
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-white/70 hover:text-white transition-colors duration-200 font-medium text-sm group"
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 bg-orange-400"
                  style={{ width: active === id ? "100%" : "0%" }}
                />
                <span
                  className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 bg-orange-400 opacity-0 group-hover:opacity-100 group-hover:w-full"
                  style={{ width: "0%" }}
                />
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="relative overflow-hidden px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(20 89% 56%), hsl(20 89% 44%))",
                boxShadow: "0 0 20px rgba(240,112,48,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(240,112,48,0.6)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(240,112,48,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              Book a Tour
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? "320px" : "0", opacity: open ? 1 : 0 }}
        >
          <nav
            className="flex flex-col gap-1 pb-6 pt-2"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {NAV.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-2 mx-4 py-3 rounded-full text-white font-semibold transition-all"
              style={{ background: "linear-gradient(135deg, hsl(20 89% 56%), hsl(20 89% 44%))" }}
            >
              Book a Tour
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
