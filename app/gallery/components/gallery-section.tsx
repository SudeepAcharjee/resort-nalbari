"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import cloudinaryLoader from "@/lib/cloudinary-loader";

interface GalleryCategory {
    id: string;
    category: string;
    images: string[];
}

const ITEMS_PER_PAGE = 8;

const GallerySection = () => {
  const [galleryData, setGalleryData] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const allImages = useMemo(() => {
    if (selectedCategory === "All") {
      return galleryData.flatMap(item => 
        item.images.map(img => ({ src: img, category: item.category }))
      );
    }
    const cat = galleryData.find(item => item.category === selectedCategory);
    return cat ? cat.images.map(img => ({ src: img, category: cat.category })) : [];
  }, [galleryData, selectedCategory]);

  const paginatedImages = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allImages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allImages, currentPage]);

  const totalPages = Math.ceil(allImages.length / ITEMS_PER_PAGE);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  if (loading) {
    return (
        <div className="py-40 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Loading Gallery...</p>
        </div>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                  : "bg-primary/5 text-primary/60 hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {allImages.length === 0 ? (
            <div className="py-20 text-center text-primary/30 font-serif text-2xl">
                No images found in this category.
            </div>
        ) : (
            <>
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {paginatedImages.map((image, idx) => (
                            <motion.div
                                key={image.src}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                onClick={() => setSelectedImage(image.src)}
                                className="group relative aspect-square rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                <Image
                                    loader={image.src.includes('cloudinary') ? cloudinaryLoader : undefined}
                                    src={image.src}
                                    alt={image.category}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 border border-white/30">
                                    <p className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">{image.category}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-8 pt-12">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5"
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
                            className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-20">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                    className="absolute inset-0 bg-primary/95 backdrop-blur-xl"
                />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full h-full max-w-6xl max-h-[80vh] rounded-[3rem] overflow-hidden"
                >
                    <Image src={selectedImage} alt="Fullscreen View" fill className="object-contain" />
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white border border-white/20 backdrop-blur-md"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const X = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export default GallerySection;
