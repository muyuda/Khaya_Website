// pages/ProjectDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Hero, UnitCard } from '../components/UIComponents';
import * as propertyService from '../services/propertyService';
import { Project, Unit } from '../types';
import { LayoutGrid } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | undefined>();
    const [units, setUnits] = useState<Unit[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [projData, unitData] = await Promise.all([
                    propertyService.getProjectById(id),
                    propertyService.getUnitsByProjectId(id)
                ]);
                setProject(projData);
                setUnits(unitData);
            } catch (error) {
                console.error(`Failed to fetch project detail for id: ${id}`, error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-[400px] bg-slate-200"></div>
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
                    <div className="w-3/4 h-8 bg-slate-200 rounded mb-4"></div>
                    <div className="w-1/2 h-4 bg-slate-200 rounded mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg">
                                <div className="w-full h-48 bg-slate-200 rounded-t-2xl"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!project) return <div className="p-20 text-center text-xl text-slate-600">Project not found</div>;

    return (
        <div>
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
                        <p className="text-slate-500 text-sm">Find the perfect layout for you ({units.length} available)</p>
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

export default ProjectDetailPage;
