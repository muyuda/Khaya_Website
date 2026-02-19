import React from 'react';
import KPRCalculator from '../components/KPRCalculator'; // Sesuaikan path jika beda

const KPR: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HEADER BIRU/CYAN di ATAS */}
      <div className="bg-cyan-500 pt-20 pb-32 px-4 text-center">
         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Mortgage Calculator</h1>
         <p className="text-cyan-50 text-lg font-medium max-w-2xl mx-auto">
            Plan your future with clarity. Estimate your monthly payments here.
         </p>
      </div>

      {/* POSISI CALCULATOR NAIK DIKIT BIAR ESTETIK */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
         <KPRCalculator />
      </div>
      
    </div>
  );
};

export default KPR;