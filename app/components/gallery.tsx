"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Rooms", "Dining", "Activities", "Nature"];

const galleryItems = [
  { id: 1, category: "Rooms", src: "/gallery/rooms-1.png", title: "Luxury Suite", size: "large" },
  { id: 2, category: "Dining", src: "/gallery/dining-1.png", title: "Forest Dining", size: "small" },
  { id: 3, category: "Nature", src: "/gallery/nature-1.png", title: "Agro Landscape", size: "medium" },
  { id: 4, category: "Activities", src: "/gallery/activities-1.png", title: "Campfire Nights", size: "small" },
  { id: 5, category: "Rooms", src: "/gallery/rooms-2.png", title: "Eco Cabin", size: "small" },
  { id: 6, category: "Dining", src: "/gallery/dining-2.png", title: "Organic Breakfast", size: "medium" },
  { id: 7, category: "Activities", src: "/gallery/activities-2.png", title: "Jungle Trekking", size: "large" },
  { id: 8, category: "Nature", src: "/gallery/nature-2.png", title: "Misty Valleys", size: "small" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-24 bg-background px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
           <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold">Portfolio & Gallery</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary leading-tight">
            Inspired by your <span className="italic text-secondary font-light">Dreams</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/20"
                  : "bg-white border-primary/10 text-primary/60 hover:border-secondary hover:text-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group cursor-pointer break-inside-avoid rounded-[2rem] overflow-hidden shadow-xl"
              >
                <div className="relative aspect-auto">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.category}
                  </span>
                  <h3 className="text-white font-serif text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.title}
                  </h3>
                </div>
                
                {/* Category Badge (Static) */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[8px] font-bold uppercase tracking-[0.2em] opacity-100 group-hover:opacity-0 transition-opacity">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
