import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: "01",
    company: "Kamino",
    quote: "The Brokex data standard enables us to deliver a seamless RWA trading experience without compromising on decentralization and security.",
    author: "Thomas Short",
    role: "CO-FOUNDER, KAMINO",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas"
  },
  {
    id: "02",
    company: "JOJO",
    quote: "Integrating Brokex's gasless engine transformed our user retention. Trading real-world assets has never been this fluid on-chain.",
    author: "Sarah Chen",
    role: "HEAD OF OPS, JOJO",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "03",
    company: "GMX",
    quote: "Brokex's oracle-based settlement guarantees the payout security our institutional clients require for large-scale CFD positions.",
    author: "Marcus Wright",
    role: "CORE DEV, GMX",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  }
];

const DISPLAY_DURATION = 5000; // 5 secondes

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Gestion du cycle automatique
  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, DISPLAY_DURATION);

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (DISPLAY_DURATION / 100)), 100));
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [index]);

  return (
    <section className="w-full bg-white font-['Space_Grotesk'] flex flex-col items-center">
      
      <div className="relative w-full px-6 md:px-12 max-w-[1800px]">
        
        {/* --- LIGNES DE GRILLE VERTICALES --- */}
        <div className="absolute top-0 left-6 md:left-12 w-px h-full bg-slate-200 z-0" />
        <div className="absolute top-0 right-6 md:right-12 w-px h-full bg-slate-200 z-0" />

        {/* --- BLOC PRINCIPAL --- */}
        <div className="relative z-10 bg-[#0c162c] text-white overflow-hidden border-x border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[450px]">
            
            {/* GAUCHE : NAVIGATION (33%) */}
            <div className="lg:col-span-4 border-r border-white/10 p-10 md:p-16 flex flex-col justify-center gap-8">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  className={`relative text-left transition-all duration-300 group ${
                    index === i ? 'opacity-100' : 'opacity-30 hover:opacity-50'
                  }`}
                >
                  {/* BARRE DE PROGRESSION (Au-dessus du texte) */}
                  {index === i && (
                    <div className="absolute -top-4 left-0 w-32 h-[2px] bg-white/10 overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#375BD2]" 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-bold tracking-tight">{t.company}</span>
                    <span className="text-xs font-mono opacity-60">{t.id}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* DROITE : CITATION (66%) */}
            <div className="lg:col-span-8 p-10 md:p-20 flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="max-w-3xl"
                >
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.2] mb-12">
                    “{testimonials[index].quote}”
                  </h2>

                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonials[index].avatar} 
                      alt={testimonials[index].author}
                      className="w-12 h-12 rounded-full border border-white/20 bg-[#152342]"
                    />
                    <div>
                      <div className="font-bold text-lg">{testimonials[index].author}</div>
                      <div className="text-sm text-blue-400 font-mono tracking-tighter">
                        {testimonials[index].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* POINTS DE DECO EN BAS À DROITE */}
              <div className="absolute bottom-10 right-10 flex gap-2">
                <div className="w-1.5 h-1.5 bg-[#375BD2]" />
                <div className="w-1.5 h-1.5 bg-[#375BD2] opacity-50" />
                <div className="w-1.5 h-1.5 bg-[#375BD2] opacity-20" />
              </div>
            </div>

          </div>
        </div>

        {/* --- LIGNE DE FERMETURE BAS --- */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-slate-200 z-0" />
      </div>

    </section>
  );
}