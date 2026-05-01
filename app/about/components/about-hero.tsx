"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const AboutHero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/hero-bg.png"
        alt="About Hero"
        fill
        className="object-cover brightness-[0.6]"
        priority
      />
      <div className="relative z-10 text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-secondary uppercase tracking-[0.2em] font-bold text-sm mb-6 block"
        >
          Est. 2020 • Nalbari, Assam
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-none"
        >
          Our Story
        </motion.h1>
      
      </div>
    </section>
  );
};

export default AboutHero;
