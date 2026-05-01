"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StayHero from "./components/stay-hero";
import RoomCategory from "./components/room-category";

const OurStayPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <StayHero />

      {/* Category 1 - 1999 */}
      <RoomCategory 
        title="Classic Eco Cabin"
        price={1999}
        available={12}
        description="Our signature bamboo cabins, offering a peaceful retreat in the heart of nature. Perfect for couples seeking simplicity and serenity."
        features={["Nature View", "Queen Size Bed", "Hot Water", "Private Porch", "Agro-Farm Access", "Free WiFi"]}
        images={[
          "/gallery/rooms-2.png", 
          "/gallery/nature-1.png", 
          "/gallery/nature-2.png",
          "/gallery/rooms-2.png",
          "/gallery/nature-1.png"
        ]}
      />

      {/* Category 2 - 2500 */}
      <RoomCategory 
        title="Premium Garden View"
        price={2500}
        available={6}
        reverse
        description="Spacious rooms overlooking our lush organic gardens. These rooms feature air conditioning and enhanced luxury amenities."
        features={["Garden View", "King Size Bed", "Air Conditioning", "Balcony", "Premium Toiletries", "Mini Fridge"]}
        images={[
          "/bedroom.png", 
          "/gallery/dining-1.png", 
          "/gallery/activities-1.png",
          "/bedroom.png",
          "/gallery/dining-2.png"
        ]}
      />

      {/* Category 3 - 3000 */}
      <RoomCategory 
        title="The Heritage Suite"
        price={3000}
        available={2}
        description="Our most exclusive accommodation, featuring traditional Assamese architecture, hand-carved furniture, and private butler service."
        features={["Panoramic View", "Grand King Bed", "Smart TV", "Personal Concierge", "Private Deck", "Welcome Platter"]}
        images={[
          "/gallery/rooms-1.png", 
          "/bedroom.png", 
          "/gallery/rooms-1.png",
          "/hero-bg.png",
          "/gallery/nature-1.png"
        ]}
      />

      <Footer />
    </main>
  );
};

export default OurStayPage;
