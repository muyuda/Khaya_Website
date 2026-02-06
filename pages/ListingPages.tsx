import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Hero, ProjectCard, UnitCard } from '../components/UIComponents';
import { MOCK_PROJECTS, MOCK_UNITS } from '../constants';
import { Filter, LayoutGrid, CheckCircle, FileText, Image, ChevronRight, ChevronLeft, X, ChevronDown, Check, MapPin, Home, Tag, Briefcase, Search, SlidersHorizontal, DollarSign } from 'lucide-react';
import { KPRCalculator } from '../components/KPRCalculator';

// --- Custom Dropdown Component ---
interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  icon?: React.ElementType;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayValue = value === 'All' ? `All ${label}s` : value;

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-2xl border flex items-center justify-between transition-all duration-300 bg-white group text-left ${isOpen ? 'border-brand-pink ring-2 ring-brand-pink/10 shadow-lg shadow-brand-pink/5' : 'border-slate-200 hover:border-brand-pink/50 hover:shadow-md'}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
            {Icon && (
                <div className={`p-2 rounded-lg transition-colors ${value !== 'All' ? 'bg-brand-pink/10 text-brand-pink' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                    <Icon size={18} />
                </div>
            )}
            <div className="flex flex-col items-start truncate">
                <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-0.5">{label}</span>
                <span className={`text-sm font-bold truncate ${value === 'All' ? 'text-slate-500' : 'text-slate-800'}`}>
                    {displayValue}
                </span>
            </div>
        </div>
        <ChevronDown size={16} className={`text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-pink' : 'group-hover:text-slate-500'}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 max-h-60 overflow-y-auto animate-fade-in-up scrollbar-thin scrollbar-thumb-slate-200">
           {['All', ...options.filter(o => o !== 'All')].map((opt) => (
               <button
                 key={opt}
                 onClick={() => { onChange(opt); setIsOpen(false); }}
                 className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center justify-between group transition-colors border-b border-slate-50 last:border-0"
               >
                  <span className={opt === value ? 'text-brand-pink font-bold' : 'text-slate-600 group-hover:text-slate-800'}>
                    {opt === 'All' ? `All ${label}s` : opt}
                  </span>
                  {opt === value && <Check size={16} className="text-brand-pink" />}
               </button>
           ))}
        </div>
      )}
    </div>
  );
};

// --- Price Dropdown Component ---
interface PriceDropdownProps {
  value: number;
  onChange: (val: number) => void;
}

const PriceDropdown: React.FC<PriceDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-2xl border flex items-center justify-between transition-all duration-300 bg-white group text-left ${isOpen ? 'border-brand-pink ring-2 ring-brand-pink/10 shadow-lg shadow-brand-pink/5' : 'border-slate-200 hover:border-brand-pink/50 hover:shadow-md'}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
            <div className={`p-2 rounded-lg transition-colors ${value < 10000000000 ? 'bg-brand-pink/10 text-brand-pink' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                <DollarSign size={18} />
            </div>
            <div className="flex flex-col items-start truncate">
                <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-0.5">Max Price</span>
                <span className={`text-sm font-bold truncate ${value < 10000000000 ? 'text-slate-800' : 'text-slate-500'}`}>
                    IDR {(value / 1000000000).toFixed(1)} M
                </span>
            </div>
        </div>
        <ChevronDown size={16} className={`text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-pink' : 'group-hover:text-slate-500'}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 p-4 animate-fade-in-up">
           <div className="mb-4">
               <label className="text-xs font-bold text-slate-500 mb-2 block">Maximum Price Limit</label>
               <input 
                   type="range" 
                   min="100000000" 
                   max="10000000000" 
                   step="100000000"
                   value={value}
                   onChange={(e) => onChange(Number(e.target.value))}
                   className="w-full accent-brand-pink h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer hover:bg-slate-200 transition-colors"
               />
           </div>
           <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
               <span>100M</span>
               <span>10B+</span>
           </div>
        </div>
      )}
    </div>
  );
};

