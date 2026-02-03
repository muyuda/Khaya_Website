// pages/ProjectList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import { Project } from '../types';

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '15px 0',
    borderRadius: '8px',
    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
    cursor: 'pointer',
  },
  cardHover: {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transform: 'translateY(-3px)',
  }
};

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Gagal mengambil data dari backend.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', fontSize: '1.2em' }}>Loading...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', fontSize: '1.2em' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Daftar Proyek dari Backend</h1>
      {projects.map(project => (
        <Link 
          to={`/project/${project.id}`} 
          key={project.id} 
          style={styles.cardLink}
        >
          <div 
            style={hoveredCard === project.id ? {...styles.card, ...styles.cardHover} : styles.card}
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={{ margin: '0 0 10px 0' }}>{project.name}</h2>
            <p style={{ margin: 0 }}>Kisaran Harga: {project.priceRange}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
