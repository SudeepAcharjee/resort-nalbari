"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Camera, Earth } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-background/30 -skew-x-12 translate-x-1/2 pointer-events-none hidden lg:block" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          
          {/* Left Column: Contact Info (Takes 2/5 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-10"
          >
            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight">
                Plan your escape
              </h2>
              <p className="text-foreground/70 leading-relaxed max-w-sm">
                We're here to help you find the perfect accommodation for your stay.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm uppercase tracking-widest font-bold text-primary/40">Phone</p>
                  <p className="text-lg font-serif text-primary">+91 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm uppercase tracking-widest font-bold text-primary/40">Email</p>
                  <p className="text-lg font-serif text-primary">booking@gjagroresort.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm uppercase tracking-widest font-bold text-primary/40">Location</p>
                  <p className="text-lg font-serif text-primary leading-tight">Mukalmua-Jagara Road, Nalbari</p>
                </div>
              </div>
            </div>

           
          </motion.div>

          {/* Right Column: Contact Form (Takes 3/5 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 bg-background/40 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-primary/5 shadow-xl shadow-primary/5"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm uppercase tracking-widest font-bold text-primary/60 px-4">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full bg-white px-5 py-3.5 rounded-xl border border-primary/5 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/2 transition-all placeholder:text-foreground/20 text-sm text-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm uppercase tracking-widest font-bold text-primary/60 px-4">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full bg-white px-5 py-3.5 rounded-xl border border-primary/5 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/2 transition-all placeholder:text-foreground/20 text-sm text-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm uppercase tracking-widest font-bold text-primary/60 px-4">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 000 000 0000"
                  className="w-full bg-white px-5 py-3.5 rounded-xl border border-primary/5 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/2 transition-all placeholder:text-foreground/20 text-sm text-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm uppercase tracking-widest font-bold text-primary/60 px-4">Message</label>
                <textarea 
                  rows={3}
                  placeholder="How can we help you?"
                  className="w-full bg-white px-5 py-3.5 rounded-xl border border-primary/5 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/2 transition-all resize-none placeholder:text-foreground/20 text-sm text-primary"
                />
              </div>

              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-primary/10 group text-sm">
                Send Inquiry
                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
