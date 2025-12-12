import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  month: string;
  year: string;
}

const Header: React.FC<HeaderProps> = ({ month, year }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'News', href: '#news' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Quiz', href: '#quiz' },
    { name: 'Resources', href: '#resources' },
    { name: 'Events', href: '#calendar' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title Area */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center font-bold text-white">
              {/* Simple logo placeholder */}
              &gt;
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white uppercase">Delivering the News</span>
              <span className="text-xs text-accent font-medium uppercase tracking-widest">{month} {year}</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white hover:text-accent transition-colors text-sm font-medium uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-gray-800 animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-zinc-800 rounded-md"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;