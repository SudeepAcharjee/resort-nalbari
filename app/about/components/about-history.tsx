"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const historyEvents = [
  {
    year: "2020",
    title: "The Vision",
    description: "Our journey began with a simple dream: to create a sanctuary that honors the natural beauty of Nalbari while providing unparalleled luxury."
  },
  {
    year: "2021",
    title: "Groundbreaking",
    description: "Construction began with a focus on sustainable materials and minimal environmental disruption, preserving the ancient trees on our site."
  },
  {
    year: "2022",
    title: "Grand Opening",
    description: "Ganga Jamuna opened its doors to the world, welcoming guests to experience the unique blend of Assamese heritage and modern comfort."
  },
  {
    year: "2023",
    title: "Eco-Award",
    description: "Recognized as the leading sustainable resort in the region for our commitment to plastic-free operations and solar energy."
  }
];

const AboutHistory = () => {
  return (
    <section className="py-24 bg-white/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-secondary font-bold tracking-widest uppercase text-xs">Our Heritage</span>
              <h2 className="text-primary font-serif text-4xl md:text-5xl leading-tight">
                A Legacy of Serenity <br /> in the Heart of Nalbari
              </h2>
            </div>
            
            <div className="space-y-12">
              {historyEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-8 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="text-secondary font-serif text-2xl font-bold leading-none mb-2">
                      {event.year}
                    </div>
                    <div className="w-px h-full bg-primary/10 group-last:bg-transparent" />
                  </div>
                  <div className="pb-12 space-y-2">
                    <h3 className="text-primary font-bold text-xl">{event.title}</h3>
                    <p className="text-foreground/70 leading-relaxed max-w-md">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="/gallery/nature-1.png"
                alt="Our History"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHistory;
