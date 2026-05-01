"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Rooms", "Dining", "Activities", "Nature"];

const galleryItems = [
  { id: 1, category: "Rooms", src: "/gallery/rooms-1.png", title: "Luxury Suite" },
  { id: 2, category: "Dining", src: "/gallery/dining-1.png", title: "Forest Dining" },
  { id: 3, category: "Nature", src: "/gallery/nature-1.png", title: "Agro Landscape" },
  { id: 4, category: "Activities", src: "/gallery/activities-1.png", title: "Campfire Nights" },
  { id: 5, category: "Rooms", src: "/gallery/rooms-2.png", title: "Eco Cabin" },
  { id: 6, category: "Dining", src: "/gallery/dining-2.png", title: "Organic Breakfast" },
  { id: 7, category: "Activities", src: "/gallery/activities-2.png", title: "Jungle Trekking" },
  { id: 8, category: "Nature", src: "/gallery/nature-2.png", title: "Misty Valleys" },
  { id: 9, category: "Rooms", src: "/bedroom.png", title: "Master Bedroom" },
  { id: 10, category: "Nature", src: "/hero-bg.png", title: "Aerial View" },
  { id: 11, category: "Dining", src: "/gallery/dining-1.png", title: "Candlelight Dinner" },
  { id: 12, category: "Activities", src: "/gallery/activities-1.png", title: "Nature Walk" },
];

const ITEMS_PER_PAGE = 6;

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = useMemo(() => {
    return galleryItems.filter(
      (item) => activeCategory === "All" || item.category === activeCategory
    );
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <section className="py-32 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="space-y-4">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs">Portfolio</span>
            <h2 className="text-primary font-serif text-4xl md:text-6xl leading-tight">
              Captured <span className="italic font-light">Moments</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-white text-primary/60 border border-primary/10 hover:border-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          <AnimatePresence mode="wait">
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-square rounded-[2.5rem] overflow-hidden shadow-xl bg-white"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">
                        {item.category}
                    </span>
                    <h3 className="text-white font-serif text-2xl">
                        {item.title}
                    </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {mounted && totalPages > 1 && (
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center text-primary disabled:opacity-30 hover:bg-primary hover:text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-full font-bold text-xs transition-all ${
                    currentPage === i + 1
                      ? "bg-secondary text-white shadow-lg shadow-secondary/20"
                      : "bg-white text-primary/40 border border-primary/10 hover:border-primary/20"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center text-primary disabled:opacity-30 hover:bg-primary hover:text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
