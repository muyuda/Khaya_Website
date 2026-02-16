import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// Import komponen baru kita
import SmartAssistant from './SmartAssistant';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700 bg-slate-50 selection:bg-pink-500 selection:text-white">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Smart Assistant (Gabungan AI + Contact) */}
      <SmartAssistant />
    </div>
  );
};