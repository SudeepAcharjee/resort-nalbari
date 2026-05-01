"use client";

import { Leaf, Coffee, Waves, ShieldCheck } from "lucide-react";

const AboutExperience = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Eco-Conscious Living",
      description: "Every cabin and facility is designed to minimize environmental impact while maximizing your connection to nature."
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Authentic Flavors",
      description: "Experience the rich culinary heritage of Assam with dishes prepared from fresh, organic local produce."
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Holistic Wellness",
      description: "From yoga sessions by the trees to peaceful nature walks, we focus on rejuvenation of mind, body, and soul."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Private & Secure",
      description: "Nestled away from the crowds, we offer a safe and private sanctuary for families, couples, and solo travelers."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 ">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-primary font-serif text-4xl md:text-5xl">The Ganga Jamuna Experience</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">Why travelers choose our sanctuary for their most cherished moments of rest.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl text-primary mb-4">{feature.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutExperience;
