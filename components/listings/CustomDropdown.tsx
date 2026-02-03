// components/listings/CustomDropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  icon?: React.ElementType;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayValue = value === 'All' ? `All ${label}s` : value;

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-2xl border flex items-center justify-between transition-all duration-300 bg-white group text-left ${isOpen ? 'border-brand-pink ring-2 ring-brand-pink/10 shadow-lg shadow-brand-pink/5' : 'border-slate-200 hover:border-brand-pink/50 hover:shadow-md'}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
            {Icon && (
                <div className={`p-2 rounded-lg transition-colors ${value !== 'All' ? 'bg-brand-pink/10 text-brand-pink' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                    <Icon size={18} />
                </div>
            )}
            <div className="flex flex-col items-start truncate">
                <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-0.5">{label}</span>
                <span className={`text-sm font-bold truncate ${value === 'All' ? 'text-slate-500' : 'text-slate-800'}`}>
                    {displayValue}
                </span>
            </div>
        </div>
        <ChevronDown size={16} className={`text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-pink' : 'group-hover:text-slate-500'}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 max-h-60 overflow-y-auto animate-fade-in-up scrollbar-thin scrollbar-thumb-slate-200">
           {['All', ...options.filter(o => o !== 'All')].map((opt) => (
               <button
                 key={opt}
                 onClick={() => { onChange(opt); setIsOpen(false); }}
                 className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center justify-between group transition-colors border-b border-slate-50 last:border-0"
               >
                  <span className={opt === value ? 'text-brand-pink font-bold' : 'text-slate-600 group-hover:text-slate-800'}>
                    {opt === 'All' ? `All ${label}s` : opt}
                  </span>
                  {opt === value && <Check size={16} className="text-brand-pink" />}
               </button>
           ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
