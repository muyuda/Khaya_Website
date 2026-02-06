import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuraAssistant from './components/AuraAssistant';

// Pages
import Home from './pages/Home';
import ProjectDetailPage from './pages/ProjectDetailPage';
import UnitDetailPage from './pages/UnitDetailPage';
import About from './pages/About';
import Contact from './pages/Contact';
import KPR from './pages/KPR';
import ProjectsPage from './pages/ProjectsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// This component uses hooks that require Router context
const AppContent: React.FC = () => {
  const location = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const noPaddingTop = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700 bg-slate-50 selection:bg-pink-500 selection:text-white">
      <Navbar />
      
      <main className={`flex-grow ${noPaddingTop ? '' : 'pt-24'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/unit/:id" element={<UnitDetailPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/kpr" element={<KPR />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </main>

      <Footer />
      
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        <AuraAssistant />
        <button className="p-4 rounded-full shadow-2xl shadow-pink-500/40 text-white transition-all duration-300 transform hover:scale-110 bg-gradient-to-tr from-pink-500 to-cyan-400">
           <Phone size={28} />
        </button>
      </div>
    </div>
  );
};

// This component provides the Router context
const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
