
import React, { useEffect, useState } from 'react';
import { SportEvent, SportLevel } from '../types';

interface BrowseEventsViewProps {
  onBack: () => void;
  onJoin: (event: SportEvent) => void;
}

const ACTIVITIES = ['Todas', 'Surf', 'Senderismo', 'Pádel', 'Running', 'Crossfit Beach', 'Voley Playa'];
const LEVELS = ['Todos', ...Object.values(SportLevel)];

export const BrowseEventsView: React.FC<BrowseEventsViewProps> = ({ onBack, onJoin }) => {
  const [allEvents, setAllEvents] = useState<SportEvent[]>([]);
  const [activityFilter, setActivityFilter] = useState('Todas');
  const [levelFilter, setLevelFilter] = useState('Todos');
  const [displayEvents, setDisplayEvents] = useState<{event: SportEvent, isForced: boolean}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('sportmatch_events');
    if (saved) {
      const parsed = JSON.parse(saved) as SportEvent[];
      setAllEvents(parsed);
      setDisplayEvents(parsed.map(e => ({ event: e, isForced: false })));
    }
  }, []);

  const handleSearch = () => {
    const matching = allEvents.filter(e => {
      const matchActivity = activityFilter === 'Todas' || e.activity === activityFilter;
      const matchLevel = levelFilter === 'Todos' || e.level === levelFilter;
      return matchActivity && matchLevel;
    });

    const nonMatching = allEvents.filter(e => !matching.some(m => m.id === e.id));
    
    let forced: SportEvent[] = [];
    if (nonMatching.length > 0) {
      const shuffled = [...nonMatching].sort(() => 0.5 - Math.random());
      const numForced = Math.max(1, Math.min(2, Math.ceil(allEvents.length * 0.15)));
      forced = shuffled.slice(0, numForced);
    }

    const finalDisplay = [
      ...matching.map(e => ({ event: e, isForced: false })),
      ...forced.map(e => ({ event: e, isForced: true }))
    ];

    setDisplayEvents(finalDisplay);
  };

  return (
    <div className="max-w-5xl mx-auto w-full p-6 animate-fadeIn pb-24">
      <button 
        onClick={onBack}
        className="mb-8 text-ocean font-bold flex items-center gap-2 hover:underline group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al Inicio
      </button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-volcanic">Explorar Actividades</h2>
          <p className="text-gray-500 font-medium">Filtra tus intereses o déjate sorprender por la isla.</p>
        </div>
        
        <div className="w-full md:w-auto bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-40">
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 px-1">Actividad</label>
            <select 
              className="w-full p-3 bg-gray-50 rounded-xl outline-none font-bold text-sm border-2 border-transparent focus:border-ocean transition-all"
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
            >
              {ACTIVITIES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="w-full md:w-40">
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 px-1">Nivel</label>
            <select 
              className="w-full p-3 bg-gray-50 rounded-xl outline-none font-bold text-sm border-2 border-transparent focus:border-ocean transition-all"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <button 
            onClick={handleSearch}
            className="w-full md:w-auto bg-ocean text-white font-black px-8 py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            🔍 BUSCAR
          </button>
        </div>
      </div>

      {displayEvents.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[40px] border-4 border-dashed border-gray-100">
          <div className="text-6xl mb-4 opacity-20">🏝️</div>
          <p className="text-gray-400 font-black text-xl">Sin resultados por ahora.</p>
          <p className="text-gray-400 text-sm">Prueba a cambiar los filtros o crea tu propio evento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map(({event, isForced}) => (
            <div 
              key={`${event.id}-${isForced ? 'forced' : 'normal'}`} 
              className={`group bg-white p-6 rounded-[32px] shadow-sm border-2 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col ${
                event.isMentor 
                ? 'ring-2 ring-green-500/20' 
                : ''
              } ${
                isForced 
                ? 'border-sand bg-[#fffcf0] ring-2 ring-sand/20' 
                : 'border-gray-50 hover:border-ocean/20'
              }`}
            >
                {isForced && (
                  <div className="absolute top-0 right-0 bg-sand text-volcanic px-3 py-1.5 text-[10px] font-black uppercase rounded-bl-xl shadow-sm z-10 flex items-center gap-1">
                    ✨ Sugerencia SportMatch
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${isForced ? 'bg-sand text-volcanic' : 'bg-volcanic text-white'}`}>
                      {event.activity}
                    </span>
                    <span className="text-ocean font-bold text-[11px] flex items-center gap-1 bg-ocean/5 px-2 py-1 rounded-lg">📍 {event.location.split(' ')[0]}</span>
                </div>
                
                <h3 className="text-2xl font-black text-volcanic mb-1 leading-tight">
                  {event.activity} en {event.location.includes('(') ? event.location.split('(')[0] : event.location}
                </h3>

                {event.isMentor && (
                  <div className="flex items-center gap-1 mb-4 text-green-700 font-black text-[10px] uppercase bg-green-100 w-fit px-3 py-1 rounded-full mt-1 border border-green-200">
                    <span className="text-xs">🛡️</span> Mentor Activo
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 text-[11px] font-bold text-gray-500 mb-6 mt-4">
                  <span className="bg-gray-100 px-2 py-1 rounded-md border border-gray-200">📊 {event.level}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md border border-gray-200">📅 {event.date}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md border border-gray-200">⏰ {event.time}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-volcanic/30 text-[9px] font-black uppercase tracking-tighter">
                      {isForced ? 'Inclusión Forzada' : 'Match Directo'}
                    </div>
                    <button 
                      onClick={() => onJoin(event)}
                      className={`px-6 py-2.5 rounded-2xl font-black text-xs transition-all active:scale-90 shadow-md ${
                        event.isMentor 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : isForced 
                        ? 'bg-sand text-volcanic hover:brightness-95' 
                        : 'bg-ocean text-white hover:bg-ocean/90'
                      }`}
                    >
                      UNIRME
                    </button>
                </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-20 text-center p-12 bg-volcanic text-white rounded-[50px] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 island-gradient group-hover:opacity-20 transition-opacity pointer-events-none"></div>
        <div className="relative z-10">
          <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-500">🌋</div>
          <h4 className="text-2xl font-black mb-2">Inclusión Activa Gran Canaria</h4>
          <p className="text-white/60 text-sm max-w-lg mx-auto leading-relaxed">
            Nuestra ética de <strong>Exploración Forzada</strong> garantiza que al menos un 15% de los eventos que ves sean oportunidades para salir de tu burbuja habitual y conocer gente nueva en la isla.
          </p>
        </div>
      </div>
    </div>
  );
};
