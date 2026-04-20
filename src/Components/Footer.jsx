import React from 'react';
import {   Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: ['All Products', 'Featured', 'New Arrivals', 'Discounts'],
    Support: ['Contact Us', 'Shipping Policy', 'Refund Policy', 'FAQs'],
    Company: ['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'],
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500">Shopfy</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Elevating your shopping experience with premium products and seamless delivery. 
              Your satisfaction is our priority.
            </p>
            {/* <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
            </div> */}
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-slate-900 dark:text-white font-bold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            © {currentYear} Shopfy. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span>support@shopfy.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>+1 (234) 567-890</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-component for Social Icons
const SocialIcon = ({ icon }) => (
  <a href="#" className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
    {icon}
  </a>
);

export default Footer;