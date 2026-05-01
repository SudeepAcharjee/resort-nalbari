"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { name: "Total Bookings", value: "0", icon: Calendar, color: "bg-blue-500" },
    { name: "Pending Inquiries", value: "0", icon: MessageSquare, color: "bg-orange-500" },
    { name: "Website Visitors", value: "1,284", icon: Users, color: "bg-green-500" },
    { name: "Estimated Revenue", value: "₹0", icon: TrendingUp, color: "bg-purple-500" },
  ]);

  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for bookings
    const qBookings = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(5));
    const unsubBookings = onSnapshot(qBookings, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentBookings(bookings);
      
      // Update total bookings count and revenue
      const total = snapshot.size;
      let revenue = 0;
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.status === 'confirmed') {
            // Very basic estimation based on price points we know
            if (data.roomType.includes("Heritage")) revenue += 3000;
            else if (data.roomType.includes("Premium")) revenue += 2500;
            else revenue += 1999;
        }
      });

      setStats(prev => prev.map(s => {
        if (s.name === "Total Bookings") return { ...s, value: total.toString() };
        if (s.name === "Estimated Revenue") return { ...s, value: `₹${revenue.toLocaleString()}` };
        return s;
      }));
    });

    // Real-time listener for inquiries
    const qInquiries = query(collection(db, "contacts"), orderBy("createdAt", "desc"), limit(5));
    const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
      const inquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentInquiries(inquiries);
      
      const pendingCount = snapshot.docs.filter(doc => doc.data().status === 'unread').length;
      setStats(prev => prev.map(s => {
        if (s.name === "Pending Inquiries") return { ...s, value: pendingCount.toString() };
        return s;
      }));
      setLoading(false);
    });

    return () => {
      unsubBookings();
      unsubInquiries();
    };
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-primary font-serif text-4xl mb-2">Welcome Back, Admin</h1>
          <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Overview of your resort operations</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-primary/5">
            <Clock className="w-4 h-4 text-primary/40" />
            <span className="text-sm font-bold text-primary">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-primary/5 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-current/20`}>
                <stat.icon className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">{stat.name}</p>
                    <p className="text-3xl font-serif text-primary">{stat.value}</p>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Recent Bookings */}
         <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-primary/5">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-primary font-serif text-2xl">Recent Bookings</h3>
                <Link href="/admin/bookings" className="text-secondary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    View All <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
            <div className="space-y-6">
                {recentBookings.length === 0 ? (
                    <p className="text-center py-10 text-primary/30 text-sm">No bookings yet.</p>
                ) : recentBookings.map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 group hover:bg-primary transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary font-bold uppercase">
                                {booking.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-sm text-primary group-hover:text-white">{booking.name}</p>
                                <p className="text-xs text-primary/40 group-hover:text-white/60">{booking.roomType} • {booking.persons}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-primary group-hover:text-white uppercase">{booking.status}</p>
                            <p className="text-[10px] uppercase tracking-widest text-primary/40 group-hover:text-white/60">
                                {booking.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* Recent Inquiries */}
         <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-primary/5">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-primary font-serif text-2xl">Inquiry Log</h3>
                <Link href="/admin/contacts" className="text-secondary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    View All <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
            <div className="space-y-6">
                {recentInquiries.length === 0 ? (
                    <p className="text-center py-10 text-primary/30 text-sm">No inquiries yet.</p>
                ) : recentInquiries.map(inquiry => (
                    <div key={inquiry.id} className="flex gap-4 p-4 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                            <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="space-y-1 overflow-hidden w-full">
                            <div className="flex justify-between">
                                <p className="text-sm font-bold text-primary">{inquiry.name}</p>
                                <span className="text-[10px] text-primary/30 uppercase font-bold">
                                    {inquiry.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                            <p className="text-xs text-primary/60 truncate italic">"{inquiry.message}"</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
}
