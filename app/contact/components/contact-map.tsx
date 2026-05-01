"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const ContactMap = () => {
  return (
    <section className="pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl group">
          {/* Using a placeholder for the map but with a premium overlay */}
          <div className="absolute inset-0 bg-[#e5e7eb] flex items-center justify-center">
             <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto shadow-xl animate-bounce">
                    <MapPin className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-primary">Ganga Jamuna Agro Resort</h3>
                <p className="text-primary/60 text-sm">Nalbari, Assam, India</p>
             </div>
             {/* Map Mockup Grid */}
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>
          
          <div className="absolute top-10 left-10 p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl max-w-sm hidden md:block border border-primary/5">
             <h4 className="font-serif text-xl text-primary mb-2">Getting Here</h4>
             <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                We are located just 2 hours from Guwahati. The drive is scenic and passes through beautiful agricultural landscapes.
             </p>
             <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
             >
                Get Directions <MapPin className="w-4 h-4" />
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
