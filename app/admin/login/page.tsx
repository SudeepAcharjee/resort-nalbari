"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-primary/5"
      >
        <div className="bg-primary p-12 text-center text-white relative">
            <Link href="/" className="absolute top-8 left-8 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
                Back to Site
            </Link>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-3xl mb-2">Admin Portal</h1>
            <p className="text-white/60 text-sm font-light">Secure access for resort management</p>
        </div>

        <div className="p-12 space-y-8">
            {error && (
                <div className="p-4 bg-red-50 text-red-500 text-xs font-bold uppercase tracking-widest rounded-xl text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/20" />
                        <input 
                            required
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@gjresort.com"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary/5 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/20 text-primary"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/20" />
                        <input 
                            required
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-primary/5 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-primary/20 text-primary"
                        />
                    </div>
                </div>

                <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {loading ? "Authenticating..." : (
                        <>
                            Login to Dashboard
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <p className="text-center text-[10px] text-foreground/30 uppercase tracking-widest leading-relaxed">
                Protected by Firebase Authentication.<br />
                Unauthorized access is prohibited.
            </p>
        </div>
      </motion.div>
    </main>
  );
}
