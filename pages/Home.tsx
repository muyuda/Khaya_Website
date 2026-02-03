import React from 'react';
import { Hero, ProjectCard } from '../components/UIComponents';
import { MOCK_PROJECTS, MOCK_UNITS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const newProjects = MOCK_PROJECTS.filter(p => p.isNew);
  const hotProjects = MOCK_PROJECTS.filter(p => p.isHot);

  const handleSearch = (term: string) => {
    if (term.trim()) {
        navigate(`/projects?q=${encodeURIComponent(term)}`);
    }
  };

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

      {/* New Properties - Carousel Style */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Fresh Drops</h2>
                <p className="text-brand-pink">Newly released properties just for you.</p>
            </div>
        </div>
        
        {/* Simple Horizontal Scroll Container */}
        <div className="flex overflow-x-auto space-x-6 pb-8 snap-x scrollbar-hide">
            {newProjects.map(project => {
                const unitCount = MOCK_UNITS.filter(u => u.projectId === project.id).length;
                return (
                    <div key={project.id} className="min-w-[300px] md:min-w-[400px] snap-center h-[350px]">
                        <ProjectCard project={project} unitCount={unitCount} />
                    </div>
                );
            })}
        </div>
      </section>

      {/* Hot Properties - Grid */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 bg-white/50 py-12 rounded-[3rem] border border-white shadow-xl shadow-brand-pink/5">
        <div className="flex items-center justify-between mb-10">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Hot in Jabodetabek</h2>
                <p className="text-brand-cyan">Trending properties everyone is talking about.</p>
            </div>
            <Link to="/projects" className="flex items-center gap-2 text-brand-pink font-semibold hover:text-brand-pink-dark transition-colors">
                View More <ArrowRight size={18} />
            </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotProjects.slice(0, 8).map(project => {
                const unitCount = MOCK_UNITS.filter(u => u.projectId === project.id).length;
                return <ProjectCard key={project.id} project={project} unitCount={unitCount} />
            })}
        </div>
      </section>
    </div>
  );
};

export default Home;