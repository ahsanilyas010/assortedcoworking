import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import privateDeskImg from "@/assets/private-desk-coworking-islamabad.jpg";
import meetingRoomImg from "@/assets/meeting-room-coworking-islamabad.jpg";
import openSpaceImg from "@/assets/open-coworking-space-islamabad.jpg";
import interiorImg from "@/assets/assorted-coworking-interior-islamabad.jpg";
import teaCoffeeImg from "@/assets/coworking-tea-coffee-islamabad.jpg";
import biometricImg from "@/assets/biometric-access-control-coworking-islamabad.jpg";
import plantWallImg from "@/assets/plant-wall-coworking-islamabad.jpg";
import openDeskImg from "@/assets/open-desk-blue-wall-coworking-islamabad.jpg";
import circleMirrorImg from "@/assets/hot-desk-circle-mirror-coworking-islamabad.jpg";
import privateOfficeImg from "@/assets/private-office-coworking-islamabad.jpg";

const photos = [
  {
    src: openDeskImg,
    alt: "Open hot desk area with blue accent wall and orange circle mirror at Assorted Coworking D-12 Islamabad",
    caption: "Open Workspace",
    wide: true,
  },
  {
    src: interiorImg,
    alt: "Assorted Coworking interior – stunning circle window and vertical plant wall in D-12 Markaz Islamabad",
    caption: "Premium Interior",
    wide: false,
  },
  {
    src: circleMirrorImg,
    alt: "Hot desk with iconic orange circle mirror on navy blue wall at Assorted Coworking Islamabad",
    caption: "Hot Desks",
    wide: false,
  },
  {
    src: privateOfficeImg,
    alt: "Private office desk with blue wall and circle mirror at Assorted Coworking D-12 Markaz Islamabad",
    caption: "Private Office",
    wide: false,
  },
  {
    src: plantWallImg,
    alt: "Vertical green plant wall and ergonomic office chairs at Assorted Coworking Islamabad",
    caption: "Green Corner",
    wide: false,
  },
  {
    src: privateDeskImg,
    alt: "Private desk with blue accent wall at Assorted Coworking D-12 Markaz Islamabad",
    caption: "Private Desks",
    wide: false,
  },
  {
    src: meetingRoomImg,
    alt: "Professional meeting room session at Assorted Coworking – shared office space in Islamabad",
    caption: "Meeting Room",
    wide: false,
  },
  {
    src: openSpaceImg,
    alt: "Open coworking floor with multiple freelancers and remote workers at Assorted Coworking Islamabad",
    caption: "Community Floor",
    wide: false,
  },
  {
    src: teaCoffeeImg,
    alt: "Free tea and coffee lounge with motivational wall signage at Assorted Coworking D-12 Islamabad",
    caption: "Tea & Coffee",
    wide: false,
  },
  {
    src: biometricImg,
    alt: "ZKTeco K40 biometric fingerprint access control at Assorted Coworking – secure 24/7 access Islamabad",
    caption: "24/7 Secure Access",
    wide: false,
  },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const prev = () => setSelected((s) => (s !== null ? (s - 1 + photos.length) % photos.length : 0));
  const next = () => setSelected((s) => (s !== null ? (s + 1) % photos.length : 0));

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
            Modern interiors, ergonomic desks, a dedicated meeting room, vertical plant wall, free tea & coffee, and biometric 24/7 access — all in D-12 Markaz, Islamabad.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.caption}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full"
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.15 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[selected].src}
                  alt={photos[selected].alt}
                  className="w-full max-h-[80vh] object-contain rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 rounded-b-2xl bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-semibold">{photos[selected].caption}</p>
                  <p className="text-white/60 text-xs mt-1">{selected + 1} / {photos.length}</p>
                </div>

                {/* Nav */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                  aria-label="Close"
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
