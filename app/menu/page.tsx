"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, UtensilsCrossed, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import dynamic from "next/dynamic";

// Dynamic import of the entire PDF Viewer component to keep everything out of SSR
const PDFViewer = dynamic(() => import("./components/pdf-viewer"), { 
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center gap-4 py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-primary/40 font-bold uppercase tracking-widest text-[10px]">Initializing Viewer...</p>
        </div>
    )
});

import { Leaf, Coffee } from "lucide-react";

const MenuPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/gallery/dining-1.png"
          alt="Menu Hero"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 text-secondary mb-6"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span className="uppercase tracking-[0.3em] font-bold text-sm">Farm to Fork</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white font-serif text-6xl md:text-8xl mb-4 leading-none"
          >
            Our Menu
          </motion.h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Leaf className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-primary">100% Organic</h3>
                <p className="text-foreground/60 text-sm">Ingredients sourced directly from our resort's agro-farm.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 border-y md:border-y-0 md:border-x border-primary/10 py-12 md:py-0 px-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UtensilsCrossed className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-primary">Traditional Recipes</h3>
                <p className="text-foreground/60 text-sm">Authentic Assamese culinary heritage in every bite.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Coffee className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-primary">Local Brews</h3>
                <p className="text-foreground/60 text-sm">Experience the finest regional teas and beverages.</p>
            </div>
        </div>
      </section>

      {/* HTML PDF Viewer Section */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <PDFViewer file="/Menu.pdf" />
          
          <div className="mt-12 text-center text-foreground/40 text-[10px] italic space-y-2 uppercase tracking-widest font-bold">
            <p>*Seasonal items may vary. Please confirm with your server.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MenuPage;
