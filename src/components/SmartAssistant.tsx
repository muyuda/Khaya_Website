import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, ChevronDown } from 'lucide-react';
import { generateResponse } from '../services/geminiService';

export const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hi bestie! 👋 I'm Aura. Looking for a vibe-y house or need help with KPR?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Click outside to close
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

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const aiMsg = await generateResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiMsg }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end pointer-events-none" ref={containerRef}>
      
      {/* Chat Window - Always rendered but toggled visually for smoother transitions */}
      <div 
        className={`bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-80 sm:w-96 border border-white/50 flex flex-col transition-all duration-300 origin-bottom-right mb-4 overflow-hidden pointer-events-auto
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 h-[500px] max-h-[60vh]' : 'opacity-0 scale-95 translate-y-10 h-0 pointer-events-none'}`}
      >
          <div className="bg-gradient-to-r from-brand-pink to-brand-cyan p-4 rounded-t-2xl flex justify-between items-center text-white flex-shrink-0">
            <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <span className="font-bold">Aura Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors"><ChevronDown size={20} /></button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-3" ref={scrollRef}>
             {messages.map((m, idx) => (
               <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-brand-cyan text-white rounded-br-none' : 'bg-slate-100 text-slate-700 rounded-bl-none'}`}>
                    {m.text}
                  </div>
               </div>
             ))}
             {isLoading && (
                 <div className="flex justify-start">
                     <div className="bg-slate-100 p-3 rounded-2xl rounded-bl-none text-slate-400 text-xs flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce delay-150"></div>
                     </div>
                 </div>
             )}
          </div>

          <div className="p-3 border-t border-slate-100 flex gap-2 flex-shrink-0">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..." 
              className="flex-grow bg-slate-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-pink"
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-brand-cyan text-white p-2 rounded-full hover:bg-brand-cyan-dark transition-colors">
              <Send size={18} />
            </button>
          </div>
      </div>

      {/* Toggle Button - Persist */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto p-3 rounded-full shadow-lg border transition-all duration-300 hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-brand-pink text-white border-brand-pink' : 'bg-white text-brand-pink border-brand-pink/20'}`}
      >
         {isOpen ? <ChevronDown size={24} /> : <MessageCircle size={24} />}
      </button>

    </div>
  );
};