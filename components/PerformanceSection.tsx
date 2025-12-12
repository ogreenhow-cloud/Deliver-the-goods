import React from 'react';
import { PerformanceMetric } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PerformanceSectionProps {
  metrics: PerformanceMetric[];
}

const PerformanceSection: React.FC<PerformanceSectionProps> = ({ metrics }) => {
  return (
    <section className="bg-zinc-900 border-b border-zinc-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-8 bg-accent"></div>
            <h2 className="text-xl font-bold uppercase tracking-widest text-white">Monthly Practice Performance</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-black p-6 border border-zinc-800 hover:border-accent transition-all duration-300 group">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block mb-2">{metric.label}</span>
              <div className="text-3xl sm:text-4xl font-black text-white mb-3 group-hover:text-accent transition-colors">
                {metric.value}
              </div>
              <div className={`flex items-center text-sm font-semibold ${metric.isPositive ? 'text-green-500' : 'text-zinc-500'}`}>
                {metric.isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {metric.trend}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;