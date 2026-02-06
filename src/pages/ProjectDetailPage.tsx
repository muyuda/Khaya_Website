import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { projects } from '../data/mockData';

const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const project = projects.find(p => p.id === id);

    if (!project) {
        return <div className="text-center py-20">Project not found.</div>;
    }

    return (
        <>
            {/* Hero Section */}
            <div
                className="relative flex items-center justify-center bg-cover bg-center h-[70vh]"
                style={{ backgroundImage: `url(${project.heroImage})` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center text-white p-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-2">{project.name}</h1>
                    <p className="text-xl md:text-2xl text-brand-pink font-semibold">{project.location}</p>
                    
                    <div className="mt-8 max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for unit type..."
                                className="w-full h-16 pl-6 pr-20 rounded-2xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-pink-400"
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                                <Search className="text-white" size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Units Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Units</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {project.units.map(unit => (
                            <Link to={`/unit/${unit.id}`} key={unit.id} className="group block bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="relative">
                                    <img src={unit.images[0]} alt={`Unit ${unit.type}`} className="w-full h-48 object-cover" />
                                    <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                                        {unit.type}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 truncate">{unit.name}</h3>
                                    <p className="text-gray-600 mt-1">{unit.specs.bedrooms} Beds • {unit.specs.bathrooms} Baths</p>
                                    <p className="mt-4 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-teal-500">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(unit.price)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetailPage;
