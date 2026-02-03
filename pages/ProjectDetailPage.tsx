// pages/ProjectDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/projectService';
import { Project } from '../types';

// Simple styling objects since Tailwind is not in use
const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
  },
  loader: {
    textAlign: 'center',
    fontSize: '1.5em',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: 'red',
  },
  imagePlaceholder: {
    width: '100%',
    height: '400px',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '1.2em',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  price: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '20px',
  },
  location: {
    fontSize: '1.1em',
    color: '#555',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1em',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '30px',
  },
  backButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Project ID tidak ditemukan di URL.');
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div style={styles.loader}>Memuat detail proyek...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!project) {
    return <div style={styles.error}>Proyek tidak ditemukan.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.imagePlaceholder}>
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
        ) : (
          <span>Gambar tidak tersedia</span>
        )}
      </div>
      
      <h1 style={styles.title}>{project.name}</h1>
      
      <p style={styles.price}>
        Harga: {project.priceRange}
      </p>
      
      <p style={styles.location}>
        <strong>Lokasi:</strong> {project.location}
      </p>
      
      <p style={styles.description}>
        {project.description || 'Tidak ada deskripsi untuk proyek ini.'}
      </p>

      <Link to="/project-list" style={styles.backButton}>
        &larr; Kembali ke Daftar Proyek
      </Link>
    </div>
  );
};

export default ProjectDetailPage;