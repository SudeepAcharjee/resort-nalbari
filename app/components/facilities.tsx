"use client";

import { motion } from "framer-motion";
import { 
  Bed, 
  ChefHat, 
  Wifi, 
  Flame, 
  Car, 
  Waves, 
  Sprout, 
  Dumbbell, 
  Coffee, 
  Utensils, 
  Tv, 
  ShieldCheck 
} from "lucide-react";

const facilities = [
  { icon: Bed, label: "Comfortable Bedrooms" },
  { icon: ChefHat, label: "Gourmet Kitchen" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: Flame, label: "Cozy Fireplace" },
  { icon: Car, label: "Private Parking" },
  { icon: Waves, label: "Infinity Pool" },
  { icon: Sprout, label: "Wellness Spa" },
  { icon: Dumbbell, label: "Fitness Center" },
  { icon: Coffee, label: "Morning Coffee" },
  { icon: Utensils, label: "Fine Dining" },
  { icon: Tv, label: "Home Cinema" },
  { icon: ShieldCheck, label: "24/7 Security" },
];

const Facilities = () => {
  // Duplicate facilities for seamless loop
  const duplicatedFacilities = [...facilities, ...facilities];

  return (
    <section id="facilities" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="mb-12 md:mb-16 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-4 text-primary">World-Class Facilities</h2>
        <p className="text-black max-w-2xl mx-auto">
          Experience unparalleled comfort with our premium range of services and amenities.
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-4 md:gap-8 py-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedFacilities.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 md:gap-6 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-primary/5 shadow-sm transition-all duration-500 w-[180px] md:w-[220px] aspect-square cursor-default group/item hover:bg-primary hover:border-primary"
            >
              <item.icon 
                className="w-10 h-10 md:w-12 md:h-12 text-primary/60 transition-colors duration-300 group-hover/item:text-white" 
                strokeWidth={1.5} 
              />
              <span className="text-sm md:text-base font-serif font-medium text-center leading-tight transition-colors duration-300 text-foreground group-hover/item:text-white">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Facilities;

