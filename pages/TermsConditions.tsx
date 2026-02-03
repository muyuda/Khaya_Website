import React from 'react';
import { FileText, AlertCircle, CheckCircle } from 'lucide-react';

const TermsConditions: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
       <div className="bg-white pt-12 pb-20 px-4 rounded-b-[3rem] shadow-sm border-b border-slate-100 mb-12">
           <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
               <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mx-auto mb-6">
                   <FileText size={32} />
               </div>
               <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">Terms & Conditions</h1>
               <p className="text-slate-500 font-medium">Effective Date: October 1, 2024</p>
           </div>
       </div>

       <div className="max-w-3xl mx-auto px-6 animate-fade-in-up delay-100">
           <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-8 text-slate-600 leading-relaxed">
               
               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Agreement to Terms</h2>
                   <p>
                       By accessing and using the Khaya Landmark website, you agree to be bound by these Terms and Conditions. 
                       If you disagree with any part of these terms, you may not access our services.
                   </p>
               </section>

               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <CheckCircle size={24} className="text-brand-pink" /> 2. Use of Our Services
                   </h2>
                   <p className="mb-4">
                       Our platform connects users with property listings and mortgage information. You agree to use these services only for lawful purposes and in a way that does not infringe on the rights of others.
                   </p>
                   <ul className="list-disc pl-5 space-y-2 marker:text-brand-pink">
                       <li>You must provide accurate information when inquiring about properties.</li>
                       <li>You may not use our website to distribute spam or malicious software.</li>
                       <li>Unauthorized scraping or data mining of our property listings is strictly prohibited.</li>
                   </ul>
               </section>

               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <AlertCircle size={24} className="text-brand-cyan" /> 3. Intellectual Property
                   </h2>
                   <p>
                       The content on this website, including text, graphics, logos, and property images (unless provided by third-party developers), is the property of Khaya Landmark and is protected by copyright laws. You may not reproduce or redistribute any content without our written permission.
                   </p>
               </section>

               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Property Listings & Accuracy</h2>
                   <p>
                       While we strive to keep our listings up to date, property prices, availability, and specifications are subject to change without notice. Khaya Landmark is not liable for any inaccuracies in the property descriptions provided by developers or sellers.
                   </p>
               </section>

               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Limitation of Liability</h2>
                   <p>
                       Khaya Landmark shall not be held liable for any indirect, incidental, or consequential damages arising from your use of our website or reliance on any information provided herein.
                   </p>
               </section>

               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Governing Law</h2>
                   <p>
                       These terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia.
                   </p>
               </section>

               <section className="pt-8 border-t border-slate-100">
                   <p className="text-sm text-slate-400">
                       Questions regarding these terms? Contact us at <a href="mailto:legal@khayalandmark.id" className="text-brand-cyan hover:underline">legal@khayalandmark.id</a>.
                   </p>
               </section>

           </div>
       </div>
    </div>
  );
};

export default TermsConditions;