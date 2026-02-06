// components/listings/PriceDropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, DollarSign } from 'lucide-react';

interface PriceDropdownProps {
    value: number;
    onChange: (val: number) => void;
}

const PriceDropdown: React.FC<PriceDropdownProps> = ({ value, onChange }) => {
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

    return (
        <div className="relative w-full" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 rounded-2xl border flex items-center justify-between transition-all duration-300 bg-white group text-left ${isOpen ? 'border-brand-pink ring-2 ring-brand-pink/10 shadow-lg shadow-brand-pink/5' : 'border-slate-200 hover:border-brand-pink/50 hover:shadow-md'}`}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`p-2 rounded-lg transition-colors ${value < 10000000000 ? 'bg-brand-pink/10 text-brand-pink' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                        <DollarSign size={18} />
                    </div>
                    <div className="flex flex-col items-start truncate">
                        <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-0.5">Max Price</span>
                        <span className={`text-sm font-bold truncate ${value < 10000000000 ? 'text-slate-800' : 'text-slate-500'}`}>
                            IDR {(value / 1000000000).toFixed(1)} M
                        </span>
                    </div>
                </div>
                <ChevronDown size={16} className={`text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-pink' : 'group-hover:text-slate-500'}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 p-4 animate-fade-in-up">
                    <div className="mb-4">
                        <label className="text-xs font-bold text-slate-500 mb-2 block">Maximum Price Limit</label>
                        <input
                            type="range"
                            min="100000000"
                            max="10000000000"
                            step="100000000"
                            value={value}
                            onChange={(e) => onChange(Number(e.target.value))}
                            className="w-full accent-brand-pink h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer hover:bg-slate-200 transition-colors"
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>100M</span>
                        <span>10B+</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceDropdown;
