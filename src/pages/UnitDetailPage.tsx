import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BedDouble, Bath, Maximize, Landmark } from 'lucide-react';
import { projects } from '../data/mockData';
import KPRCalculator from '../components/KPRCalculator';

const UnitDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Find the unit and its parent project
    const unit = projects.flatMap(p => p.units).find(u => u.id === id);
    const project = projects.find(p => p.units.some(u => u.id === id));

    if (!unit || !project) {
        return <div className="text-center py-20">Unit not found.</div>;
    }

    const otherUnits = project.units.filter(u => u.id !== id);
    const whatsappMessage = `Hello, I'm interested in the ${unit.name} at ${project.name}. Could you provide more details?`;
    const whatsappLink = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`; // Replace with your number

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 font-sans">
                {/* Top Section: Unit Info & Sticky Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left Content */}
                    <div className="lg:col-span-2">
                        {/* Hero Image */}
                        <div className="mb-8">
                            <img src={unit.images[1] || unit.images[0]} alt={unit.name} className="w-full h-auto object-cover rounded-2xl shadow-lg" />
                        </div>

                        {/* Unit Details */}
                        <div className="pr-4">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">{unit.name}</h1>
                            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-teal-500 mb-4">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(unit.price)}
                            </p>
                            
                            {/* Specifications */}
                            <div className="flex items-center space-x-6 text-gray-600 border-y py-4 my-4">
                                <div className="flex items-center space-x-2">
                                    <BedDouble className="text-brand-pink" />
                                    <span>{unit.bedrooms} Bedrooms</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Bath className="text-brand-pink" />
                                    <span>{unit.bathrooms} Bathrooms</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Maximize className="text-brand-pink" />
                                    <span>{unit.buildingArea} m²</span>
                                </div>
                            </div>
                            
                            {/* Facilities */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Facilities</h3>
                                <div className="flex flex-wrap gap-3">
                                    {unit.facilities.map((facility, index) => (
                                        <span key={index} className="bg-pink-100 text-pink-800 text-sm font-medium px-4 py-2 rounded-full">
                                            {facility}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sticky Sidebar */}
                    <div className="relative">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl shadow-xl p-6 border">
                                <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Property Summary</h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Project:</span>
                                        <span>{project.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Unit Type:</span>
                                        <span>{unit.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Price:</span>
                                        <span className="font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(unit.price)}</span>
                                    </div>
                                </div>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-6 w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors duration-300 block text-center">
                                    Contact via WhatsApp
                                </a>
                                <button className="mt-4 w-full bg-brand-cyan text-white font-bold py-3 rounded-xl hover:bg-cyan-500 transition-colors duration-300 block text-center">
                                    Download Brochure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPR Simulator Section */}
                <div className="mt-20">
                    <KPRCalculator initialPrice={unit.price} />
                </div>

                {/* Recommendations Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">More in {project.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherUnits.map(otherUnit => (
                            <Link to={`/unit/${otherUnit.id}`} key={otherUnit.id} className="group block bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="relative">
                                    <img src={otherUnit.images[0]} alt={`Unit ${otherUnit.type}`} className="w-full h-48 object-cover" />
                                    <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                                        {otherUnit.type}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 truncate">{otherUnit.name}</h3>
                                    <p className="text-gray-600 mt-1">{otherUnit.bedrooms} Beds • {otherUnit.bathrooms} Baths</p>
                                    <p className="mt-4 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-teal-500">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(otherUnit.price)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitDetailPage;
