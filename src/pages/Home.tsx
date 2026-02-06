import React, { useState, useEffect } from 'react';
import { Hero, ProjectCard } from '../components/UIComponents';
import { getProjects } from '../services/projectService';
import { Project } from '../types';
import { ArrowRight, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Home: React.FC = () => {
  const { t } = useTranslation(); // Get translation function
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setAllProjects(data);
      } catch (err) {
        setError('Failed to load projects.');
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

  const newProjects = allProjects.filter(p => p.isNew).slice(0, 4);
  const hotProjects = allProjects.filter(p => p.isHot).slice(0, 8);

  const renderProjectSection = (title: string, subtitle: string, projectList: Project[], subtitleColor = 'text-brand-pink', sectionBgClass = '') => (
    <section className={`max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 ${sectionBgClass}`}>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg animate-pulse">
                    <div className="w-full h-48 bg-slate-200 rounded-t-2xl"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                    </div>
                </div>
            ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectList.map(project => (
            <ProjectCard key={project.id} project={project} unitCount={project.units.length} />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="space-y-20 pb-20">
      <Hero 
        title={t('home_hero.title')}
        subtitle={t('home_hero.subtitle')}
        placeholder="What are you looking for? (e.g., 'Modern House in BSD')"
        primaryBtnText="Hubungi Kami"
        secondaryBtnText="Lihat Project"
        onPrimaryClick={() => navigate('/contact')}
        onSecondaryClick={() => navigate('/projects')}
        onSearch={handleSearch}
        enableAiToggle={true}
      />

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
