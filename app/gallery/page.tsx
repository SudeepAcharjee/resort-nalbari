"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import GalleryHero from "./components/gallery-hero";
import GallerySection from "./components/gallery-section";
import GalleryVideo from "./components/gallery-video";
import GalleryInstagram from "./components/gallery-instagram";
import GalleryCTA from "./components/gallery-cta";

const GalleryPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <GalleryHero />
      <GallerySection />
      <GalleryVideo />
      <GalleryInstagram />
      <GalleryCTA />
      <Footer />
    </main>
  );
};

export default GalleryPage;
