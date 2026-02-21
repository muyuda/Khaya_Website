import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const currentLang = i18n.language.split('-')[0].toUpperCase();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const isActive = (path: string) => 
    location.pathname === path 
      ? "text-pink-500 font-bold bg-pink-50 rounded-full px-4 py-1" 
      : "text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-full px-4 py-1 transition-all";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md py-2' : 'bg-white/80 py-4'} backdrop-blur-md border-b border-white/20`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">K</div>
            <span className="font-bold text-xl text-slate-800">KHAYA</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-1 items-center">
            <Link to="/" className={isActive('/')}>{t('navbar.home')}</Link>
            
            <div className="relative group" onMouseEnter={() => setProjectOpen(true)} onMouseLeave={() => setProjectOpen(false)}>
              <button className={`flex items-center gap-1 ${isActive('/projects')}`}>
                {t('navbar.projects')} <ChevronDown size={14} />
              </button>
              {projectOpen && (
                <div className="absolute left-0 mt-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in zoom-in duration-200">
                  <Link to="/projects?cat=Primary" className="block px-4 py-2 text-slate-600 hover:bg-pink-50 hover:text-pink-500 text-sm">Primary Projects</Link>
                  <Link to="/projects?cat=Secondary" className="block px-4 py-2 text-slate-600 hover:bg-pink-50 hover:text-pink-500 text-sm">Secondary Projects</Link>
                </div>
              )}
            </div>

            <Link to="/kpr" className={isActive('/kpr')}>{t('navbar.kpr')}</Link>
            <Link to="/about" className={isActive('/about')}>{t('navbar.about')}</Link>
            <Link to="/contact" className={isActive('/contact')}>{t('navbar.contact')}</Link>

            {/* Language Switcher */}
            <div className="relative ml-2">
                <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100">
                    <Globe size={14} className="text-slate-400" /> {currentLang} <ChevronDown size={12} />
                </button>
                {langOpen && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-2 flex flex-col">
                        <button onClick={() => toggleLanguage('id')} className="px-4 py-2 text-left text-xs font-bold hover:bg-pink-50 text-slate-600">Bahasa (ID)</button>
                        <button onClick={() => toggleLanguage('en')} className="px-4 py-2 text-left text-xs font-bold hover:bg-pink-50 text-slate-600">English (EN)</button>
                    </div>
                )}
            </div>

            <Link to="/projects" className="ml-2 p-2.5 rounded-full bg-cyan-50 text-cyan-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
              <Search size={18} />
            </Link>
          </div>

          {/* MOBILE MENU BTN */}
          <div className="md:hidden">
             <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 hover:text-pink-500 p-2">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-2xl h-screen overflow-y-auto pb-20">
          <div className="px-4 pt-4 space-y-2">
            <Link to="/" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-pink-50 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/projects" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-pink-50 font-medium" onClick={() => setIsOpen(false)}>Projects</Link>
            <Link to="/kpr" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-pink-50 font-medium" onClick={() => setIsOpen(false)}>KPR Calculator</Link>
            <Link to="/about" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-pink-50 font-medium" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-pink-50 font-medium" onClick={() => setIsOpen(false)}>Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;