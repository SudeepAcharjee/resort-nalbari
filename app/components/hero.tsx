"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, Users, MapPin, ArrowLeft, Send } from "lucide-react";

const Hero = () => {
  const [step, setStep] = useState(1); // 1: Dates, 2: Contact Info
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("02 Adults");
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNextStep = () => {
    if (!checkIn || !checkOut) {
      alert("Please select dates first.");
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!name || !phone) {
      alert("Please provide your name and phone number.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        roomType: "Quick Inquiry (Hero)",
        name,
        phone,
        email: email || "Not provided",
        checkIn,
        checkOut,
        persons: guests,
        createdAt: serverTimestamp(),
        status: "pending"
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
        setName("");
        setPhone("");
        setEmail("");
      }, 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-background flex flex-col items-center justify-start px-4 pt-[115px] pb-[85px] overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(9,106,52,0.15)] border border-primary/5 bg-white flex flex-col md:flex-row min-h-[60vh] lg:min-h-[75vh]">
        
        {/* Left Side: Information Panel (50%) */}
        <div className="w-full md:w-1/2 bg-primary p-10 md:p-14 lg:p-20 flex flex-col justify-center gap-8 text-white relative overflow-hidden">
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
              <Link href="/our-stay">
                <button className="bg-secondary text-primary px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-secondary/20">
                  Book a stay
                </button>
              </Link>
              <Link href="/contact">
                <button className="border border-white/20 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all">
                  Our Location
                </button>
              </Link>
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Floating Booking System (Pill Style) */}
          <div className="relative z-10 w-full max-w-3xl bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/50 hidden lg:flex">
            <AnimatePresence mode="wait">
                {success ? (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1 px-8 py-3 text-primary font-bold text-sm flex items-center gap-3"
                    >
                        <Calendar className="w-5 h-5 text-secondary" /> Request Sent! We'll call you shortly.
                    </motion.div>
                ) : step === 1 ? (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex items-center"
                    >
                        <div className="flex-1 flex items-center divide-x divide-primary/10">
                            <div className="flex-1 px-6 py-2">
                                <label className="text-[9px] uppercase tracking-widest font-bold text-primary/40 block mb-0.5">Check-In</label>
                                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent border-none p-0 text-[12px] font-semibold text-primary outline-none w-full" />
                            </div>
                            <div className="flex-1 px-6 py-2">
                                <label className="text-[9px] uppercase tracking-widest font-bold text-primary/40 block mb-0.5">Check-Out</label>
                                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent border-none p-0 text-[12px] font-semibold text-primary outline-none w-full" />
                            </div>
                            <div className="flex-1 px-6 py-2">
                                <label className="text-[9px] uppercase tracking-widest font-bold text-primary/40 block mb-0.5">Guests</label>
                                <select value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-transparent border-none p-0 text-[12px] font-semibold text-primary outline-none w-full appearance-none">
                                    <option>01 Adult</option>
                                    <option>02 Adults</option>
                                    <option>Family</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={handleNextStep} className="bg-primary text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all flex items-center gap-2 shrink-0 ml-2">
                            Contact <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex items-center gap-4 px-4"
                    >
                        <button onClick={() => setStep(1)} className="p-2 hover:bg-primary/5 rounded-full transition-colors">
                            <ArrowLeft className="w-4 h-4 text-primary/40" />
                        </button>
                        <div className="flex-1 grid grid-cols-3 gap-4">
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-transparent border-b border-primary/10 py-2 text-xs font-semibold text-primary outline-none placeholder:text-primary/20" 
                            />
                            <input 
                                type="tel" 
                                placeholder="Phone Number" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="bg-transparent border-b border-primary/10 py-2 text-xs font-semibold text-primary outline-none placeholder:text-primary/20" 
                            />
                            <input 
                                type="email" 
                                placeholder="Email (Optional)" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent border-b border-primary/10 py-2 text-xs font-semibold text-primary outline-none placeholder:text-primary/20" 
                            />
                        </div>
                        <button 
                            disabled={loading}
                            onClick={handleFinalSubmit} 
                            className="bg-primary text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
                        >
                            {loading ? "..." : "Submit"} <Send className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* Mobile Booking Bar */}
          <div className="relative z-10 w-full bg-white p-4 rounded-3xl shadow-xl flex flex-col gap-3 lg:hidden">
            <AnimatePresence mode="wait">
                {success ? (
                    <motion.div key="mob-success" className="py-4 text-center text-primary font-bold text-xs uppercase tracking-widest">
                        Request Sent Successfully!
                    </motion.div>
                ) : step === 1 ? (
                    <motion.div key="mob-step1" className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-primary/5 p-3 rounded-2xl">
                                <p className="text-[8px] uppercase font-bold text-primary/40">Check-In</p>
                                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent border-none p-0 text-xs font-semibold outline-none w-full" />
                            </div>
                            <div className="bg-primary/5 p-3 rounded-2xl">
                                <p className="text-[8px] uppercase font-bold text-primary/40">Check-Out</p>
                                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent border-none p-0 text-xs font-semibold outline-none w-full" />
                            </div>
                        </div>
                        <button onClick={handleNextStep} className="w-full bg-primary text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest">
                            Continue to Contact
                        </button>
                    </motion.div>
                ) : (
                    <motion.div key="mob-step2" className="space-y-4">
                        <button onClick={() => setStep(1)} className="text-[10px] uppercase font-bold text-primary/40 flex items-center gap-2">
                            <ArrowLeft className="w-3 h-3" /> Back to dates
                        </button>
                        <div className="space-y-3">
                            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-primary/5 px-4 py-3 rounded-xl text-xs font-semibold outline-none" />
                            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-primary/5 px-4 py-3 rounded-xl text-xs font-semibold outline-none" />
                            <input type="email" placeholder="Email (Optional)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-primary/5 px-4 py-3 rounded-xl text-xs font-semibold outline-none" />
                        </div>
                        <button disabled={loading} onClick={handleFinalSubmit} className="w-full bg-primary text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-50">
                            {loading ? "Sending..." : "Submit Inquiry"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
