import React, { useState, useEffect } from 'react';
import { Poll } from '../types';
import { savePollVote, getPollVote } from '../services/contentService';
import { BarChart2 } from 'lucide-react';

interface PollSectionProps {
  poll: Poll;
}

const PollSection: React.FC<PollSectionProps> = ({ poll }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  // Simulated results state (in a real app, you'd fetch these)
  const [results, setResults] = useState<Record<string, number>>({});

  useEffect(() => {
    const vote = getPollVote(poll.id);
    if (vote) {
      setSelected(vote);
      setHasVoted(true);
      generateMockResults(vote); // Simulate fetching current stats
    }
  }, [poll.id]);

  const generateMockResults = (userVote: string) => {
    // Just creates some fake percentages that add up to 100
    const newResults: Record<string, number> = {};
    let remaining = 100;
    poll.options.forEach((opt, idx) => {
        if (idx === poll.options.length - 1) {
            newResults[opt.value] = remaining;
        } else {
            const val = Math.floor(Math.random() * (remaining - 10));
            newResults[opt.value] = val;
            remaining -= val;
        }
    });
    // Boost the user's vote slightly
    setResults(newResults);
  };

  const handleVote = (value: string) => {
    if (hasVoted) return;
    savePollVote(poll.id, value);
    setSelected(value);
    setHasVoted(true);
    generateMockResults(value);
  };

  return (
    <section id="poll" className="py-16 bg-black text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-zinc-900 p-8 md:p-12 border-t-4 border-accent shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <BarChart2 className="text-accent" size={28} />
            <h2 className="text-2xl font-bold uppercase">This Month's Poll</h2>
          </div>
          
          <h3 className="text-xl mb-8 font-light">{poll.question}</h3>

          <div className="space-y-4">
            {poll.options.map((option) => (
              <div key={option.value} className="relative">
                {hasVoted ? (
                    // Result View
                    <div className="relative h-12 bg-black w-full rounded-sm overflow-hidden border border-zinc-700">
                        <div 
                            className="absolute top-0 left-0 h-full bg-accent transition-all duration-1000 ease-out"
                            style={{ width: `${results[option.value] || 0}%`, opacity: selected === option.value ? 1 : 0.6 }}
                        ></div>
                        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4">
                            <span className="font-medium z-10 text-white drop-shadow-md">
                                {option.label} {selected === option.value && '(You)'}
                            </span>
                            <span className="font-bold z-10 text-white drop-shadow-md">
                                {results[option.value] || 0}%
                            </span>
                        </div>
                    </div>
                ) : (
                    // Voting View
                    <button
                        onClick={() => handleVote(option.value)}
                        className="w-full text-left p-4 bg-black border border-zinc-700 hover:border-accent hover:bg-zinc-800 transition-all duration-200 rounded-sm group"
                    >
                        <span className="flex items-center justify-between">
                            <span className="group-hover:translate-x-1 transition-transform">{option.label}</span>
                            <span className="w-4 h-4 border border-zinc-500 rounded-full group-hover:border-accent"></span>
                        </span>
                    </button>
                )}
              </div>
            ))}
          </div>
          
          {hasVoted && (
             <p className="mt-6 text-sm text-gray-500 text-center animate-fade-in">
                 Thanks for participating. Results are aggregated anonymously.
             </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PollSection;