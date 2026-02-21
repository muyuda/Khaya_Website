import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import SmartAssistant from './components/SmartAssistant';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';


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
import FAQ from './pages/FAQ'; // Import the FAQ component

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
          <Route path="/faq" element={<FAQ />} /> {/* Add the FAQ route here */}
        </Routes>
      </main>

      <Footer />
      
      <SmartAssistant />
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
