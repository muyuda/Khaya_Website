// pages/ProjectDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/projectService';
import { Project } from '../types';
import { formatCurrency } from '../utils/formatters';
import { MapPin, Bed, Bath, ArrowLeft, Phone, Building, Download, Share2 } from 'lucide-react';

// Icon Penggaris Custom
const RulerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ruler">
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L3 8.7a2.4 2.4 0 0 1 0-3.4L5.6 2.7a2.4 2.4 0 0 1 3.4 0L18.7 12a2.4 2.4 0 0 1 0 3.4Z"/>
        <path d="m18 5 3 3"/><path d="m9 14 1 1"/><path d="m12 11 1 1"/><path d="m15 8 1 1"/>
    </svg>
);

// Komponen Kartu Unit
const UnitPlaceholderCard: React.FC<{ type: string, price: string }> = ({ type, price }) => (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <Building size={24} />
            </div>
            <div>
                <h4 className="font-bold text-lg text-gray-800">{type}</h4>
                <p className="text-sm text-gray-500">Mulai dari <span className="font-bold text-blue-600 text-base">{price}</span></p>
            </div>
        </div>
        <button className="w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-sm transition-colors">
            Lihat Detail
        </button>
    </div>
);

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Project ID tidak ditemukan.');
      setLoading(false);
      return;
    }
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        setError('Gagal memuat detail proyek.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen bg-gray-50"><div className="animate-pulse text-xl font-semibold text-gray-400">Memuat data properti...</div></div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</div>;
  if (!project) return <div className="flex justify-center items-center h-screen text-gray-500 text-xl">Proyek tidak ditemukan.</div>;
  
  const placeholderImg = 'https://images.unsplash.com/photo-1600596542815-22b5c010deb7?fit=crop&w=1920&q=80';
  const whatsappLink = `https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(project.title)}%20di%20${encodeURIComponent(project.location)}`;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* --- HERO SECTION (FULL SCREEN) --- */}
      <div className="relative h-[85vh] w-full">
        {/* Background Image */}
        <img
            src={project.image_url || placeholderImg}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = placeholderImg; }}
        />
        
        {/* Overlay Gelap (Gradient) biar teks kebaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

        {/* Tombol Back & Share (Floating Top) */}
        <div className="absolute top-6 left-0 w-full px-6 flex justify-between items-center z-20">
            <Link to="/projects" className="flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-all">
                <ArrowLeft size={18} /> <span className="text-sm font-medium">Kembali</span>
            </Link>
            <button className="p-2 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all">
                <Share2 size={20} />
            </button>
        </div>

        {/* TEKS CENTER (Judul & Harga) */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto mt-8">
            <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold tracking-widest uppercase rounded-full mb-6 shadow-lg">
                Exclusive Listing
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
                {project.title}
            </h1>
            
            <p className="flex items-center text-xl md:text-2xl text-gray-200 mb-8 font-light">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" /> {project.location}
            </p>

            {/* Harga Besar */}
            <div className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white mb-10 drop-shadow-sm">
                {formatCurrency(project.price)}
            </div>

            {/* Tombol Aksi Utama (Hero Buttons) */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                <a 
                    href={whatsappLink}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition transform hover:-translate-y-1 shadow-lg shadow-green-500/30"
                >
                    <Phone size={20} /> Hubungi Kami
                </a>
                <button className="flex-1 bg-white hover:bg-gray-100 text-gray-900 py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition transform hover:-translate-y-1 shadow-lg">
                    <Download size={20} /> Brosur
                </button>
            </div>
        </div>

        {/* Spesifikasi Melayang di Bawah Hero */}
        <div className="absolute -bottom-12 left-0 w-full px-4 z-20 hidden md:block">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex justify-around items-center">
                 <div className="flex flex-col items-center gap-1">
                    <Bed size={28} className="text-blue-600 mb-1" />
                    <span className="text-2xl font-bold text-gray-800">3</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Kamar Tidur</span>
                 </div>
                 <div className="w-px h-12 bg-gray-200"></div>
                 <div className="flex flex-col items-center gap-1">
                    <Bath size={28} className="text-blue-600 mb-1" />
                    <span className="text-2xl font-bold text-gray-800">2</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Kamar Mandi</span>
                 </div>
                 <div className="w-px h-12 bg-gray-200"></div>
                 <div className="flex flex-col items-center gap-1">
                    <RulerIcon />
                    <span className="text-2xl font-bold text-gray-800">120m²</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Luas Bangunan</span>
                 </div>
                 <div className="w-px h-12 bg-gray-200"></div>
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold text-green-600">SHM</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Sertifikat</span>
                 </div>
            </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-4xl mx-auto px-4 pt-20 md:pt-24">
        
        {/* Specs untuk Mobile (Karena floating bar di atas hidden di mobile) */}
        <div className="grid grid-cols-3 gap-4 mb-10 md:hidden">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100">
                <Bed className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <div className="font-bold text-gray-800">3 KT</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100">
                <Bath className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <div className="font-bold text-gray-800">2 KM</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100">
                <div className="w-6 h-6 mx-auto text-blue-600 mb-2 flex justify-center"><RulerIcon /></div>
                <div className="font-bold text-gray-800">120m²</div>
            </div>
        </div>

        {/* Deskripsi */}
        <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">Tentang Properti</h3>
            <div className="prose prose-lg text-gray-600 leading-relaxed bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                {project.description ? (
                    project.description.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                    ))
                ) : (
                    <p className="italic text-gray-400">Deskripsi detail belum tersedia untuk properti ini.</p>
                )}
            </div>
        </div>

        {/* Available Units */}
        <div className="mb-12">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-pink-500 pl-4">Tipe Unit Tersedia</h3>
                <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">Lihat Semua</span>
             </div>
             
             <div className="space-y-4">
                <UnitPlaceholderCard type="Tipe Rosewood (72/60)" price="Rp 1.2 M" />
                <UnitPlaceholderCard type="Tipe Oakwood (90/72)" price="Rp 1.5 M" />
                <UnitPlaceholderCard type="Tipe Pinewood (120/90)" price="Rp 1.8 M" />
             </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetailPage;