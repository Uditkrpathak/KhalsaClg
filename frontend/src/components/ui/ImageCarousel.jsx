import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ImageCarousel = ({ data, autoSlide = true, interval = 4000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, interval);

    return () => clearInterval(timer);
  }, [data.length, autoSlide, interval]);

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="flex justify-center items-center gap-6">
        {data.map((item, i) => {
          const isActive = i === index;

          return (
            <motion.div
              key={item.id}
              animate={{
                scale: isActive ? 1 : 0.85,
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{ duration: 0.6 }}
              className="relative min-w-[280px] md:min-w-[420px] h-[320px] rounded-2xl overflow-hidden shadow-xl bg-gray-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-lg md:text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-200">{item.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
