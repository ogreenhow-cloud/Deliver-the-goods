import React from 'react';
import { CalendarEvent } from '../types';
import { Calendar as CalIcon, MapPin, Clock } from 'lucide-react';

interface CalendarSectionProps {
  events: CalendarEvent[];
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ events }) => {
  return (
    <section id="calendar" className="py-16 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold uppercase tracking-wide text-white mb-10 flex items-center gap-3">
            <CalIcon className="text-accent" />
            Upcoming Events
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
              const dateObj = new Date(event.date);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleString('default', { month: 'short' });

              return (
                <div key={event.id} className="flex bg-black border border-zinc-800 hover:border-zinc-600 transition-colors group">
                    <div className="w-24 bg-zinc-800 flex flex-col items-center justify-center p-4 text-center group-hover:bg-accent transition-colors duration-300">
                        <span className="text-2xl font-bold text-white block">{day}</span>
                        <span className="text-sm uppercase tracking-wider text-gray-400 group-hover:text-white">{month}</span>
                    </div>
                    <div className="p-4 flex-grow">
                        <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1 block">{event.type}</span>
                        <h3 className="text-white font-bold mb-2">{event.title}</h3>
                        <div className="space-y-1">
                            <div className="flex items-center text-gray-400 text-xs">
                                <Clock size={12} className="mr-2" />
                                {event.time}
                            </div>
                            <div className="flex items-center text-gray-400 text-xs">
                                <MapPin size={12} className="mr-2" />
                                {event.location}
                            </div>
                        </div>
                    </div>
                </div>
              );
          })}
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;