import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
       <div className="bg-white pt-12 pb-20 px-4 rounded-b-[3rem] shadow-sm border-b border-slate-100 mb-12">
           <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
               <div className="w-16 h-16 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink mx-auto mb-6">
                   <Shield size={32} />
               </div>
               <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">Privacy Policy</h1>
               <p className="text-slate-500 font-medium">Last updated: October 2024</p>
           </div>
       </div>

       <div className="max-w-3xl mx-auto px-6 animate-fade-in-up delay-100">
           <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-8 text-slate-600 leading-relaxed">
               
               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                       1. Introduction
                   </h2>
                   <p>
                       Welcome to Khaya Landmark. We value your trust and are committed to protecting your personal data. 
                       This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
                       or use our services.
                   </p>
               </section>

               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <Eye size={24} className="text-brand-cyan" /> 2. Information We Collect
                   </h2>
                   <p className="mb-4">
                       We collect information that you provide directly to us, such as when you create an account, 
                       subscribe to our newsletter, or fill out a contact form. This may include:
                   </p>
                   <ul className="list-disc pl-5 space-y-2 marker:text-brand-pink">
                       <li>Personal identification (Name, Email, Phone Number)</li>
                       <li>Property preferences and budget</li>
                       <li>Financial information for KPR simulation purposes</li>
                   </ul>
               </section>

               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <Lock size={24} className="text-brand-pink" /> 3. How We Use Your Data
                   </h2>
                   <p className="mb-4">
                       Your data is used to provide and improve our services, including:
                   </p>
                   <ul className="list-disc pl-5 space-y-2 marker:text-brand-cyan">
                       <li>Processing your property inquiries and scheduling visits.</li>
                       <li>Connecting you with our agents or partner banks.</li>
                       <li>Sending you updates on new listings that match your vibe.</li>
                       <li>Improving our AI assistant, Aura, to better serve you.</li>
                   </ul>
               </section>

               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Cookies & Tracking</h2>
                   <p>
                       We use cookies to enhance your browsing experience. These small data files help us remember your 
                       preferences (like your language setting or favorite properties) and analyze site traffic to ensure 
                       our platform runs smoothly.
                   </p>
               </section>

               <section>
                   <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Third-Party Sharing</h2>
                   <p>
                       We do not sell your personal data. We may share your information with trusted third parties, 
                       such as property developers or banks, only when you explicitly request a service (e.g., KPR application).
                   </p>
               </section>

               <section className="pt-8 border-t border-slate-100">
                   <p className="text-sm text-slate-400">
                       If you have any questions about this policy, please contact us at <a href="mailto:privacy@khayalandmark.id" className="text-brand-pink hover:underline">privacy@khayalandmark.id</a>.
                   </p>
               </section>

           </div>
       </div>
    </div>
  );
};

export default PrivacyPolicy;