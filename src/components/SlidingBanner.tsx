const SlidingBanner = () => {
  return (
    <div className="relative overflow-hidden bg-[#F36F2B] py-4">
      <div className="animate-slide-banner whitespace-nowrap">
        <div className="inline-block">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="inline-block px-8 text-2xl md:text-3xl font-bold text-white"
            >
              Visit Us Today & Get a Free 1-Day Trial!
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingBanner;
