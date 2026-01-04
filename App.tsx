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

  // Componente del Logotipo SVG Detallado
  const BrandLogo = () => (
    <svg width="60" height="60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
      <defs>
        <clipPath id="circleClip">
          <circle cx="100" cy="100" r="85" />
        </clipPath>
      </defs>
      
      {/* Borde Exterior Amarillo Arena */}
      <circle cx="100" cy="100" r="95" fill="#E6C229" />
      
      {/* Fondo Interior Azul Océano Profundo */}
      <circle cx="100" cy="100" r="85" fill="#006994" />

      <g clipPath="url(#circleClip)">
        {/* Sol / Pelota de Tenis (Fondo arriba) */}
        <circle cx="105" cy="70" r="45" fill="#E6C229" />
        {/* Líneas de la pelota de tenis */}
        <path d="M75 50 Q105 80 135 50" fill="none" stroke="white" strokeWidth="4" />
        <path d="M75 90 Q105 60 135 90" fill="none" stroke="white" strokeWidth="4" />

        {/* Montaña Rocosa Escarpada (Centro) */}
        <path 
          d="M10 185 L55 130 L85 90 L115 55 L145 105 L175 145 L195 185 Z" 
          fill="#4a4a4a" 
        />
        <path 
          d="M115 55 L135 110 L115 130 L95 110 Z" 
          fill="#6d6d6d" 
          opacity="0.7"
        />
        
        {/* Olas Marinas (Frente abajo) */}
        <path 
          d="M-10 155 C 40 135, 60 175, 110 155 C 160 135, 180 175, 210 155 V210 H-10 Z" 
          fill="#0088cc" 
        />
        <path 
          d="M-10 170 C 30 160, 70 190, 110 170 C 150 150, 190 190, 210 170 V210 H-10 Z" 
          fill="#006994" 
        />
      </g>
    </svg>
  );

  const DefaultAvatar = () => (
    <div className="w-full h-full bg-volcanic flex items-center justify-center p-2 text-sand">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="island-gradient p-4 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          
          {/* Contenedor de Marca Flex solicitado */}
          <button 
            onClick={() => setCurrentView('HOME')}
            className="header-brand-container hover:opacity-90 transition-opacity"
          >
            <BrandLogo />
            <h1 className="text-2xl font-extrabold tracking-tight">
              SPORT<span className="text-sand">MATCH</span>
            </h1>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-[10px] font-semibold bg-sand/20 px-2 py-1 rounded border border-sand/30 uppercase tracking-widest">
              Gran Canaria
            </div>
            <button 
              onClick={() => setCurrentView('PROFILE')}
              className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden ${currentView === 'PROFILE' ? 'border-sand scale-110' : 'border-white/30 hover:border-white'}`}
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