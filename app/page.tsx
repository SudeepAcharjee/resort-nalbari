import Hero from "./components/hero";
import Navbar from "./components/navbar";
import About from "./components/about";
import Facilities from "./components/facilities";
import Gallery from "./components/gallery";
import Marquee from "./components/marquee";
import Atmosphere from "./components/atmosphere";
import Activities from "./components/activities";
import Contact from "./components/contact";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <Gallery />
      <Marquee />
      <Atmosphere />
      <Activities />
      <Contact />
      <Footer />
    </main>
  );
}
