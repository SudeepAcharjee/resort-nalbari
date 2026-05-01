"use client";

import { motion } from "framer-motion";
import { Eye, Target, Sparkles } from "lucide-react";

const AboutVision = () => {
  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-secondary)_1px,_transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-secondary font-bold tracking-widest uppercase text-xs"
          >
            Purpose & Path
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl"
          >
            Guided by Nature
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm space-y-6 hover:bg-white/10 transition-colors group"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl">Our Vision</h3>
            <p className="text-white/70 leading-relaxed">
              To be the premier destination where luxury meets ecological responsibility, setting a new standard for sustainable hospitality in Northeast India.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm space-y-6 hover:bg-white/10 transition-colors group"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl">Our Mission</h3>
            <p className="text-white/70 leading-relaxed">
              To provide our guests with an immersive experience of tranquility and Assamese culture, while actively regenerating the local environment.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm space-y-6 hover:bg-white/10 transition-colors group"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl">Our Values</h3>
            <p className="text-white/70 leading-relaxed">
              Integrity in sustainability, warmth in hospitality, and deep respect for the ancestral wisdom of the Nalbari soil.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
