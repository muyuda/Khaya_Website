import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50 text-slate-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Get in Touch</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
          {/* Left Column: Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We'd love to hear from you! Whether you have a question about our properties, need assistance, or just want to give feedback, our team is ready to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-brand-pink flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
                  <p className="text-gray-600">Jl. Raya Khaya Indah No. 123, Jakarta Selatan, Indonesia 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={24} className="text-brand-cyan flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">info@khayalandmark.id</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={24} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Call Us / WhatsApp</h3>
                  <p className="text-gray-600">+62 21 1234 5678</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-all"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-all"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-brand-pink text-white font-bold rounded-xl shadow-lg hover:bg-brand-pink-dark transition-all transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
