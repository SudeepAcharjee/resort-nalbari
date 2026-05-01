"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const AboutPhilosophy = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="relative z-10"
             >
                <div className="aspect-square relative rounded-full overflow-hidden border-[12px] border-white shadow-2xl">
                  <Image 
                    src="/gallery/activities-1.png"
                    alt="Philosophy"
                    fill
                    className="object-cover"
                  />
                </div>
             </motion.div>
             {/* Decorative leaf/shape if available, or just a circle */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/5 rounded-full -z-0 animate-[spin_20s_linear_infinite]" />
          </div>

          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <span className="text-secondary font-bold tracking-widest uppercase text-xs">The Slow Life</span>
              <h2 className="text-primary font-serif text-4xl md:text-6xl leading-tight">
                Philosophy of <br /> Ancient Wisdom
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-foreground/70 leading-relaxed italic font-light">
              <p>
                "At Ganga Jamuna, we believe that true luxury is not found in the material, but in the moments of stillness that allow us to reconnect with our inner selves."
              </p>
              <p>
                Our philosophy is rooted in the concept of 'Prakriti'—the primal nature. We have designed every corner of this resort to encourage guests to slow down, breathe deeper, and listen to the whispers of the wind through the bamboo groves.
              </p>
              <p>
                Whether it's the way we harvest rainwater or the way we serve our traditional tea, everything is done with intentionality and deep respect for the rhythms of the earth.
              </p>
            </div>

            <div className="flex gap-12 pt-8 border-t border-primary/10">
                <div className="text-center">
                    <div className="text-primary font-serif text-3xl mb-1">100%</div>
                    <div className="text-xs uppercase tracking-widest font-bold text-foreground/40">Organic</div>
                </div>
                <div className="text-center">
                    <div className="text-primary font-serif text-3xl mb-1">Zero</div>
                    <div className="text-xs uppercase tracking-widest font-bold text-foreground/40">Waste</div>
                </div>
                <div className="text-center">
                    <div className="text-primary font-serif text-3xl mb-1">Local</div>
                    <div className="text-xs uppercase tracking-widest font-bold text-foreground/40">Crafted</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPhilosophy;
