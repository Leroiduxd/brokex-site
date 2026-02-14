import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero";
import MarketDashboard from "./components/MarketDashboard";
import ValueProposition from "./components/ValueProposition";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Explorer from "./components/Explorer"; // On importe la nouvelle page

// On regroupe ton accueil actuel dans un composant pour ne rien changer à l'ordre
const HomePage = () => (
  <main className="bg-white min-h-screen w-full">
    <Hero />
    <MarketDashboard />
    <ValueProposition />
    <Features />
    <Footer />
  </main>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil actuelle (inchangée) */}
        <Route path="/" element={<HomePage />} />

        {/* Nouvelle page accessible sur brokex.trade/explorer */}
        <Route path="/explorer" element={<Explorer />} />
      </Routes>
    </Router>
  );
}

export default App;