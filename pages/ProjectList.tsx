// pages/ProjectList.tsx
import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import { Project } from '../types';

const ProjectList: React.FC = () => {
  // State untuk menyimpan daftar proyek
  const [projects, setProjects] = useState<Project[]>([]);
  // State untuk status loading
  const [loading, setLoading] = useState<boolean>(true);
  // State untuk menyimpan pesan error
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fungsi untuk mengambil data proyek
    const fetchProjects = async () => {
      try {
        setLoading(true); // Mulai loading
        setError(null); // Reset error
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        // Tangkap error jika terjadi
        setError('Gagal memuat data proyek. Silakan coba lagi nanti.');
        console.error(err);
      } finally {
        // Hentikan loading, baik berhasil maupun gagal
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali saat komponen dimuat

  // Tampilan saat loading
  if (loading) {
    return <div>Memuat data proyek...</div>;
  }

  // Tampilan jika ada error
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  // Tampilan utama jika data berhasil dimuat
  return (
    <div>
      <h1>Daftar Proyek</h1>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <h2>{project.name}</h2>
              <p>Developer: {project.developer}</p>
              <p>Lokasi: {project.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada proyek yang tersedia saat ini.</p>
      )}
    </div>
  );
};

export default ProjectList;