// --- Projects List Page ---
export const ProjectsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const qParam = searchParams.get('q');
  
  const [searchMode, setSearchMode] = useState<'project' | 'unit'>('project');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [filterCat, setFilterCat] = useState<'All' | 'Primary' | 'Secondary'>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [filterDeveloper, setFilterDeveloper] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(10000000000); // Max Price 10B

  // Sync initial state with URL params
  useEffect(() => {
    if (catParam === 'Primary' || catParam === 'Secondary') {
      setFilterCat(catParam);
    }
    if (qParam) {
        setSearchTerm(qParam);
    }
  }, [catParam, qParam]);

  // Extract unique values for dropdowns
  const locations = useMemo(() => Array.from(new Set(MOCK_PROJECTS.map(p => p.location))), []);
  const developers = useMemo(() => Array.from(new Set(MOCK_PROJECTS.map(p => p.developer))), []);
  const types = ['House', 'Apartment', 'Ruko', 'Villa'];

  const filteredProjects = MOCK_PROJECTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCat === 'All' || p.category === filterCat;
    const matchesType = filterType === 'All' || p.propertyType === filterType;
    const matchesLocation = filterLocation === 'All' || p.location === filterLocation;
    const matchesDeveloper = filterDeveloper === 'All' || p.developer === filterDeveloper;
    return matchesSearch && matchesCat && matchesType && matchesLocation && matchesDeveloper;
  });

  const filteredUnits = MOCK_UNITS.filter(u => {
    // Helper to find parent project for developer info
    const parentProject = MOCK_PROJECTS.find(p => p.id === u.projectId);
    
    const matchesSearch = u.type.toLowerCase().includes(searchTerm.toLowerCase()) || u.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || u.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCat === 'All' || u.category === filterCat;
    const matchesLocation = filterLocation === 'All' || u.location === filterLocation;
    const matchesPrice = u.price <= priceRange;
    const matchesDeveloper = filterDeveloper === 'All' || (parentProject && parentProject.developer === filterDeveloper);
    
    // Type matching for units is slightly different, usually defined in 'type' string or inferred from project propertyType
    // For simplicity, we assume if project matches type, unit does too
    const matchesType = filterType === 'All' || (parentProject && parentProject.propertyType === filterType);

    return matchesSearch && matchesCat && matchesLocation && matchesPrice && matchesDeveloper && matchesType;
  });

  const clearFilters = () => {
    setFilterCat('All');
    setFilterType('All');
    setFilterLocation('All');
    setFilterDeveloper('All');
    setPriceRange(10000000000);
    setSearchTerm('');
  };

  const hasActiveFilters = filterCat !== 'All' || filterType !== 'All' || filterLocation !== 'All' || filterDeveloper !== 'All' || priceRange < 10000000000;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white shadow-sm border-b border-brand-pink/20 relative z-30">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
             <div className="flex flex-col gap-6">
                 
                 {/* Top Row: Title & Mode Toggle */}
                 <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-800">Discover Properties</h1>
                    
                    {/* Mode Toggle */}
                    <div className="bg-slate-100 p-1 rounded-2xl flex shadow-inner">
                        <button 
                            onClick={() => setSearchMode('project')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${searchMode === 'project' ? 'bg-white text-brand-pink shadow-md transform scale-105 ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Projects
                        </button>
                        <button 
                             onClick={() => setSearchMode('unit')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${searchMode === 'unit' ? 'bg-white text-brand-cyan shadow-md transform scale-105 ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Units
                        </button>
                    </div>
                 </div>

                 {/* Row 2: Search Bar & Filter Toggle */}
                 <div className="flex flex-col md:flex-row gap-4 items-stretch">
                     {/* Search Box - Takes full width available */}
                     <div className="relative flex-grow z-20">
                        <div className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white flex items-center gap-3 transition-all duration-300 focus-within:border-brand-pink focus-within:ring-2 focus-within:ring-brand-pink/10 focus-within:shadow-lg focus-within:shadow-brand-pink/5 hover:border-brand-pink/50 hover:shadow-md h-full">
                            <div className={`p-2 rounded-lg transition-colors ${searchTerm ? 'bg-brand-pink/10 text-brand-pink' : 'bg-slate-50 text-slate-400'}`}>
                                <Search size={18} />
                            </div>
                            <div className="flex-grow flex flex-col items-start h-full justify-center">
                                <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-0.5">Search</span>
                                <input 
                                    type="text" 
                                    placeholder={`Name, Location...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full text-sm font-bold text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none p-0 border-none h-auto leading-tight"
                                />
                            </div>
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-brand-pink p-1">
                                    <X size={16}/>
                                </button>
                            )}
                        </div>
                     </div>
                     
                     {/* Filter Toggle Button */}
                     <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm border ${showFilters ? 'bg-brand-pink text-white border-brand-pink shadow-brand-pink/20' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-pink/50 hover:bg-slate-50'}`}
                     >
                         <SlidersHorizontal size={18} />
                         <span className="hidden sm:inline">Filters</span>
                         {hasActiveFilters && (
                             <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse border-2 border-white ml-1"></span>
                         )}
                         <ChevronDown size={16} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                     </button>
                 </div>

                 {/* Collapsible Filter Grid */}
                 <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                     <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                             <CustomDropdown 
                                label="Category"
                                value={filterCat}
                                options={['Primary', 'Secondary']}
                                onChange={(val) => setFilterCat(val as any)}
                                icon={Tag}
                             />

                             <CustomDropdown 
                                label="Type"
                                value={filterType}
                                options={types}
                                onChange={setFilterType}
                                icon={Home}
                             />

                             <CustomDropdown 
                                label="Location"
                                value={filterLocation}
                                options={locations}
                                onChange={setFilterLocation}
                                icon={MapPin}
                             />

                            <CustomDropdown 
                                label="Developer"
                                value={filterDeveloper}
                                options={developers}
                                onChange={setFilterDeveloper}
                                icon={Briefcase}
                             />

                             {/* Conditional Price Dropdown - Only for Units */}
                             {searchMode === 'unit' ? (
                                 <PriceDropdown 
                                     value={priceRange}
                                     onChange={setPriceRange}
                                 />
                             ) : (
                                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium italic bg-slate-50 rounded-2xl border border-dashed border-slate-200 px-4">
                                     Price filter available in Unit mode
                                </div>
                             )}
                        </div>
                        
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                             <span className="text-xs text-slate-400 font-medium italic">
                                 Showing {searchMode === 'project' ? filteredProjects.length : filteredUnits.length} results
                             </span>
                             <button onClick={clearFilters} className="text-xs text-brand-pink font-bold hover:underline flex items-center gap-1 group">
                                 <RefreshCwIcon /> Reset All Filters
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
          </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
         {searchMode === 'project' ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {filteredProjects.map(p => {
                    const unitCount = MOCK_UNITS.filter(u => u.projectId === p.id).length;
                    return <ProjectCard key={p.id} project={p} unitCount={unitCount} />
                 })}
             </div>
         ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {filteredUnits.map(u => <UnitCard key={u.id} unit={u} />)}
             </div>
         )}
         
         {((searchMode === 'project' && filteredProjects.length === 0) || (searchMode === 'unit' && filteredUnits.length === 0)) && (
             <div className="text-center py-20 flex flex-col items-center animate-fade-in-up">
                 <div className="bg-slate-100 p-6 rounded-full mb-4">
                    <Filter size={48} className="text-slate-300" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-600">No properties found</h3>
                 <p className="text-slate-400 mt-2">Try adjusting your filters or search terms.</p>
                 <button onClick={clearFilters} className="mt-6 px-6 py-3 bg-brand-cyan text-white rounded-xl font-bold shadow-lg hover:bg-brand-cyan-dark transition-all transform hover:-translate-y-1">
                     Clear All Filters
                 </button>
             </div>
         )}
      </div>
    </div>
  );
};

// Small icon helper
const RefreshCwIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
);

