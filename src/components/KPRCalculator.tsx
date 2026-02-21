import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  ChevronDown, Check, Percent, RefreshCw, Lock, ArrowUpDown, Filter, Star, 
  Building, CalendarClock, Settings, Plus, Trash2, Layers, UserPlus, ChevronLeft, ChevronRight
} from 'lucide-react';

// IMPORT YANG BENER DARI FILE DATA KITA
import { Bank, Product, BANKS } from '../data/kprData';

// ==========================================
// 1. TYPES & CONSTANTS
// ==========================================
interface KPRCalculatorProps { fixedHouseValue?: number; }

const FLOATING_RATE = 11.0; 
type TierType = 'Fixed' | 'Floating';
type InputMethod = 'Rate' | 'Payment';
interface CustomTier { id: string; startMonth: number; endMonth: number; type: TierType; inputMethod: InputMethod; rate: number; fixedPayment?: number; }
interface CustomProduct { id: string; name: string; tiers: CustomTier[]; }

// Helper Format Rupiah
const formatRp = (angka: number) => angka.toLocaleString('id-ID');

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
const KPRCalculator: React.FC<KPRCalculatorProps> = ({ fixedHouseValue }) => {
  const navigate = useNavigate();

  // States - Modes & Selections
  const [calcMode, setCalcMode] = useState<'bank' | 'custom'>('bank');
  const [selectedBank, setSelectedBank] = useState<Bank>(BANKS[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(BANKS[0].products[0]);
  
  // Custom Plan Data
  const [customProducts, setCustomProducts] = useState<CustomProduct[]>([
      { id: 'cp_1', name: 'Rencana Bebas', tiers: [{ id: 't1', startMonth: 1, endMonth: 36, type: 'Fixed', inputMethod: 'Rate', rate: 4.5 }, { id: 't2', startMonth: 37, endMonth: 180, type: 'Floating', inputMethod: 'Rate', rate: 11.0 }] }
  ]);
  const [activeCustomId, setActiveCustomId] = useState<string>('cp_1');
  
  // States - Input Values
  const [houseValue, setHouseValue] = useState(fixedHouseValue || 1000000000);
  const [dpAmount, setDpAmount] = useState(200000000);
  const [dpMode, setDpMode] = useState<'percent' | 'amount'>('percent');
  const [tenure, setTenure] = useState(15);
  
  // States - UI Logic
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [sortOption, setSortOption] = useState<'lowestRate' | 'lowestPayment' | 'default'>('default');
  const [filterBankId, setFilterBankId] = useState<string>('all');
  const bankScrollRef = useRef<HTMLDivElement>(null);

  // Sync Props
  useEffect(() => {
    if (fixedHouseValue) { 
        setHouseValue(fixedHouseValue); 
        setDpAmount(fixedHouseValue * 0.2); 
    }
  }, [fixedHouseValue]);

  useEffect(() => {
    const existing = selectedBank.products.find(p => p.name === selectedProduct.name);
    setSelectedProduct(existing || selectedBank.products[0]);
  }, [selectedBank]);

  // Scroll handler for bank list
  const scroll = (direction: 'left' | 'right') => {
    if (bankScrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      bankScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Math Variables
  const dpPercent = (dpAmount / houseValue) * 100 || 0;
  const loanAmount = Math.max(0, houseValue - dpAmount);
  
  // Rumus Anuitas Asli Bank
  const calculateMonthlyPayment = (principal: number, annualRate: number, years: number) => {
    const r = annualRate / 100 / 12; const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  };

  const getActiveCustomProduct = () => customProducts.find(p => p.id === activeCustomId) || customProducts[0];

  // Engine Schedule (Perhitungan Tiap Bulan)
  const schedule = useMemo(() => {
      let balance = loanAmount;
      const sched = [];
      const totalMonths = tenure * 12;
      
      if (calcMode === 'bank') {
          const fixedMonths = selectedProduct.fixedYears * 12;
          let currentPayment = calculateMonthlyPayment(loanAmount, selectedProduct.rate, tenure);
          let currentRate = selectedProduct.rate;

          for (let i = 1; i <= totalMonths; i++) {
              if (i === fixedMonths + 1) {
                  currentRate = FLOATING_RATE;
                  currentPayment = calculateMonthlyPayment(balance, currentRate, (totalMonths - (i - 1)) / 12);
              }
              const monthlyRate = currentRate / 100 / 12;
              const interest = balance * monthlyRate;
              const principal = currentPayment - interest;
              balance -= principal;

              sched.push({ month: i, interest: Math.round(interest), principal: Math.round(principal), balance: Math.max(0, Math.round(balance)), rate: currentRate, payment: Math.round(currentPayment) });
              if (balance <= 0) break;
          }
      } else {
          // Custom Plan Logic
          const activeProduct = getActiveCustomProduct();
          const tiers = activeProduct.tiers.sort((a, b) => a.startMonth - b.startMonth);
          for (let i = 1; i <= totalMonths; i++) {
              const tier = tiers.find(t => i >= t.startMonth && i <= t.endMonth) || tiers[tiers.length - 1];
              const currentRate = tier.rate;
              let currentPayment = calculateMonthlyPayment(balance, currentRate, (totalMonths - i + 1)/12);
              const interest = balance * (currentRate / 100 / 12);
              let principal = currentPayment - interest;
              if (i === totalMonths) { principal = balance; currentPayment = principal + interest; }
              balance -= principal;
              sched.push({ month: i, interest: Math.round(interest), principal: Math.round(principal), balance: Math.max(0, Math.round(balance)), rate: currentRate, payment: Math.round(currentPayment) });
              if (balance <= 0.01) { balance = 0; break; } 
          }
      }
      return sched;
  }, [calcMode, loanAmount, tenure, selectedProduct, customProducts, activeCustomId]);

  const initialMonthlyPayment = schedule.length > 0 ? schedule[0].payment : 0;
  const totalInterest = schedule.reduce((acc, curr) => acc + curr.interest, 0);
  
  // Grafik Setup
  const data = [ { name: 'Plafon Pinjaman', value: loanAmount }, { name: 'Total Bunga', value: totalInterest } ];
  const COLORS = ['#06b6d4', '#ec4899']; // Cyan-500 & Pink-500

  // Payment Summary Table Data (Ringkasan)
  const paymentSummary = useMemo(() => {
      if (schedule.length === 0) return [];
      const summaries = [];
      let currentGroup = { start: schedule[0].month, rate: schedule[0].rate, payment: schedule[0].payment, totalInterest: 0, totalPayment: 0, end: schedule[0].month };
      schedule.forEach((row, idx) => {
          if ((row.rate !== currentGroup.rate || Math.abs(row.payment - currentGroup.payment) > 100) && idx > 0) {
              summaries.push({ monthStart: currentGroup.start, monthEnd: currentGroup.end, rate: currentGroup.rate, monthlyPayment: currentGroup.payment, totalPayment: currentGroup.totalPayment, totalInterest: currentGroup.totalInterest });
              currentGroup = { start: row.month, rate: row.rate, payment: row.payment, totalInterest: 0, totalPayment: 0, end: row.month };
          }
          currentGroup.totalInterest += row.interest; currentGroup.totalPayment += row.payment; currentGroup.end = row.month;
      });
      summaries.push({ monthStart: currentGroup.start, monthEnd: currentGroup.end, rate: currentGroup.rate, monthlyPayment: currentGroup.payment, totalPayment: currentGroup.totalPayment, totalInterest: currentGroup.totalInterest });
      return summaries;
  }, [schedule]);

  // Handlers Input dengan String Replace (Auto-Format Rp)
  const handleHouseValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ''); 
    const numValue = Number(rawValue);
    setHouseValue(numValue);
    if (dpMode === 'percent') setDpAmount(numValue * (dpPercent / 100));
  };

  const handleDpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (dpMode === 'percent') {
        const val = Number(e.target.value);
        setDpAmount(houseValue * (Math.min(100, Math.max(0, val)) / 100));
    } else {
        const rawValue = e.target.value.replace(/\D/g, '');
        setDpAmount(Number(rawValue));
    }
  };

  const comparisonList = useMemo(() => {
      if (calcMode === 'bank') {
          let list: { bank: Bank; product: Product; payment: number }[] = [];
          BANKS.forEach(bank => bank.products.forEach(product => list.push({ bank, product, payment: calculateMonthlyPayment(loanAmount, product.rate, tenure) })));
          if (filterBankId !== 'all') list = list.filter(item => item.bank.id === filterBankId);
          if (sortOption === 'lowestRate') return list.sort((a, b) => a.product.rate - b.product.rate);
          if (sortOption === 'lowestPayment') return list.sort((a, b) => a.payment - b.payment);
          return list;
      } else {
          return customProducts.map(cp => {
               const firstTier = cp.tiers[0];
               return { product: cp, payment: calculateMonthlyPayment(loanAmount, firstTier.rate, tenure), rate: firstTier.rate };
          }).sort((a, b) => sortOption === 'lowestRate' ? a.rate - b.rate : a.payment - b.payment);
      }
  }, [sortOption, filterBankId, loanAmount, tenure, calcMode, customProducts]);

  const inputBaseClass = "w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold text-slate-800 shadow-sm";

  return (
    <div id="kpr-calculator-main" className="bg-white rounded-[2.5rem] shadow-2xl shadow-pink-500/10 p-6 md:p-10 border border-slate-100 relative">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-50 rounded-2xl text-cyan-500">
                <RefreshCw size={28} />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Kalkulator KPR Pro</h2>
                <p className="text-slate-500 text-sm mt-1">Hitung simulasi KPR akurat dengan skema bunga Fix & Floating.</p>
            </div>
          </div>
          <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1">
              <button onClick={() => setCalcMode('bank')} className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${calcMode === 'bank' ? 'bg-white text-pink-500 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                  <Building size={18} /> Bank Partner
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* --- KIRI: INPUT & CHART & TABEL --- */}
        <div className="xl:col-span-8 flex flex-col gap-6">
            
            <div className="bg-slate-50/50 rounded-[2rem] p-6 md:p-8 border border-slate-100 space-y-8">
                {/* Bank Selector */}
                {calcMode === 'bank' && (
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Pilih Bank Partner</label>
                        <div className="relative group">
                            <div ref={bankScrollRef} className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide snap-x">
                                {BANKS.map((bank) => (
                                    <button key={bank.id} onClick={() => setSelectedBank(bank)} className={`flex-shrink-0 snap-center min-w-[120px] px-4 py-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 ${selectedBank.id === bank.id ? 'border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-500/30' : 'border-slate-200 bg-white text-slate-600 hover:border-pink-300'}`}>
                                        {/* Fallback ke icon kalau logo kosong biar gak pecah */}
                                        {bank.logo ? (
                                            <img src={bank.logo} alt={bank.name} className="h-8 object-contain rounded-md" />
                                        ) : (
                                            <Building size={24} className={selectedBank.id === bank.id ? 'text-white' : 'text-slate-400'}/>
                                        )}
                                        <span className="text-sm font-bold mt-1">{bank.name}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 -left-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => scroll('left')} className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md border border-slate-100 text-slate-500 hover:text-pink-500 transition-all">
                                    <ChevronLeft size={20} />
                                </button>
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 -right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => scroll('right')} className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md border border-slate-100 text-slate-500 hover:text-pink-500 transition-all">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Kolom Input */}
                    <div className="space-y-6">
                         <div className="relative">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Program KPR</label>
                            <div className="relative">
                                <button onClick={() => setIsProductOpen(!isProductOpen)} className={`w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all flex justify-between items-center text-left shadow-sm`}>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-800">{selectedProduct.name}</span>
                                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Fix {selectedProduct.fixedYears} Tahun</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold">{selectedProduct.rate}%</div>
                                        <ChevronDown size={20} className="text-slate-400" />
                                    </div>
                                </button>
                                {isProductOpen && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-20 overflow-hidden">
                                        {selectedBank.products.map((prod, idx) => (
                                            <button key={idx} onClick={() => { setSelectedProduct(prod); setIsProductOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-slate-50 flex justify-between items-center border-b border-slate-50">
                                                <span className={`font-medium ${selectedProduct.name === prod.name ? 'text-pink-500' : 'text-slate-600'}`}>{prod.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Harga Properti</label>
                            {fixedHouseValue ? (
                                <div className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-bold flex justify-between">
                                    Rp {formatRp(houseValue)} <Lock size={16}/>
                                </div>
                            ) : (
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-slate-500 font-bold">Rp</span>
                                    <input type="text" value={formatRp(houseValue)} onChange={handleHouseValueInput} className={`${inputBaseClass} pl-12`} />
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-700">Uang Muka (DP)</label>
                                <div className="bg-slate-200 p-1 rounded-lg flex text-xs font-bold">
                                    <button onClick={() => setDpMode('percent')} className={`px-3 py-1 rounded-md ${dpMode === 'percent' ? 'bg-white text-pink-500 shadow' : 'text-slate-500'}`}>%</button>
                                    <button onClick={() => setDpMode('amount')} className={`px-3 py-1 rounded-md ${dpMode === 'amount' ? 'bg-white text-cyan-500 shadow' : 'text-slate-500'}`}>Rp</button>
                                </div>
                            </div>
                            <div className="relative">
                                {dpMode === 'percent' ? (
                                    <div className="relative">
                                        <input type="number" value={dpPercent.toFixed(1)} onChange={handleDpInput} className={inputBaseClass} />
                                        <div className="absolute right-4 top-3.5 text-slate-400 font-bold">%</div>
                                        <div className="text-right text-xs text-slate-500 mt-2 font-medium">= Rp {formatRp(Math.round(dpAmount))}</div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <span className="absolute left-4 top-3.5 text-slate-500 font-bold">Rp</span>
                                        <input type="text" value={formatRp(Math.round(dpAmount))} onChange={handleDpInput} className={`${inputBaseClass} pl-12`} />
                                        <div className="text-right text-xs text-slate-500 mt-2 font-medium">= {dpPercent.toFixed(1)}% dari Harga Properti</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 mt-4">
                             <label className="block text-sm font-bold text-slate-700 mb-4 mt-2">Lama Pinjaman: <span className="text-pink-500 text-lg">{tenure} Tahun</span></label>
                             <input type="range" min="5" max="30" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-pink-500 h-2 bg-slate-200 rounded-lg cursor-pointer" />
                        </div>
                    </div>

                    {/* Kolom Visualisasi (Pie Chart) */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                         <div className="text-center z-10">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Est. Cicilan Masa Fix</p>
                            <h3 className="text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 mt-2">
                                Rp {formatRp(Math.round(initialMonthlyPayment))} <span className="text-sm text-slate-400 font-medium">/bln</span>
                            </h3>
                            {calcMode === 'bank' && (
                                <div className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full inline-block mt-3 font-medium">
                                    Berlaku untuk {selectedProduct.fixedYears} tahun pertama
                                </div>
                            )}
                        </div>

                        <div className="h-48 w-full relative mt-6">
                            <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(value: number) => `Rp ${formatRp(value)}`} />
                            </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-[10px] uppercase text-slate-400 font-bold">Plafon KPR</span>
                                <span className="text-sm font-bold text-slate-700">Rp {formatRp(Math.round(loanAmount / 1000000))} Juta</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                             <div className="text-center p-3 bg-pink-50/50 border border-pink-100 rounded-xl">
                                 <div className="text-[10px] uppercase tracking-wider text-pink-400 font-bold mb-1">Total Bunga</div>
                                 <div className="font-bold text-pink-600 text-xs">Rp {formatRp(Math.round(totalInterest))}</div>
                             </div>
                             <div className="text-center p-3 bg-cyan-50/50 border border-cyan-100 rounded-xl">
                                 <div className="text-[10px] uppercase tracking-wider text-cyan-500 font-bold mb-1">Pokok Pinjaman</div>
                                 <div className="font-bold text-cyan-700 text-xs">Rp {formatRp(Math.round(loanAmount))}</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABEL RINGKASAN */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-50 rounded-lg text-pink-500"><CalendarClock size={24} /></div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Ringkasan Pembayaran</h3>
                            <p className="text-sm text-slate-500">Cek kapan cicilan Anda naik menjadi suku bunga floating.</p>
                        </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold">Tahun Ke-</th>
                                <th className="px-6 py-4 font-bold">Suku Bunga</th>
                                <th className="px-6 py-4 font-bold">Cicilan / Bulan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paymentSummary.map((row, idx) => {
                                const isFloating = idx > 0;
                                return (
                                <tr key={idx} className="bg-white hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        Bulan {row.monthStart} - {row.monthEnd} <br/>
                                        <span className="text-xs text-slate-400 font-normal">
                                            ({Math.ceil(row.monthStart/12)} - {Math.ceil(row.monthEnd/12)} Tahun)
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md font-bold text-xs ${isFloating ? 'bg-orange-50 text-orange-600' : 'bg-cyan-50 text-cyan-600'}`}>
                                            {isFloating ? `Floating ${row.rate}% (Asumsi)` : `Fix ${row.rate}%`}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 font-bold ${isFloating ? 'text-slate-700' : 'text-pink-500'}`}>
                                        Rp {formatRp(row.monthlyPayment)}
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ==========================================
                TABEL JADWAL PEMBAYARAN (AMORTIZATION)
            ========================================== */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm mt-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Payment Schedule</h3>
                        <p className="text-sm text-slate-500">Detailed breakdown of principal and interest over {tenure} years.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/contact')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200 transition-colors text-sm font-bold shadow-sm"
                        title="Available for Agents"
                    >
                        <Lock size={16} /> Export CSV (Locked)
                    </button>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-slate-100 shadow-sm">
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
                        <table className="w-full text-sm text-left text-slate-600 relative">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10 shadow-sm outline outline-1 outline-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold tracking-wider">MONTH</th>
                                    <th className="px-6 py-4 font-bold tracking-wider">PAYMENT</th>
                                    <th className="px-6 py-4 font-bold tracking-wider">INTEREST</th>
                                    <th className="px-6 py-4 font-bold tracking-wider">PRINCIPAL</th>
                                    <th className="px-6 py-4 font-bold tracking-wider">BALANCE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {schedule.map((row) => (
                                    <tr key={row.month} className="bg-white hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-800">{row.month}</td>
                                        <td className="px-6 py-4 font-bold text-slate-800">IDR {formatRp(row.payment)}</td>
                                        <td className="px-6 py-4 text-pink-500 font-medium">IDR {formatRp(row.interest)}</td>
                                        <td className="px-6 py-4 text-cyan-600 font-medium">IDR {formatRp(row.principal)}</td>
                                        <td className="px-6 py-4 text-slate-500 font-bold">IDR {formatRp(row.balance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button 
                        onClick={() => navigate('/contact')}
                        className="bg-pink-50 hover:bg-pink-100 text-pink-500 font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
                    >
                        <UserPlus size={18} />
                        Discuss this schedule with an agent
                    </button>
                </div>
            </div>

        </div>

        {/* --- KANAN: COMPARISON BOARD --- */}
        <div className="xl:col-span-4">
            <div className="bg-slate-50 rounded-[2rem] p-6 md:p-8 border border-slate-100 h-full flex flex-col">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">Bandingkan Promo Bank</h3>
                    <p className="text-sm text-slate-500 mb-6">Klik kartu di bawah untuk mengubah simulasi.</p>
                    
                    <div className="flex gap-2">
                        <button onClick={() => setSortOption('lowestRate')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${sortOption === 'lowestRate' ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30' : 'bg-white text-slate-500 border border-slate-200'}`}>
                            <Percent size={14} /> Bunga Terendah
                        </button>
                        <button onClick={() => setSortOption('lowestPayment')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${sortOption === 'lowestPayment' ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30' : 'bg-white text-slate-500 border border-slate-200'}`}>
                            <ArrowUpDown size={14} /> Cicilan Termurah
                        </button>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto space-y-4 pr-2 max-h-[800px] scrollbar-thin scrollbar-thumb-slate-300">
                     {comparisonList.map((item, idx) => {
                         const isActive = calcMode === 'bank' && selectedBank.id === item.bank.id && selectedProduct.name === item.product.name;
                         return (
                             <div key={idx} onClick={() => { setSelectedBank(item.bank); setSelectedProduct(item.product); }} className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 relative overflow-hidden bg-white ${isActive ? 'border-pink-500 shadow-lg shadow-pink-500/20 scale-[1.02]' : 'border-transparent hover:border-pink-200 shadow-sm'}`}>
                                 <div className="flex justify-between items-start mb-4">
                                     <div className="flex items-center gap-3">
                                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400">
                                            {/* Logic Logo yang Aman */}
                                            {item.bank.logo ? (
                                                <img src={item.bank.logo} alt={item.bank.name} className="h-6 object-contain rounded" />
                                            ) : (
                                                <Building size={20} />
                                            )}
                                         </div>
                                         <div>
                                             <h4 className="font-bold text-sm text-slate-800">{item.bank.name}</h4>
                                             <p className="text-[10px] text-slate-500 mt-0.5">{item.product.name}</p>
                                         </div>
                                     </div>
                                     {item.product.rate < 4 && <div className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-lg text-[10px] font-bold"><Star size={10} fill="currentColor" /></div>}
                                 </div>
                                 <div className="flex justify-between items-end border-t border-slate-50 pt-3 mt-1">
                                     <div>
                                         <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Bunga Fix</div>
                                         <div className="text-xl font-black text-cyan-500">{item.product.rate}%</div>
                                     </div>
                                     <div className="text-right">
                                         <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Est. Cicilan Masa Fix</div>
                                         <div className={`font-bold text-base ${isActive ? 'text-pink-500' : 'text-slate-700'}`}>Rp {formatRp(Math.round(item.payment))}</div>
                                     </div>
                                 </div>
                             </div>
                         );
                     })}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default KPRCalculator;