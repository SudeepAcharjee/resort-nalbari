"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone, Users, Calendar, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomType: string;
}

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const BookingDialog = ({ isOpen, onClose, roomType }: BookingDialogProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(db, "bookings"), {
        roomType,
        name: formData.get("name"),
        phone: formData.get("phone"),
        checkIn: formData.get("checkIn"),
        checkOut: formData.get("checkOut"),
        persons: formData.get("persons"),
        createdAt: serverTimestamp(),
        status: "pending"
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding booking: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-8 text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-secondary font-bold tracking-widest uppercase text-[10px] mb-2 block">Booking Request</span>
              <h2 className="font-serif text-3xl">Reserve your {roomType}</h2>
            </div>

            <div className="p-8 md:p-12">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30" />
                        <input 
                          required
                          name="name"
                          type="text" 
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary/5 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/40 text-primary"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30" />
                        <input 
                          required
                          name="phone"
                          type="tel" 
                          placeholder="+91 00000 00000"
                          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary/5 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/40 text-primary"
                        />
                      </div>
                    </div>

                    {/* Check In */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Check In</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30 pointer-events-none" />
                        <input 
                          required
                          name="checkIn"
                          type="date" 
                          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary/5 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all text-primary text-sm"
                        />
                      </div>
                    </div>

                    {/* Check Out */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Check Out</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30 pointer-events-none" />
                        <input 
                          required
                          name="checkOut"
                          type="date" 
                          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary/5 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all text-primary text-sm"
                        />
                      </div>
                    </div>

                    {/* Persons */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Total Persons</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30 pointer-events-none" />
                        <select name="persons" defaultValue="2 Persons" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary/5 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none text-primary text-sm">
                            <option>1 Person</option>
                            <option>2 Persons</option>
                            <option>3 Persons</option>
                            <option>Family (4+)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Booking Request
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-foreground/30 mt-4 uppercase tracking-widest">
                        We will contact you shortly to confirm your stay.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl text-primary">Request Sent!</h3>
                    <p className="text-foreground/60 font-light">
                      Thank you for choosing Ganga Jamuna. Our team will reach out to you within the next 24 hours to finalize your reservation.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-primary text-white px-12 py-4 rounded-full font-bold"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingDialog;
