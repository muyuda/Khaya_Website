// components/listings/FilterPanel.tsx
import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, Search, X, RefreshCw, Tag, Home, MapPin, Briefcase } from 'lucide-react';
import CustomDropdown from './CustomDropdown';
import PriceDropdown from './PriceDropdown';

interface FilterPanelProps {
    // Filter values
    searchTerm: string;
    filterCat: string;
    filterType: string;
    filterLocation: string;
    filterDeveloper: string;
    priceRange: number;
    
    // Filter setters
    setSearchTerm: (value: string) => void;
    setFilterCat: (value: string) => void;
    setFilterType: (value: string) => void;
    setFilterLocation: (value: string) => void;
    setFilterDeveloper: (value: string) => void;
    setPriceRange: (value: number) => void;

    // Derived data
    locations: string[];
    developers: string[];
    types: string[];
    categories: string[];
    
    // Other
    resultsCount: number;
    clearFilters: () => void;
    hasActiveFilters: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = (props) => {
    const {
        searchTerm, setSearchTerm,
        filterCat, setFilterCat,
        filterType, setFilterType,
        filterLocation, setFilterLocation,
        filterDeveloper, setFilterDeveloper,
        priceRange, setPriceRange,
        locations, developers, types, categories,
        resultsCount, clearFilters, hasActiveFilters
    } = props;

    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="bg-white shadow-sm border-b border-brand-pink/20 relative z-30">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-800">Discover Properties</h1>
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

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                <CustomDropdown
                                    label="Category"
                                    value={filterCat}
                                    options={categories}
                                    onChange={setFilterCat}
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
                                <PriceDropdown
                                    value={priceRange}
                                    onChange={setPriceRange}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                                <span className="text-xs text-slate-400 font-medium italic">
                                    Showing {resultsCount} results
                                </span>
                                <button onClick={clearFilters} className="text-xs text-brand-pink font-bold hover:underline flex items-center gap-1 group">
                                    <RefreshCw size={12} className="group-hover:rotate-[-90deg] transition-transform" /> Reset All Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;