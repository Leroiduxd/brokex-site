import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero";
import MarketDashboard from "./components/MarketDashboard";
import ValueProposition from "./components/ValueProposition";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Explorer from "./components/Explorer";
import Vault from "./components/Vault"; // Import de ta nouvelle page Vault

// On regroupe ton accueil actuel dans un composant
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
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Explorer Page */}
        <Route path="/explorer" element={<Explorer />} />

        {/* Vault Page accessible via brokex.trade/vault */}
        <Route path="/vault" element={<Vault />} />
      </Routes>
    </Router>
  );
}

export default App;