import { useState, useRef, useCallback } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface FloatingFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FloatingField = ({ label, type = "text", name, value, onChange, required }: FloatingFieldProps) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className="absolute left-0 pointer-events-none font-medium transition-all duration-250 ease-out"
        style={{
          top: lifted ? "4px" : "16px",
          fontSize: lifted ? "11px" : "14px",
          color: lifted ? (focused ? "hsl(20 89% 65%)" : "rgba(255,255,255,0.4)") : "rgba(255,255,255,0.45)",
          letterSpacing: lifted ? "0.04em" : "0",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete="off"
        className="w-full bg-transparent pt-7 pb-2 text-white text-sm outline-none transition-all duration-250"
        style={{
          borderBottom: `2px solid ${focused ? "hsl(20 89% 56%)" : "rgba(255,255,255,0.15)"}`,
          boxShadow: focused ? "0 1px 0 hsl(20 89% 56%)" : "none",
        }}
      />
    </div>
  );
};

const FloatingTextarea = ({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className="absolute left-0 pointer-events-none font-medium transition-all duration-250 ease-out"
        style={{
          top: lifted ? "4px" : "16px",
          fontSize: lifted ? "11px" : "14px",
          color: lifted ? (focused ? "hsl(20 89% 65%)" : "rgba(255,255,255,0.4)") : "rgba(255,255,255,0.45)",
          letterSpacing: lifted ? "0.04em" : "0",
        }}
      >
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={4}
        className="w-full bg-transparent pt-7 pb-2 text-white text-sm outline-none resize-none transition-all duration-250"
        style={{
          borderBottom: `2px solid ${focused ? "hsl(20 89% 56%)" : "rgba(255,255,255,0.15)"}`,
        }}
      />
    </div>
  );
};

const RippleButton = ({
  children,
  onClick,
  loading,
  success,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  success?: boolean;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const createRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;left:${x}px;top:${y}px;
      border-radius:50%;background:rgba(255,255,255,0.25);
      animation:ripple-out 0.6s ease-out forwards;pointer-events:none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }, []);

  return (
    <button
      ref={btnRef}
      type="submit"
      onClick={(e) => { createRipple(e); onClick?.(); }}
      className="relative overflow-hidden w-full py-4 rounded-xl text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
      style={{
        background: success
          ? "linear-gradient(135deg, hsl(94 42% 49%), hsl(94 42% 38%))"
          : "linear-gradient(135deg, hsl(20 89% 56%), hsl(20 89% 44%))",
        boxShadow: success
          ? "0 8px 25px rgba(90,158,62,0.4)"
          : "0 8px 25px rgba(240,112,48,0.4)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow = success
          ? "0 15px 40px rgba(90,158,62,0.5)"
          : "0 15px 40px rgba(240,112,48,0.55)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = success
          ? "0 8px 25px rgba(90,158,62,0.4)"
          : "0 8px 25px rgba(240,112,48,0.4)";
      }}
    >
      {success ? (
        <>
          <CheckCircle className="w-4 h-4" />
          Message Sent!
        </>
      ) : loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          <Send className="w-4 h-4" />
          {children}
        </>
      )}
    </button>
  );
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "Zarpar Arcade, Office #27, D-12 Markaz, Islamabad",
    color: "hsl(20 89% 56%)",
    bg: "rgba(240,112,48,0.2)",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 321 8526405",
    href: "tel:+923218526405",
    color: "hsl(94 42% 49%)",
    bg: "rgba(90,158,62,0.2)",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@assorted.business",
    href: "mailto:hello@assorted.business",
    color: "hsl(215 71% 50%)",
    bg: "rgba(27,58,107,0.3)",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const headRef = useScrollReveal("reveal");
  const formRef = useScrollReveal("reveal-left");
  const infoRef = useScrollReveal("reveal-right");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    toast.success("Message sent! We'll be in touch soon. ✨");
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #080f1c 0%, #0d2244 50%, #050e1a 100%)",
      }}
    >
      {/* Glows */}
      <div
        className="absolute top-1/3 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,112,48,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(27,58,107,0.35) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="section-container relative">
        <div ref={headRef} className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ background: "rgba(240,112,48,0.15)", color: "hsl(20 89% 65%)" }}
          >
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's{" "}
            <span
              style={{
                background: "linear-gradient(90deg, hsl(20 89% 60%), hsl(20 89% 80%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Connect
            </span>
          </h2>
          <p className="text-white/50 text-lg">Ready to upgrade your workspace? Drop us a message.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div ref={formRef}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 space-y-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <h3 className="text-xl font-bold text-white">Send a Message</h3>
              <div className="grid sm:grid-cols-2 gap-8">
                <FloatingField label="Your Name" name="name" value={form.name} onChange={handleChange} required />
                <FloatingField label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <FloatingField label="Phone Number" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
              <FloatingTextarea label="Your Message" name="message" value={form.message} onChange={handleChange} required />
              <RippleButton loading={loading} success={success}>
                Send Message
              </RippleButton>
            </form>
          </div>

          {/* Info */}
          <div ref={infoRef} className="space-y-5">
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
            {contactDetails.map(({ icon: Icon, label, value, href, color, bg }, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: bg }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
                  {href ? (
                    <a href={href} className="text-white/80 text-sm hover:text-white transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white/80 text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 40px rgba(27,58,107,0.3)",
                height: "220px",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.7267489856735!2d73.0439965!3d33.7104854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf4e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sZarpar%20Arcade%2C%20D-12%20Markaz%2C%20Islamabad!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
