"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import cloudinaryLoader from "@/lib/cloudinary-loader";

interface GalleryCategory {
  id: string;
  category: string;
  images: string[];
}

const ITEMS_PER_PAGE = 6;

const Gallery = () => {
  const [galleryData, setGalleryData] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryCategory[];
      setGalleryData(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const categories = useMemo(() => {
    const cats = ["All", ...galleryData.map(item => item.category)];
    return Array.from(new Set(cats));
  }, [galleryData]);

  const allItems = useMemo(() => {
    if (activeCategory === "All") {
      return galleryData.flatMap(item => 
        item.images.map((img, idx) => ({ 
          id: `${item.id}-${idx}`, 
          category: item.category, 
          src: img 
        }))
      );
    }
    const cat = galleryData.find(item => item.category === activeCategory);
    return cat ? cat.images.map((img, idx) => ({ 
      id: `${cat.id}-${idx}`, 
      category: cat.category, 
      src: img 
    })) : [];
  }, [galleryData, activeCategory]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allItems, currentPage]);

  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  if (loading) {
    return (
        <div className="py-24 flex justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {paginatedItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-sm bg-primary/5"
              >
                <Image
                  loader={item.src.includes('cloudinary') ? cloudinaryLoader : undefined}
                  src={item.src}
                  alt={item.category}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Simplified Badge */}
              
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-8 pt-16">
                <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary disabled:opacity-20 hover:bg-primary hover:text-white transition-all"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-3">
                    {[...Array(totalPages)].map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-2 h-2 rounded-full transition-all ${currentPage === i + 1 ? 'w-8 bg-primary' : 'bg-primary/20 hover:bg-primary/40'}`}
                        />
                    ))}
                </div>

                <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary disabled:opacity-20 hover:bg-primary hover:text-white transition-all"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
