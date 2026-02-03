// pages/UnitDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Hero, UnitCard } from '../components/UIComponents';
import * as propertyService from '../services/propertyService';
import { Unit } from '../types';
import { CheckCircle, Image, ChevronRight, ChevronLeft, X, FileText } from 'lucide-react';
import { KPRCalculator } from '../components/KPRCalculator';
import { useLightbox } from '../hooks/useLightbox';

const Lightbox: React.FC<{
    images: string[];
    index: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}> = ({ images, index, onClose, onNext, onPrev }) => (
    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fade-in p-4">
        <button
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 bg-black/20 rounded-full p-2"
            onClick={onClose}
        >
            <X size={32} />
        </button>
        <button
            className="absolute left-4 lg:left-8 text-white/50 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full z-50 hidden sm:block"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
            <ChevronLeft size={48} />
        </button>
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
            <img
                src={images[index]}
                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl animate-scale-in"
                alt="Gallery"
            />
        </div>
        <button
            className="absolute right-4 lg:right-8 text-white/50 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full z-50 hidden sm:block"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
            <ChevronRight size={48} />
        </button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
            {index + 1} / {images.length}
        </div>
    </div>
);


export const UnitDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [unit, setUnit] = useState<Unit | undefined>();
    const [relatedUnits, setRelatedUnits] = useState<Unit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    const galleryUrls = unit?.galleryUrls || [];
    const { isLightboxOpen, lightboxIndex, openLightbox, closeLightbox, nextImage, prevImage } = useLightbox({ gallery: galleryUrls });

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const unitData = await propertyService.getUnitById(id);
                if (unitData) {
                    setUnit(unitData);
                    const relatedData = await propertyService.getUnitsByProjectId(unitData.projectId);
                    setRelatedUnits(relatedData.filter(u => u.id !== id));
                }
            } catch (error) {
                console.error(`Failed to fetch unit detail for id: ${id}`, error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (isLoading) {
        return <div className="p-20 text-center">Loading...</div>; // A more robust skeleton could be here
    }

    if (!unit) return <div className="p-20 text-center">Unit not found</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {isLightboxOpen && (
                <Lightbox 
                    images={galleryUrls}
                    index={lightboxIndex}
                    onClose={closeLightbox}
                    onNext={nextImage}
                    onPrev={prevImage}
                />
            )}
            
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
                <div 
                    onClick={() => openLightbox(activeImage)}
                    className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer h-full border border-black/5"
                >
                    <img 
                        src={galleryUrls[activeImage] || unit.imageUrl} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        alt={unit.type} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to expand
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <span className="bg-brand-pink px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block shadow-lg">{unit.category}</span>
                        <h1 className="text-4xl font-bold mb-1 drop-shadow-md">{unit.type}</h1>
                        <p className="text-xl font-medium text-brand-cyan drop-shadow-sm">{unit.projectName}</p>
                    </div>
                </div>

                <div className="hidden lg:grid grid-cols-2 gap-4 h-full">
                    {galleryUrls.slice(0, 4).map((url, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => {
                                if (idx === 3 && galleryUrls.length > 4) {
                                    openLightbox(3);
                                } else {
                                    setActiveImage(idx);
                                }
                            }}
                            className={`relative rounded-2xl overflow-hidden cursor-pointer group border border-slate-200 ${activeImage === idx ? 'ring-4 ring-brand-cyan' : ''}`}
                        >
                            <img src={url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Gallery ${idx}`} />
                            {idx === 3 && galleryUrls.length > 4 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px] transition-all hover:bg-black/70">
                                    <span className="text-white font-bold text-xl group-hover:scale-110 transition-transform">+{galleryUrls.length - 4} More</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="lg:hidden flex overflow-x-auto gap-3 mt-4 pb-4 snap-x">
                 {galleryUrls.map((url, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => openLightbox(idx)}
                        className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden snap-center border-2 ${activeImage === idx ? 'border-brand-pink' : 'border-transparent'}`}
                    >
                        <img src={url} className="w-full h-full object-cover" alt="thumb" />
                    </div>
                 ))}
            </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg shadow-brand-pink/5 border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                         <h2 className="text-2xl font-bold text-slate-800">About This Unit</h2>
                         <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-cyan">
                            {unit.priceDisplay}
                         </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed mb-8 text-lg">{unit.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-700">
                                <CheckCircle size={18} className="text-brand-pink"/> Specifications
                            </h3>
                            <div className="space-y-3">
                                {unit.specifications.map((spec, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>
                                        <span className="text-sm font-medium text-slate-600">{spec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-700">
                                <Image size={18} className="text-brand-cyan"/> Facilities
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {unit.facilities.map((fac, i) => (
                                    <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 shadow-sm">{fac}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                 <div className="bg-gradient-to-r from-brand-pink to-brand-pink-dark rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-lg text-xs font-bold mb-3 uppercase tracking-wider">Limited Offer</div>
                        <h2 className="text-2xl font-bold mb-2">Special Promo</h2>
                        <p className="text-lg opacity-95 font-medium">{unit.promo}</p>
                    </div>
                 </div>
            </div>

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
                        <button className="w-full py-4 bg-brand-cyan text-white rounded-2xl font-bold hover:bg-brand-cyan-dark transition-all flex justify-center items-center gap-2 shadow-lg shadow-brand-cyan/20 transform hover:-translate-y-1">
                            <FileText size={20} /> Download E-Brochure
                        </button>
                     </div>
                </div>
            </div>
        </div>
        
        <div id="kpr-section" className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 mb-12">
            <KPRCalculator fixedHouseValue={unit.price} />
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 mt-24">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800">More in {unit.projectName}</h2>
                <Link to={`/project/${unit.projectId}`} className="flex items-center gap-2 text-brand-pink font-bold hover:gap-3 transition-all">
                    View Project <ChevronRight size={18} />
                </Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {relatedUnits.map(u => <UnitCard key={u.id} unit={u} />)}
             </div>
        </div>
    </div>
    );
};

export default UnitDetailPage;
