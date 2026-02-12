export default function Footer() {
  return (
    <footer className="w-full bg-[#0f1115] font-['Space_Grotesk'] flex flex-col items-center relative overflow-hidden">
      
      {/* --- LES TRAITS DU GRILLAGE --- */}
      <div className="absolute left-6 md:left-12 top-0 w-px h-full bg-white/10 z-0" />
      <div className="absolute right-6 md:right-12 top-0 w-px h-full bg-white/10 z-0" />
      <div className="absolute bottom-12 left-0 w-full h-px bg-white/10 z-0" />

      <div className="w-full max-w-[1800px] px-6 md:px-12 relative z-10">
        
        <div className="w-full border-x border-b border-white/10 flex flex-col lg:flex-row">

          {/* --- PARTIE GAUCHE : NEWSLETTER --- */}
          <div className="w-full lg:w-5/12 bg-[#16191f] p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                {/* Carré blanc avec le logo.svg à l'intérieur */}
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <img src="/logo.svg" alt="Brokex Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">Brokex</span>
              </div>

              <div className="max-w-sm">
                <p className="text-xl font-medium mb-6 leading-snug text-white">
                  Get the latest Brokex content straight to your inbox.
                </p>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Email address" 
                      className="flex-1 bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:outline-none focus:border-[#375BD2] text-sm text-white placeholder:text-white/30"
                    />
                    <button className="bg-[#375BD2] hover:bg-blue-600 px-6 py-3 rounded-sm text-sm font-bold text-white transition-all">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* --- PARTIE DROITE : NAVIGATION --- */}
          <div className="w-full lg:w-7/12 bg-[#0f1115] p-8 md:p-16 flex flex-col justify-between">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
              
              <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Platform</h4>
                <nav className="flex flex-col gap-4 text-sm font-medium text-white/60">
                  <a href="https://app.brokex.trade" className="hover:text-[#375BD2] transition-colors">Trading App</a>
                  <a href="https://app.brokex.trade" className="hover:text-[#375BD2] transition-colors">Vault</a>
                  <a href="https://app.brokex.trade" className="hover:text-[#375BD2] transition-colors">Faucet</a>
                  <a href="#" className="hover:text-[#375BD2] transition-colors">TradingView</a>
                </nav>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Protocol</h4>
                <nav className="flex flex-col gap-4 text-sm font-medium text-white/60">
                  <a href="https://docs.brokex.trade" target="_blank" className="hover:text-[#375BD2] transition-colors">Documentation</a>
                  <a href="https://brokex.trade/whitepaper.pdf" target="_blank" className="hover:text-[#375BD2] transition-colors">Whitepaper</a>
                  <a href="https://github.com/brokexfi" target="_blank" className="hover:text-[#375BD2] transition-colors">Smart Contracts</a>
                  <a href="#" className="hover:text-[#375BD2] transition-colors">Security Audit</a>
                </nav>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">ecosystem</h4>
                <nav className="flex flex-col gap-4 text-sm font-medium text-white/60">
                  <a href="https://x.com/brokexfi" target="_blank" className="hover:text-[#375BD2] transition-colors">Twitter (X)</a>
                  <a href="https://t.me/brokexfi" target="_blank" className="hover:text-[#375BD2] transition-colors">Telegram</a>
                  <a href="#" className="hover:text-[#375BD2] transition-colors">Media Kit</a>
                </nav>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-[10px] font-medium text-white/20 uppercase tracking-[0.15em]">
                Brokex © 2026 Protocol
              </div>
              <div className="flex gap-6 text-[10px] font-medium text-white/20 uppercase tracking-[0.15em] ml-auto">
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-12" />
      </div>
    </footer>
  );
}