// --- Project Detail Page ---
export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const project = MOCK_PROJECTS.find(p => p.id === id);
  const units = MOCK_UNITS.filter(u => u.projectId === id);

  if (!project) return <div className="p-20 text-center">Project not found</div>;

  return (
    <div>
        {/* Using the standard detached Hero structure */}
        <Hero 
            title={project.name}
            subtitle={project.description || "Discover your dream unit here."}
            placeholder={`Search units in ${project.name}...`}
            bgImage={project.imageUrl}
        />
        
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                    <LayoutGrid size={24} />
                </div>
                <div>
                     <h2 className="text-2xl font-bold text-slate-800">Available Units</h2>
                     <p className="text-slate-500 text-sm">Find the perfect layout for you</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {units.map(u => <UnitCard key={u.id} unit={u} />)}
            </div>
            {units.length === 0 && <p className="text-slate-500 italic">No units listed for this project yet.</p>}
        </div>
    </div>
  );
};

// --- Unit Detail Page ---
export const UnitDetailPage: React.FC = () => {
  const { id } = useParams();
  const unit = MOCK_UNITS.find(u => u.id === id);
  const relatedUnits = MOCK_UNITS.filter(u => u.projectId === unit?.projectId && u.id !== id);
  const [activeImage, setActiveImage] = useState(0);

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen || !unit) return;
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % unit.galleryUrls.length);
        if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + unit.galleryUrls.length) % unit.galleryUrls.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, unit]);

  const openLightbox = (index: number) => {
      setLightboxIndex(index);
      setIsLightboxOpen(true);
  };

  if (!unit) return <div className="p-20 text-center">Unit not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
        
        {/* Lightbox Modal */}
        {isLightboxOpen && (
            <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fade-in p-4">
                <button 
                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 bg-black/20 rounded-full p-2" 
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <X size={32} />
                </button>
                
                <button 
                    className="absolute left-4 lg:left-8 text-white/50 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full z-50 hidden sm:block"
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === 0 ? unit.galleryUrls.length - 1 : prev - 1)); }}
                >
                    <ChevronLeft size={48} />
                </button>

                <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
                    <img 
                        src={unit.galleryUrls[lightboxIndex]} 
                        className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl animate-scale-in"
                        alt="Gallery"
                    />
                </div>

                <button 
                    className="absolute right-4 lg:right-8 text-white/50 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full z-50 hidden sm:block"
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === unit.galleryUrls.length - 1 ? 0 : prev + 1)); }}
                >
                    <ChevronRight size={48} />
                </button>
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
                    {lightboxIndex + 1} / {unit.galleryUrls.length}
                </div>
            </div>
        )}

        {/* New Gallery Hero Section */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
                {/* Main Large Image */}
                <div 
                    onClick={() => openLightbox(activeImage)}
                    className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer h-full border border-black/5"
                >
                    <img 
                        src={unit.galleryUrls[activeImage] || unit.imageUrl} 
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

                {/* Right Side Grid */}
                <div className="hidden lg:grid grid-cols-2 gap-4 h-full">
                    {unit.galleryUrls.slice(0, 4).map((url, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => {
                                if (idx === 3 && unit.galleryUrls.length > 4) {
                                    openLightbox(3); // Open lightbox starting at this index
                                } else {
                                    setActiveImage(idx); // Standard grid behavior: swap main image
                                }
                            }}
                            className={`relative rounded-2xl overflow-hidden cursor-pointer group border border-slate-200 ${activeImage === idx ? 'ring-4 ring-brand-cyan' : ''}`}
                        >
                            <img src={url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Gallery ${idx}`} />
                            {idx === 3 && unit.galleryUrls.length > 4 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px] transition-all hover:bg-black/70">
                                    <span className="text-white font-bold text-xl group-hover:scale-110 transition-transform">+{unit.galleryUrls.length - 4} More</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Mobile Horizontal Gallery */}
            <div className="lg:hidden flex overflow-x-auto gap-3 mt-4 pb-4 snap-x">
                 {unit.galleryUrls.map((url, idx) => (
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
            {/* Main Details */}
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

                 {/* Promo Section */}
                 <div className="bg-gradient-to-r from-brand-pink to-brand-pink-dark rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-lg text-xs font-bold mb-3 uppercase tracking-wider">Limited Offer</div>
                        <h2 className="text-2xl font-bold mb-2">Special Promo</h2>
                        <p className="text-lg opacity-95 font-medium">{unit.promo}</p>
                    </div>
                 </div>
            </div>

            {/* Sidebar */}
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
        
        {/* KPR Calculator Full Width Section */}
        <div id="kpr-section" className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 mb-12">
            <KPRCalculator fixedHouseValue={unit.price} />
        </div>

        {/* Related Units */}
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