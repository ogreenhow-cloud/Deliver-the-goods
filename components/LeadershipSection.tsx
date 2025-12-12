import React, { useState, useEffect } from 'react';
import { LeaderUpdate } from '../types';
import { Bookmark, Check } from 'lucide-react';

interface LeadershipSectionProps {
  updates: LeaderUpdate[];
}

const LeadershipSection: React.FC<LeadershipSectionProps> = ({ updates }) => {
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('leader_bookmarks');
    if (stored) setBookmarked(JSON.parse(stored));
  }, []);

  const toggleBookmark = (id: string) => {
    const newBookmarks = bookmarked.includes(id)
      ? bookmarked.filter(b => b !== id)
      : [...bookmarked, id];
    
    setBookmarked(newBookmarks);
    localStorage.setItem('leader_bookmarks', JSON.stringify(newBookmarks));
  };

  const isRecent = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000; // 7 days
  };

  return (
    <section id="leadership" className="py-20 bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold uppercase tracking-wide text-white mb-12 border-l-4 border-accent pl-6">
          Leadership Voices
        </h2>

        {/* Increased gap and single column on small screens, more generous padding */}
        <div className="grid gap-12 lg:grid-cols-2">
          {updates.map((update) => (
            <div key={update.id} className="flex flex-col sm:flex-row bg-black p-8 sm:p-10 border border-zinc-800 relative shadow-lg hover:border-zinc-700 transition-colors">
               {isRecent(update.date) && (
                 <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1">NEW UPDATE</span>
               )}
              
              <div className="flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
                <img 
                  src={update.photoUrl} 
                  alt={update.name} 
                  className="h-32 w-32 rounded-full object-cover border-4 border-zinc-800"
                  loading="lazy"
                />
              </div>

              <div className="flex-grow flex flex-col">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">{update.name}</h3>
                    <p className="text-accent text-sm uppercase tracking-wider font-semibold">{update.title}</p>
                </div>
                
                <p className="text-gray-300 text-base mb-6 leading-relaxed flex-grow italic">
                  "{update.content}"
                </p>

                <div className="flex justify-end pt-4 border-t border-zinc-800">
                  <button 
                    onClick={() => toggleBookmark(update.id)}
                    className={`flex items-center text-xs font-bold px-4 py-2 border transition-all duration-300 ${bookmarked.includes(update.id) ? 'bg-accent text-white border-accent' : 'bg-transparent text-zinc-400 border-zinc-700 hover:text-white hover:border-white'}`}
                  >
                    {bookmarked.includes(update.id) ? <Check size={14} className="mr-2" /> : <Bookmark size={14} className="mr-2" />}
                    {bookmarked.includes(update.id) ? 'SAVED TO LIST' : 'SAVE FOR LATER'}
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

export default LeadershipSection;