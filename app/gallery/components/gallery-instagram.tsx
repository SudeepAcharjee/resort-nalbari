"use client";

import Image from "next/image";
import { Camera } from "lucide-react";

const instaImages = [
    "/gallery/activities-1.png",
    "/gallery/dining-1.png",
    "/gallery/nature-1.png",
    "/gallery/rooms-1.png",
    "/gallery/activities-2.png",
    "/gallery/nature-2.png",
];

const GalleryInstagram = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs">Social Feed</span>
            <h2 className="text-primary font-serif text-4xl md:text-5xl">Follow Our Story</h2>
          </div>
          <a 
            href="#" 
            className="flex items-center gap-3 bg-white border border-primary/10 px-8 py-4 rounded-full text-primary font-bold hover:bg-primary hover:text-white transition-all group shadow-sm"
          >
            <Camera className="w-5 h-5" />
            @gangajamuna_resort
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instaImages.map((src, i) => (
            <div key={i} className="aspect-[2/3] relative rounded-3xl overflow-hidden group cursor-pointer">
              <Image
                src={src}
                alt="Instagram Post"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <Camera className="text-white w-10 h-10 transform scale-50 group-hover:scale-100 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryInstagram;
