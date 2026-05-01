"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bed, User, Maximize, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import BookingDialog from "../../components/booking-dialog";

interface RoomCategoryProps {
  title: string;
  price: number;
  available: number;
  description: string;
  features: string[];
  images: string[];
  bed?: string;
  capacity?: string;
  size?: string;
  reverse?: boolean;
}

const RoomCategory = ({ title, price, available, description, features, images, bed, capacity, size, reverse }: RoomCategoryProps) => {
  const [index, setIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}>
        
        {/* Content Side */}
        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
                <span className="text-secondary font-bold tracking-widest uppercase text-xs">Category</span>
                <div className="px-3 py-1 bg-primary/5 rounded-full text-primary text-[10px] font-bold">
                    {available} ROOMS AVAILABLE
                </div>
            </div>
            <h2 className="text-primary font-serif text-4xl md:text-5xl leading-tight">{title}</h2>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif text-primary">₹{price}</span>
                <span className="text-foreground/40 text-sm">/ night</span>
            </div>
          </div>

          <p className="text-foreground/60 leading-relaxed text-lg font-light">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-foreground/70">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-8 pt-8 border-t border-primary/10">
            <div className="flex items-center gap-2 text-foreground/40 uppercase tracking-widest text-[10px] font-bold">
              <Bed className="w-4 h-4 text-secondary" /> {bed || "1 King Bed"}
            </div>
            <div className="flex items-center gap-2 text-foreground/40 uppercase tracking-widest text-[10px] font-bold">
              <User className="w-4 h-4 text-secondary" /> {capacity || "2 Adults"}
            </div>
            <div className="flex items-center gap-2 text-foreground/40 uppercase tracking-widest text-[10px] font-bold">
              <Maximize className="w-4 h-4 text-secondary" /> {size || "350 sqft"}
            </div>
          </div>

          <button 
            onClick={() => setIsBookingOpen(true)}
            className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
          >
            Book This Category
          </button>
        </div>

        <BookingDialog 
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            roomType={title}
        />

        {/* Image Side (Draggable & Arrows) */}
        <div className="lg:w-1/2 w-full relative">
          <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl group cursor-grab active:cursor-grabbing">
             <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, { offset, velocity }) => {
                        if (offset.x > 100) prevImage();
                        else if (offset.x < -100) nextImage();
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[index]}
                        alt={`${title} view ${index}`}
                        fill
                        className="object-cover pointer-events-none"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </motion.div>
             </AnimatePresence>
             
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

             {/* Arrow Buttons */}
             <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-primary z-20"
             >
                <ChevronLeft className="w-6 h-6" />
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-primary z-20"
             >
                <ChevronRight className="w-6 h-6" />
             </button>

             {/* Pagination Dots */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${index === i ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                    />
                ))}
             </div>

             <div className="absolute top-8 left-8 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                {title} Showcase
             </div>
          </div>
          
          {/* Decorative Elements */}
          <div className={`absolute -bottom-10 ${reverse ? '-left-10' : '-right-10'} w-48 h-48 bg-secondary/10 rounded-full blur-3xl -z-10`} />
        </div>

      </div>
    </section>
  );
};

export default RoomCategory;
