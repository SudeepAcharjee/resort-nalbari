"use client";

import Image from "next/image";
import { ArrowUpRight, Calendar, Users, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-background flex flex-col items-center justify-start px-4 pt-[115px] pb-[85px] overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(9,106,52,0.15)] border border-primary/5 bg-white flex flex-col md:flex-row min-h-[60vh] lg:min-h-[75vh]">
        
        {/* Left Side: Information Panel (50%) */}
        <div className="w-full md:w-1/2 bg-primary p-10 md:p-14 lg:p-20 flex flex-col justify-center gap-8 text-white relative overflow-hidden">
          {/* Grainy texture overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
          
          <div className="space-y-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-[5rem] leading-[1.1] tracking-tight font-medium">
              <span className="font-sans text-white block uppercase tracking-tight">Rediscover</span>
              <span className="font-serif italic text-secondary block">True Serenity</span>
            </h1>
            
            <p className="text-sm md:text-base text-white/70 max-w-sm font-sans leading-relaxed font-light">
              Escape to an exquisite eco-luxury sanctuary in Nalbari, where modern comfort meets the raw beauty of nature.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-secondary text-primary px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-secondary/20">
                Book a stay
              </button>
              <button className="border border-white/20 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all">
                Our Location
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Image Panel (50%) */}
        <div className="w-full md:w-1/2 relative min-h-[450px] md:min-h-full overflow-hidden flex items-end justify-center md:justify-end p-6 lg:p-10">
          <Image
            src="/hero-bg.png"
            alt="Ganga Jamuna Agro Resort Landscape"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle overlay to help text visibility if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Floating Booking System (Pill Style) */}
          <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/50 hidden lg:flex">
            <div className="flex-1 flex items-center divide-x divide-primary/10">
              {/* Check In */}
              <div className="flex-1 px-6 py-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-primary/40 block mb-0.5">Check-In</label>
                <input type="text" placeholder="Add date" className="bg-transparent border-none p-0 text-[12px] font-semibold text-primary outline-none w-full placeholder:text-primary/30" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
              </div>
              {/* Check Out */}
              <div className="flex-1 px-6 py-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-primary/40 block mb-0.5">Check-Out</label>
                <input type="text" placeholder="Add date" className="bg-transparent border-none p-0 text-[12px] font-semibold text-primary outline-none w-full placeholder:text-primary/30" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
              </div>
              {/* Guests */}
              <div className="flex-1 px-6 py-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-primary/40 block mb-0.5">Guests</label>
                <select className="bg-transparent border-none p-0 text-[12px] font-semibold text-primary outline-none w-full appearance-none">
                  <option>01 Adult</option>
                  <option>02 Adults</option>
                  <option>Family</option>
                </select>
              </div>
            </div>
            {/* Contact Button */}
            <button className="bg-primary text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all flex items-center gap-2 shrink-0">
              Contact <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Booking Bar (Simpler version) */}
          <div className="relative z-10 w-full bg-white p-4 rounded-3xl shadow-xl flex flex-col gap-3 lg:hidden">
             <div className="grid grid-cols-2 gap-2">
                <div className="bg-primary/5 p-3 rounded-2xl">
                   <p className="text-[8px] uppercase font-bold text-primary/40">Check-In</p>
                   <p className="text-xs font-semibold">Select Date</p>
                </div>
                <div className="bg-primary/5 p-3 rounded-2xl">
                   <p className="text-[8px] uppercase font-bold text-primary/40">Check-Out</p>
                   <p className="text-xs font-semibold">Select Date</p>
                </div>
             </div>
             <button className="w-full bg-primary text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest">
               Book Now
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
