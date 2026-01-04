
import React, { useState, useEffect, useRef } from 'react';
import { Badge, SportLevel } from '../types';

interface ProfileViewProps {
  onBack: () => void;
}

const BADGES: Badge[] = [
  { id: 'b1', icon: '🏆', title: 'Mentor Verificado', description: 'Ayuda a principiantes a empezar.', color: 'bg-sand/10 border-sand' },
  { id: 'b2', icon: '🌊', title: 'Amante del Mar', description: '5 eventos en la costa de la isla.', color: 'bg-ocean/10 border-ocean' },
  { id: 'b3', icon: '⭐', title: 'Compañero 5 Estrellas', description: 'Valoración máxima en deportividad.', color: 'bg-yellow-100 border-yellow-400' },
  { id: 'b4', icon: '🥾', title: 'Explorador Cumbres', description: 'Completó 3 rutas de senderismo.', color: 'bg-green-100 border-green-500' }
];

const HISTORY = [
  { activity: 'Pádel', location: 'Parque Romano', date: 'Hace 2 días' },
  { activity: 'Surf', location: 'La Cícer', date: 'Hace 5 días' }
];

export const ProfileView: React.FC<ProfileViewProps> = ({ onBack }) => {
  const [profileImage, setProfileImage] = useState<string | null>(localStorage.getItem('sportmatch_profile_image'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('sportmatch_profile_image', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const DefaultAvatarPlaceholder = () => (
    <div className="w-full h-full bg-volcanic flex items-center justify-center p-4">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sand w-12 h-12">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 2v2" className="text-ocean stroke-[2]" />
        <path d="M12 12v2" className="text-ocean stroke-[2]" />
      </svg>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto w-full p-6 animate-fadeIn pb-24">
      <button 
        onClick={onBack}
        className="mb-8 text-ocean font-bold flex items-center gap-2 hover:underline group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al Inicio
      </button>

      {/* Main Profile Card */}
      <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden mb-10">
        <div className="island-gradient h-32 relative">
          <div className="absolute -bottom-14 left-8 group">
            <div className="relative p-1 bg-white rounded-full shadow-lg overflow-hidden w-28 h-28 border-4 border-white">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Chema Ruiz" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <DefaultAvatarPlaceholder />
              )}
              
              {/* Overlay for Change Photo */}
              <button 
                onClick={triggerFileInput}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                title="Cambiar foto de perfil"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            
            {/* Tiny Edit Button Icon (Alternative trigger) */}
            <button 
              onClick={triggerFileInput}
              className="absolute bottom-1 right-1 bg-ocean text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange}
            />
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-volcanic">Chema Ruiz</h2>
              <p className="text-gray-500 font-bold mb-6 max-w-lg leading-relaxed">
                "Residente en Las Palmas. Aficionado al deporte al aire libre y la vida sana. Busco compañeros puntuales para partidos de nivel intermedio."
              </p>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200">
              Activo hoy
            </span>
          </div>
          
          {/* Level Progress */}
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-black text-volcanic uppercase">Nivel: {SportLevel.INTERMEDIATE}</span>
              <span className="text-xs font-bold text-ocean">75% para Avanzado</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-ocean rounded-full w-[75%] transition-all duration-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="mb-10">
        <h3 className="text-xl font-black text-volcanic mb-6 flex items-center gap-2">
          🏅 MIS MEDALLAS <span className="text-xs bg-sand text-volcanic px-2 py-0.5 rounded-full uppercase tracking-tighter">Gamificación Activa</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BADGES.map((badge) => (
            <div 
              key={badge.id}
              className={`p-4 rounded-[2rem] border-2 flex flex-col items-center text-center gap-2 transition-transform hover:scale-105 ${badge.color}`}
            >
              <span className="text-4xl mb-1">{badge.icon}</span>
              <h4 className="text-[11px] font-black uppercase leading-tight text-volcanic">{badge.title}</h4>
              <p className="text-[9px] text-volcanic/60 font-bold leading-tight">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div>
        <h3 className="text-xl font-black text-volcanic mb-6">📜 ÚLTIMOS PARTIDOS</h3>
        <div className="space-y-3">
          {HISTORY.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center group hover:border-ocean/30 transition-all cursor-default">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {item.activity === 'Surf' ? '🏄' : '🎾'}
                </div>
                <div>
                  <h4 className="font-black text-volcanic">{item.activity} en {item.location}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.date}</p>
                </div>
              </div>
              <div className="flex gap-1 text-sand text-xs">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Footer */}
      <div className="mt-16 text-center">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Miembro desde Diciembre 2023 • Gran Canaria</p>
      </div>
    </div>
  );
};
