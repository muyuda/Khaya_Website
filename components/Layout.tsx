import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Menu, X, ChevronDown, MessageCircle, Calendar, User, Globe } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700 bg-slate-50 selection:bg-brand-pink selection:text-white">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

const LOGO_URL = "https://lh3.googleusercontent.com/d/1ZsoIf9J1TUfhvrSXI5ikOT-EPIeeB9fH";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'EN' | 'ID'>('EN');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path ? "text-brand-pink font-bold bg-brand-pink/10 rounded-full px-4 py-1" : "text-slate-600 hover:text-brand-pink hover:bg-brand-pink/5 rounded-full px-4 py-1 transition-all";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-md py-2' : 'bg-white/80 py-4'} backdrop-blur-md border-b border-white/20`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
             <Link to="/">
               <img src={LOGO_URL} alt="Khaya Landmark" className="h-10 md:h-12 w-auto object-contain" />
             </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2 items-center">
            <Link to="/" className={isActive('/')}>Home</Link>
            
            <div className="relative group">
              <button 
                className={`flex items-center gap-1 ${isActive('/projects')}`}
                onMouseEnter={() => setProjectOpen(true)}
              >
                Projects <ChevronDown size={14} />
              </button>
              {projectOpen && (
                <div 
                  className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in z-50"
                  onMouseLeave={() => setProjectOpen(false)}
                >
                  <Link to="/projects?cat=Primary" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-brand-pink text-sm transition-colors">Primary Projects</Link>
                  <Link to="/projects?cat=Secondary" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-brand-pink text-sm transition-colors">Secondary Projects</Link>
                </div>
              )}
            </div>

            <Link to="/kpr" className={isActive('/kpr')}>KPR</Link>
            <Link to="/about" className={isActive('/about')}>About Us</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact Us</Link>

            {/* Language Switcher Desktop (Dropdown) */}
            <div className="relative ml-2">
                <button 
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                >
                    <Globe size={14} className="text-slate-400 group-hover:text-brand-pink" />
                    {lang}
                    <ChevronDown size={12} className={`transition-transform duration-300 text-slate-400 ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                {langOpen && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in z-50 flex flex-col">
                        <button 
                            onClick={() => { setLang('ID'); setLangOpen(false); }}
                            className={`px-4 py-2 text-left text-xs font-bold hover:bg-slate-50 transition-colors ${lang === 'ID' ? 'text-brand-pink bg-brand-pink/5' : 'text-slate-600'}`}
                        >
                            Bahasa (ID)
                        </button>
                        <button 
                            onClick={() => { setLang('EN'); setLangOpen(false); }}
                            className={`px-4 py-2 text-left text-xs font-bold hover:bg-slate-50 transition-colors ${lang === 'EN' ? 'text-brand-pink bg-brand-pink/5' : 'text-slate-600'}`}
                        >
                            English (EN)
                        </button>
                    </div>
                )}
            </div>
            
            <Link to="/projects" className="ml-2 p-2.5 rounded-full bg-brand-cyan/10 text-brand-cyan hover:bg-brand-pink hover:text-white transition-all shadow-sm border border-transparent">
              <Search size={18} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 hover:text-brand-pink p-2 transition-colors">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-2xl animate-fade-in-up h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 pt-4 pb-20 space-y-2">
            <Link to="/" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-pink font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            
            <div className="px-4 py-2 text-slate-400 font-bold text-xs uppercase tracking-wider">Projects</div>
            <div className="pl-4 space-y-1 mb-2 border-l-2 border-slate-100 ml-4">
                <Link to="/projects?cat=Primary" className="block px-4 py-2 text-slate-600 hover:text-brand-pink text-sm" onClick={() => setIsOpen(false)}>Primary</Link>
                <Link to="/projects?cat=Secondary" className="block px-4 py-2 text-slate-600 hover:text-brand-pink text-sm" onClick={() => setIsOpen(false)}>Secondary</Link>
            </div>

            <Link to="/kpr" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-pink font-medium" onClick={() => setIsOpen(false)}>KPR Calculator</Link>
            <Link to="/about" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-pink font-medium" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-pink font-medium" onClick={() => setIsOpen(false)}>Contact Us</Link>

            {/* Language Switcher Mobile (Dropdown Style) */}
            <div className="px-4 py-4 mt-2 border-t border-slate-100">
                <button 
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center justify-between w-full text-slate-500 font-medium text-sm mb-2"
                >
                    <span className="flex items-center gap-2"><Globe size={16} /> Language</span>
                    <div className="flex items-center gap-1 text-slate-800 font-bold">
                        {lang === 'ID' ? 'ID' : 'EN'}
                        <ChevronDown size={16} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
                    </div>
                </button>
                
                {langOpen && (
                    <div className="bg-slate-50 rounded-xl p-2 space-y-1 animate-fade-in">
                         <button 
                            onClick={() => { setLang('ID'); setLangOpen(false); }}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex justify-between items-center ${lang === 'ID' ? 'bg-white text-brand-pink shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
                        >
                            Bahasa Indonesia (ID)
                            {lang === 'ID' && <div className="w-2 h-2 rounded-full bg-brand-pink"></div>}
                        </button>
                        <button 
                            onClick={() => { setLang('EN'); setLangOpen(false); }}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex justify-between items-center ${lang === 'EN' ? 'bg-white text-brand-pink shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
                        >
                            English (EN)
                            {lang === 'EN' && <div className="w-2 h-2 rounded-full bg-brand-pink"></div>}
                        </button>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 text-slate-500">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-6">
                <img src={LOGO_URL} alt="Khaya Landmark" className="h-14 w-auto object-contain" />
             </div>
             <p className="text-sm text-slate-500 leading-relaxed">
               Redefining modern living for the next generation. <br/>
               Est. 2024.
             </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="hover:text-brand-pink transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-pink transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="hover:text-brand-pink transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-brand-cyan" /> Jakarta Selatan, ID</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-brand-cyan" /> +62 21 555 0000</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-brand-cyan" /> hello@khayalandmark.id</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Social</h4>
            <div className="flex space-x-4">
              <Instagram className="hover:text-brand-pink cursor-pointer transition-colors" size={24} />
              <Facebook className="hover:text-brand-cyan cursor-pointer transition-colors" size={24} />
              <Twitter className="hover:text-brand-cyan cursor-pointer transition-colors" size={24} />
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
          &copy; 2024 Khaya Landmark. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'visit' | 'ask' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleOpenModal = (type: 'visit' | 'ask') => {
      setModalType(type);
      setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3" ref={containerRef}>
        {isOpen && (
          <div className="flex flex-col space-y-3 animate-fade-in-up">
            <button 
              onClick={() => handleOpenModal('visit')}
              className="bg-white text-slate-700 shadow-xl px-5 py-3 rounded-full flex items-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <Calendar size={18} className="text-brand-pink" />
              <span className="text-sm font-bold">Schedule Visit</span>
            </button>
            <button 
               onClick={() => handleOpenModal('ask')}
               className="bg-white text-slate-700 shadow-xl px-5 py-3 rounded-full flex items-center gap-2 hover:bg-brand-cyan/5 transition-colors"
            >
              <User size={18} className="text-brand-cyan" />
              <span className="text-sm font-bold">Ask Agent</span>
            </button>
          </div>
        )}
        <button 
          onClick={toggleOpen}
          className={`p-4 rounded-full shadow-2xl shadow-brand-pink/40 text-white transition-all duration-300 transform hover:scale-110 ${isOpen ? 'bg-slate-800 rotate-45' : 'bg-gradient-to-tr from-brand-pink to-brand-cyan'}`}
        >
          {isOpen ? <X size={28} /> : <Phone size={28} />}
        </button>
      </div>

      {modalType && (
        <ContactModal type={modalType} onClose={() => setModalType(null)} />
      )}
    </>
  );
};

interface ContactModalProps {
  type: 'visit' | 'ask';
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ type, onClose }) => {
  const isVisit = type === 'visit';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-300 hover:text-slate-600 transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-cyan">
          {isVisit ? 'Schedule a Visit' : 'Ask an Agent'}
        </h3>
        <p className="text-slate-500 mb-8 text-sm">Fill in the details and we'll get back to you ASAP.</p>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Request Sent!"); onClose(); }}>
          <input type="text" placeholder="Your Name" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-all" required />
          <input type="tel" placeholder="Phone Number" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-all" required />
          <input type="email" placeholder="Email Address" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-all" required />
          
          {isVisit && (
             <div className="flex gap-3">
                <input type="date" className="w-1/2 px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-all" required />
                <input type="time" className="w-1/2 px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-all" required />
             </div>
          )}

          <textarea placeholder="Any specific notes?" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 h-28 resize-none transition-all"></textarea>
          
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-pink to-brand-cyan text-white font-bold hover:shadow-lg hover:shadow-brand-pink/30 hover:opacity-90 transition-all transform hover:-translate-y-1">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};