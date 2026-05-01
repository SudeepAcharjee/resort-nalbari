"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, UtensilsCrossed, Leaf, Coffee } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const MenuPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/gallery/dining-1.png"
          alt="Menu Hero"
          fill
          className="object-cover brightness-[0.5]"
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
            className="text-white font-serif text-6xl md:text-8xl mb-8 leading-none"
          >
            Our Menu
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-white/70 text-xl max-w-2xl mx-auto font-light"
          >
             Discover the authentic flavors of Nalbari, prepared with organic ingredients from our own agro-farm.
          </motion.p>
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

      {/* PDF Menu Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <span className="text-secondary font-bold tracking-widest uppercase text-xs">Curated Selection</span>
              <h2 className="text-primary font-serif text-4xl md:text-5xl">Digital Menu</h2>
            </div>
            <a 
              href="/Menu.pdf" 
              download
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full aspect-[1/1.4] bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-primary/10"
          >
            <iframe 
              src="/Menu.pdf#toolbar=0" 
              className="w-full h-full border-none"
              title="Resort Menu"
            />
            {/* Fallback for browsers that don't support iframes well */}
            <div className="absolute inset-0 flex items-center justify-center bg-background -z-10">
                <p className="text-foreground/40">Loading digital menu...</p>
            </div>
          </motion.div>
          
          <div className="text-center">
            <p className="text-foreground/50 text-sm italic">
                *Menu items and prices are subject to seasonal availability and change.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MenuPage;
