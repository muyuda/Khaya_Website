import React, { useState, useEffect } from 'react';
import { Hero, ProjectCard } from '../components/UIComponents';
import { getProjects } from '../services/projectService';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Gagal memuat data proyek terbaru.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (term: string) => {
    if (term.trim()) {
        navigate(`/projects?q=${encodeURIComponent(term)}`);
    }
  };

  // Temporary logic to split projects into "new" and "hot" sections
  // In a real app, this would ideally come from API properties
  const newProjects = projects.slice(0, 4);
  const hotProjects = projects.slice(4, 8);

  const renderProjectSection = (title: string, subtitle: string, projectList: Project[], subtitleColor = 'text-brand-pink') => (
    <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
          <p className={subtitleColor}>{subtitle}</p>
        </div>
        <Link to="/projects" className="flex items-center gap-2 text-brand-pink font-semibold hover:text-brand-pink-dark transition-colors">
            View All <ArrowRight size={18} />
        </Link>
      </div>
      
      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectList.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="space-y-20 pb-20">
      <Hero 
        title="Find Your Khaya Home"
        subtitle="Where modern aesthetic meets comfort."
        placeholder="What are you looking for? (e.g., 'Modern House in BSD')"
        primaryBtnText="Hubungi Kami"
        secondaryBtnText="Lihat Project"
        onPrimaryClick={() => navigate('/contact')}
        onSecondaryClick={() => navigate('/projects')}
        onSearch={handleSearch}
        enableAiToggle={true}
      />

      {/* Since the API doesn't distinguish, we'll use a generic renderer. */}
      {renderProjectSection("Fresh Drops", "Newly released properties just for you.", newProjects)}
      
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12'>
        <div className='bg-white/50 py-12 rounded-[3rem] border border-white shadow-xl shadow-brand-pink/5'>
          {renderProjectSection("Hot in Jabodetabek", "Trending properties everyone is talking about.", hotProjects, 'text-brand-cyan')}
        </div>
      </div>
    </div>
  );
};

export default Home;