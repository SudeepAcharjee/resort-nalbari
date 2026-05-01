"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from "lucide-react";

const ContactContent = () => {
  return (
    <section className="py-32 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Info Side */}
          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-primary font-serif text-4xl md:text-5xl leading-tight">We'd love to hear <br /> from you</h2>
              <p className="text-foreground/60 text-lg font-light leading-relaxed max-w-md">
                Whether you're looking for a romantic getaway or a family adventure, our team is ready to help you craft an unforgettable experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-primary/40 mb-1">Call Us</h3>
                    <p className="text-lg font-serif text-primary">+91 123 456 7890</p>
                    <p className="text-sm text-foreground/40">Mon - Sun, 9am - 9pm</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-primary/40 mb-1">Email Us</h3>
                    <p className="text-lg font-serif text-primary">hello@gjagroresort.com</p>
                    <p className="text-sm text-foreground/40">Response within 24 hours</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-primary/40 mb-1">Find Us</h3>
                    <p className="text-lg font-serif text-primary">Nalbari, Assam</p>
                    <p className="text-sm text-foreground/40">Mukalmua-Jagara Road</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <Clock className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest text-primary/40 mb-1">Check-in</h3>
                    <p className="text-lg font-serif text-primary">2:00 PM onwards</p>
                    <p className="text-sm text-foreground/40">Early check-in on request</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-16 rounded-[3.5rem] shadow-2xl border border-primary/5">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Your Name</label>
                    <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-primary/5 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/20 text-primary"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-primary/5 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/20 text-primary"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Subject</label>
                    <select className="w-full bg-primary/5 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-primary appearance-none">
                        <option>General Inquiry</option>
                        <option>Booking Request</option>
                        <option>Special Events</option>
                        <option>Feedback</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Your Message</label>
                    <textarea 
                        rows={4}
                        placeholder="Tell us about your plans..."
                        className="w-full bg-primary/5 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/20 text-primary resize-none"
                    />
                </div>
                <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                    Send Message
                    <ArrowRight className="w-5 h-5" />
                </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
