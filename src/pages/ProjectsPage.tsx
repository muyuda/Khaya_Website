import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MOCK_PROJECTS, MOCK_UNITS } from '../constants';
import { ProjectCard, UnitCard } from '../components/UIComponents';
import { Search, SlidersHorizontal, Filter, X, ChevronDown, Tag, Home as HomeIcon, MapPin, Briefcase, DollarSign, RefreshCw, LayoutGrid } from 'lucide-react';

const ProjectsPage: React.FC = () => {
    // This is a placeholder implementation based on a previous user prompt
    // and can be expanded further.
    const [searchParams] = useSearchParams();
    const catParam = searchParams.get('cat');
    const qParam = searchParams.get('q');
  
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCat, setFilterCat] = useState<'All' | 'Primary' | 'Secondary'>('All');

    useEffect(() => {
        if (catParam === 'Primary' || catParam === 'Secondary') {
          setFilterCat(catParam);
        }
        if (qParam) {
            setSearchTerm(qParam);
        }
    }, [catParam, qParam]);

    const filteredProjects = MOCK_PROJECTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = filterCat === 'All' || p.category === filterCat;
        return matchesSearch && matchesCat;
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-20 pt-24">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800">All Projects</h1>
                    <p className="text-slate-500 mt-2">Discover our collection of premium properties.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProjects.map(p => {
                        const unitCount = MOCK_UNITS.filter(u => u.projectId === p.id).length;
                        return <ProjectCard key={p.id} project={p} unitCount={unitCount} />
                    })}
                </div>
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 col-span-full">
                        <h3 className="text-xl font-bold text-slate-600">No projects found</h3>
                        <p className="text-slate-400 mt-2">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
