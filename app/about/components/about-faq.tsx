"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How far is Ganga Jamuna from Guwahati?",
    answer: "We are located approximately 70km from Guwahati, which is about a 1.5 to 2-hour drive through scenic Assamese countryside."
  },
  {
    question: "What is the best time to visit Nalbari?",
    answer: "The months from October to April offer the most pleasant weather. However, the monsoon (June to August) brings a unique lush green beauty to the resort that many nature lovers adore."
  },
  {
    question: "Do you offer traditional Assamese meals?",
    answer: "Yes, our culinary team specializes in authentic Assamese cuisine, including the famous 'Thali' with local ingredients sourced from our own organic garden and nearby farms."
  },
  {
    question: "Is the resort child-friendly?",
    answer: "Absolutely. We have wide open spaces, nature trails, and dedicated activities designed for children to explore and learn about nature safely."
  },
  {
    question: "Can we book the resort for private events?",
    answer: "Yes, we host intimate weddings, corporate retreats, and private celebrations. Please contact our events team for personalized packages."
  }
];

const AboutFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs">Clarifications</span>
          <h2 className="text-primary font-serif text-4xl md:text-5xl">Frequently Asked</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className={`border rounded-3xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'border-primary bg-primary/5' : 'border-primary/10 bg-transparent'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className={`text-lg font-serif transition-colors ${openIndex === i ? 'text-primary' : 'text-foreground/80'}`}>
                    {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-primary text-white rotate-180' : 'bg-primary/5 text-primary'}`}>
                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-foreground/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFaq;
