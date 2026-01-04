
import React, { useState } from 'react';
import { SportLevel, SportEvent } from '../types';

interface CreateEventViewProps {
  onBack: () => void;
}

const PIL_LOCATIONS = [
  '📍 Zona Las Canteras / Cícer (Playa)',
  '📍 Zona Las Canteras / Playa Chica (Playa)',
  '📍 Zona El Confital / La Isleta',
  '📍 Zona Puerto / Parque Santa Catalina',
  '📍 Zona Ciudad Jardín / Parque Romano',
  '📍 Zona Triana / Vegueta',
  '📍 Zona Siete Palmas',
  '📍 Zona Escaleritas / La Ballena',
  '📍 Zona Tafira / Bandama (Montaña/Golf)',
  '📍 Zona Cumbre / Roque Nublo',
  '📍 Zona Sur / Maspalomas'
];

const ACTIVITIES = [
  'Surf / Bodyboard',
  'Fútbol 7',
  'Fútbol 11',
  'Fútbol Sala',
  'Baloncesto',
  'Padel',
  'Tenis',
  'Golf',
  'Voleibol Playa',
  'Balonmano',
  'Trail Running / Senderismo',
  'Ciclismo / MTB',
  'Calistenia (Entreno callejero)',
  'Yoga al aire libre',
  'Buceo / Snorkel'
];

export const CreateEventView: React.FC<CreateEventViewProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    activity: ACTIVITIES[0],
    level: SportLevel.BEGINNER,
    isMentor: false,
    location: PIL_LOCATIONS[0],
    date: '',
    time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: SportEvent = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: Date.now()
    };

    const existingEventsJson = localStorage.getItem('sportmatch_events');
    const existingEvents: SportEvent[] = existingEventsJson ? JSON.parse(existingEventsJson) : [];
    const updatedEvents = [newEvent, ...existingEvents];
    
    localStorage.setItem('sportmatch_events', JSON.stringify(updatedEvents));

    alert('¡Evento publicado con éxito! 🎉');
    onBack();
  };

  return (
    <div className="max-w-xl mx-auto w-full p-6 animate-fadeIn pb-12">
      <button 
        onClick={onBack}
        className="mb-6 text-ocean font-bold flex items-center gap-2 hover:underline group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al Inicio
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-volcanic mb-2">Crear Evento</h2>
        <p className="text-gray-500 mb-8 font-medium">Define tu actividad y encuentra compañeros en la isla.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-volcanic mb-2 uppercase tracking-wide">Actividad</label>
            <select 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-ocean rounded-xl outline-none transition-all font-medium"
              value={formData.activity}
              onChange={(e) => setFormData({...formData, activity: e.target.value})}
            >
              {ACTIVITIES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-volcanic mb-2 uppercase tracking-wide">Nivel Requerido</label>
              <select 
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-ocean rounded-xl outline-none transition-all font-medium"
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value as SportLevel})}
              >
                {Object.values(SportLevel).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex flex-col justify-center pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  className="w-6 h-6 rounded border-gray-300 text-ocean focus:ring-ocean cursor-pointer"
                  checked={formData.isMentor}
                  onChange={(e) => setFormData({...formData, isMentor: e.target.checked})}
                />
                <span className="text-sm font-bold text-volcanic group-hover:text-ocean transition-colors">¿Eres Mentor?</span>
              </label>
              <p className="text-[11px] text-gray-400 font-medium mt-1 pl-9 italic">
                Marca esta opción si te ofreces a enseñar y tener paciencia con principiantes.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-volcanic mb-2 uppercase tracking-wide">Zona / Punto de Interés Local (PIL)</label>
            <select 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-ocean rounded-xl outline-none transition-all font-medium"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            >
              {PIL_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-volcanic mb-2 uppercase tracking-wide">Fecha</label>
              <input 
                type="date" 
                required
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-ocean rounded-xl outline-none transition-all font-medium"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-volcanic mb-2 uppercase tracking-wide">Hora</label>
              <input 
                type="time" 
                required
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-ocean rounded-xl outline-none transition-all font-medium"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-ocean hover:bg-ocean/90 text-white font-black py-5 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest mt-4"
          >
            Publicar Evento
          </button>
        </form>
      </div>
    </div>
  );
};
