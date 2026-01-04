
import React, { useState, useEffect } from 'react';
import { HomeView } from './components/HomeView';
import { CreateEventView } from './components/CreateEventView';
import { BrowseEventsView } from './components/BrowseEventsView';
import { ChatView } from './components/ChatView';
import { ProfileView } from './components/ProfileView';
import { AppView, SportEvent, SportLevel } from './types';

const MOCK_EVENTS: SportEvent[] = [
  {
    id: 'm1',
    activity: 'Fútbol 7',
    level: SportLevel.INTERMEDIATE,
    location: '📍 Zona Siete Palmas',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    isMentor: false,
    createdAt: Date.now() - 1000
  },
  {
    id: 'm2',
    activity: 'Golf',
    level: SportLevel.INTERMEDIATE,
    location: '📍 Zona Tafira / Bandama (Montaña/Golf)',
    date: new Date().toISOString().split('T')[0],
    time: '10:30',
    isMentor: false,
    createdAt: Date.now() - 2000
  },
  {
    id: 'm3',
    activity: 'Surf / Bodyboard',
    level: SportLevel.EXPERT,
    location: '📍 Zona Las Canteras / Cícer (Playa)',
    date: new Date().toISOString().split('T')[0],
    time: '08:00',
    isMentor: true,
    createdAt: Date.now() - 3000
  },
  {
    id: 'm4',
    activity: 'Trail Running / Senderismo',
    level: SportLevel.INTERMEDIATE,
    location: '📍 Zona Cumbre / Roque Nublo',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    isMentor: false,
    createdAt: Date.now() - 4000
  },
  {
    id: 'm5',
    activity: 'Baloncesto',
    level: SportLevel.BEGINNER,
    location: '📍 Zona Escaleritas / La Ballena',
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    isMentor: true,
    createdAt: Date.now() - 5000
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [selectedEvent, setSelectedEvent] = useState<SportEvent | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem('sportmatch_events');
    if (!savedEvents || JSON.parse(savedEvents).length === 0) {
      localStorage.setItem('sportmatch_events', JSON.stringify(MOCK_EVENTS));
    }
    
    const savedImage = localStorage.getItem('sportmatch_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [currentView]);

  const navigateTo = (view: AppView, event: SportEvent | null = null) => {
    if (event) setSelectedEvent(event);
    setCurrentView(view);
  };

  /**
   * Logotipo SVG Rediseñado (Vectorial Profesional)
   */
  const BrandLogo = () => (
    <svg width="65" height="65" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl overflow-visible">
      <defs>
        {/* Gradiente para el fondo azul profundo */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#006994" />
          <stop offset="100%" stopColor="#004a69" />
        </linearGradient>
        
        {/* Gradiente para la Pelota/Sol */}
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#FFEA8E" />
          <stop offset="70%" stopColor="#E6C229" />
          <stop offset="100%" stopColor="#D4B11E" />
        </radialGradient>

        {/* Gradiente para el Mar */}
        <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#006994" />
        </linearGradient>

        {/* ClipPath para mantener todo dentro del círculo */}
        <clipPath id="circleClip">
          <circle cx="100" cy="100" r="90" />
        </clipPath>
      </defs>

      {/* Capa 1: Fondo y Borde Arena */}
      <circle cx="100" cy="100" r="95" fill="#E6C229" />
      <circle cx="100" cy="100" r="90" fill="url(#bgGradient)" />

      <g clipPath="url(#circleClip)">
        {/* Capa 2: Pelota/Sol Híbrido (Detrás de la montaña) */}
        <g transform="translate(110, 65)">
          {/* Resplandor */}
          <circle cx="0" cy="0" r="45" fill="#E6C229" opacity="0.15" />
          <circle cx="0" cy="0" r="38" fill="url(#sunGradient)" />
          {/* Costuras de Tenis Realistas */}
          <path d="M-25 -15 Q0 10 25 -15" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          <path d="M-25 15 Q0 -10 25 15" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* Capa 3: La Montaña (Volumétrica / Roque Nublo style) */}
        <g transform="translate(30, 40)">
          {/* Cara en sombra */}
          <path d="M0 130 L60 40 L85 75 L115 25 L145 130 Z" fill="#4A4A4A" />
          {/* Cara iluminada / Detalle de picos */}
          <path d="M60 40 L85 75 L100 130 L60 130 Z" fill="#7B7B7B" opacity="0.6" />
          <path d="M115 25 L135 130 L115 130 Z" fill="#A0A0A0" opacity="0.4" />
        </g>

        {/* Capa 4: El Mar (Olas Dinámicas) */}
        <g>
          {/* Ola trasera */}
          <path d="M-10 155 C 30 145, 70 185, 110 155 C 150 125, 180 175, 210 155 V210 H-10 Z" fill="#0077B6" opacity="0.5" />
          {/* Ola principal */}
          <path d="M-10 170 C 40 150, 60 200, 110 170 C 160 140, 180 200, 210 170 V210 H-10 Z" fill="url(#seaGradient)" />
          {/* Brillo de espuma */}
          <path d="M-10 185 C 30 175, 70 210, 110 185 C 150 160, 190 210, 210 185" fill="none" stroke="#90E0EF" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </g>
      </g>
    </svg>
  );

  const DefaultAvatar = () => (
    <div className="w-full h-full bg-volcanic flex items-center justify-center p-2">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sand w-6 h-6">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="island-gradient p-4 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          
          <button 
            onClick={() => setCurrentView('HOME')}
            className="flex items-center hover:opacity-90 transition-opacity focus:outline-none"
          >
            <BrandLogo />
            <h1 className="text-2xl font-black tracking-tight ml-[16px]">
              SPORT<span className="text-sand">MATCH</span>
            </h1>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-[10px] font-semibold bg-sand/20 px-2 py-1 rounded border border-sand/30 uppercase tracking-widest">
              Gran Canaria
            </div>
            <button 
              onClick={() => setCurrentView('PROFILE')}
              className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden ${currentView === 'PROFILE' ? 'border-sand scale-110 shadow-lg' : 'border-white/30 hover:border-white'}`}
            >
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <DefaultAvatar />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col bg-[#fdfdfd]">
        {currentView === 'HOME' && <HomeView onNavigate={(view) => navigateTo(view)} />}
        {currentView === 'CREATE' && <CreateEventView onBack={() => setCurrentView('HOME')} />}
        {currentView === 'BROWSE' && (
          <BrowseEventsView 
            onBack={() => setCurrentView('HOME')} 
            onJoin={(event) => navigateTo('CHAT', event)} 
          />
        )}
        {currentView === 'CHAT' && selectedEvent && (
          <ChatView 
            event={selectedEvent} 
            onExit={() => setCurrentView('HOME')} 
          />
        )}
        {currentView === 'PROFILE' && (
          <ProfileView 
            onBack={() => setCurrentView('HOME')} 
          />
        )}
      </main>

      <footer className="bg-volcanic text-white/60 p-6 text-center text-sm border-t border-white/5">
        <p>© 2024 SportMatch Las Palmas. Conectando la isla a través del deporte.</p>
        <p className="mt-1 text-xs text-sand/80 font-semibold tracking-wide">
          Mínima Recolección de Datos • Ética de Inclusión Activa
        </p>
      </footer>
    </div>
  );
};

export default App;
