// components/listings/PropertyGrid.tsx
import React from 'react';
import { Property } from '../../types';
import { PropertyCard } from '../UIComponents';
import { Filter } from 'lucide-react';

interface PropertyGridProps {
    properties: Property[];
    isLoading: boolean;
    clearFilters: () => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, isLoading, clearFilters }) => {

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
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
            {isLoading ? (
                renderSkeletons()
            ) : properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {properties.map(p => <PropertyCard key={p.id} property={p} />)}
                </div>
            ) : (
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
    );
};

export default PropertyGrid;