"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

const GalleryVideo = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer">
          <Image
            src="/exterior-video.png"
            alt="Cinematic Experience"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500"
            >
              <Play className="w-10 h-10 fill-white" />
            </motion.div>
            <h2 className="font-serif text-4xl md:text-6xl mb-4">Cinematic Journey</h2>
            <p className="text-white/80 max-w-lg mx-auto font-light">Watch our resort come to life in this short visual tour through the heart of Nalbari.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryVideo;
