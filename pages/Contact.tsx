import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-slate-50 z-0 pointer-events-none"></div>
       <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-3xl pointer-events-none"></div>
       <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-24 relative z-10">
           
           {/* Header */}
           <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
               <span className="text-brand-pink font-bold tracking-wider text-sm uppercase mb-2 block">Contact Us</span>
               <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">Let's start a conversation.</h1>
               <p className="text-xl text-slate-500 font-medium leading-relaxed">
                   Interested in a property? Have questions about KPR? Or just want to say hi? We're ready when you are.
               </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
               
               {/* Contact Form - Spans 7 cols */}
               <div className="lg:col-span-7 animate-fade-in-up delay-100">
                   <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-white h-full">
                        <h3 className="text-2xl font-bold text-slate-800 mb-8">Send a Message</h3>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message Sent!"); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wide ml-1">Your Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:outline-none focus:border-brand-pink focus:bg-white transition-all font-medium text-slate-700" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wide ml-1">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:outline-none focus:border-brand-pink focus:bg-white transition-all font-medium text-slate-700" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wide ml-1">Phone Number</label>
                                    <input type="tel" placeholder="+62 812..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:outline-none focus:border-brand-pink focus:bg-white transition-all font-medium text-slate-700" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wide ml-1">Subject</label>
                                    <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:outline-none focus:border-brand-pink focus:bg-white transition-all font-medium text-slate-700 appearance-none">
                                        <option>General Inquiry</option>
                                        <option>Schedule Viewing</option>
                                        <option>Partnership</option>
                                        <option>Support</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-wide ml-1">Message</label>
                                <textarea rows={5} placeholder="How can we help you?" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:outline-none focus:border-brand-pink focus:bg-white transition-all font-medium text-slate-700 resize-none"></textarea>
                            </div>

                            <button type="submit" className="w-full py-5 bg-slate-800 text-white rounded-2xl font-bold text-lg hover:bg-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group">
                                Send Message <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                   </div>
               </div>

               {/* Contact Info - Spans 5 cols */}
               <div className="lg:col-span-5 animate-fade-in-up delay-200 flex flex-col gap-8">
                   {/* Info Card */}
                   <div className="bg-gradient-to-br from-brand-pink to-brand-cyan rounded-[2.5rem] p-10 text-white shadow-2xl shadow-brand-pink/30 relative overflow-hidden flex-grow flex flex-col justify-between">
                       {/* Abstract shapes */}
                       <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                       <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-black/10 rounded-full blur-xl"></div>
                       
                       <div className="relative z-10">
                           <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                           <p className="text-white/80 mb-10">Reach out to us directly through any of these channels.</p>
                           
                           <div className="space-y-8">
                               <div className="flex items-start gap-4 group">
                                   <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                       <MapPin size={24} className="text-white" />
                                   </div>
                                   <div>
                                       <h4 className="font-bold text-lg">Office HQ</h4>
                                       <p className="text-white/80 text-sm leading-relaxed">
                                           South Quarter, Tower A<br/>
                                           Jl. R.A. Kartini Kav 8<br/>
                                           Cilandak, Jakarta Selatan
                                       </p>
                                   </div>
                               </div>

                               <div className="flex items-start gap-4 group">
                                   <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                       <Phone size={24} className="text-white" />
                                   </div>
                                   <div>
                                       <h4 className="font-bold text-lg">Phone</h4>
                                       <p className="text-white/80 text-sm">+62 21 555 0000</p>
                                       <p className="text-white/60 text-xs mt-1">Mon-Fri, 9am - 5pm</p>
                                   </div>
                               </div>

                               <div className="flex items-start gap-4 group">
                                   <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                       <Mail size={24} className="text-white" />
                                   </div>
                                   <div>
                                       <h4 className="font-bold text-lg">Email</h4>
                                       <a href="mailto:hello@khayalandmark.id" className="text-white/80 text-sm hover:text-white underline decoration-white/30 hover:decoration-white transition-all">hello@khayalandmark.id</a>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div className="relative z-10 pt-10 border-t border-white/20 mt-10">
                           <div className="flex gap-4">
                               <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-brand-pink transition-all"><Instagram size={20} /></a>
                               <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-brand-cyan transition-all"><Facebook size={20} /></a>
                               <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-brand-cyan transition-all"><Twitter size={20} /></a>
                           </div>
                       </div>
                   </div>

                   {/* WhatsApp Card */}
                   <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="bg-[#25D366] rounded-[2.5rem] p-8 flex items-center justify-between text-white shadow-xl shadow-green-500/20 hover:scale-[1.02] transition-transform group">
                       <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                                <MessageCircle size={32} fill="white" className="group-hover:animate-bounce"/>
                           </div>
                           <div>
                               <h4 className="font-bold text-xl">Chat on WhatsApp</h4>
                               <p className="text-white/80 text-sm">Fast response 24/7</p>
                           </div>
                       </div>
                       <ArrowRight size={24} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                   </a>
               </div>
           </div>

           {/* Full Width Map */}
           <div className="rounded-[2.5rem] overflow-hidden h-[450px] shadow-2xl shadow-slate-200 animate-fade-in-up delay-300 relative group">
               <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.989066465456!2d106.79469557499076!3d-6.265167993723485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1a04456671d%3A0x6c6374f4d221b7b7!2sSouth%20Quarter!5e0!3m2!1sen!2sid!4v1709238472382!5m2!1sen!2sid" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
               ></iframe>
               
               {/* Overlay Badge */}
               <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg">
                   <p className="font-bold text-slate-800 flex items-center gap-2">
                       <MapPin size={16} className="text-brand-pink" /> 
                       Find us at South Quarter
                   </p>
                   <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-brand-cyan font-bold hover:underline mt-1 block pl-6"
                   >
                       Get Directions
                   </a>
               </div>
           </div>

       </div>
    </div>
  );
};

export default Contact;