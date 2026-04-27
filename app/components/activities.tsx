"use client";

import { motion } from "framer-motion";
import { Map, Mountain, Bike, Church, Waves, Plus } from "lucide-react";

const activities = [
  { icon: Map, label: "Eco-Farm Tours" },
  { icon: Mountain, label: "Nature Hiking" },
  { icon: Bike, label: "Cycling Trails" },
  { icon: Church, label: "Local Sightseeing" },
  { icon: Waves, label: "Spa & Wellness" },
  { icon: Plus, label: "And Much More", highlight: true },
];

const Activities = () => {
  return (
    <section id="activities" className="py-32 bg-background px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-primary leading-tight">
            What can you do <br /> at the resort?
          </h2>
          <p className="text-foreground/70 leading-relaxed max-w-md">
            Rediscover peace, fresh air, and the joy of simplicity in a cozy resort, hidden among the trees, just a few steps away from the heart of Nalbari.
          </p>
          <button className="border border-primary/20 text-primary px-8 py-3.5 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-all">
            View Location on Map
          </button>
        </motion.div>

        {/* Grid of Activities */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {activities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-6 md:p-8 rounded-[2rem] flex flex-col items-center justify-center gap-6 transition-all duration-300 shadow-sm border border-primary/5 ${
                item.highlight 
                  ? "bg-primary text-white shadow-xl" 
                  : "bg-white text-primary"
              }`}
            >
              <item.icon className={`w-8 h-8 md:w-10 md:h-10 ${item.highlight ? "text-secondary" : "text-primary/40"}`} strokeWidth={1.5} />
              <span className="text-[13px] md:text-sm font-serif font-bold text-center leading-tight tracking-tight uppercase">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
