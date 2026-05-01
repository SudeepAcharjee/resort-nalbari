"use client";

import { motion } from "framer-motion";
import { Users, Droplets, TreePine, GraduationCap } from "lucide-react";

const impactStats = [
  {
    icon: <Users className="w-6 h-6" />,
    label: "Local Employment",
    value: "95%",
    description: "Our staff consists almost entirely of residents from nearby villages in Nalbari."
  },
  {
    icon: <TreePine className="w-6 h-6" />,
    label: "Trees Planted",
    value: "2,500+",
    description: "Every guest visit contributes to our reforestation project in the Brahmaputra basin."
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    label: "Water Saved",
    value: "50kL",
    description: "Monthly savings through our advanced greywater recycling and rain harvesting."
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    label: "Skill Training",
    value: "200+",
    description: "Local youth trained in sustainable hospitality and traditional Assamese crafts."
  }
];

const AboutImpact = () => {
  return (
    <section className="py-24 bg-accent/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs">Community & Nature</span>
          <h2 className="text-primary font-serif text-4xl md:text-5xl">Our Footprint of Good</h2>
          <p className="text-foreground/60 text-lg">
            We believe that a resort should be more than just a place to stay—it should be a catalyst for positive change in the community it calls home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-primary/5 hover:border-primary/20 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {stat.icon}
              </div>
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif text-primary">{stat.value}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground">{stat.label}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                    {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutImpact;
