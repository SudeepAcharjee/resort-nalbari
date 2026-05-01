"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StayHero from "./components/stay-hero";
import RoomCategory from "./components/room-category";
import { Loader2 } from "lucide-react";

interface Room {
  id: string;
  title: string;
  price: number;
  available: number;
  description: string;
  features: string;
  bed: string;
  capacity: string;
  size: string;
  images: string[];
  order: number;
}

const OurStayPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "room-categories"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Room[];
      setRooms(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <StayHero />

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Curating our accommodations...</p>
        </div>
      ) : rooms.length === 0 ? (
        <div className="py-40 text-center">
            <p className="text-primary/40 font-serif text-2xl">No accommodations available at the moment.</p>
        </div>
      ) : (
        <div className="divide-y divide-primary/5">
            {rooms.map((room, index) => (
                <RoomCategory 
                    key={room.id}
                    title={room.title}
                    price={room.price}
                    available={room.available}
                    description={room.description}
                    features={room.features.split(",").map(f => f.trim())}
                    images={room.images}
                    bed={room.bed}
                    capacity={room.capacity}
                    size={room.size}
                    reverse={index % 2 !== 0}
                />
            ))}
        </div>
      )}

      <Footer />
    </main>
  );
};

export default OurStayPage;
