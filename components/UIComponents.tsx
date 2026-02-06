import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Car, Search, ArrowRight, Sparkles, User, Bot, Send } from 'lucide-react';
import { Project, Unit } from '../types';
import { generateResponse } from '../services/geminiService';
import { formatCurrency } from '../utils/formatters'; // Import formatCurrency

interface HeroProps {
  title: string;
  subtitle: string;
  placeholder: string;
  bgImage?: string;
  onSearch?: (term: string) => void;
  enableAiToggle?: boolean;
  // Buttons are optional
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
  // Use max-w-screen-2xl and mx-auto to align with the rest of the wider desktop layout
  const containerClasses = "relative h-[600px] flex items-center justify-center overflow-hidden rounded-3xl mx-4 lg:mx-auto lg:max-w-screen-2xl lg:w-[calc(100%-2rem)] mt-6 shadow-2xl shadow-brand-cyan/20 border border-slate-200 transition-all duration-500";

  const [mode, setMode] = useState<'search' | 'ai'>('search');
  const [inputValue, setInputValue] = useState('');
  
  // AI Chat State
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hi! I'm Aura ✨. I noticed you might have a question. How can I help you today?" }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, mode]);

  const detectIntentAndSubmit = () => {
      if (!inputValue.trim()) return;

      if (!enableAiToggle) {
          // Fallback if AI disabled
          if (onSearch) onSearch(inputValue);
          return;
      }

      const text = inputValue.trim();
      const lowerText = text.toLowerCase();
      const wordCount = text.split(/\s+/).length;
      
      // Heuristics for AI Intent
      // 1. Question words
      const questionWords = ['what', 'how', 'can', 'where', 'why', 'who', 'apa', 'bagaimana', 'dimana', 'kenapa', 'bisa', 'boleh', 'explain', 'jelaskan', 'help', 'cariin', 'rekomendasi', 'recommend'];
      const startsWithQuestion = questionWords.some(w => lowerText.startsWith(w));
      const containsQuestionMark = text.includes('?');
      
      // 2. Length threshold (sentences vs keywords)
      const isLongSentence = wordCount > 4; // e.g., "Rumah di BSD murah" is 4 words -> Search. "I want a house in BSD" -> 6 words -> AI.

      // Decision
      const isAiIntent = startsWithQuestion || containsQuestionMark || isLongSentence;

      if (isAiIntent) {
          triggerAiChat(text);
      } else {
          if (onSearch) onSearch(text);
      }
  };

