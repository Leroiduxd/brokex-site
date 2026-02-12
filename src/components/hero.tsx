import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Menu, X } from "lucide-react";

export default function Hero() {
  const originalWords = ["Crypto", "Forex", "Stocks", "Indices", "Commodities", "Everything"];
  const words = Array(100).fill(originalWords).flat();

  const [index, setIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#375BD2] font-['Space_Grotesk'] text-white overflow-hidden flex flex-col">
      
      {/* --- GRILLAGE --- */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/10 z-0" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-white/10 z-0" />

      {/* --- NAVBAR --- */}
      <nav className="relative z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-[#375BD2] border-b border-white/20">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-0.5 overflow-hidden">
              <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight">Brokex</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-blue-100/90">
            <a href="https://app.brokex.trade" className="hover:text-white transition-colors">CFD</a>
            <a href="https://app.brokex.trade" className="hover:text-white transition-colors">LP</a>
            <a href="https://app.brokex.trade" className="hover:text-white transition-colors">Faucet</a>
            <a href="https://brokex.trade/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Whitepaper</a>
            <a href="https://docs.brokex.trade" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Docs</a>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="https://app.brokex.trade" className="bg-white text-[#375BD2] px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg">
            Launch App
          </a>
        </div>
        <button className="md:hidden p-2 z-[60]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* --- CONTENU CENTRAL --- */}
      <div className="flex-1 flex items-center px-6 md:px-12 md:pl-24 max-w-[1800px] mx-auto w-full relative z-10">
        <div className="flex flex-row items-center font-bold tracking-tighter select-none w-full text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] leading-none">
          <span className="text-white mr-4 md:mr-8 whitespace-nowrap z-20 h-[1em] flex items-center">
            Trade
          </span>
          <div 
            className="relative h-[3em] flex-1 min-w-0 overflow-hidden flex items-center"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
            }}
          >
            <motion.div
              animate={{ y: `calc(1em - ${index}em)` }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute top-0 left-0 w-full"
            >
              {words.map((word, i) => {
                const isActive = i === index;
                return (
                  <div 
                    key={i} 
                    className={`
                      h-[1em] flex items-center whitespace-nowrap transition-all duration-700
                      ${isActive ? "text-[#FFD700] opacity-100 blur-0 scale-100" : "text-white opacity-20 blur-[2px] scale-95"}
                    `}
                  >
                    {word}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- BAS DE PAGE --- */}
      <div className="relative md:absolute bottom-0 right-0 p-6 md:p-12 z-20 flex flex-col items-start md:items-end w-full md:max-w-2xl bg-gradient-to-t from-[#375BD2] via-[#375BD2] md:bg-none">
        <div className="mb-6 md:mb-8 border-l-2 md:border-l-0 md:border-r-2 border-[#FFD700] pl-5 md:pl-0 md:pr-6 md:text-right">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2 leading-tight">
            The industry-standard <br className="hidden md:block" /> decentralized exchange.
          </h3>
          <p className="text-blue-100/80 text-sm md:text-base max-w-sm md:max-w-none">
            Deep liquidity, low fees, and up to 100x leverage on all your favorite assets.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto md:pr-6">
          <a href="#market-dashboard" className="h-12 md:h-14 px-6 bg-white/10 text-white rounded-lg font-bold text-sm border border-white/20 hover:bg-white/20 flex items-center justify-center gap-2 transition-all">
            View Markets <BarChart2 size={18} />
          </a>
          <a href="https://app.brokex.trade" className="h-12 md:h-14 px-8 bg-[#0c162c] text-white rounded-lg font-bold text-sm md:text-base shadow-xl hover:bg-[#152342] flex items-center justify-center gap-2 group transition-all">
            Start Trading Now <ArrowRight size={20} className="text-[#FFD700] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

       {/* --- MENU MOBILE --- */}
       {isMenuOpen && (
        <div className="fixed inset-0 bg-[#375BD2] z-[60] flex flex-col p-6 md:hidden">
          <div className="flex justify-end mb-12">
            <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8 text-2xl font-bold">
            <a href="https://app.brokex.trade" onClick={() => setIsMenuOpen(false)}>CFD</a>
            <a href="https://app.brokex.trade" onClick={() => setIsMenuOpen(false)}>LP</a>
            <a href="https://app.brokex.trade" onClick={() => setIsMenuOpen(false)}>Faucet</a>
            <a href="https://brokex.trade/whitepaper.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Whitepaper</a>
            <a href="https://docs.brokex.trade" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Docs</a>
          </div>
          <a href="https://app.brokex.trade" className="mt-auto bg-white text-[#375BD2] w-full py-4 rounded-xl font-bold text-lg text-center">
            Launch App
          </a>
        </div>
      )}
    </div>
  );
}