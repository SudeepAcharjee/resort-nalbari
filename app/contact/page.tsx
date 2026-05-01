"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ContactHero from "./components/contact-hero";
import ContactContent from "./components/contact-content";
import ContactMap from "./components/contact-map";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ContactHero />
      <ContactContent />
      <ContactMap />
      <Footer />
    </main>
  );
};

export default ContactPage;
