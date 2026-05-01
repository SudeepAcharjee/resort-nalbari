"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const ContactMap = () => {
  return (
    <section className="pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl group border border-primary/5">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.455648643886!2d91.3323!3d26.3314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE5JzUzLjAiTiA5McKwMTknNTYuMyJF!5e0!3m2!1sen!2sin!4v1714570000000!5m2!1sen!2sin"
            className="w-full h-full border-none grayscale-[0.2] contrast-[1.1]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/20 to-transparent" />
          
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
