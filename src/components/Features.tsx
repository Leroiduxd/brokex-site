import { useState, useEffect } from 'react';
import { Zap, Globe, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Gasless Trading Engine",
    description: "Trade on-chain without ever paying for gas. Our protocol uses meta-transactions to ensure a seamless, high-frequency trading experience on any asset.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Decentralized RWA CFDs",
    description: "Access a global market of Real World Assets. Trade gold, oil, stocks, and indices via decentralized CFDs with deep liquidity and 100% transparency.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Oracle-Based Settlement",
    description: "Every trade is settled via low-latency oracles. This architecture guarantees payout security and execution at the real-time benchmark price.",
  },
];

const faqData = [
  {
    id: "01",
    question: "How is the liquidity managed?",
    answer: "Our deep liquidity is sourced from a decentralized network of professional market makers and institutional-grade liquidity pools, ensuring minimal slippage even for large RWA orders."
  },
  {
    id: "02",
    question: "Is it really gasless for users?",
    answer: "Yes. By utilizing EIP-712 typed signatures and meta-transactions, Brokex covers the execution costs on the blockchain, allowing you to focus entirely on your trading strategy."
  },
  {
    id: "03",
    question: "What assets are available?",
    answer: "Brokex provides access to a wide range of Real World Assets, including major global indices, commodities like Gold and Oil, and top-tier US and European stocks."
  }
];

const AUTOPLAY_DURATION = 6000; // 6 secondes par question

export default function Features() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [progress, setProgress] = useState(0);

  // Gestion du défilement automatique
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setActiveFaq((prev) => (prev + 1) % faqData.length);
    }, AUTOPLAY_DURATION);

    // Animation de la barre de progression (interne à l'intervalle pour la fluidité)
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (AUTOPLAY_DURATION / 100)), 100));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [activeFaq]);

  return (
    <section className="w-full bg-white font-['Space_Grotesk'] flex flex-col items-center">
      
      <div className="relative w-full px-6 md:px-12 max-w-[1800px]">
        
        {/* --- LIGNES DE GRILLE VERTICALES --- */}
        <div className="absolute top-0 left-6 md:left-12 w-px h-full bg-slate-200 z-0" />
        <div className="absolute top-0 right-6 md:right-12 w-px h-full bg-slate-200 z-0" />
        <div className="absolute top-10 left-0 w-full h-px bg-slate-200 z-0" />

        {/* --- CONTENEUR UNIFIÉ --- */}
        <div className="relative z-10 my-10 border-x border-slate-200">
          
          {/* BLOC 1 : FEATURES */}
          <div className="w-full bg-[#101935] text-white">
            <div className="py-16 md:py-20 px-8 md:px-12 lg:px-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 max-w-2xl leading-[1.1]">
                The industry-standard for <br />
                <span className="text-[#375BD2]">decentralized RWA trading</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-start gap-5">
                    <div className="text-[#375BD2]">{feature.icon}</div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-blue-100/60 leading-relaxed text-sm md:text-base">{feature.description}</p>
                    <div className="mt-2 flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-[#375BD2] opacity-100" />
                      <div className="w-1.5 h-1.5 bg-[#375BD2] opacity-40" />
                      <div className="w-1.5 h-1.5 bg-[#375BD2] opacity-10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BLOC 2 : FAQ DYNAMIQUE */}
          <div className="w-full bg-[#375BD2] text-white border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">
              
              {/* GAUCHE : QUESTIONS AVEC PROGRESS BAR */}
              <div className="lg:col-span-5 border-r border-white/10 p-12 md:p-16 flex flex-col gap-12">
                {faqData.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveFaq(idx)}
                    className={`text-left transition-all duration-300 flex flex-col gap-3 group ${
                      activeFaq === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono">{item.id}</span>
                      <span className={`text-lg tracking-tight ${activeFaq === idx ? 'font-bold' : 'font-normal'}`}>
                        {item.question}
                      </span>
                    </div>

                    {/* BARRE DE PROGRESSION */}
                    <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
                      {activeFaq === idx && (
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-white"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: "linear", duration: 0.1 }}
                          style={{ height: '2px', top: '-0.5px' }} // Un peu plus épaisse
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* DROITE : RÉPONSE */}
              <div className="lg:col-span-7 p-12 md:p-16 flex flex-col justify-start pt-[5.5rem] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFaq}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-white/40 font-mono text-[9px] mb-4 block tracking-widest uppercase">
                      Protocol Details / {faqData[activeFaq].id}
                    </span>
                    <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-xl">
                      {faqData[activeFaq].answer}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full h-px bg-slate-200 z-0" />

      </div>
    </section>
  );
}