  const triggerAiChat = async (userText: string) => {
    setMode('ai');
    setMessages(prev => {
        // Reset to initial if it was empty or just default
        return [{ role: 'ai', text: "Hi! I'm Aura ✨. Let me help you with that." }, { role: 'user', text: userText }];
    });
    setInputValue(''); // Clear main input for the chat box interaction
    setIsAiTyping(true);

    try {
        const response = await generateResponse(userText);
        setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'ai', text: "Oops, my brain glitched! Please try again." }]);
    } finally {
        setIsAiTyping(false);
    }
  };

  const handleChatSubmit = async () => {
      if (!inputValue.trim()) return;
      const text = inputValue;
      setInputValue('');
      setMessages(prev => [...prev, { role: 'user', text }]);
      setIsAiTyping(true);
      try {
          const response = await generateResponse(text);
          setMessages(prev => [...prev, { role: 'ai', text: response }]);
      } catch (error) {
          setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI." }]);
      } finally {
          setIsAiTyping(false);
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        if (mode === 'search') {
            detectIntentAndSubmit();
        } else {
            handleChatSubmit();
        }
    }
  };

  return (
    <div className={containerClasses}>
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform hover:scale-105 duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${bgImage || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1920&q=80'})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10 backdrop-blur-[1px]"></div>

      <div className="relative z-20 text-center px-4 w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md tracking-tight">{title}</h1>
        <p className="text-xl text-brand-pink mb-10 font-medium">{subtitle}</p>
        
        {/* Search / AI Toggle & Container */}
        <div className={`relative w-full max-w-2xl mx-auto transition-all duration-500 ease-in-out ${mode === 'ai' ? 'mb-4' : 'mb-8'}`}>
          
          {mode === 'search' ? (
             /* Search Mode Input */
             <div className="relative group animate-fade-in">
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-6 pr-14 py-4 rounded-full bg-white/95 backdrop-blur-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-cyan/50 shadow-2xl transition-all"
                />
                <button 
                    onClick={detectIntentAndSubmit}
                    className="absolute right-2 top-2 p-2 bg-gradient-to-r from-brand-pink to-brand-cyan rounded-full text-white hover:scale-110 transition-transform shadow-lg"
                >
                    <Search size={20} />
                </button>
            </div>
          ) : (
             /* AI Talk Mode Chat Box */
             <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 h-[320px] flex flex-col animate-scale-in origin-top">
                <div className="bg-gradient-to-r from-brand-pink to-brand-cyan p-3 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2 font-bold text-sm">
                        <Sparkles size={16} /> Aura AI
                    </div>
                    <button onClick={() => setMode('search')} className="text-white/80 hover:text-white text-xs font-bold bg-black/20 px-2 py-1 rounded-lg">Close</button>
                </div>
                
                {/* Chat History */}
                <div className="flex-grow overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-brand-pink/20 scrollbar-track-transparent text-left" ref={scrollRef}>
                    {messages.map((m, idx) => (
                        <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm flex gap-2 items-start ${m.role === 'user' ? 'bg-brand-cyan text-white rounded-br-none' : 'bg-slate-50 text-slate-700 rounded-bl-none border border-slate-100'}`}>
                                {m.role === 'ai' && <Bot size={16} className="mt-1 flex-shrink-0 text-brand-pink" />}
                                <div>{m.text}</div>
                            </div>
                        </div>
                    ))}
                    {isAiTyping && (
                        <div className="flex justify-start animate-fade-in">
                            <div className="bg-slate-50 p-3 rounded-2xl rounded-bl-none border border-slate-100 flex gap-1 items-center">
                                <Bot size={16} className="text-brand-pink mr-1" />
                                <div className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Ask Aura anything..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow bg-white border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink/50 text-slate-700"
                        autoFocus
                    />
                    <button 
                        onClick={handleChatSubmit}
                        disabled={isAiTyping || !inputValue.trim()}
                        className="p-2 bg-gradient-to-r from-brand-pink to-brand-cyan text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:shadow-none transition-all"
                    >
                        <Send size={18} />
                    </button>
                </div>
             </div>
          )}
        </div>

        {/* Action Buttons - Only show in search mode to avoid clutter in AI mode */}
        {mode === 'search' && (primaryBtnText || secondaryBtnText) && (
          <div className="flex gap-4 justify-center animate-fade-in">
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

export const ProjectCard: React.FC<{ project: Project; unitCount?: number }> = ({ project, unitCount }) => {
  return (
    <Link to={`/project/${project.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-pink/20 transition-all duration-300 border border-slate-200 h-full flex flex-col">
      <div className="relative h-48 flex-shrink-0 overflow-hidden border-b border-slate-100">
        <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${project.category === 'Primary' ? 'bg-brand-cyan' : 'bg-brand-pink'}`}>
            {project.category}
            </span>
            {project.isNew && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">New</span>}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
            <h3 className="font-bold text-lg text-slate-800 mb-1 truncate">{project.name}</h3>
            <p className="text-brand-cyan font-bold text-sm mb-2">{project.priceRange}</p>
            <div className="flex items-center text-slate-400 text-xs">
              <MapPin size={14} className="mr-1 text-brand-pink flex-shrink-0" />
              <span className="truncate">{project.location}</span>
            </div>
        </div>
        
        {/* Footer section to fill white space */}
        {unitCount !== undefined && (
             <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-brand-pink/5 px-2.5 py-1.5 rounded-lg border border-brand-pink/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse"></span>
                    <span className="text-[10px] font-bold text-brand-pink uppercase tracking-wide">{unitCount} Types Available</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-cyan group-hover:text-white transition-all">
                    <ArrowRight size={14} />
                </div>
            </div>
        )}
      </div>
    </Link>
  );
};

export const UnitCard: React.FC<{ unit: Unit }> = ({ unit }) => {
  return (
    <Link to={`/unit/${unit.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-cyan/20 transition-all duration-300 border border-slate-200 flex flex-col h-full">
      <div className="relative h-52 overflow-hidden border-b border-slate-100">
        <img src={unit.imageUrl} alt={unit.type} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${unit.category === 'Primary' ? 'bg-brand-cyan' : 'bg-brand-pink'}`}>
            {unit.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{unit.projectName}</p>
                    <h3 className="font-bold text-lg text-slate-800">{unit.type}</h3>
                </div>
                <p className="font-bold text-brand-cyan">{unit.priceDisplay}</p>
            </div>
            
            <div className="flex items-center text-slate-400 text-xs mb-4">
              <MapPin size={14} className="mr-1 text-brand-pink" />
              <span className="truncate">{unit.location}</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center">
                    <Bed size={16} className="text-brand-pink mb-1" />
                    <span className="text-xs font-medium text-slate-600">{unit.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center">
                    <Bath size={16} className="text-brand-pink mb-1" />
                    <span className="text-xs font-medium text-slate-600">{unit.bathrooms}</span>
                </div>
                <div className="flex flex-col items-center">
                    <Car size={16} className="text-brand-pink mb-1" />
                    <span className="text-xs font-medium text-slate-600">{unit.carports}</span>
                </div>
                 <div className="flex flex-col justify-center text-[10px] text-slate-500 leading-tight">
                    <div>LT : {unit.landArea}</div>
                    <div>LB : {unit.buildingArea}</div>
                </div>
            </div>
        </div>
        {unit.projectId && (
            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <Link 
                    to={`/project/${unit.projectId}`} 
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-bold text-brand-pink hover:underline"
                >
                    View Project Details
                </Link>
            </div>
        )}
      </div>
    </Link>
  );
};

export const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const formatPrice = (price: number) => {
    if (price >= 1e9) {
      return `IDR ${(price / 1e9).toFixed(1)} M`;
    }
    return `IDR ${(price / 1e6).toFixed(0)} Jt`;
  };

  return (
    <Link to={`/property/${property.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-cyan/20 transition-all duration-300 border border-slate-200 h-full flex flex-col">
      <div className="relative h-52 flex-shrink-0 overflow-hidden border-b border-slate-100">
        <img src={property.mainImage.url} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {property.tags.map(tag => (
                <span key={tag} className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    tag === 'Primary' ? 'bg-brand-cyan' : tag === 'New' ? 'bg-green-500' : 'bg-brand-pink'
                }`}>
                    {tag}
                </span>
            ))}
        </div>
        <div className="absolute bottom-3 right-3">
             <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${property.status === 'published' ? 'bg-blue-500' : 'bg-slate-500'}`}>
                {property.status}
            </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className='flex-grow'>
            <h3 className="font-bold text-lg text-slate-800 mb-1 truncate group-hover:text-brand-pink transition-colors">{property.title}</h3>
            <p className="font-bold text-brand-cyan mb-2 text-lg">{formatPrice(property.price)}</p>
            
            <div className="flex items-center text-slate-400 text-sm mb-4">
              <MapPin size={14} className="mr-1.5 text-brand-pink" />
              <span className="truncate">{property.location}</span>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
            <div className="flex flex-col items-center">
                <Bed size={20} className="text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-600">{property.bedrooms} <span className="font-normal text-slate-500">Beds</span></span>
            </div>
            <div className="flex flex-col items-center">
                <Bath size={20} className="text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-600">{property.bathrooms} <span className="font-normal text-slate-500">Baths</span></span>
            </div>
             <div className="flex flex-col items-center text-xs text-slate-500 font-medium leading-tight justify-center">
                <div className="font-bold">{property.buildingArea}m² <span className='font-normal'>building</span></div>
                <div className="font-normal text-slate-400">{property.landArea}m² land</div>
            </div>
        </div>
      </div>
    </Link>
  );
};