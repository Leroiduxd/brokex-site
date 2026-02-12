import Hero from "./components/Hero";
import Features from "./components/Features";

import MarketDashboard from "./components/MarketDashboard"; // L'import propre

function App() {
  return (
    <main className="bg-[#060010] min-h-screen w-full">
      <Hero />
      <MarketDashboard />
      <Features />
      
      {/* Ton nouveau dashboard autonome */}
      
      

      
      <div className="h-[20vh]" />
    </main>
  );
}

export default App;