import React from 'react';
import KPRCalculator from '../components/KPRCalculator'; // Assuming KPRCalculator is in components folder

const KPR: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50 text-slate-800 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">KPR Simulation</h1>
        <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-16">
          Calculate your estimated monthly payments and understand the breakdown of your home loan with our interactive KPR Calculator.
        </p>
        <KPRCalculator initialPrice={1500000000} /> {/* Provide a default initial price */}
      </div>
    </div>
  );
};

export default KPR;
