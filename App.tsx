import React, { useEffect, useState } from 'react';
import { fetchContent } from './services/contentService';
import { NewsletterData } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import PerformanceSection from './components/PerformanceSection';
import NewsSection from './components/NewsSection';
import LeadershipSection from './components/LeadershipSection';
import QuizSection from './components/QuizSection';
import CalendarSection from './components/CalendarSection';
import ResourcesSection from './components/ResourcesSection';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState<NewsletterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent().then((content) => {
      setData(content);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
             <div className="w-12 h-12 border-4 border-zinc-800 border-t-accent rounded-full animate-spin mb-4"></div>
             <p className="text-white font-mono uppercase tracking-widest text-sm animate-pulse">Loading Content...</p>
        </div>
      </div>
    );
  }

  if (!data) return <div className="text-white text-center p-10">Error loading content.</div>;

  return (
    <div className="bg-black min-h-screen text-white selection:bg-accent selection:text-white">
      <Header month={data.meta.month} year={data.meta.year} />
      
      <main>
        <Hero 
            editorNote={data.meta.editorNote} 
            quickLinks={data.meta.quickLinks} 
        />
        
        {/* New Performance Dashboard */}
        {data.performance && <PerformanceSection metrics={data.performance} />}
        
        <NewsSection stories={data.news} />
        
        <LeadershipSection updates={data.leadership} />
        
        {/* Replaces previous Poll and Popup Quiz with Inline Games */}
        <QuizSection questions={data.popQuiz} />
        
        <ResourcesSection resources={data.resources} />

        <CalendarSection events={data.calendar} />
      </main>

      <Footer />
      
      {/* Editor Helper */}
      <div className="fixed bottom-4 left-4 z-40 opacity-20 hover:opacity-100 transition-opacity">
         <button 
           className="bg-zinc-800 text-xs px-2 py-1 rounded text-white border border-zinc-700 hover:bg-accent"
           title="See README for AI Integration"
           onClick={() => alert('AI Assist: To generate content, please configure the OpenAI proxy described in the README.')}
         >
           AI Assist
         </button>
      </div>
    </div>
  );
}

export default App;