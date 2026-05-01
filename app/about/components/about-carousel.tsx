"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const carouselImages = [
  "/gallery/nature-1.png",
  "/gallery/nature-2.png",
  "/gallery/rooms-1.png",
  "/gallery/dining-1.png",
  "/gallery/activities-1.png"
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const AboutCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = (page % carouselImages.length + carouselImages.length) % carouselImages.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-4">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs">Gallery</span>
          <h2 className="text-primary font-serif text-4xl md:text-5xl leading-tight">Moments of Serenity</h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => paginate(-1)}
            className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
          >
            <ArrowLeft className="w-6 h-6 transition-transform group-active:-translate-x-2" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
          >
            <ArrowRight className="w-6 h-6 transition-transform group-active:translate-x-2" />
          </button>
        </div>
      </div>

      <div className="relative h-[60vh] md:h-[80vh] px-6 group/carousel">
        <div className="max-w-7xl mx-auto h-full relative overflow-hidden rounded-[3rem] bg-black/5">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Image
                src={carouselImages[imageIndex]}
                alt={`Resort View ${imageIndex + 1}`}
                fill
                className="object-cover pointer-events-none"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Mobile Arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-20 md:hidden"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white z-20 md:hidden"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                className={`h-1.5 transition-all duration-500 rounded-full ${imageIndex === i ? 'w-12 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCarousel;
