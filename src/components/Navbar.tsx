import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { Menu, Search, Globe, ChevronDown, X, Home as HomeIcon, Building, Calculator, User, Mail, FileText } from 'lucide-react';

const LOGO_URL = "https://lh3.googleusercontent.com/d/1ZsoIf9J1TUfhvrSXI5ikOT-EPIeeB9fH";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation(); // Get translation function and i18n instance
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const navLinkClasses = (path: string) => 
    `block md:inline-block px-4 py-3 rounded-lg text-base md:text-sm font-medium transition-colors ${
      location.pathname === path 
      ? 'text-brand-pink bg-brand-pink/10' 
      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-pink'
    }`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-md py-3' : 'bg-transparent py-4'} backdrop-blur-md`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex-shrink-0">
            <img src={LOGO_URL} alt="Khaya Landmark" className="h-12 w-auto" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-2 bg-white/50 border border-slate-100/80 rounded-full shadow-sm p-2">
            <Link to="/" className={navLinkClasses('/')}>{t('navbar.home')}</Link>
            <Link to="/projects" className={navLinkClasses('/projects')}>{t('navbar.projects')}</Link>
            <Link to="/kpr" className={navLinkClasses('/kpr')}>{t('navbar.kpr')}</Link>
            <Link to="/about" className={navLinkClasses('/about')}>{t('navbar.about')}</Link>
            <Link to="/contact" className={navLinkClasses('/contact')}>{t('navbar.contact')}</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
                <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                    <Globe size={14} className="text-slate-400 group-hover:text-brand-pink" />
                    {i18n.language.toUpperCase()}
                    <ChevronDown size={12} className="text-slate-400" />
                </button>
                {langOpen && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in z-50">
                        <button onClick={() => changeLanguage('id')} className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 transition-colors ${i18n.language === 'id' ? 'text-brand-pink' : 'text-slate-600'}`}>Bahasa (ID)</button>
                        <button onClick={() => changeLanguage('en')} className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 transition-colors ${i18n.language === 'en' ? 'text-brand-pink' : 'text-slate-600'}`}>English (EN)</button>
                    </div>
                )}
            </div>
            <Link to="/contact" className="px-6 py-3 rounded-full bg-brand-cyan text-white font-bold shadow-lg shadow-brand-cyan/20 hover:bg-brand-cyan-dark transition-all transform hover:-translate-y-0.5">
              {t('navbar.contact_button')}
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-700 rounded-md hover:bg-slate-100">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in-down">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className={navLinkClasses('/')}><HomeIcon size={18} className="inline mr-2"/>{t('navbar.home')}</Link>
            <Link to="/projects" className={navLinkClasses('/projects')}><Building size={18} className="inline mr-2"/>{t('navbar.projects')}</Link>
            <Link to="/kpr" className={navLinkClasses('/kpr')}><Calculator size={18} className="inline mr-2"/>{t('navbar.kpr')}</Link>
            <Link to="/about" className={navLinkClasses('/about')}><User size={18} className="inline mr-2"/>{t('navbar.about')}</Link>
            <Link to="/contact" className={navLinkClasses('/contact')}><Mail size={18} className="inline mr-2"/>{t('navbar.contact')}</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
