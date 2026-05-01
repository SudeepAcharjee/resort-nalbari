"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AboutHero from "./components/about-hero";
import AboutHistory from "./components/about-history";
import AboutVision from "./components/about-vision";
import AboutCarousel from "./components/about-carousel";
import AboutPhilosophy from "./components/about-philosophy";
import AboutExperience from "./components/about-experience";
import AboutImpact from "./components/about-impact";
import AboutFaq from "./components/about-faq";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AboutHero />
      <AboutHistory />
      <AboutVision />
      <AboutCarousel />
      <AboutPhilosophy />
      <AboutExperience />
      <AboutImpact />
      <AboutFaq />
      <Footer />
    </main>
  );
};

export default AboutPage;
