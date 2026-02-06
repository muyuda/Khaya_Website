import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Home, DollarSign, PenTool } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:shadow-md hover:border-brand-pink/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
      >
        <span className={`font-bold text-lg ${isOpen ? 'text-brand-pink' : 'text-slate-700'}`}>{question}</span>
        {isOpen ? <ChevronUp className="text-brand-pink" /> : <ChevronDown className="text-slate-400" />}
      </button>
      <div 
        className={`px-6 text-slate-500 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="leading-relaxed border-t border-slate-100 pt-4">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
       <div className="bg-white pt-12 pb-24 px-4 rounded-b-[3rem] shadow-sm border-b border-slate-100 relative overflow-hidden">
           {/* Decor */}
           <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-brand-pink/5 rounded-full blur-3xl"></div>
           <div className="absolute bottom-[10%] left-[-5%] w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl"></div>

           <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-cyan flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-brand-pink/20">
                   <HelpCircle size={32} />
               </div>
               <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">Frequently Asked Questions</h1>
               <p className="text-xl text-slate-500 font-medium">Got questions? We've got answers.</p>
           </div>
       </div>

       <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20 space-y-12 animate-fade-in-up delay-100">
           
           {/* Section 1: Buying Property */}
           <div>
               <div className="flex items-center gap-3 mb-6 px-2">
                   <div className="p-2 bg-brand-pink/10 rounded-lg text-brand-pink">
                       <Home size={24} />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-800">Buying Property</h2>
               </div>
               <div className="space-y-4">
                   <FAQItem 
                     question="How do I book a viewing for a unit?" 
                     answer="It's super easy! Just browse to the project or unit you like, click the 'Contact Us' floating button, and select 'Schedule Visit'. Fill in your preferred date and time, and our agent will confirm via WhatsApp."
                   />
                   <FAQItem 
                     question="What is the difference between Primary and Secondary projects?" 
                     answer="Primary projects are brand new developments sold directly by developers (often still under construction or brand new). Secondary projects are pre-owned properties sold by individual owners."
                   />
                   <FAQItem 
                     question="Are the prices listed negotiable?" 
                     answer="For Primary projects, prices are usually fixed by the developer, but they often come with promos! For Secondary projects, prices are generally negotiable directly with the owner through our agents."
                   />
               </div>
           </div>

           {/* Section 2: KPR & Finance */}
           <div>
               <div className="flex items-center gap-3 mb-6 px-2">
                   <div className="p-2 bg-brand-cyan/10 rounded-lg text-brand-cyan">
                       <DollarSign size={24} />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-800">KPR & Payment</h2>
               </div>
               <div className="space-y-4">
                   <FAQItem 
                     question="How much Down Payment (DP) do I need?" 
                     answer="Generally, the minimum DP is around 5-20% depending on the bank and the property type. However, many developers offer low DP promos or even 0% DP programs for specific primary projects."
                   />
                   <FAQItem 
                     question="Can you help me process my KPR application?" 
                     answer="Absolutely! We partner with top banks like BCA, Mandiri, and CIMB Niaga. Our team will guide you through document preparation and submission to ensure a high approval chance."
                   />
                   <FAQItem 
                     question="What documents do I need for KPR?" 
                     answer="Standard documents include KTP, NPWP, Marriage Certificate (if applicable), Pay Slips (3 months), and Bank Statements (3 months). Entrepreneurs need Business Licenses (SIUP/TDP)."
                   />
               </div>
           </div>

           {/* Section 3: General */}
           <div>
               <div className="flex items-center gap-3 mb-6 px-2">
                   <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                       <PenTool size={24} />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-800">General</h2>
               </div>
               <div className="space-y-4">
                   <FAQItem 
                     question="Where is Khaya Landmark located?" 
                     answer="Our HQ is located at South Quarter, Tower A, Cilandak, South Jakarta. We'd love to have you over for coffee and consultation!"
                   />
                   <FAQItem 
                     question="Do I need to pay a fee to use your services?" 
                     answer="Nope! Searching for properties and consulting with our agents is completely free for buyers. We only earn a commission from the developer or seller once a transaction is successful."
                   />
               </div>
           </div>

       </div>
    </div>
  );
};

export default FAQ;