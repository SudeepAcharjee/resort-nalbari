"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Upload, Save, CheckCircle2, Loader2, Image as ImageIcon, Bed, User, Maximize } from "lucide-react";
import Image from "next/image";

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

export default function ManageRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [bed, setBed] = useState("1 King Bed");
  const [capacity, setCapacity] = useState("2 Adults");
  const [size, setSize] = useState("350 sqft");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

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

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setAvailable("");
    setDescription("");
    setFeatures("");
    setBed("1 King Bed");
    setCapacity("2 Adults");
    setSize("350 sqft");
    setImages([]);
    setEditingRoom(null);
  };

  const openEditModal = (room: Room) => {
    setEditingRoom(room);
    setTitle(room.title);
    setPrice(room.price.toString());
    setAvailable(room.available.toString());
    setDescription(room.description);
    setFeatures(room.features);
    setBed(room.bed || "1 King Bed");
    setCapacity(room.capacity || "2 Adults");
    setSize(room.size || "350 sqft");
    setImages(room.images);
    setIsModalOpen(true);
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
                uploadedUrls.push(data.secure_url);
            }
        } catch (error) {
            console.error("Upload failed for file", i, error);
        }
    }

    setImages(prev => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  const removeImage = (url: string) => {
    setImages(prev => prev.filter(i => i !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const roomData = {
      title,
      price: Number(price),
      available: Number(available),
      description,
      features,
      bed,
      capacity,
      size,
      images,
      updatedAt: serverTimestamp(),
      order: editingRoom ? editingRoom.order : rooms.length
    };

    try {
      if (editingRoom) {
        await updateDoc(doc(db, "room-categories", editingRoom.id), roomData);
      } else {
        await addDoc(collection(db, "room-categories"), {
          ...roomData,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to save room.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this room category?")) {
      await deleteDoc(doc(db, "room-categories", id));
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-primary font-serif text-4xl mb-2">Room Management</h1>
          <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Manage room categories and availability</p>
        </div>
        <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-primary text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20"
        >
            <Plus className="w-4 h-4" /> Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
            <div className="col-span-full p-20 text-center text-primary/40">Loading rooms...</div>
        ) : rooms.length === 0 ? (
            <div className="col-span-full p-20 text-center text-primary/40 bg-white rounded-[3rem] border border-primary/5">No room categories found. Add one to get started.</div>
        ) : rooms.map((room) => (
            <motion.div 
                key={room.id}
                layout
                className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-primary/5 flex flex-col md:flex-row group hover:shadow-xl transition-all duration-500"
            >
                <div className="md:w-1/3 relative min-h-[250px]">
                    {room.images[0] ? (
                        <Image src={room.images[0]} alt={room.title} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-primary/20">
                            <ImageIcon className="w-12 h-12" />
                        </div>
                    )}
                </div>
                <div className="flex-1 p-8 space-y-4 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-primary font-serif text-2xl leading-tight">{room.title}</h3>
                                <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">₹{room.price} / Night</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEditModal(room)} className="p-2 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(room.id)} className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="flex items-center gap-1.5 text-primary/40 text-[9px] font-bold uppercase tracking-widest">
                                <Bed className="w-3 h-3" /> {room.bed}
                            </div>
                            <div className="flex items-center gap-1.5 text-primary/40 text-[9px] font-bold uppercase tracking-widest">
                                <User className="w-3 h-3" /> {room.capacity}
                            </div>
                            <div className="flex items-center gap-1.5 text-primary/40 text-[9px] font-bold uppercase tracking-widest">
                                <Maximize className="w-3 h-3" /> {room.size}
                            </div>
                        </div>
                        <p className="text-sm text-foreground/50 line-clamp-2 italic font-light">"{room.description}"</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                        <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">{room.available} Rooms Left</span>
                        <div className="flex gap-1">
                            {room.images.slice(0, 3).map((img, i) => (
                                <div key={i} className="w-8 h-8 rounded-lg overflow-hidden border border-white">
                                    <Image src={img} alt="" width={32} height={32} className="object-cover" />
                                </div>
                            ))}
                            {room.images.length > 3 && (
                                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-[10px] font-bold text-primary">
                                    +{room.images.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsModalOpen(false)}
                    className="absolute inset-0 bg-primary/40 backdrop-blur-md"
                />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                    <div className="p-8 bg-primary text-white flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-serif">{editingRoom ? "Edit Room" : "Add New Room"}</h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mt-1">Room details & imagery</p>
                        </div>
                        <button onClick={() => setIsModalOpen(false)} className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Room Title</label>
                                <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Heritage Eco Hut" className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-none outline-none focus:ring-2 focus:ring-primary/20 text-primary font-semibold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Price / Night (₹)</label>
                                <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1999" className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-none outline-none focus:ring-2 focus:ring-primary/20 text-primary font-semibold" />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Bed Type</label>
                                <input required value={bed} onChange={(e) => setBed(e.target.value)} placeholder="1 King Bed" className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-none outline-none focus:ring-2 focus:ring-primary/20 text-primary font-semibold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Capacity</label>
                                <input required value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="2 Adults" className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-none outline-none focus:ring-2 focus:ring-primary/20 text-primary font-semibold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Room Size</label>
                                <input required value={size} onChange={(e) => setSize(e.target.value)} placeholder="350 sqft" className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-none outline-none focus:ring-2 focus:ring-primary/20 text-primary font-semibold" />
                            </div>

                            <div className="col-span-full space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Description</label>
                                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe the room experience..." className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-none outline-none focus:ring-2 focus:ring-primary/20 text-primary font-semibold resize-none" />
                            </div>
                            <div className="col-span-full space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Features (Comma separated)</label>
                                <input required value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Nature View, Hot Water, AC, WiFi..." className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-none outline-none focus:ring-2 focus:ring-primary/20 text-primary font-semibold" />
                            </div>
                        </div>

                        {/* Image Gallery Management */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Room Gallery ({images.length} images)</label>
                                {images.length > 0 && <button type="button" onClick={() => setImages([])} className="text-[10px] font-bold uppercase text-red-500 hover:underline">Clear All</button>}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {images.map((url, i) => (
                                    <motion.div 
                                        layout
                                        key={url} 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative aspect-square rounded-2xl overflow-hidden group border border-primary/5 shadow-md"
                                    >
                                        <Image src={url} alt="" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button 
                                                type="button"
                                                onClick={() => removeImage(url)}
                                                className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                                <label className={`aspect-square rounded-[2rem] border-4 border-dashed border-primary/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-primary/5 hover:border-primary/20 transition-all ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                                    <input type="file" multiple className="hidden" onChange={handleBulkUpload} disabled={uploading} accept="image/*" />
                                    {uploading ? (
                                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary/30">
                                                <Plus className="w-6 h-6" />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/40 text-center px-4 leading-tight">Add Multiple Images</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-primary/5 flex justify-end gap-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-4 rounded-2xl text-primary font-bold hover:bg-primary/5 transition-all">Cancel</button>
                            <button type="submit" disabled={loading || uploading} className="bg-primary text-white px-12 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 disabled:opacity-50">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> {editingRoom ? "Update Room" : "Save Room"}</>}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}
