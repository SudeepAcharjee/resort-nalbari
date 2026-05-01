"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "Our Stay", href: "/our-stay" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 md:px-12 md:py-4 ${
          scrolled 
            ? "bg-background/90 backdrop-blur-xl shadow-lg border-b border-primary/5" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
          
          {/* Logo (Left) */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center group">
              <motion.div 
                className="relative w-12 h-12 md:w-14 md:h-14"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{ rotate: 12, scale: 1.1 }}
              >
                <Image
                  src="/logo.svg"
                  alt="Resort Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu (Center) */}
          <div className="hidden md:flex items-center justify-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2 text-[14px] font-semibold transition-all rounded-full hover:bg-primary/5 whitespace-nowrap ${
                  scrolled ? "text-primary/70 hover:text-primary" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Button (Right) */}
          <div className="hidden md:flex justify-end items-center gap-4">
            <Link
              href="/our-stay"
              className={`px-8 py-3 rounded-full text-[14px] font-bold transition-all shadow-lg active:scale-95 ${
                scrolled 
                  ? "bg-primary text-white shadow-primary/20 hover:brightness-110" 
                  : "bg-foreground text-background hover:brightness-110 shadow-foreground/10"
              }`}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden justify-end">
            <button 
              className={`p-2 transition-colors ${scrolled ? "text-primary" : "text-foreground"}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-primary flex flex-col p-8 text-white md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
               <motion.div 
                className="relative w-12 h-12"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
              </motion.div>
              <button 
                className="p-2 bg-white/10 rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {[...navLinks].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-4xl font-serif hover:text-secondary transition-colors inline-block whitespace-nowrap"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/10 space-y-4">
              <p className="text-white/40 text-xs uppercase tracking-widest">Inquiries</p>
              <p className="text-lg font-serif">contact@gjagroresort.com</p>
              <p className="text-lg font-serif">+91 123 456 7890</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
