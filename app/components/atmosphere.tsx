"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Atmosphere = () => {
  return (
    <section id="gallery" className="py-24 bg-background px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-5xl text-primary text-center"
        >
          Discover the Resort Atmosphere
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl"
        >
          <Image
            src="/bedroom.png"
            alt="Resort Atmosphere"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>
      </div>
    </section>
  );
};

export default Atmosphere;
