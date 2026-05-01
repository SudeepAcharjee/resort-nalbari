"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Atmosphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["40%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

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
        
        <div ref={containerRef} className="flex justify-center w-full">
          <motion.div
            style={{ width, opacity }}
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl origin-center"
          >
            <Image
              src="/bedroom.png"
              alt="Resort Atmosphere"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Atmosphere;
