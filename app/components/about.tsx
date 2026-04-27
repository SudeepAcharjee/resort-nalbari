"use client";

import Image from "next/image";
import { Play, ArrowUpRight, MapPin, Trees, Home, Compass, Leaf } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-12 lg:px-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
        
        {/* Section 1: Introduction Grid */}
        <div className="space-y-16">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-primary/10 pb-12">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-primary max-w-3xl leading-[1.1] tracking-tight">
              A <span className="italic text-secondary font-light">Storybook</span> <br />
              Getaway Awaits
            </h2>
            <div className="flex flex-col items-start md:items-end gap-4">
               <button className="bg-primary text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/10 flex items-center gap-2 group">
                Book Your Stay
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Top Grid: Modern Composition */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Small Portrait Image */}
            <div className="md:col-span-3 aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <Image
                src="/bedroom.png"
                alt="Cozy Bedroom"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Content Card */}
            <div className="md:col-span-4 bg-white rounded-[2.5rem] p-10 lg:p-14 flex flex-col justify-center gap-8 shadow-[0_20px_50px_-20px_rgba(9,106,52,0.1)] border border-primary/5 relative overflow-hidden">
              {/* Grainy texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
              
              <div className="space-y-4 relative z-10">
                <h3 className="font-serif text-2xl lg:text-3xl text-primary leading-tight italic">Ganga Jamuna <br /> Agro Resort</h3>
                <p className="text-sm lg:text-base text-foreground/70 leading-relaxed font-sans">
                  Set in a fairytale natural setting, it is the ideal place for those who want peace, fresh air and a break from the daily hustle and bustle.
                </p>
              </div>
              
              <button className="flex items-center gap-3 text-primary font-bold text-[10px] uppercase tracking-widest group w-fit relative z-10">
                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                   <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>View on Map</span>
              </button>
            </div>

            {/* Large Landscape Image / Video CTA */}
            <div className="md:col-span-5 aspect-[4/5] md:aspect-auto relative rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer">
              <Image
                src="/exterior-video.png"
                alt="Resort Exterior"
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 group-hover:bg-white/20">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
                <p className="text-white text-[10px] font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">Play Video</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Core Philosophy / Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-start">
          <div className="space-y-12 order-2 lg:order-1 lg:pt-4">
            <div className="space-y-6">
               <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1] tracking-tight">
                Your <span className="italic text-secondary">Sanctuary</span> <br /> 
                among the trees
              </h2>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-xl font-sans">
                Ganga Jamuna Agro Resort welcomes you with a warm, rustic and comforting atmosphere. Located at the edge of the forest, our resort is the perfect place for relaxation in any season — whether you want a quiet weekend or a vacation with loved ones.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {[
                { title: "Secluded Nature", desc: "Surrounded by ancient forest", icon: Trees },
                { title: "Rustic Luxury", desc: "Traditional meets modern", icon: Home },
                { title: "Hiking Trails", desc: "Direct access to nature", icon: Compass },
                { title: "Eco-Friendly", desc: "Sustainable mountain living", icon: Leaf }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all group border border-transparent hover:border-primary/5">
                  <div className="bg-primary text-white w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-primary text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-xs text-foreground/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-[4/5] order-1 lg:order-2">
             <div className="absolute inset-0 bg-secondary/10 rounded-[3rem] -rotate-3 scale-95" />
             <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="/hero-bg.png"
                  alt="Atmosphere"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-overlay" />
             </div>
             
             {/* Floating Info Tag */}
             <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2rem] shadow-2xl border border-primary/5 max-w-[240px] hidden sm:block">
                <p className="text-primary font-serif text-xl italic mb-2">"Pure magic..."</p>
                <p className="text-[10px] text-foreground/40 leading-relaxed">The quiet of the forest is broken only by the sound of birds and the wind through the leaves.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
