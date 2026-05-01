"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from "lucide-react";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const ContactContent = () => {
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
        subject: formData.get("subject"),
        message: formData.get("message"),
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
            {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                    <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                        <MessageSquare className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-3xl text-primary">Message Received</h3>
                    <p className="text-primary/60 font-light">Your message has been sent successfully. <br /> We'll get back to you shortly.</p>
                    <button 
                        onClick={() => setSuccess(false)}
                        className="text-secondary font-bold uppercase tracking-widest text-xs border-b border-secondary"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Your Name</label>
                        <input 
                            required
                            name="name"
                            type="text" 
                            placeholder="John Doe"
                            className="w-full bg-primary/5 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/20 text-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                        <input 
                            required
                            name="email"
                            type="email" 
                            placeholder="john@example.com"
                            className="w-full bg-primary/5 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/20 text-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Subject</label>
                        <select name="subject" className="w-full bg-primary/5 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-primary appearance-none">
                            <option>General Inquiry</option>
                            <option>Booking Request</option>
                            <option>Special Events</option>
                            <option>Feedback</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Your Message</label>
                        <textarea 
                            required
                            name="message"
                            rows={4}
                            placeholder="Tell us about your plans..."
                            className="w-full bg-primary/5 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/20 text-primary resize-none"
                        />
                    </div>
                    <button 
                        disabled={loading}
                        className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? "Sending..." : (
                            <>
                                Send Message
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
