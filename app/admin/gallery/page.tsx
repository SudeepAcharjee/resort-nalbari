"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Upload, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinary-loader";

interface GalleryItem {
  id: string;
  category: string;
  images: string[];
  order: number;
}

export default function ManageGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  
  // Form State
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
      setGallery(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setCategory("");
    setImages([]);
    setEditingItem(null);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setCategory(item.category);
    setImages(item.images);
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
    if (!category || images.length === 0) {
        alert("Please provide a category and at least one image.");
        return;
    }
    setLoading(true);

    const galleryData = {
      category,
      images,
      updatedAt: serverTimestamp(),
      order: editingItem ? editingItem.order : gallery.length
    };

    try {
      if (editingItem) {
        await updateDoc(doc(db, "gallery", editingItem.id), galleryData);
      } else {
        await addDoc(collection(db, "gallery"), {
          ...galleryData,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to save gallery category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category and all its images?")) {
      await deleteDoc(doc(db, "gallery", id));
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-primary font-serif text-4xl mb-2">Gallery Management</h1>
          <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Organize your resort's visual showcase by category</p>
        </div>
        <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-primary text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20"
        >
            <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
            <div className="col-span-full p-20 text-center text-primary/40">Loading gallery...</div>
        ) : gallery.length === 0 ? (
            <div className="col-span-full p-20 text-center text-primary/40 bg-white rounded-[3rem] border border-primary/5">No categories found. Create one to start showing off your resort.</div>
        ) : gallery.map((item) => (
            <motion.div 
                key={item.id}
                layout
                className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-primary/5 flex flex-col group hover:shadow-xl transition-all duration-500"
            >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {item.images[0] ? (
                        <Image 
                            loader={item.images[0].includes('cloudinary') ? cloudinaryLoader : undefined}
                            src={item.images[0]} 
                            alt={item.category} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-700" 
                            sizes="(max-width: 768px) 100vw, 33vw" 
                        />
                    ) : (
                        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-primary/20">
                            <ImageIcon className="w-12 h-12" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <div className="flex gap-2 w-full">
                            <button onClick={() => openEditModal(item)} className="flex-1 py-3 rounded-xl bg-white/20 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
                                Edit Gallery
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-3 rounded-xl bg-red-500/20 backdrop-blur-md text-white hover:bg-red-500 transition-all">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-8 flex justify-between items-center">
                    <div>
                        <h3 className="text-primary font-serif text-2xl">{item.category}</h3>
                        <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mt-1">{item.images.length} Images</p>
                    </div>
                    <div className="flex -space-x-3">
                        {item.images.slice(0, 3).map((img, i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm relative">
                                <Image 
                                    loader={img.includes('cloudinary') ? cloudinaryLoader : undefined}
                                    src={img} 
                                    alt="" 
                                    fill 
                                    className="object-cover" 
                                    sizes="40px" 
                                />
                            </div>
                        ))}
                        {item.images.length > 3 && (
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-primary/5 flex items-center justify-center text-[10px] font-bold text-primary backdrop-blur-sm">
                                +{item.images.length - 3}
                            </div>
                        )}
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
                            <h2 className="text-3xl font-serif">{editingItem ? `Edit ${category}` : "Add New Category"}</h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mt-1">Manage images for this section</p>
                        </div>
                        <button onClick={() => setIsModalOpen(false)} className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12 space-y-10">
                        <div className="space-y-2 max-w-md">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Category Name</label>
                            <input 
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g. Nature, Dining, Rooms..."
                                className="w-full px-6 py-4 rounded-2xl bg-primary/5 border-none outline-none focus:ring-2 focus:ring-primary/20 text-primary font-semibold"
                            />
                        </div>

                        {/* Image Gallery Management */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Gallery Content ({images.length} images)</label>
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
                                        <Image 
                                            loader={url.includes('cloudinary') ? cloudinaryLoader : undefined}
                                            src={url} 
                                            alt="" 
                                            fill 
                                            className="object-cover" 
                                            sizes="(max-width: 768px) 50vw, 20vw" 
                                        />
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
                                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/40 text-center px-4 leading-tight">Add Images</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-primary/5 flex justify-end gap-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-4 rounded-2xl text-primary font-bold hover:bg-primary/5 transition-all">Cancel</button>
                            <button type="submit" disabled={loading || uploading} className="bg-primary text-white px-12 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 disabled:opacity-50">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> {editingItem ? "Update Gallery" : "Save Gallery"}</>}
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
