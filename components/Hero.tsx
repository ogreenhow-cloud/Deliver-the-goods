import React from 'react';

interface HeroProps {
  editorNote: string;
  quickLinks: { label: string; actionId: string }[];
}

const Hero: React.FC<HeroProps> = ({ editorNote, quickLinks }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-8 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">TOGETHER WE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                REIN<span className="text-accent">&gt;</span>ENTED
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 border-l-4 border-accent pl-4">
              {editorNote}
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-wrap gap-4">
              {quickLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(link.actionId)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium text-white bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 group"
                >
                  {link.label}
                  <span className="ml-2 text-accent group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Abstract Graphic Area */}
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-4 flex items-center justify-center">
             <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-zinc-900 to-black border border-zinc-800 p-8 flex flex-col justify-end">
                <span className="text-accent font-bold text-6xl mb-2">Q4</span>
                <span className="text-white text-xl font-light">Consumer Goods<br/>Forecast</span>
                <div className="absolute top-4 right-4 text-zinc-700">
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                   </svg>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;