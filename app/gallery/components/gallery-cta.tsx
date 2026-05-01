"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const GalleryCTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -ml-48 -mb-48" />

          <div className="relative z-10 space-y-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight"
            >
              Start Your Own <br /> <span className="text-secondary italic">Chapter</span>
            </motion.h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto font-light">
              Don't just view the beauty through a screen. Come and experience the serenity of Ganga Jamuna for yourself.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
              <Link
                href="#contact"
                className="bg-secondary text-primary px-12 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-secondary/20 flex items-center gap-3"
              >
                Book Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/menu"
                className="border border-white/20 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all"
              >
                Explore Dining
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryCTA;
