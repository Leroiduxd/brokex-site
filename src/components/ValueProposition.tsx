export default function ValueProposition() {
  const points = [
    {
      title: "Solving the core challenges of onchain finance",
      description: "Brokex delivers critical infrastructure for data, execution, and settlement, enabling institutions and DeFi protocols to build and scale a wide range of RWA financial products."
    },
    {
      title: "Trusted by leading liquidity providers",
      description: "Working alongside global market makers and top-tier DeFi protocols, Brokex provides the infrastructure to enable secure, scalable, and interoperable decentralized applications."
    },
    {
      title: "Built for security, reliability, and scale",
      description: "Our architecture is backed by a proven track record of low-latency settlement and transparency, ensuring resilience across leading blockchain networks."
    }
  ];

  return (
    <section className="w-full bg-white font-['Space_Grotesk'] flex flex-col items-center relative">
      
      {/* --- GRILLE : TRAITS VERTICAUX --- */}
      <div className="absolute top-0 left-6 md:left-12 w-[1px] h-full bg-slate-200 z-0" />
      <div className="absolute top-0 right-6 md:right-12 w-[1px] h-full bg-slate-200 z-0" />

      {/* CONTENEUR AVEC GRILLE HORIZONTALE */}
      <div className="relative z-10 w-full max-w-[1800px] border-t border-b border-slate-200">
        
        {/* AJUSTEMENT PADDING : 
            - 'px-10' sur mobile pour décoller le texte des lignes (qui sont à 'left-6').
            - 'md:px-24' sur PC pour une structure plus aérée.
        */}
        <div className="px-10 md:px-24 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            
            {/* GAUCHE : TITRE */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0c162c] leading-[1.1]">
                Why Brokex is <br className="hidden md:block" />
                the global standard
              </h2>
            </div>

            {/* DROITE : POINTS */}
            <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
              {points.map((point, index) => (
                <div 
                  key={index} 
                  className="flex flex-col gap-3 border-t border-slate-200 pt-6 first:border-t-0 first:pt-0"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-[#0c162c] leading-tight">
                    {point.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed max-w-2xl text-sm md:text-base">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      
    </section>
  );
}