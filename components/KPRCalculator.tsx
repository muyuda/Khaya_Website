import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Download, ChevronDown, Check, Percent, RefreshCw, Lock, ArrowUpDown, Filter, Star, ChevronLeft, ChevronRight, Building, UserPlus, Phone, Calculator, CalendarClock, Settings, Plus, Trash2, Edit2, Layers } from 'lucide-react';
import { Bank, Product } from '../types';
import { BANKS } from '../constants';

interface KPRCalculatorProps {
  fixedHouseValue?: number;
}

const FLOATING_RATE = 11.0; // Assumed floating rate after fixed period

// --- Custom Mode Types ---
type TierType = 'Fixed' | 'Floating';
type InputMethod = 'Rate' | 'Payment';

interface CustomTier {
  id: string;
  startMonth: number;
  endMonth: number;
  type: TierType;
  inputMethod: InputMethod; // Only relevant if type is Fixed
  rate: number;
  fixedPayment?: number;
}

interface CustomProduct {
  id: string;
  name: string;
  tiers: CustomTier[];
}

export const KPRCalculator: React.FC<KPRCalculatorProps> = ({ fixedHouseValue }) => {
  const navigate = useNavigate();
  
  // --- Global Modes ---
  const [calcMode, setCalcMode] = useState<'bank' | 'custom'>('bank');

  // --- Bank Mode State ---
  const [selectedBank, setSelectedBank] = useState<Bank>(BANKS[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(BANKS[0].products[0]);
  
  // --- Custom Mode State ---
  const [customProducts, setCustomProducts] = useState<CustomProduct[]>([
      {
          id: 'cp_1',
          name: 'My Custom Plan 1',
          tiers: [
              { id: 't1', startMonth: 1, endMonth: 36, type: 'Fixed', inputMethod: 'Rate', rate: 4.5 },
              { id: 't2', startMonth: 37, endMonth: 240, type: 'Floating', inputMethod: 'Rate', rate: 11.0 }
          ]
      }
  ]);
  const [activeCustomId, setActiveCustomId] = useState<string>('cp_1');
  
  // --- Common State ---
  const [houseValue, setHouseValue] = useState(fixedHouseValue || 1000000000);
  const [dpAmount, setDpAmount] = useState(200000000);
  const [dpMode, setDpMode] = useState<'percent' | 'amount'>('percent');
  const [tenure, setTenure] = useState(15); // Years
  const [isProductOpen, setIsProductOpen] = useState(false);
  
  // Sorting & Filtering State
  const [sortOption, setSortOption] = useState<'lowestRate' | 'lowestPayment' | 'default'>('default');
  const [filterBankId, setFilterBankId] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Refs for scrolling
  const bankScrollRef = useRef<HTMLDivElement>(null);

  // Update house value if prop changes
  useEffect(() => {
    if (fixedHouseValue) {
      setHouseValue(fixedHouseValue);
      setDpAmount(fixedHouseValue * 0.2);
    }
  }, [fixedHouseValue]);

  // Update selected product when bank changes
  useEffect(() => {
    const existing = selectedBank.products.find(p => p.name === selectedProduct.name);
    if (existing) {
        setSelectedProduct(existing);
    } else {
        setSelectedProduct(selectedBank.products[0]);
    }
  }, [selectedBank]);

  // Derived Values
  const dpPercent = (dpAmount / houseValue) * 100;
  const loanAmount = Math.max(0, houseValue - dpAmount);
  
  // --- Mortgage Math Helpers ---
  const calculateMonthlyPayment = (principal: number, annualRate: number, years: number) => {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  };

  const calculateMonthlyPaymentByMonths = (principal: number, annualRate: number, months: number) => {
    const r = annualRate / 100 / 12;
    if (r === 0) return principal / months;
    return (principal * r) / (1 - Math.pow(1 + r, -months));
  };

  // --- Helpers for Custom Mode ---
  const getActiveCustomProduct = () => customProducts.find(p => p.id === activeCustomId) || customProducts[0];
  
  const addCustomProduct = () => {
      const newId = `cp_${Date.now()}`;
      const newProduct: CustomProduct = {
          id: newId,
          name: `Custom Plan ${customProducts.length + 1}`,
          tiers: [
              { id: `t_${Date.now()}_1`, startMonth: 1, endMonth: 36, type: 'Fixed', inputMethod: 'Rate', rate: 5.0 },
              { id: `t_${Date.now()}_2`, startMonth: 37, endMonth: tenure * 12, type: 'Floating', inputMethod: 'Rate', rate: 10.0 }
          ]
      };
      setCustomProducts([...customProducts, newProduct]);
      setActiveCustomId(newId);
  };

  const removeCustomProduct = (id: string) => {
      if (customProducts.length <= 1) return; // Prevent deleting last one
      const newCtx = customProducts.filter(p => p.id !== id);
      setCustomProducts(newCtx);
      if (activeCustomId === id) setActiveCustomId(newCtx[0].id);
  };

  const updateCustomProductTier = (prodId: string, tiers: CustomTier[]) => {
      setCustomProducts(prev => prev.map(p => p.id === prodId ? { ...p, tiers } : p));
  };
  
  const renameCustomProduct = (id: string, name: string) => {
      setCustomProducts(prev => prev.map(p => p.id === id ? { ...p, name } : p));
  };

  const addTier = () => {
      const product = getActiveCustomProduct();
      const lastTier = product.tiers[product.tiers.length - 1];
      const start = lastTier ? lastTier.endMonth + 1 : 1;
      const end = tenure * 12;
      
      const newTier: CustomTier = {
          id: `t_${Date.now()}`,
          startMonth: start,
          endMonth: end,
          type: 'Floating',
          inputMethod: 'Rate',
          rate: 10.0
      };
      
      // Adjust previous tier end if needed
      let updatedTiers = [...product.tiers];
      if (lastTier && lastTier.endMonth >= end) {
          // Shorten last tier to make room
          const newLastEnd = Math.max(lastTier.startMonth, end - 12); 
          updatedTiers[updatedTiers.length - 1] = { ...lastTier, endMonth: newLastEnd };
          newTier.startMonth = newLastEnd + 1;
      }

      updateCustomProductTier(product.id, [...updatedTiers, newTier]);
  };

  const removeTier = (tierId: string) => {
      const product = getActiveCustomProduct();
      if (product.tiers.length <= 1) return;
      updateCustomProductTier(product.id, product.tiers.filter(t => t.id !== tierId));
  };
  
  // --- Main Calculation Engine ---
  const calculateComplexSchedule = () => {
      let balance = loanAmount;
      const schedule = [];
      const totalMonths = tenure * 12;
      
      if (calcMode === 'bank') {
          // Standard Bank Logic
          const fixedMonths = selectedProduct.fixedYears * 12;
          let currentPayment = calculateMonthlyPayment(loanAmount, selectedProduct.rate, tenure);
          let currentRate = selectedProduct.rate;

          for (let i = 1; i <= totalMonths; i++) {
              // Switch to Floating
              if (i === fixedMonths + 1) {
                  currentRate = FLOATING_RATE;
                  const remainingYears = (totalMonths - (i - 1)) / 12;
                  currentPayment = calculateMonthlyPayment(balance, currentRate, remainingYears);
              }

              const monthlyRate = currentRate / 100 / 12;
              const interest = balance * monthlyRate;
              const principal = currentPayment - interest;
              balance -= principal;

              schedule.push({ 
                  month: i, 
                  interest: Math.round(interest), 
                  principal: Math.round(principal), 
                  balance: Math.max(0, Math.round(balance)),
                  rate: currentRate,
                  payment: Math.round(currentPayment)
              });
              
              if (balance <= 0) break;
          }
      } else {
          // Custom Product Logic
          const activeProduct = getActiveCustomProduct();
          const tiers = activeProduct.tiers.sort((a, b) => a.startMonth - b.startMonth);

          for (let i = 1; i <= totalMonths; i++) {
              // Find active tier
              const tier = tiers.find(t => i >= t.startMonth && i <= t.endMonth) || tiers[tiers.length - 1]; // Fallback to last tier
              
              const currentRate = tier.rate;
              const monthlyRate = currentRate / 100 / 12;
              
              let currentPayment = 0;
              const remainingMonths = totalMonths - i + 1;

              if (tier.type === 'Fixed' && tier.inputMethod === 'Payment' && tier.fixedPayment) {
                  // User defined fixed payment
                  currentPayment = tier.fixedPayment;
              } else {
                  // Annuity Calculation
                  // We recalculate payment based on current balance and remaining term
                  // Optimization: only recalculate when tier changes or annually? 
                  // For accuracy in standard Mortgage, usually calculated at start of term or rate change.
                  // Here, to support "Start Month/End Month" flexibility, let's recalculate if it's the start of a tier OR generic flow
                  // Actually, standard annuity: Payment is fixed for the duration of the rate.
                  // If we are in the middle of a tier, we should stick to the payment calculated at start of tier?
                  // Let's re-calculate annuity every month based on remaining term to ensure it hits 0 exactly, 
                  // UNLESS it's a "Fixed Payment" tier.
                  currentPayment = calculateMonthlyPaymentByMonths(balance, currentRate, remainingMonths);
              }

              const interest = balance * monthlyRate;
              
              // Handle case where fixed payment < interest (Negative Amortization)
              // We'll just allow principal to be negative (balance grows) or clamp interest? 
              // Standard: Interest is due. Principal = Payment - Interest.
              let principal = currentPayment - interest;
              
              // If last month, adjust to clear balance
              if (i === totalMonths) {
                  principal = balance;
                  currentPayment = principal + interest;
              }

              balance -= principal;

              schedule.push({ 
                  month: i, 
                  interest: Math.round(interest), 
                  principal: Math.round(principal), 
                  balance: Math.max(0, Math.round(balance)),
                  rate: currentRate,
                  payment: Math.round(currentPayment)
              });
              
              if (balance <= 0.01) { balance = 0; if(i < totalMonths) break; } // Early exit if paid off
          }
      }
      return schedule;
  };

  const schedule = calculateComplexSchedule();
  
  // Initial Payment for Display (Month 1)
  const initialMonthlyPayment = schedule.length > 0 ? schedule[0].payment : 0;
  const initialRate = schedule.length > 0 ? schedule[0].rate : 0;
  
  // Calculate Totals
  const totalInterest = schedule.reduce((acc, curr) => acc + curr.interest, 0);
  const data = [
    { name: 'Principal', value: loanAmount },
    { name: 'Interest', value: totalInterest },
  ];
  const COLORS = ['#2AADC1', '#FE7EC7'];

  // --- Payment Summary Data ---
  const paymentSummary = useMemo(() => {
      // Group sequential months with same rate & payment roughly
      if (schedule.length === 0) return [];
      
      const summaries = [];
      let currentGroup = {
          start: schedule[0].month,
          rate: schedule[0].rate,
          payment: schedule[0].payment,
          totalInterest: 0,
          totalPayment: 0,
          end: schedule[0].month
      };

      schedule.forEach((row, idx) => {
          // Check if new group needed (rate change or significant payment change)
          const isRateDiff = row.rate !== currentGroup.rate;
          const isPayDiff = Math.abs(row.payment - currentGroup.payment) > 100; // tolerance
          
          if ((isRateDiff || isPayDiff) && idx > 0) {
              // Push old group
              summaries.push({
                  monthStart: currentGroup.start,
                  monthEnd: currentGroup.end,
                  rate: currentGroup.rate,
                  monthlyPayment: currentGroup.payment,
                  totalPayment: currentGroup.totalPayment,
                  totalInterest: currentGroup.totalInterest
              });
              // Start new group
              currentGroup = {
                  start: row.month,
                  rate: row.rate,
                  payment: row.payment,
                  totalInterest: 0,
                  totalPayment: 0,
                  end: row.month
              };
          }
          
          currentGroup.totalInterest += row.interest;
          currentGroup.totalPayment += row.payment;
          currentGroup.end = row.month;
      });
      
      // Push last group
      summaries.push({
          monthStart: currentGroup.start,
          monthEnd: currentGroup.end,
          rate: currentGroup.rate,
          monthlyPayment: currentGroup.payment,
          totalPayment: currentGroup.totalPayment,
          totalInterest: currentGroup.totalInterest
      });

      return summaries;
  }, [schedule]);


  // Handle Input Changes
  const handleDpChange = (val: number) => {
    if (dpMode === 'percent') {
        const clampedPercent = Math.min(100, Math.max(0, val));
        setDpAmount(houseValue * (clampedPercent / 100));
    } else {
        setDpAmount(val);
    }
  };

  const handleHouseValueChange = (val: number) => {
    setHouseValue(val);
    if (dpMode === 'percent') {
        setDpAmount(val * (dpPercent / 100));
    }
  };

  const handleBankScroll = (direction: 'left' | 'right') => {
      if (bankScrollRef.current) {
          const amount = 200;
          bankScrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
      }
  };

  // --- Comparison Helper (Right Column) ---
  const handleCardSelect = (item: any) => {
      if (calcMode === 'bank') {
          setSelectedBank(item.bank);
          setSelectedProduct(item.product);
      } else {
          setActiveCustomId(item.product.id);
      }
      document.getElementById('kpr-calculator-main')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Flattened Comparison List
  const comparisonList = useMemo(() => {
      if (calcMode === 'bank') {
          let list: { bank: Bank; product: Product; payment: number }[] = [];
          BANKS.forEach(bank => {
              bank.products.forEach(product => {
                  list.push({
                      bank,
                      product,
                      payment: calculateMonthlyPayment(loanAmount, product.rate, tenure)
                  });
              });
          });
          if (filterBankId !== 'all') list = list.filter(item => item.bank.id === filterBankId);
          if (sortOption === 'lowestRate') return list.sort((a, b) => a.product.rate - b.product.rate);
          if (sortOption === 'lowestPayment') return list.sort((a, b) => a.payment - b.payment);
          return list;
      } else {
          // Custom Mode Comparison
          return customProducts.map(cp => {
               // Calculate initial payment for comparison
               // We need to run a mini calc or just grab first tier
               const firstTier = cp.tiers.find(t => t.startMonth === 1) || cp.tiers[0];
               let pay = 0;
               if(firstTier.type === 'Fixed' && firstTier.inputMethod === 'Payment' && firstTier.fixedPayment) {
                   pay = firstTier.fixedPayment;
               } else {
                   pay = calculateMonthlyPayment(loanAmount, firstTier.rate, tenure);
               }
               
               return {
                   product: cp,
                   payment: pay,
                   rate: firstTier.rate
               };
          }).sort((a, b) => {
             if (sortOption === 'lowestRate') return a.rate - b.rate;
             if (sortOption === 'lowestPayment') return a.payment - b.payment;
             return 0;
          });
      }
  }, [sortOption, filterBankId, loanAmount, tenure, calcMode, customProducts]);

  const handleLockedExport = () => { navigate('/contact'); };

  const inputBaseClass = "w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all font-medium text-slate-800 shadow-sm placeholder-slate-400";
  const lockedInputClass = "w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-bold cursor-not-allowed shadow-inner flex items-center justify-between";

  return (
    <div id="kpr-calculator-main" className="bg-white rounded-[2.5rem] shadow-xl shadow-brand-pink/10 p-6 md:p-10 border border-slate-50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-cyan/10 rounded-2xl text-brand-cyan">
                <RefreshCw size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-800">KPR Simulator</h2>
                <p className="text-slate-500 text-sm">Calculate your estimated monthly installments.</p>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1 self-start md:self-auto">
              <button 
                  onClick={() => setCalcMode('bank')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${calcMode === 'bank' ? 'bg-white text-brand-pink shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                  <Building size={16} /> Bank Partner
              </button>
              <button 
                  onClick={() => setCalcMode('custom')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${calcMode === 'custom' ? 'bg-white text-brand-cyan shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                  <Settings size={16} /> Custom
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: SIMULATOR (Span 8) --- */}
        <div className="xl:col-span-8 flex flex-col gap-6">
            
            {/* Input & Result Dashboard */}
            <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 space-y-6">
                
                {/* 1. Mode Specific Controls */}
                {calcMode === 'bank' ? (
                    <div>
                        <div className="flex justify-between items-center mb-3">
                             <label className="block text-sm font-bold text-slate-700">Select Active Bank</label>
                             <div className="flex gap-2">
                                 <button onClick={() => handleBankScroll('left')} className="p-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-600 transition-colors shadow-sm"><ChevronLeft size={16} /></button>
                                 <button onClick={() => handleBankScroll('right')} className="p-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-600 transition-colors shadow-sm"><ChevronRight size={16} /></button>
                             </div>
                        </div>
                        <div className="relative group">
                            <div ref={bankScrollRef} className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide snap-x items-center px-1">
                                {BANKS.map((bank) => (
                                    <button
                                    key={bank.id}
                                    onClick={() => setSelectedBank(bank)}
                                    className={`flex-shrink-0 snap-center min-w-[110px] px-4 py-3 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 group relative ${selectedBank.id === bank.id ? 'border-brand-pink bg-brand-pink text-white shadow-lg shadow-brand-pink/30' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-pink/50 hover:bg-white'}`}
                                    >
                                    <Building size={20} className={selectedBank.id === bank.id ? 'text-white' : 'text-slate-400'}/>
                                    <span className="text-xs font-bold">{bank.name}</span>
                                    {selectedBank.id === bank.id && (<div className="absolute -bottom-1.5 w-1.5 h-1.5 bg-white rounded-full"></div>)}
                                    </button>
                                ))}
                            </div>
                             <div className="absolute left-0 top-0 bottom-2 w-4 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
                             <div className="absolute right-0 top-0 bottom-2 w-4 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                ) : (
                    /* Custom Mode Product Manager */
                    <div>
                        <div className="flex justify-between items-center mb-3">
                             <label className="block text-sm font-bold text-slate-700">Custom Product List</label>
                             <button onClick={addCustomProduct} className="text-xs font-bold text-brand-cyan hover:underline flex items-center gap-1"><Plus size={14}/> Add New Plan</button>
                        </div>
                        <div className="flex flex-col gap-2">
                             {customProducts.map(cp => (
                                 <div key={cp.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${activeCustomId === cp.id ? 'bg-white border-brand-cyan shadow-md' : 'bg-white/50 border-slate-200'}`}>
                                     <div className="flex items-center gap-3 flex-grow" onClick={() => setActiveCustomId(cp.id)}>
                                         <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${activeCustomId === cp.id ? 'border-brand-cyan' : 'border-slate-300'}`}>
                                             {activeCustomId === cp.id && <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>}
                                         </div>
                                         <input 
                                            value={cp.name} 
                                            onChange={(e) => renameCustomProduct(cp.id, e.target.value)}
                                            className="bg-transparent font-bold text-sm text-slate-700 focus:outline-none focus:border-b focus:border-brand-cyan"
                                         />
                                     </div>
                                     {customProducts.length > 1 && (
                                         <button onClick={() => removeCustomProduct(cp.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                                     )}
                                 </div>
                             ))}
                        </div>
                        
                        {/* Custom Tier Configurator */}
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2"><Layers size={16} /> Tier Configuration</label>
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs text-left">
                                        <thead className="bg-slate-50 text-slate-500 uppercase font-bold">
                                            <tr>
                                                <th className="px-4 py-2">Start</th>
                                                <th className="px-4 py-2">End</th>
                                                <th className="px-4 py-2">Type</th>
                                                <th className="px-4 py-2">Config</th>
                                                <th className="px-4 py-2">Value</th>
                                                <th className="px-4 py-2 w-10"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {getActiveCustomProduct().tiers.map((tier, idx) => (
                                                <tr key={tier.id}>
                                                    <td className="px-4 py-2 font-medium text-slate-600">Month {tier.startMonth}</td>
                                                    <td className="px-4 py-2">
                                                        <input 
                                                            type="number" 
                                                            value={tier.endMonth} 
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                const product = getActiveCustomProduct();
                                                                const newTiers = [...product.tiers];
                                                                newTiers[idx] = { ...tier, endMonth: val };
                                                                // Simple logic: if next tier exists, update its start
                                                                if (newTiers[idx+1]) {
                                                                    newTiers[idx+1] = { ...newTiers[idx+1], startMonth: val + 1 };
                                                                }
                                                                updateCustomProductTier(product.id, newTiers);
                                                            }}
                                                            className="w-16 p-1 border rounded bg-slate-50 focus:ring-1 focus:ring-brand-cyan text-center"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <select 
                                                            value={tier.type}
                                                            onChange={(e) => {
                                                                const val = e.target.value as TierType;
                                                                const product = getActiveCustomProduct();
                                                                const newTiers = [...product.tiers];
                                                                // If switching to floating, force inputMethod to Rate
                                                                newTiers[idx] = { ...tier, type: val, inputMethod: val === 'Floating' ? 'Rate' : tier.inputMethod };
                                                                updateCustomProductTier(product.id, newTiers);
                                                            }}
                                                            className="p-1 border rounded bg-white focus:ring-1 focus:ring-brand-cyan"
                                                        >
                                                            <option value="Fixed">Fixed</option>
                                                            <option value="Floating">Floating</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {tier.type === 'Fixed' ? (
                                                            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded">
                                                                <button onClick={() => {
                                                                    const product = getActiveCustomProduct();
                                                                    const newTiers = [...product.tiers];
                                                                    newTiers[idx] = { ...tier, inputMethod: 'Rate' };
                                                                    updateCustomProductTier(product.id, newTiers);
                                                                }} className={`px-2 py-0.5 rounded text-[10px] font-bold ${tier.inputMethod === 'Rate' ? 'bg-white shadow text-brand-cyan' : 'text-slate-400'}`}>%</button>
                                                                <button onClick={() => {
                                                                    const product = getActiveCustomProduct();
                                                                    const newTiers = [...product.tiers];
                                                                    newTiers[idx] = { ...tier, inputMethod: 'Payment' };
                                                                    updateCustomProductTier(product.id, newTiers);
                                                                }} className={`px-2 py-0.5 rounded text-[10px] font-bold ${tier.inputMethod === 'Payment' ? 'bg-white shadow text-brand-pink' : 'text-slate-400'}`}>IDR</button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-slate-400 italic">Rate Only</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {tier.inputMethod === 'Rate' ? (
                                                            <div className="relative">
                                                                <input 
                                                                    type="number" step="0.1" 
                                                                    value={tier.rate}
                                                                    onChange={(e) => {
                                                                        const val = parseFloat(e.target.value);
                                                                        const product = getActiveCustomProduct();
                                                                        const newTiers = [...product.tiers];
                                                                        newTiers[idx] = { ...tier, rate: val };
                                                                        updateCustomProductTier(product.id, newTiers);
                                                                    }}
                                                                    className="w-20 p-1 pl-2 border rounded bg-white focus:ring-1 focus:ring-brand-cyan"
                                                                />
                                                                <span className="absolute right-2 top-1.5 text-slate-400">%</span>
                                                            </div>
                                                        ) : (
                                                            <input 
                                                                type="number"
                                                                placeholder="Amount"
                                                                value={tier.fixedPayment || ''}
                                                                onChange={(e) => {
                                                                    const val = parseInt(e.target.value);
                                                                    const product = getActiveCustomProduct();
                                                                    const newTiers = [...product.tiers];
                                                                    newTiers[idx] = { ...tier, fixedPayment: val };
                                                                    updateCustomProductTier(product.id, newTiers);
                                                                }}
                                                                className="w-28 p-1 border rounded bg-white focus:ring-1 focus:ring-brand-pink text-xs"
                                                            />
                                                        )}
                                                        {tier.inputMethod === 'Payment' && (
                                                            <div className="mt-1 text-[9px] text-slate-400 flex items-center gap-1">
                                                                Rate: <input type="number" step="0.1" value={tier.rate} onChange={(e) => {
                                                                    const val = parseFloat(e.target.value);
                                                                    const product = getActiveCustomProduct();
                                                                    const newTiers = [...product.tiers];
                                                                    newTiers[idx] = { ...tier, rate: val };
                                                                    updateCustomProductTier(product.id, newTiers);
                                                                }} className="w-8 border rounded px-1 bg-slate-50"/> % (for Interest)
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        {getActiveCustomProduct().tiers.length > 1 && (
                                                            <button onClick={() => removeTier(tier.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button onClick={addTier} className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold border-t border-slate-100 flex items-center justify-center gap-1">
                                    <Plus size={12}/> Add Tier
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Main Inputs Grid (Shared) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                         {/* Product Display (Read-only or Selector depending on mode) */}
                         <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                {calcMode === 'bank' ? 'Mortgage Product' : 'Active Plan Summary'}
                            </label>
                            {calcMode === 'bank' ? (
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsProductOpen(!isProductOpen)}
                                        className={`w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-pink transition-all flex justify-between items-center text-left ${isProductOpen ? 'ring-2 ring-brand-pink' : ''} shadow-sm`}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-800">{selectedProduct.name}</span>
                                            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Fixed {selectedProduct.fixedYears} Years</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-cyan text-white text-xs font-bold shadow-sm">
                                                <Percent size={12} /> {selectedProduct.rate}%
                                            </div>
                                            <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isProductOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>
                                    {isProductOpen && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in-up max-h-60 overflow-y-auto">
                                            {selectedBank.products.map((prod, idx) => (
                                                <button key={idx} onClick={() => { setSelectedProduct(prod); setIsProductOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-slate-50 flex justify-between items-center group transition-colors border-b border-slate-100 last:border-0">
                                                    <span className={`font-medium ${selectedProduct.name === prod.name ? 'text-brand-pink' : 'text-slate-600 group-hover:text-slate-800'}`}>{prod.name}</span>
                                                    {selectedProduct.name === prod.name && <Check size={16} className="text-brand-pink" />}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                                     <div className="flex flex-col">
                                        <span className="font-bold text-slate-800">{getActiveCustomProduct().name}</span>
                                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{getActiveCustomProduct().tiers.length} Rate Tiers Configured</span>
                                    </div>
                                    <div className="bg-brand-cyan/10 text-brand-cyan p-2 rounded-lg"><Settings size={18} /></div>
                                </div>
                            )}
                        </div>

                        {/* House Value */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-bold text-slate-700">Property Value (IDR)</label>
                                {fixedHouseValue && <span className="text-xs text-brand-pink font-bold flex items-center gap-1"><Lock size={12}/> Locked</span>}
                            </div>
                            {fixedHouseValue ? (
                                <div className={lockedInputClass}><span>{houseValue.toLocaleString('id-ID')}</span><Lock size={16} className="text-slate-400" /></div>
                            ) : (
                                <input type="number" value={houseValue} onChange={(e) => handleHouseValueChange(Number(e.target.value))} className={inputBaseClass} />
                            )}
                        </div>

                         {/* DP */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-700">Down Payment</label>
                                <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-bold">
                                    <button onClick={() => setDpMode('percent')} className={`px-2 py-1 rounded-md transition-all ${dpMode === 'percent' ? 'bg-white text-brand-pink shadow-sm' : 'text-slate-400'}`}>%</button>
                                    <button onClick={() => setDpMode('amount')} className={`px-2 py-1 rounded-md transition-all ${dpMode === 'amount' ? 'bg-white text-brand-cyan shadow-sm' : 'text-slate-400'}`}>Rp</button>
                                </div>
                            </div>
                            <div className="relative">
                                {dpMode === 'percent' ? (
                                    <div className="relative">
                                        <input type="number" min="0" max="100" value={dpPercent.toFixed(1)} onChange={(e) => handleDpChange(Number(e.target.value))} className={inputBaseClass} />
                                        <div className="absolute right-4 top-3.5 text-slate-400 font-bold">%</div>
                                        <div className="absolute right-0 -bottom-6 text-xs text-slate-500 font-medium">= IDR {Math.round(dpAmount).toLocaleString('id-ID')}</div>
                                    </div>
                                ) : (
                                    <input type="number" value={Math.round(dpAmount)} onChange={(e) => handleDpChange(Number(e.target.value))} className={inputBaseClass} />
                                )}
                            </div>
                        </div>

                         {/* Tenure */}
                        <div className="pt-2">
                             <label className="block text-sm font-bold text-slate-700 mb-2">Tenure (Years)</label>
                             <div className="h-[40px] flex items-center px-1">
                                 <input type="range" min="5" max="30" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-brand-pink cursor-pointer" />
                             </div>
                             <div className="text-right text-sm font-bold text-brand-cyan -mt-2">{tenure} Years</div>
                        </div>
                    </div>

                    {/* Result Card Visualization */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
                         <div className="text-center z-10">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Est. Monthly Payment</p>
                            <h3 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-cyan mt-2">
                                IDR {Math.round(initialMonthlyPayment).toLocaleString('id-ID')}
                            </h3>
                            <div className="text-xs text-slate-400 mt-2 font-medium">
                                {calcMode === 'bank' 
                                    ? `Fixed Rate ${selectedProduct.rate}% for ${selectedProduct.fixedYears} Years`
                                    : `Initial Rate ${initialRate}%`
                                }
                            </div>
                        </div>

                        <div className="h-48 w-full z-10 relative mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#8884d8" paddingAngle={5} dataKey="value" stroke="none">
                                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(value: number) => `IDR ${value.toLocaleString('id-ID')}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                            </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none pb-2">
                                <span className="text-[10px] uppercase text-slate-400 font-bold">Loan</span>
                                <span className="text-sm font-bold text-slate-700">{tenure} Years</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2 z-10">
                             <div className="text-center p-2 bg-slate-50 rounded-lg">
                                 <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Interest</div>
                                 <div className="font-bold text-slate-700 text-xs">IDR {Math.round(totalInterest).toLocaleString('id-ID')}</div>
                             </div>
                             <div className="text-center p-2 bg-slate-50 rounded-lg">
                                 <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Principal</div>
                                 <div className="font-bold text-slate-700 text-xs">IDR {Math.round(loanAmount).toLocaleString('id-ID')}</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Summary Section (NEW) */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-cyan/10 rounded-lg text-brand-cyan">
                            <CalendarClock size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Payment Summary</h3>
                            <p className="text-sm text-slate-400">Projected costs for fixed and floating rate periods.</p>
                        </div>
                    </div>
                    {/* CTA for help */}
                    <button 
                        onClick={() => navigate('/contact')} 
                        className="hidden sm:flex items-center gap-2 text-brand-pink font-bold text-sm hover:underline"
                    >
                        <Phone size={14} /> Talk to Agent
                    </button>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-black/5 shadow-sm">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 font-bold tracking-wider">Month Start</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Month End</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Interest Rate</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Payment Month</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Payment Total</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Interest Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paymentSummary.map((row, idx) => {
                                const isFloating = calcMode === 'bank' ? row.monthStart > selectedProduct.fixedYears * 12 : false; // Simplified for display
                                return (
                                    <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-800">{row.monthStart}</td>
                                        <td className="px-6 py-4 font-medium text-slate-800">{row.monthEnd}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${isFloating ? 'bg-slate-100 text-slate-500' : 'bg-brand-pink/10 text-brand-pink'}`}>
                                                {row.rate}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-brand-cyan">
                                            IDR {row.monthlyPayment.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-600">
                                            IDR {row.totalPayment.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-600">
                                            IDR {row.totalInterest.toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {/* Mobile CTA */}
                <div className="mt-4 flex justify-end sm:hidden">
                    <button onClick={() => navigate('/contact')} className="text-sm font-bold text-brand-pink hover:underline flex items-center gap-1">
                         Need clarification? Contact Agent <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* Amortization Table Toggle Section */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Payment Schedule</h3>
                        <p className="text-sm text-slate-400">Detailed breakdown of principal and interest over {tenure} years.</p>
                    </div>
                    {/* Locked Export Button */}
                    <button 
                        onClick={handleLockedExport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200 transition-colors text-sm font-bold shadow-sm"
                        title="Available for Agents"
                    >
                        <Lock size={16} /> Export CSV (Locked)
                    </button>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl border border-black/5 shadow-sm">
                     <div className="overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
                        <table className="w-full text-sm text-left text-slate-600 relative">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-6 py-4 font-bold tracking-wider bg-slate-50">Month</th>
                                    <th className="px-6 py-4 font-bold tracking-wider bg-slate-50">Payment</th>
                                    <th className="px-6 py-4 font-bold tracking-wider bg-slate-50">Interest</th>
                                    <th className="px-6 py-4 font-bold tracking-wider bg-slate-50">Principal</th>
                                    <th className="px-6 py-4 font-bold tracking-wider bg-slate-50">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {schedule.map((row) => (
                                    <tr key={row.month} className="bg-white hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-800">{row.month}</td>
                                        <td className="px-6 py-4 font-bold text-slate-800">IDR {row.payment.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 text-brand-pink font-medium">IDR {row.interest.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 text-brand-cyan font-medium">IDR {row.principal.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 text-slate-500">IDR {row.balance.toLocaleString('id-ID')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                  </div>
                  
                  {/* Bottom CTA for Schedule */}
                  <div className="mt-6 flex justify-center">
                       <button 
                            onClick={() => navigate('/contact')}
                            className="bg-brand-pink/10 hover:bg-brand-pink/20 text-brand-pink font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
                       >
                           <UserPlus size={18} />
                           Discuss this schedule with an agent
                       </button>
                  </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: COMPARISON BOARD (Span 4) --- */}
        <div className="xl:col-span-4">
            <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-xl h-full flex flex-col max-h-[1000px]">
                
                {/* Comparison Header */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        {calcMode === 'bank' ? 'Market Rates' : 'Your Custom Plans'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 mb-4">Click a card to apply to calculator.</p>
                    
                    <div className="flex flex-col gap-2">
                         {/* Bank Filter - Only show in Bank Mode */}
                         {calcMode === 'bank' && (
                            <div className="relative z-20">
                                <button 
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className={`w-full px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${filterBankId !== 'all' ? 'bg-brand-pink text-white border-brand-pink' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                                >
                                    <span className="flex items-center gap-2"><Filter size={14} /> {filterBankId === 'all' ? 'All Banks' : BANKS.find(b => b.id === filterBankId)?.name}</span>
                                    <ChevronDown size={14}/>
                                </button>
                                {isFilterOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 max-h-60 overflow-y-auto">
                                        <button onClick={() => { setFilterBankId('all'); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 ${filterBankId === 'all' ? 'text-brand-pink' : 'text-slate-600'}`}>All Banks</button>
                                        {BANKS.map(bank => (
                                            <button key={bank.id} onClick={() => { setFilterBankId(bank.id); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 ${filterBankId === bank.id ? 'text-brand-pink' : 'text-slate-600'}`}>{bank.name}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                         )}

                         {/* Sort Buttons */}
                         <div className="flex gap-2">
                            <button onClick={() => setSortOption('lowestRate')} className={`flex-1 px-3 py-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${sortOption === 'lowestRate' ? 'bg-brand-pink/10 text-brand-pink border border-brand-pink/20' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                                <Percent size={12} /> Lowest Rate
                            </button>
                            <button onClick={() => setSortOption('lowestPayment')} className={`flex-1 px-3 py-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${sortOption === 'lowestPayment' ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                                <ArrowUpDown size={12} /> Lowest Pay
                            </button>
                         </div>
                    </div>
                </div>

                {/* Vertical Scroll List */}
                <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 pr-2 -mr-2 space-y-3">
                     {comparisonList.length === 0 ? (
                         <div className="text-center py-10 text-slate-400 font-medium text-sm">No products match your filter.</div>
                     ) : (
                        comparisonList.map((item, idx) => {
                            const isActive = calcMode === 'bank' 
                                ? (selectedBank.id === item.bank.id && selectedProduct.name === item.product.name)
                                : (activeCustomId === item.product.id);
                                
                            return (
                                <div 
                                    key={idx}
                                    onClick={() => handleCardSelect(item)}
                                    className={`
                                        cursor-pointer rounded-2xl p-4 border transition-all duration-200 relative overflow-hidden flex flex-col justify-between
                                        ${isActive 
                                            ? 'border-brand-pink bg-brand-pink/5 ring-1 ring-brand-pink shadow-md' 
                                            : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-brand-cyan/30 hover:shadow-sm'
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100">
                                                {calcMode === 'bank' ? <Building size={14} className="text-slate-400"/> : <Settings size={14} className="text-brand-cyan"/>}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs text-slate-800">{calcMode === 'bank' ? item.bank.name : 'Custom Plan'}</h4>
                                                <p className="text-[10px] text-slate-500 truncate max-w-[120px]">{item.product.name}</p>
                                            </div>
                                        </div>
                                        {item.product.rate < 4 && <div className="bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded-md text-[9px] font-bold border border-yellow-200"><Star size={8} fill="currentColor" /></div>}
                                    </div>
                                    
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-[9px] uppercase text-slate-400 font-bold">{calcMode === 'bank' ? 'Rate' : 'Start Rate'}</div>
                                            <div className="text-lg font-bold text-brand-cyan leading-tight">{calcMode === 'bank' ? item.product.rate : item.rate}%</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[9px] uppercase text-slate-400 font-bold">{calcMode === 'bank' ? 'Monthly' : 'Initial Monthly'}</div>
                                            <div className={`font-bold text-sm ${isActive ? 'text-brand-pink' : 'text-slate-600'}`}>
                                                IDR {Math.round(item.payment).toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                     )}
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};