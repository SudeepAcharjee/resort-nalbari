"use client";

import { motion } from "framer-motion";

const Marquee = () => {
  const items = [
    "Nature Stay in Nalbari",
    "Ganga Jamuna Agro Resort",
    "Eco Camp & Resort",
    "Sustainable Luxury",
    "Serenity in Nature",
  ];

  return (
    <div className="bg-primary py-6 md:py-8 overflow-hidden flex whitespace-nowrap border-y border-white/10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex items-center gap-12 md:gap-24 px-12"
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-12 md:gap-24">
            <span className="text-white font-serif text-lg md:text-3xl font-medium tracking-tight opacity-90">
              {item}
            </span>
            <span className="text-secondary text-2xl md:text-4xl">✻</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
