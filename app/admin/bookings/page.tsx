"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Trash2, CheckCircle, Clock, Search, MapPin, User, Users } from "lucide-react";

interface Booking {
  id: string;
  roomType: string;
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  persons: string;
  createdAt: any;
  status: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "bookings", id), { status });
  };

  const deleteBooking = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking request?")) {
      await deleteDoc(doc(db, "bookings", id));
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-primary font-serif text-4xl mb-2">Booking Requests</h1>
          <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Manage room reservations</p>
        </div>
        <div className="relative w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
            <input 
                type="text" 
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-primary/5 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
            <div className="p-20 text-center text-primary/40">Loading bookings...</div>
        ) : filteredBookings.length === 0 ? (
            <div className="p-20 text-center text-primary/40">No booking requests found.</div>
        ) : (
            <AnimatePresence>
                {filteredBookings.map((booking) => (
                    <motion.div 
                        key={booking.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-primary/5 flex flex-col lg:flex-row justify-between gap-8 items-center group hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-primary/5 rounded-[1.5rem] flex items-center justify-center text-primary">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-serif text-2xl text-primary">{booking.roomType}</h3>
                                    <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                                        booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                                        booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                                        booking.status === 'contacted' ? 'bg-purple-100 text-purple-600' :
                                        'bg-orange-100 text-orange-600'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    <div className="flex items-center gap-2 text-primary/40 text-xs font-bold uppercase tracking-widest">
                                        <User className="w-3 h-3" /> {booking.name}
                                    </div>
                                    <div className="flex items-center gap-2 text-primary/40 text-xs font-bold uppercase tracking-widest">
                                        <Users className="w-3 h-3" /> {booking.persons}
                                    </div>
                                    <div className="flex items-center gap-2 text-primary/40 text-xs font-bold uppercase tracking-widest">
                                        <Clock className="w-3 h-3" /> {booking.checkIn} — {booking.checkOut}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right mr-4 px-6 border-r border-primary/5 hidden lg:block">
                                <p className="text-[10px] uppercase font-bold text-primary/30 tracking-widest mb-1">Contact</p>
                                <p className="text-sm font-bold text-primary">{booking.phone}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <select 
                                    value={booking.status}
                                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                                    className="bg-primary/5 border-none rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            
                            <button 
                                onClick={() => deleteBooking(booking.id)}
                                className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        )}
      </div>
    </div>
  );
}
