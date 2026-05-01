"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MessageSquare, 
  CalendarCheck, 
  LogOut, 
  Home,
  User,
  Settings,
  ChevronRight
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") return null;
  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Contacts", href: "/admin/contacts", icon: MessageSquare },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-primary/5 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
            <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                    <Home className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-primary font-serif text-xl leading-tight">Ganga Jamuna</h2>
                    <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">Admin Panel</p>
                </div>
            </Link>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-8">
            {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link 
                        key={item.name} 
                        href={item.href}
                        className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                            isActive 
                            ? "bg-primary text-white shadow-lg shadow-primary/20" 
                            : "text-primary/60 hover:bg-primary/5 hover:text-primary"
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <item.icon className={`w-5 h-5 ${isActive ? "text-secondary" : ""}`} />
                            <span className="font-semibold text-sm">{item.name}</span>
                        </div>
                        {isActive && <ChevronRight className="w-4 h-4" />}
                    </Link>
                );
            })}
        </nav>

        <div className="p-6 border-t border-primary/5 space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                    <p className="text-xs font-bold text-primary truncate">{user?.email}</p>
                    <p className="text-[10px] text-primary/40 uppercase tracking-widest font-bold">Resort Manager</p>
                </div>
            </div>
            
            <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all group"
            >
                <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span className="font-bold text-sm">Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        {children}
      </main>
    </div>
  );
}
