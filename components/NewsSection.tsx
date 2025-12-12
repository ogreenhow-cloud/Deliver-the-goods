import React, { useState } from 'react';
import { Story } from '../types';
import { ChevronDown, ChevronUp, Share2, Clock } from 'lucide-react';

interface NewsSectionProps {
  stories: Story[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ stories }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="news" className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-zinc-800 pb-4 flex justify-between items-end">
           <h2 className="text-3xl font-bold uppercase tracking-wide">Industry News</h2>
           <span className="text-accent text-sm font-semibold">LATEST INSIGHTS</span>
        </div>
        
        <div className="grid gap-12 lg:grid-cols-3">
          {stories.map((story) => (
            <div key={story.id} className="group flex flex-col bg-zinc-900/50 border border-zinc-800 hover:border-accent transition-colors duration-300">
              {story.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={story.imageUrl} 
                    alt={story.headline} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                     {story.tags.map(tag => (
                        <span key={tag} className="bg-black/80 text-white text-xs px-2 py-1 uppercase tracking-wider font-bold">
                           {tag}
                        </span>
                     ))}
                  </div>
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center text-zinc-500 text-xs mb-3 space-x-2">
                  <Clock size={12} />
                  <span>{new Date(story.date).toLocaleDateString()}</span>
                  <span>|</span>
                  <span className="text-accent">{story.author}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {story.headline}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {expandedId === story.id ? story.summary : story.excerpt}
                </p>

                {expandedId === story.id && story.fullContent && (
                   <div 
                     className="text-gray-300 text-sm mb-4 animate-fade-in prose prose-invert prose-p:mb-2 prose-ul:list-disc prose-ul:pl-4"
                     dangerouslySetInnerHTML={{ __html: story.fullContent }} 
                   />
                )}

                <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-between items-center">
                  <button 
                    onClick={() => toggleExpand(story.id)}
                    className="text-sm font-semibold text-white flex items-center hover:text-accent transition-colors"
                  >
                    {expandedId === story.id ? 'READ LESS' : 'READ MORE'}
                    {expandedId === story.id ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                  </button>
                  <button className="text-zinc-500 hover:text-white" aria-label="Share">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;