import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Typing Test',
      links: [
        { name: 'Marathi Remington Typing Test', path: '#' },
        { name: 'English Typing Test', path: '#' },
        { name: 'Marathi Kruti Dev Typing Test', path: '#' },
        { name: 'Hindi Typing Test', path: '#' },
      ],
    },
    {
      title: 'Miscellaneous',
      links: [
        { name: 'English Typing Lessons', path: '#' },
        { name: 'Marathi Remington Keyboard', path: '#' },
        { name: 'Marathi Inscript Keyboard', path: '#' },
        { name: 'Marathi Typewriter Keyboard', path: '#' },
        { name: 'Marathi KrutiDev Keyboard', path: '#' },
      ],
    },
    {
      title: 'About Us',
      links: [
        { name: 'About Us', path: '#about' },
        { name: 'Contact Us', path: '#contact' },
        { name: 'Telegram', path: '#' },
      ],
    },
    {
      title: 'Privacy',
      links: [
        { name: 'Privacy Policy', path: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MT</span>
              </div>
              <span className="text-xl font-bold text-white">
                MyTypingWala
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              India's premium typing test platform for government job preparation.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section?.title}</h3>
              <ul className="space-y-2">
                {section?.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link?.path}
                      className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <Mail size={18} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-sm text-white">contactmytypingwala@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <Phone size={18} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-sm text-white">7058728975</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <MapPin size={18} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-sm text-white">Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              Copyright © mytypingwala.com
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;