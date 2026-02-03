// pages/ProjectsPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProjectCard, UnitCard } from '../components/UIComponents';
import * as propertyService from '../services/propertyService';
import { Project, Unit } from '../types';
import CustomDropdown from '../components/listings/CustomDropdown';
import PriceDropdown from '../components/listings/PriceDropdown';
import { Filter, Search, SlidersHorizontal, X, ChevronDown, RefreshCw, Tag, Home, MapPin, Briefcase } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const catParam = searchParams.get('cat');
    const qParam = searchParams.get('q');

    const [projects, setProjects] = useState<Project[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchMode, setSearchMode] = useState<'project' | 'unit'>('project');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filters
    const [filterCat, setFilterCat] = useState<'All' | 'Primary' | 'Secondary'>('All');
    const [filterType, setFilterType] = useState<string>('All');
    const [filterLocation, setFilterLocation] = useState<string>('All');
    const [filterDeveloper, setFilterDeveloper] = useState<string>('All');
    const [priceRange, setPriceRange] = useState<number>(10000000000); // Max Price 10B

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [projData, unitData] = await Promise.all([
                    propertyService.getProjects(),
                    propertyService.getUnits()
                ]);
                setProjects(projData);
                setUnits(unitData);
            } catch (error) {
                console.error("Failed to fetch property data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

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
    const locations = useMemo(() => Array.from(new Set([...projects.map(p => p.location), ...units.map(u => u.location)])), [projects, units]);
    const developers = useMemo(() => Array.from(new Set(projects.map(p => p.developer))), [projects]);
    const types = ['House', 'Apartment', 'Ruko', 'Villa'];

    const filteredProjects = useMemo(() => projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = filterCat === 'All' || p.category === filterCat;
        const matchesType = filterType === 'All' || p.propertyType === filterType;
        const matchesLocation = filterLocation === 'All' || p.location === filterLocation;
        const matchesDeveloper = filterDeveloper === 'All' || p.developer === filterDeveloper;
        return matchesSearch && matchesCat && matchesType && matchesLocation && matchesDeveloper;
    }), [projects, searchTerm, filterCat, filterType, filterLocation, filterDeveloper]);

    const filteredUnits = useMemo(() => units.filter(u => {
        const parentProject = projects.find(p => p.id === u.projectId);
        const matchesSearch = u.type.toLowerCase().includes(searchTerm.toLowerCase()) || u.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || u.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = filterCat === 'All' || u.category === filterCat;
        const matchesLocation = filterLocation === 'All' || u.location === filterLocation;
        const matchesPrice = u.price <= priceRange;
        const matchesDeveloper = filterDeveloper === 'All' || (parentProject && parentProject.developer === filterDeveloper);
        const matchesType = filterType === 'All' || (parentProject && (parentProject.propertyType as string) === filterType);
        return matchesSearch && matchesCat && matchesLocation && matchesPrice && matchesDeveloper && matchesType;
    }), [units, projects, searchTerm, filterCat, filterLocation, priceRange, filterDeveloper, filterType]);


    const clearFilters = () => {
        setFilterCat('All');
        setFilterType('All');
        setFilterLocation('All');
        setFilterDeveloper('All');
        setPriceRange(10000000000);
        setSearchTerm('');
    };

    const hasActiveFilters = filterCat !== 'All' || filterType !== 'All' || filterLocation !== 'All' || filterDeveloper !== 'All' || priceRange < 10000000000;

    const renderSkeletons = (count = 8) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg animate-pulse">
                    <div className="w-full h-48 bg-slate-200 rounded-t-2xl"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-white shadow-sm border-b border-brand-pink/20 relative z-30">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <h1 className="text-2xl font-bold text-slate-800">Discover Properties</h1>
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

                        <div className="flex flex-col md:flex-row gap-4 items-stretch">
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
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

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

                        {showFilters && (
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm animate-fade-in-up">
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
                                        <RefreshCw size={12} className="group-hover:rotate-[-90deg] transition-transform" /> Reset All Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
                {isLoading ? (
                    renderSkeletons()
                ) : searchMode === 'project' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProjects.map(p => {
                            const unitCount = units.filter(u => u.projectId === p.id).length;
                            return <ProjectCard key={p.id} project={p} unitCount={unitCount} />
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredUnits.map(u => <UnitCard key={u.id} unit={u} />)}
                    </div>
                )}
                
                {!isLoading && ((searchMode === 'project' && filteredProjects.length === 0) || (searchMode === 'unit' && filteredUnits.length === 0)) && (
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

export default ProjectsPage;