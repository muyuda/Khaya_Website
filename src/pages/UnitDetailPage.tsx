import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Image, FileText, ChevronRight, MapPin, Bed, Bath, Car, ArrowLeft } from 'lucide-react';
import { projects } from '../data/mockData';
import { Unit } from '../types';
import KPRCalculator from './KPR'; // Menggunakan halaman KPR sebagai komponen
// Jika KPRCalculator export default-nya 'KPR', sesuaikan import di atas.
// Atau jika agan punya component terpisah: import KPRCalculator from '../components/KPRCalculator';

const UnitDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [relatedUnits, setRelatedUnits] = useState<Unit[]>([]);

  useEffect(() => {
    // 1. Cari Unit berdasarkan ID di dalam semua Project
    let foundUnit: Unit | undefined;
    
    // Loop semua project untuk mencari unit yang cocok
    for (const project of projects) {
        const u = project.units.find(u => u.id === id);
        if (u) {
            foundUnit = u;
            break;
        }
    }

    if (foundUnit) {
        setUnit(foundUnit);
        
        // 2. Cari Related Units (Unit lain di project yang sama)
        const parentProject = projects.find(p => p.id === foundUnit?.projectId);
        if (parentProject) {
            const others = parentProject.units
                .filter(u => u.id !== foundUnit?.id)
                .slice(0, 4); // Ambil maksimal 4
            setRelatedUnits(others);
        }
    }
  }, [id]);

  if (!unit) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
            <p className="text-xl font-bold mb-4">Unit tidak ditemukan.</p>
            <Link to="/projects" className="text-pink-500 hover:underline">Kembali ke Project</Link>
        </div>
    );
  }

  return (
    <div className="bg-slate-50 pb-20">
      
      {/* --- 1. HERO IMAGE UNIT (Bagian Atas) --- */}
      <div className="relative h-[60vh] w-full bg-slate-900 overflow-hidden">
        <img 
            src={unit.imageUrl} 
            alt={unit.type} 
            className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-screen-2xl mx-auto">
            <Link to={`/project/${unit.projectId}`} className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Back to {unit.projectName}
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-3 inline-block">
                        {unit.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{unit.type}</h1>
                    <div className="flex items-center text-slate-300">
                        <MapPin size={18} className="mr-2 text-pink-500" />
                        {unit.location}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- 2. KONTEN UTAMA (Sesuai Request Agan) --- */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Main Details */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg shadow-pink-500/5 border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                         <h2 className="text-2xl font-bold text-slate-800">About This Unit</h2>
                         <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
                            {unit.priceDisplay}
                         </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed mb-8 text-lg">{unit.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-700">
                                <CheckCircle size={18} className="text-pink-500"/> Specifications
                            </h3>
                            <div className="space-y-3">
                                {unit.specifications.map((spec, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                        <span className="text-sm font-medium text-slate-600">{spec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-700">
                                <Image size={18} className="text-cyan-500"/> Facilities
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {unit.facilities.map((fac, i) => (
                                    <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 shadow-sm">{fac}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promo Section */}
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-lg text-xs font-bold mb-3 uppercase tracking-wider">Limited Offer</div>
                        <h2 className="text-2xl font-bold mb-2">Special Promo</h2>
                        <p className="text-lg opacity-95 font-medium">{unit.promo}</p>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Sidebar Sticky */}
            <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-24">
                     <h3 className="font-bold mb-6 text-xl">Property Summary</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-slate-500 text-sm">Location</span>
                            <span className="font-bold text-right text-sm text-slate-800">{unit.location}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-slate-500 text-sm">Land Area (LT)</span>
                            <span className="font-bold text-right text-sm text-slate-800">{unit.landArea} m²</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-slate-500 text-sm">Building Area (LB)</span>
                            <span className="font-bold text-right text-sm text-slate-800">{unit.buildingArea} m²</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-slate-500 text-sm">Bedrooms</span>
                            <span className="font-bold text-right text-sm text-slate-800">{unit.bedrooms}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-slate-500 text-sm">Bathrooms</span>
                            <span className="font-bold text-right text-sm text-slate-800">{unit.bathrooms}</span>
                        </div>
                     </div>
                     
                     <div className="mt-8 flex flex-col gap-3">
                        <button className="w-full py-4 bg-cyan-500 text-white rounded-2xl font-bold hover:bg-cyan-600 transition-all flex justify-center items-center gap-2 shadow-lg shadow-cyan-500/20 transform hover:-translate-y-1">
                            <FileText size={20} /> Download E-Brochure
                        </button>
                     </div>
                </div>
            </div>
      </div>
      
      {/* --- 3. KPR CALCULATOR (Full Width) --- */}
      {/* Note: Saya pass nilai unit.price biar otomatis keisi harganya */}
      <div id="kpr-section" className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 mb-12">
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
             {/* Kalau KPRCalculator agan tidak terima props, hapus property 'fixedHouseValue' */}
             <KPRCalculator /> 
           </div>
      </div>

      {/* --- 4. RELATED UNITS --- */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 mt-24">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">More in {unit.projectName}</h2>
              <Link to={`/project/${unit.projectId}`} className="flex items-center gap-2 text-pink-500 font-bold hover:gap-3 transition-all">
                  View Project <ChevronRight size={18} />
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {relatedUnits.map(u => (
                 <Link to={`/unit/${u.id}`} key={u.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
                    <div className="h-48 overflow-hidden relative">
                        <img src={u.imageUrl} alt={u.type} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-slate-800">
                            {u.priceDisplay}
                        </div>
                    </div>
                    <div className="p-4">
                        <h4 className="font-bold text-slate-800 mb-1">{u.type}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                            <span className="flex items-center gap-1"><Bed size={14}/> {u.bedrooms}</span>
                            <span className="flex items-center gap-1"><Bath size={14}/> {u.bathrooms}</span>
                            <span className="flex items-center gap-1"><Car size={14}/> {u.carports}</span>
                        </div>
                    </div>
                 </Link>
               ))}
               {relatedUnits.length === 0 && <p className="text-slate-400 italic">No other units available.</p>}
           </div>
      </div>

    </div>
  );
};

export default UnitDetailPage;