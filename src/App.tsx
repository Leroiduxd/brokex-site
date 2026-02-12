import Hero from "./components/hero";
import MarketDashboard from "./components/MarketDashboard";
import ValueProposition from "./components/ValueProposition"; // Nouvel import
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="bg-white min-h-screen w-full">
      <Hero />
      
      <MarketDashboard />
      <ValueProposition />
       {/* Placé ici pour expliquer le "Pourquoi" avant le "Comment" */}
      <Features />
      <Footer />
    </main>
  );
}

export default App;