
import React, { useState, useEffect } from 'react';
import { HomeView } from './components/HomeView';
import { CreateEventView } from './components/CreateEventView';
import { BrowseEventsView } from './components/BrowseEventsView';
import { ChatView } from './components/ChatView';
import { ProfileView } from './components/ProfileView';
import { AppView, SportEvent, SportLevel } from './types';

const MOCK_EVENTS: SportEvent[] = [
  // 3 Surf Experto en La Cícer
  {
    id: 'surf-exp-1',
    activity: 'Surf',
    level: SportLevel.EXPERT,
    location: 'La Cícer (Las Canteras)',
    date: new Date().toISOString().split('T')[0],
    time: '08:30',
    isMentor: false,
    createdAt: Date.now() - 1000
  },
  {
    id: 'surf-exp-2',
    activity: 'Surf',
    level: SportLevel.EXPERT,
    location: 'La Cícer (Las Canteras)',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    isMentor: true,
    createdAt: Date.now() - 2000
  },
  {
    id: 'surf-exp-3',
    activity: 'Surf',
    level: SportLevel.EXPERT,
    location: 'La Cícer (Las Canteras)',
    date: new Date().toISOString().split('T')[0],
    time: '16:00',
    isMentor: false,
    createdAt: Date.now() - 3000
  },
  // 2 Surf Principiante (1 Mentor, 1 No Mentor)
  {
    id: 'surf-beg-mentor',
    activity: 'Surf',
    level: SportLevel.BEGINNER,
    location: 'La Cícer (Las Canteras)',
    date: new Date().toISOString().split('T')[0],
    time: '11:30',
    isMentor: true,
    createdAt: Date.now() - 4000
  },
  {
    id: 'surf-beg-no-mentor',
    activity: 'Surf',
    level: SportLevel.BEGINNER,
    location: 'La Cícer (Las Canteras)',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    isMentor: false,
    createdAt: Date.now() - 5000
  },
  // 2 Senderismo Intermedio
  {
    id: 'send-int-1',
    activity: 'Senderismo',
    level: SportLevel.INTERMEDIATE,
    location: 'El Confital',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    isMentor: false,
    createdAt: Date.now() - 6000
  },
  {
    id: 'send-int-2',
    activity: 'Senderismo',
    level: SportLevel.INTERMEDIATE,
    location: 'Barranco de Guiniguada',
    date: new Date().toISOString().split('T')[0],
    time: '17:00',
    isMentor: true,
    createdAt: Date.now() - 7000
  },
  // 1 Padel Principiante
  {
    id: 'padel-beg-1',
    activity: 'Pádel',
    level: SportLevel.BEGINNER,
    location: 'Parque Romano',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    isMentor: false,
    createdAt: Date.now() - 8000
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [selectedEvent, setSelectedEvent] = useState<SportEvent | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // Events loading
    const savedEvents = localStorage.getItem('sportmatch_events');
    if (!savedEvents || JSON.parse(savedEvents).length === 0) {
      localStorage.setItem('sportmatch_events', JSON.stringify(MOCK_EVENTS));
    }
    
    // Profile image loading
    const savedImage = localStorage.getItem('sportmatch_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [currentView]); // Refresh image state when returning to a view that might use it

  const navigateTo = (view: AppView, event: SportEvent | null = null) => {
    if (event) setSelectedEvent(event);
    setCurrentView(view);
  };

  const DefaultAvatar = () => (
    <div className="w-full h-full bg-volcanic flex items-center justify-center p-2">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sand w-6 h-6">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 2v2" className="text-ocean" />
        <path d="M12 12v2" className="text-ocean" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="island-gradient p-4 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => setCurrentView('HOME')}
            className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity"
          >
            SPORT<span className="text-sand">MATCH</span>
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
