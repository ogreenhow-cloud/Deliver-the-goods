import React from 'react';
import { Mail, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
                <h3 className="text-white text-lg font-bold uppercase mb-4">Delivering the News</h3>
                <p className="text-sm max-w-md">
                    Internal Consumer Goods practice newsletter. 
                    Confidential and proprietary. For internal distribution only.
                </p>
            </div>
            <div>
                <h4 className="text-white text-sm font-bold uppercase mb-4">Contact</h4>
                <a href="mailto:editor@example.com" className="flex items-center text-sm hover:text-accent mb-2">
                    <Mail size={16} className="mr-2" /> Editor Inbox
                </a>
                <a href="#" className="flex items-center text-sm hover:text-accent">
                    <Globe size={16} className="mr-2" /> Practice Portal
                </a>
            </div>
            <div>
                <h4 className="text-white text-sm font-bold uppercase mb-4">Archives</h4>
                <ul className="text-sm space-y-2">
                    <li><a href="#" className="hover:text-white">September 2023</a></li>
                    <li><a href="#" className="hover:text-white">August 2023</a></li>
                    <li><a href="#" className="hover:text-white">July 2023</a></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} Consumer Goods Practice.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
                <span>Privacy Policy</span>
                <span>Terms of Use</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;