import React from 'react';
import { Target, Heart, Zap, Home, Building2, TrendingUp, Megaphone, Cpu, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 overflow-hidden">
      {/* --- Hero Section --- */}
      <div className="relative pt-12 pb-24 px-4 rounded-b-[3rem] bg-white border-b border-slate-100 shadow-sm overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-3xl pointer-events-none animate-float"></div>
        <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
           <span className="inline-block py-1 px-3 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold uppercase tracking-wider mb-4">
              Est. 2024
           </span>
           <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 tracking-tight">
             Not Your Parents' <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-cyan">Real Estate Agency.</span>
           </h1>
           <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
             Khaya Landmark is where the next generation finds their sanctuary. We blend modern tech with human connection to make finding a home a vibe, not a chore.
           </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 -mt-10 relative z-20">
        
        {/* --- Values Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 animate-fade-in-up delay-100">
           <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-brand-pink/5 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Vibe Curation</h3>
              <p className="text-slate-500 leading-relaxed">
                We don't just sell square footage; we sell lifestyles. Whether it's a cozy nook or a party pad, we get what you need.
              </p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-brand-cyan/5 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Tech First</h3>
              <p className="text-slate-500 leading-relaxed">
                From AI assistants to KPR calculators, we use technology to strip away the complexity of buying property.
              </p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-brand-pink/5 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-cyan flex items-center justify-center text-white mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Transparency</h3>
              <p className="text-slate-500 leading-relaxed">
                No hidden fees, no confusing jargon. Just straight talk and honest advice for your financial future.
              </p>
           </div>
        </div>

        {/* --- Project Types Section --- */}
        <div className="mb-24 animate-fade-in-up delay-200">
            <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-4xl font-bold text-slate-800 mb-2">What We Offer</h2>
                    <p className="text-slate-500">A diverse portfolio tailored to your stage in life.</p>
                </div>
                <div className="h-1 w-full md:w-1/3 bg-gradient-to-r from-brand-pink/20 to-transparent rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primary Projects Card */}
                <div className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-brand-cyan/20 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Building2 size={200} className="text-brand-cyan" />
                    </div>
                    <div className="p-10 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-brand-cyan text-white flex items-center justify-center mb-6 shadow-lg shadow-brand-cyan/30">
                            <Building2 size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-4">Primary Projects</h3>
                        <p className="text-slate-600 mb-6 text-lg">
                            Brand new developments straight from top-tier developers. Be the first to live in modern apartments, clustered housing, and smart cities.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="w-2 h-2 rounded-full bg-brand-cyan"></div> New Launch Pricing
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="w-2 h-2 rounded-full bg-brand-cyan"></div> Developer Warranties
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="w-2 h-2 rounded-full bg-brand-cyan"></div> Modern Architecture
                            </li>
                        </ul>
                    </div>
                    <div className="h-2 w-full bg-brand-cyan"></div>
                </div>

                {/* Secondary Projects Card */}
                <div className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-brand-pink/20 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Home size={200} className="text-brand-pink" />
                    </div>
                    <div className="p-10 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-brand-pink text-white flex items-center justify-center mb-6 shadow-lg shadow-brand-pink/30">
                            <Home size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-4">Secondary Projects</h3>
                        <p className="text-slate-600 mb-6 text-lg">
                            Curated resale properties in established neighborhoods. Find hidden gems, renovation projects, or ready-to-move-in homes with character.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="w-2 h-2 rounded-full bg-brand-pink"></div> Proven Locations
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="w-2 h-2 rounded-full bg-brand-pink"></div> Quick Move-in
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="w-2 h-2 rounded-full bg-brand-pink"></div> Unique Designs
                            </li>
                        </ul>
                    </div>
                    <div className="h-2 w-full bg-brand-pink"></div>
                </div>
            </div>
        </div>

        {/* --- Leadership Structure --- */}
        <div className="animate-fade-in-up delay-300">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">The Leadership</h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                    Khaya Landmark is led by two distinct forces, balancing creative vision with structural integrity.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                 
                 {/* Partner 1: Sales & Marketing */}
                 <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden group hover:border-brand-pink/30 transition-colors">
                     <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-pink/10 to-transparent"></div>
                     
                     <div className="relative z-10 flex flex-col items-center text-center">
                         <div className="w-32 h-32 rounded-full bg-white border-4 border-brand-pink p-1 shadow-2xl mb-6 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                             <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-brand-pink">
                                <Megaphone size={48} />
                             </div>
                             <div className="absolute bottom-0 right-0 bg-brand-pink text-white p-2 rounded-full shadow-lg">
                                 <Briefcase size={16} />
                             </div>
                         </div>
                         
                         <h3 className="text-2xl font-bold text-slate-800 mb-1">Dimas Adi Saputra</h3>
                         <div className="text-brand-pink font-bold uppercase tracking-widest text-sm mb-6">Managing Partner - Sales & Marketing</div>
                         
                         <p className="text-slate-500 leading-relaxed mb-8">
                             "The Connector." Responsible for the brand's voice, curating our project listings, and leading our team of agents. They ensure that every Khaya property matches the vibe of our clients.
                         </p>

                         <div className="flex gap-2">
                            <span className="px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">Brand Strategy</span>
                            <span className="px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">Client Relations</span>
                         </div>
                     </div>
                 </div>

                 {/* Partner 2: Finance & Tech */}
                 <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden group hover:border-brand-cyan/30 transition-colors">
                     <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-cyan/10 to-transparent"></div>
                     
                     <div className="relative z-10 flex flex-col items-center text-center">
                         <div className="w-32 h-32 rounded-full bg-white border-4 border-brand-cyan p-1 shadow-2xl mb-6 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                             <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-brand-cyan">
                                <Cpu size={48} />
                             </div>
                             <div className="absolute bottom-0 right-0 bg-brand-cyan text-white p-2 rounded-full shadow-lg">
                                 <TrendingUp size={16} />
                             </div>
                         </div>
                         
                         <h3 className="text-2xl font-bold text-slate-800 mb-1">Raden Fadil Aji Saputra</h3>
                         <div className="text-brand-cyan font-bold uppercase tracking-widest text-sm mb-6">Managing Partner - Finance & Technology</div>
                         
                         <p className="text-slate-500 leading-relaxed mb-8">
                             "The Architect." Responsible for the company's financial health and technological infrastructure. They ensure that our digital tools, KPR simulators, and internal systems are cutting-edge.
                         </p>

                         <div className="flex gap-2">
                            <span className="px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">Fiscal Growth</span>
                            <span className="px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">Innovation</span>
                         </div>
                     </div>
                 </div>

             </div>
        </div>

      </div>
    </div>
  );
};

export default About;