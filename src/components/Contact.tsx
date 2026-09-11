import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { trackPhoneCallClick, trackWhatsAppClick, trackFormSubmit } from "@/lib/analytics";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["FF 27, Zarpar Arcade", "D-12 Markaz, Islamabad, Pakistan"],
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+92 321 852 6405"],
    color: "from-accent to-orange-500",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@assorted.business"],
    color: "from-green-500 to-emerald-500",
  },
];

const InputField = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required,
  textarea,
  rows,
  delay,
  inView,
}: {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  delay: number;
  inView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay, duration: 0.5 }}
    className="relative group"
  >
    {textarea ? (
      <Textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="border-2 border-border bg-background focus:border-primary transition-colors duration-300 rounded-xl resize-none"
      />
    ) : (
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="h-13 border-2 border-border bg-background focus:border-primary transition-colors duration-300 rounded-xl"
      />
    )}
    <motion.div
      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
      initial={{ scaleX: 0 }}
      whileFocus={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
      style={{ transformOrigin: "left" }}
    />
  </motion.div>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit();
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-sm font-bold text-accent tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Let's Connect
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Book Your Free Coworking{" "}
            <span className="text-gradient">Trial Today</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Claim your free 1-day pass, ask about internship workspace memberships, or book a tour of our D-12 Markaz coworking space in Islamabad!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              const isPhone = info.title === "Call Us";
              const card = (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.6 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 bg-card rounded-2xl p-5 border border-border group overflow-hidden relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="font-bold mb-1">{info.title}</div>
                    {info.lines.map((line) => (
                      <div key={line} className="text-muted-foreground text-sm">{line}</div>
                    ))}
                  </div>
                </motion.div>
              );
              return isPhone ? (
                <a
                  key={info.title}
                  href="tel:+923218526405"
                  onClick={trackPhoneCallClick}
                  className="block"
                >
                  {card}
                </a>
              ) : card;
            })}

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/923218526405?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Assorted%20Coworking%20Space."
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.46, duration: 0.6 }}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 bg-card rounded-2xl p-5 border border-border group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="font-bold mb-1">WhatsApp Us</div>
                <div className="text-muted-foreground text-sm">Chat with us instantly</div>
              </div>
            </motion.a>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="rounded-2xl overflow-hidden border border-border shadow-lg h-52"
            >
              <iframe
                src="https://maps.google.com/maps?q=PW3X%2BG26+Islamabad&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Assorted Coworking Location"
              />
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-3 bg-card rounded-3xl border border-border shadow-xl p-8 relative overflow-hidden"
          >
            {/* Corner decoration */}
            <motion.div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/5"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
            />

            <h3 className="text-2xl font-bold mb-7 relative z-10">Send a Message</h3>

            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center py-16 gap-4"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500" />
                </motion.div>
                <p className="text-xl font-bold">Message Sent!</p>
                <p className="text-muted-foreground text-center">We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required delay={0.3} inView={inView} />
                  <InputField type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required delay={0.35} inView={inView} />
                </div>
                <InputField type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required delay={0.4} inView={inView} />
                <InputField textarea name="message" placeholder="Your Message — What are you looking for?" value={formData.message} onChange={handleChange} required rows={5} delay={0.45} inView={inView} />

                <motion.button
                  type="submit"
                  className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-base flex items-center justify-center gap-3 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(20,70,180,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-white/15"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <Send className="w-5 h-5 relative" />
                  <span className="relative">Send Message</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
