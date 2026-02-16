import React from 'react';
import KPRCalculator from '../components/KPRCalculator';

const KPRPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-brand-cyan py-20 rounded-b-[3rem] relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mortgage Calculator</h1>
          <p className="text-xl text-slate-100">Plan your future with clarity. Estimate your monthly payments here.</p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 pb-20">
        <KPRCalculator initialPrice={0} />
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
                 <h2 className="text-2xl font-bold text-slate-800 mb-6">Why Use KPR?</h2>
                 <p className="text-slate-600 mb-4 leading-relaxed">
                    Kredit Pemilikan Rumah (KPR) allows you to own your dream home sooner without waiting to save the full amount. 
                    With competitive interest rates from our partner banks, home ownership is more accessible than ever for Gen Z.
                 </p>
                 <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink font-bold">1</div>
                        <div>
                            <h4 className="font-bold text-slate-700">Financial Flexibility</h4>
                            <p className="text-sm text-slate-500">Keep your cash flow healthy while investing in an asset.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold">2</div>
                        <div>
                            <h4 className="font-bold text-slate-700">Long Tenure Options</h4>
                            <p className="text-sm text-slate-500">Installments up to 20-30 years make monthly payments affordable.</p>
                        </div>
                    </div>
                 </div>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                 <h2 className="text-xl font-bold text-slate-800 mb-6">General Requirements</h2>
                 <ul className="space-y-3 text-slate-600">
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-pink rounded-full"></div> Indonesian Citizen (WNI)</li>
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-pink rounded-full"></div> Min. 21 years old or married</li>
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-pink rounded-full"></div> Employee / Professional / Entrepreneur</li>
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-pink rounded-full"></div> Clean BI Checking History</li>
                 </ul>
             </div>
        </div>
      </div>
    </div>
  );
};

export default KPRPage;