"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, CheckCircle, Clock, Search, Filter } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
  status: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contact[];
      setContacts(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "contacts", id), { status });
  };

  const deleteContact = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      await deleteDoc(doc(db, "contacts", id));
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-primary font-serif text-4xl mb-2">Inquiries</h1>
          <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Manage messages from your guests</p>
        </div>
        <div className="relative w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
            <input 
                type="text" 
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-primary/5 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            />
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-primary/5 overflow-hidden">
        {loading ? (
            <div className="p-20 text-center text-primary/40">Loading inquiries...</div>
        ) : filteredContacts.length === 0 ? (
            <div className="p-20 text-center text-primary/40">No inquiries found.</div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-primary/5">
                            <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-primary/40">Sender</th>
                            <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-primary/40">Subject</th>
                            <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-primary/40">Message</th>
                            <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-primary/40">Date</th>
                            <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-primary/40">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {filteredContacts.map((contact) => (
                                <motion.tr 
                                    key={contact.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={`border-b border-primary/5 hover:bg-primary/5 transition-colors ${contact.status === 'unread' ? 'bg-primary/[0.02]' : ''}`}
                                >
                                    <td className="p-8">
                                        <p className="font-bold text-primary">{contact.name}</p>
                                        <p className="text-xs text-primary/40">{contact.email}</p>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex flex-col gap-1">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block w-fit ${
                                                contact.status === 'closed' ? 'bg-gray-100 text-gray-500' :
                                                contact.status === 'contacted' ? 'bg-purple-100 text-purple-600' :
                                                'bg-green-100 text-green-600'
                                            }`}>
                                                {contact.status === 'unread' ? 'New' : contact.status}
                                            </span>
                                            <span className="text-[10px] text-primary/30 uppercase font-bold ml-1">{contact.subject}</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <p className="text-sm text-primary/60 max-w-xs line-clamp-2">{contact.message}</p>
                                    </td>
                                    <td className="p-8">
                                        <p className="text-xs text-primary/40">
                                            {contact.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-4">
                                            <select 
                                                value={contact.status}
                                                onChange={(e) => updateStatus(contact.id, e.target.value)}
                                                className="bg-primary/5 border-none rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary outline-none focus:ring-2 focus:ring-primary/20"
                                            >
                                                <option value="unread">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="closed">Closed</option>
                                            </select>

                                            <button 
                                                onClick={() => deleteContact(contact.id)}
                                                className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
}
