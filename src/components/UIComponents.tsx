import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Car, Search, ArrowRight, Sparkles, User, Bot, Send } from 'lucide-react';
import { Project, Unit } from '../types';
import { generateResponse } from '../services/geminiService';

// --- Hero Component ---
interface HeroProps {
  title: string;
  subtitle: string;
  placeholder: string;
  bgImage?: string;
  onSearch?: (term: string) => void;
  enableAiToggle?: boolean;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  placeholder, 
  bgImage, 
  onSearch, 
  enableAiToggle = false,
  primaryBtnText, 
  secondaryBtnText,
  onPrimaryClick,
  onSecondaryClick 
}) => {
  const [mode, setMode] = useState<'search' | 'ai'>('search');
  const [inputValue, setInputValue] = useState('');
  
  // AI Chat State
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hi! I'm Aura ✨. How can I help you today?" }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, mode]);

  const handleSearchSubmit = () => {
    if (onSearch) onSearch(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSearchSubmit();
    }
  };

  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform scale-105 duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${bgImage || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1920&q=80'})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

      <div className="relative z-20 text-center px-4 w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">{title}</h1>
        <p className="text-xl text-brand-pink mb-10 font-medium">{subtitle}</p>
        
        <div className="w-full max-w-2xl mx-auto p-2 bg-white/20 backdrop-blur-md rounded-full shadow-2xl">
            <div className="relative flex items-center">
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-6 pr-32 py-4 rounded-full bg-white/90 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-brand-cyan/50 transition-all"
                />
                <button 
                    onClick={handleSearchSubmit}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-brand-cyan rounded-full text-white font-bold hover:bg-brand-cyan-dark transition-all transform hover:scale-105 shadow-lg"
                >
                    Search
                </button>
            </div>
        </div>

        {(primaryBtnText || secondaryBtnText) && (
          <div className="flex gap-4 justify-center mt-8 animate-fade-in">
            {primaryBtnText && (
              <button 
                onClick={onPrimaryClick}
                className="px-8 py-3 rounded-full bg-brand-cyan text-white font-bold shadow-lg hover:bg-brand-cyan-dark transition-all transform hover:-translate-y-1"
              >
                {primaryBtnText}
              </button>
            )}
            {secondaryBtnText && (
               <button 
                onClick={onSecondaryClick}
                className="px-8 py-3 rounded-full bg-transparent border-2 border-white text-white font-bold shadow-lg hover:bg-white hover:text-brand-cyan transition-all transform hover:-translate-y-1"
              >
                {secondaryBtnText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Project Card Component ---
export const ProjectCard: React.FC<{ project: Project; unitCount?: number }> = ({ project, unitCount }) => {
  return (
    <Link to={`/project/${project.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-brand-pink/20 transition-all duration-300 border border-slate-100 h-full flex flex-col transform hover:-translate-y-1">
      <div className="relative h-56 flex-shrink-0 overflow-hidden">
        <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
        <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${project.category === 'Primary' ? 'bg-brand-cyan' : 'bg-brand-pink'}`}>
              {project.category}
            </span>
            {project.isNew && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white shadow-lg">New</span>}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold text-lg drop-shadow-md">{project.name}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
            <p className="text-brand-cyan font-bold text-lg mb-2">{project.priceRange}</p>
            <div className="flex items-center text-slate-500 text-sm mb-4">
              <MapPin size={16} className="mr-2 text-brand-pink" />
              <span className="truncate">{project.location}</span>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
        </div>
        
        {unitCount !== undefined && (
             <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    {unitCount} Tipe Unit
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-cyan group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                </div>
            </div>
        )}
      </div>
    </Link>
  );
};

// --- Unit Card Component ---
export const UnitCard: React.FC<{ unit: Unit }> = ({ unit }) => {
  return (
    <Link to={`/unit/${unit.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full">
      <div className="relative h-48 overflow-hidden">
        <img src={unit.imageUrl} alt={unit.type} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 truncate">{unit.type}</h3>
        <p className="text-sm text-gray-500 mb-3">{unit.projectName}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center"><Bed size={16} className="mr-1.5 text-pink-500"/> {unit.bedrooms}</span>
            <span className="flex items-center"><Bath size={16} className="mr-1.5 text-pink-500"/> {unit.bathrooms}</span>
        </div>
        <p className="text-xl font-bold text-brand-cyan">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(unit.price)}
        </p>
      </div>
    </Link>
  );
};

interface SliderProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange }) => {
    return (
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-brand-pink"
      />
    );
  };