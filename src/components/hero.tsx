import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Menu, X } from "lucide-react";

export default function Hero() {
  const words = [
    "Crypto",
    "Forex",
    "Stocks",
    "Indices",
    "Commodities",
    "Everything"
  ];

  const [index, setIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative w-full h-screen bg-[#375BD2] font-['Space_Grotesk'] text-white overflow-hidden flex flex-col">
      
      {/* --- LIGNES DECO --- */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/10 z-0 hidden md:block" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-white/10 z-0 hidden md:block" />

      {/* --- NAVBAR --- */}
      <nav className="relative z-50 w-full px-6 md:px-12 py-6 flex items-center justify-between bg-[#375BD2] border-b border-white/20">
        
        {/* GROUPE GAUCHE : LOGO + LIENS */}
        <div className="flex items-center gap-12">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-[#375BD2] rounded-sm" />
            </div>
            <span className="text-xl font-bold tracking-tight">Brokex</span>
          </div>

          {/* Liens */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-blue-100/90">
            <a href="#" className="hover:text-white transition-colors">CFD</a>
            <a href="#" className="hover:text-white transition-colors">LP</a>
            <a href="#" className="hover:text-white transition-colors">Faucet</a>
            <a href="#" className="hover:text-white transition-colors">Whitepaper</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>

        </div>

        {/* GROUPE DROITE : BOUTON APP */}
        <div className="hidden md:flex items-center gap-4">
          <button className="bg-white text-[#375BD2] px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20">
            Launch App
          </button>
        </div>

        {/* Menu Mobile */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* --- CONTENU PRINCIPAL --- */}
      {/* AJUSTEMENT : pl-12 (ou pl-16) ajoute l'espace par rapport à la ligne de la grille */}
      <div className="flex-1 flex items-center px-6 md:px-12 md:pl-24 max-w-[1800px] mx-auto w-full relative z-10">
        
        {/* BLOC TITRE "SLOT MACHINE" */}
        <div className="flex font-bold tracking-tighter text-[50px] md:text-[70px] lg:text-[90px] leading-none select-none items-center w-full">
          
          {/* Mot Fixe */}
          <span className="text-white mr-4 md:mr-8 whitespace-nowrap z-20">Trade</span>
          
          {/* Liste Roulante Verticale */}
          <div className="relative h-[3em] flex-1 min-w-[300px] md:min-w-[600px] overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-[0.5em] bg-gradient-to-b from-[#375BD2] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[0.5em] bg-gradient-to-t from-[#375BD2] to-transparent z-10 pointer-events-none" />

            <motion.div
              animate={{ y: `calc(-${index}em + 1em)` }} 
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 flex flex-col w-full"
            >
              {words.map((word, i) => (
                <div 
                  key={i} 
                  className={`h-[1em] flex items-center whitespace-nowrap transition-all duration-1000 ${
                    i === index 
                      ? "text-[#FFD700] opacity-100 pl-4 scale-100" 
                      : "text-white opacity-30 pl-0 scale-95 blur-[1px]" 
                  }`}
                >
                  {word}
                </div>
              ))}
            </motion.div>
            
          </div>

        </div>

      </div>

      {/* --- BOTTOM RIGHT CONTENT --- */}
      <div className="absolute bottom-0 right-0 p-6 md:p-12 z-20 flex flex-col items-end text-right max-w-md md:max-w-xl">
        
        <div className="mb-8 pl-8 md:pl-0 md:border-r-2 border-[#FFD700] md:pr-6 border-l-0">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
            The industry-standard decentralized exchange.
          </h3>
          <p className="text-blue-200 text-sm md:text-base leading-relaxed">
            Deep liquidity, low fees, and up to 100x leverage on all your favorite assets.
          </p>
        </div>

        <div className="flex items-center gap-4 md:border-r-2 md:border-transparent md:pr-6">
          <button className="h-14 px-8 bg-transparent hover:bg-white/10 text-white/70 hover:text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 border border-transparent hover:border-white/20 whitespace-nowrap">
            View Markets
            <BarChart2 className="w-4 h-4" />
          </button>
          
          <button className="h-14 px-8 bg-[#0c162c] hover:bg-[#152342] text-white rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 group shadow-xl border border-white/5 whitespace-nowrap">
            Start Trading Now
            <ArrowRight className="w-5 h-5 text-[#FFD700] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
      </div>

    </div>
  );
}