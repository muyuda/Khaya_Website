import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 text-slate-500">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">K</div>
                <span className="font-bold text-xl text-slate-800">KHAYA</span>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed">
               Redefining modern living for the next generation. <br/> Est. 2024.
             </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-pink-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-pink-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="hover:text-pink-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-slate-800 mb-6">Contact</h4>
             <ul className="space-y-3 text-sm">
               <li className="flex items-center gap-3"><MapPin size={16} className="text-cyan-500" /> Jakarta Selatan, ID</li>
               <li className="flex items-center gap-3"><Phone size={16} className="text-cyan-500" /> +62 21 555 0000</li>
               <li className="flex items-center gap-3"><Mail size={16} className="text-cyan-500" /> hello@khayalandmark.id</li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-slate-800 mb-6">Social</h4>
             <div className="flex space-x-4">
               <Instagram className="hover:text-pink-500 cursor-pointer" size={24} />
               <Facebook className="hover:text-cyan-500 cursor-pointer" size={24} />
               <Twitter className="hover:text-cyan-500 cursor-pointer" size={24} />
             </div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
           © 2024 Khaya Landmark. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;