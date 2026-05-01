"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Camera, Earth } from "lucide-react";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        subject: "General Inquiry",
        createdAt: serverTimestamp(),
        status: "unread"
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            {success ? (
                <div className="py-20 text-center space-y-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto shadow-lg animate-bounce">
                        <Send className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-serif text-3xl text-primary">Inquiry Sent!</h3>
                        <p className="text-primary/60 font-light">We have received your message and <br /> will get back to you shortly.</p>
                    </div>
                    <button 
                        onClick={() => setSuccess(false)}
                        className="text-secondary font-bold uppercase tracking-[0.2em] text-[10px] border-b border-secondary pb-1"
                    >
                        Send another inquiry
                    </button>
                </div>
            ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                        <label className="text-sm uppercase tracking-widest font-bold text-primary/60 px-4">Full Name</label>
                        <input 
                            required
                            name="name"
                            type="text" 
                            placeholder="Enter your name"
                            className="w-full bg-white px-5 py-3.5 rounded-xl border border-primary/5 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/2 transition-all placeholder:text-foreground/20 text-sm text-primary"
                        />
                        </div>
                        <div className="space-y-1.5">
                        <label className="text-sm uppercase tracking-widest font-bold text-primary/60 px-4">Email Address</label>
                        <input 
                            required
                            name="email"
                            type="email" 
                            placeholder="name@example.com"
                            className="w-full bg-white px-5 py-3.5 rounded-xl border border-primary/5 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/2 transition-all placeholder:text-foreground/20 text-sm text-primary"
                        />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm uppercase tracking-widest font-bold text-primary/60 px-4">Phone Number</label>
                        <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder="+91 000 000 0000"
                        className="w-full bg-white px-5 py-3.5 rounded-xl border border-primary/5 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/2 transition-all placeholder:text-foreground/20 text-sm text-primary"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm uppercase tracking-widest font-bold text-primary/60 px-4">Message</label>
                        <textarea 
                        required
                        name="message"
                        rows={3}
                        placeholder="How can we help you?"
                        className="w-full bg-white px-5 py-3.5 rounded-xl border border-primary/5 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/2 transition-all resize-none placeholder:text-foreground/20 text-sm text-primary"
                        />
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-primary/10 group text-sm disabled:opacity-50"
                    >
                        {loading ? "Sending..." : (
                            <>
                                Send Inquiry
                                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
