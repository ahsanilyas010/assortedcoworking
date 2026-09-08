import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X } from "lucide-react";
import privateDeskImg from "@/assets/private-desk-coworking-islamabad.jpg";
import meetingRoomImg from "@/assets/meeting-room-coworking-islamabad.jpg";
import openSpaceImg from "@/assets/open-coworking-space-islamabad.jpg";
import interiorImg from "@/assets/assorted-coworking-interior-islamabad.jpg";
import teaCoffeeImg from "@/assets/coworking-tea-coffee-islamabad.jpg";

const photos = [
  {
    src: interiorImg,
    alt: "Assorted Coworking interior – circle window and plant wall in D-12 Islamabad coworking space",
    caption: "Premium Interior",
    span: "col-span-2 row-span-2",
  },
  {
    src: openSpaceImg,
    alt: "Open hot desk coworking area – freelancers and remote workers at Assorted Coworking Islamabad",
    caption: "Open Workspace",
    span: "",
  },
  {
    src: privateDeskImg,
    alt: "Private desk with blue accent wall at Assorted Coworking D-12 Markaz Islamabad",
    caption: "Private Desks",
    span: "",
  },
  {
    src: meetingRoomImg,
    alt: "Meeting room session at Assorted Coworking – professional meeting space in Islamabad",
    caption: "Meeting Room",
    span: "",
  },
  {
    src: teaCoffeeImg,
    alt: "Free tea and coffee lounge with motivational signage at Assorted Coworking Islamabad",
    caption: "Tea & Coffee Lounge",
    span: "",
  },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-accent/3" />

      <div ref={ref} className="section-container relative z-10">
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
            Take a Look Inside
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Your Future <span className="text-gradient">Workspace</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A glimpse into Assorted Coworking — modern interiors, private desks, a meeting room, and a cozy tea & coffee corner in D-12 Markaz, Islamabad.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${photo.span}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="absolute bottom-4 left-4 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {photo.caption}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[selected].src}
                  alt={photos[selected].alt}
                  className="w-full max-h-[80vh] object-contain bg-black"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-semibold">{photos[selected].caption}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                  aria-label="Close image"
                >
                  <X size={20} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
