"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const GalleryHero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/gallery/nature-2.png"
        alt="Gallery Hero"
        fill
        className="object-cover brightness-[0.6]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background/20" />
      
      <div className="relative z-10 text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-secondary uppercase tracking-[0.3em] font-bold text-xs mb-6 block"
        >
          Visual Sanctuary
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-none"
        >
          The Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-xl max-w-2xl mx-auto font-light"
        >
          A collection of moments captured in the heart of Nalbari's natural beauty.
        </motion.p>
      </div>
    </section>
  );
};

export default GalleryHero;
