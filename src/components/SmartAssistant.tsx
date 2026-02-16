import React, { useState, useEffect, useRef } from 'react';
import { Phone, Calendar, User, X, Sparkles, Send, MessageCircle } from 'lucide-react';

const SmartAssistant: React.FC = () => {
  // State untuk AI Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // State untuk Menu Kontak (Phone Button)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State untuk Modal Form (Schedule/Ask Agent)
  const [activeModal, setActiveModal] = useState<'visit' | 'ask' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Logic: Tutup semua menu kalau klik di luar area widget
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logic: Kalau Chat dibuka, menu kontak tutup (biar gak numpuk)
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Logic: Kalau Menu kontak dibuka, chat tutup
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isChatOpen) setIsChatOpen(false);
  };

  return (
    <>
      {/* Container Utama di Kanan Bawah */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4" ref={containerRef}>
        
        {/* === BAGIAN 1: AI CHAT WINDOW (AURA) === */}
        {/* Muncul di atas tombol-tombol */}
        <div className="relative flex flex-col items-end">
          {isChatOpen && (
            <div className="mb-2 bg-white rounded-2xl shadow-2xl border border-slate-100 w-80 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 origin-bottom-right">
              {/* Header Chat */}
              <div className="bg-gradient-to-r from-pink-500 to-cyan-400 p-4 flex justify-between items-center text-white shadow-md">
                <div className="flex items-center gap-2 font-bold">
                  <div className="bg-white/20 p-1 rounded-full">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <span>Aura Assistant</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                  <X size={18}/>
                </button>
              </div>

              {/* Body Chat */}
              <div className="p-4 bg-slate-50 h-64 overflow-y-auto text-sm space-y-3">
                {/* Pesan Bot */}
                <div className="flex gap-2 items-end">
                   <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">A</div>
                   <div className="bg-white p-3 rounded-2xl rounded-bl-none text-slate-600 border border-slate-100 shadow-sm max-w-[85%]">
                      Hi there! 👋 Aku Aura. Bingung cari rumah atau mau simulasi KPR? Tanyain aja disini!
                   </div>
                </div>
                {/* Contoh Pesan User (Dummy) */}
                {/* <div className="flex gap-2 items-end justify-end">
                   <div className="bg-pink-500 text-white p-3 rounded-2xl rounded-br-none shadow-sm max-w-[85%]">
                      Cari rumah di BSD budget 2M
                   </div>
                </div> */}
              </div>

              {/* Footer Input */}
              <div className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
                <input 
                  type="text" 
                  placeholder="Ketik pesan..." 
                  className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" 
                />
                <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/30">
                  <Send size={16}/>
                </button>
              </div>
            </div>
          )}


        </div>

        {/* === BAGIAN 2: CONTACT MENU BUTTONS === */}
        <div className="relative flex flex-col items-end">
            
            {/* Menu Pop-up (Muncul saat tombol telepon diklik) */}
            {isMenuOpen && (
              <div className="absolute bottom-full mb-4 flex flex-col gap-3 items-end min-w-[200px] animate-in fade-in slide-in-from-bottom-4 duration-200">
                
                {/* Tombol Tanya AI (Versi Menu) */}
                <button 
                  onClick={() => { setIsChatOpen(true); setIsMenuOpen(false); }}
                  className="bg-white text-slate-700 shadow-xl px-5 py-3 rounded-full flex items-center justify-between gap-4 hover:bg-slate-50 hover:text-pink-500 transition-all w-full border border-slate-100 group"
                >
                  <span className="text-sm font-bold">Chat AI Aura</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-pink-100 flex items-center justify-center text-pink-500 transition-colors">
                     <MessageCircle size={18} />
                  </div>
                </button>

                <button 
                  onClick={() => { setActiveModal('visit'); setIsMenuOpen(false); }}
                  className="bg-white text-slate-700 shadow-xl px-5 py-3 rounded-full flex items-center justify-between gap-4 hover:bg-slate-50 hover:text-pink-500 transition-all w-full border border-slate-100 group"
                >
                  <span className="text-sm font-bold">Schedule Visit</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-pink-100 flex items-center justify-center text-pink-500 transition-colors">
                     <Calendar size={18} />
                  </div>
                </button>
                
                <button 
                   onClick={() => { setActiveModal('ask'); setIsMenuOpen(false); }}
                   className="bg-white text-slate-700 shadow-xl px-5 py-3 rounded-full flex items-center justify-between gap-4 hover:bg-slate-50 hover:text-cyan-500 transition-all w-full border border-slate-100 group"
                >
                  <span className="text-sm font-bold">Hubungi Agen</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-cyan-100 flex items-center justify-center text-cyan-500 transition-colors">
                     <User size={18} />
                  </div>
                </button>
              </div>
            )}

            {/* Main Floating Action Button (FAB) */}
            <button 
              onClick={toggleMenu}
              className={`p-4 rounded-full shadow-2xl shadow-pink-500/40 text-white transition-all duration-300 transform hover:scale-110 z-50 ${isMenuOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-tr from-pink-500 to-cyan-400'}`}
            >
              {isMenuOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
      </div>

      {/* === BAGIAN 3: MODAL FORM (Schedule/Ask) === */}
      {/* Ini form yang muncul di tengah layar */}
      {activeModal && (
        <ContactModal type={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
};

// --- Sub-Component: Contact Modal (Biar file gak kepanjangan) ---
const ContactModal: React.FC<{ type: 'visit' | 'ask'; onClose: () => void }> = ({ type, onClose }) => {
  const isVisit = type === 'visit';
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-300 hover:text-slate-600 transition-colors">
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-400">
          {isVisit ? 'Jadwalkan Kunjungan' : 'Hubungi Agen'}
        </h3>
        <p className="text-slate-500 mb-6 text-sm">Isi form di bawah, agen kami akan segera menghubungi Anda via WhatsApp.</p>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Permintaan terkirim!"); onClose(); }}>
          <input type="text" placeholder="Nama Lengkap" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" required />
          <input type="tel" placeholder="Nomor WhatsApp" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" required />
          
          {isVisit && (
             <div className="flex gap-3">
                <input type="date" className="w-1/2 px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-slate-600" required />
                <input type="time" className="w-1/2 px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-slate-600" required />
             </div>
          )}

          <textarea placeholder="Ada pesan khusus?" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/50 h-24 resize-none transition-all"></textarea>
          
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold hover:shadow-lg hover:shadow-pink-500/30 hover:opacity-90 transition-all transform hover:-translate-y-1">
            Kirim Permintaan
          </button>
        </form>
      </div>
    </div>
  );
};

export default SmartAssistant;