import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ImageCarousel = ({ data, autoSlide = true, interval = 4500 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, interval);
    return () => clearInterval(timer);
  }, [data.length, autoSlide, interval]);

  return (
    <div className="relative w-full py-16 overflow-hidden">
      {/* soft ambient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

      <div className="flex justify-center items-center gap-8">
        {data.map((item, i) => {
          const isActive = i === index;

          return (
            <motion.div
              key={item.id}
              animate={{
                scale: isActive ? 1 : 0.92,
                opacity: isActive ? 1 : 0.6,
                y: isActive ? 0 : 12,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="
                relative min-w-[300px] md:min-w-[460px] h-[360px]
                rounded-3xl overflow-hidden
                backdrop-blur-xl bg-white/10
                border border-white/20
                shadow-[0_20px_50px_rgba(0,0,0,0.35)]
              "
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

              {/* ALWAYS VISIBLE CONTENT */}
              <div className="absolute bottom-0 w-full p-5">
                <div
                  className="
                    rounded-2xl
                    bg-white/20 backdrop-blur-md
                    border border-white/20
                    p-4
                  "
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-200 mt-1">{item.subtitle}</p>

                  {/* accent bar */}
                  <div
                    className={`mt-3 h-[3px] rounded-full transition-all duration-500 ${
                      isActive
                        ? "w-14 bg-gradient-to-r from-blue-400 to-purple-400"
                        : "w-8 bg-white/40"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-10 gap-3">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? "w-10 h-2 bg-gradient-to-r from-blue-500 to-purple-500"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
