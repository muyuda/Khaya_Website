// pages/ProjectList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import { Project } from '../types';
import { formatCurrency } from '../utils/formatters';
import { MapPin } from 'lucide-react';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Assuming getProjects now returns data matching the new Project interface
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Gagal mengambil data proyek dari backend.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p className="text-center py-20 text-xl">Memuat daftar proyek...</p>;
  if (error) return <p className="text-center py-20 text-red-500 text-xl">{error}</p>;

  // Placeholder image in case project image_url is invalid or missing
  const placeholderImg = 'https://via.placeholder.com/300x200.png?text=Gambar+Proyek';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Daftar Proyek</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <Link 
            to={`/project/${project.id}`} 
            key={project.id} 
            className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <img 
              src={project.image_url || placeholderImg} 
              alt={project.title} 
              className="w-full h-48 object-cover rounded-t-lg" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = placeholderImg;
              }}
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                {project.title}
              </h2>
              <p className="text-gray-900 font-bold text-lg mb-2">
                {formatCurrency(project.price)}
              </p>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin size={16} className="mr-2 text-blue-500" />
                <span>{project.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;