import React from 'react';
import { Resource } from '../types';
import { FileText, Video, Link as LinkIcon, Download } from 'lucide-react';

interface ResourcesSectionProps {
  resources: Resource[];
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ resources }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText size={24} />;
      case 'Video': return <Video size={24} />;
      default: return <LinkIcon size={24} />;
    }
  };

  return (
    <section id="resources" className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold uppercase tracking-wide mb-10 text-right border-r-4 border-accent pr-4">
          Resources & Tools
        </h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((res) => (
            <a 
              key={res.id} 
              href={res.url} 
              className="block p-6 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-accent group-hover:text-white transition-colors">
                    {getIcon(res.type)}
                </div>
                <span className="text-xs font-bold bg-black px-2 py-1 text-gray-400 rounded">
                    {res.type}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">{res.title}</h3>
              <p className="text-sm text-gray-400">{res.description}</p>
              <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white">
                 <span>Access</span>
                 <Download size={14} className="ml-2" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;