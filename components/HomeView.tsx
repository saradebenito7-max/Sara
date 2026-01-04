
import React from 'react';
import { AppView } from '../types';

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
      <div className="max-w-2xl w-full">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-volcanic mb-4 leading-tight tracking-tight">
            SPORT<span className="text-ocean">MATCH</span>
          </h1>
          <p className="text-xl md:text-2xl text-volcanic/70 font-semibold max-w-lg mx-auto leading-relaxed">
            "Encuentra compañeros, organiza partidos y disfruta del deporte en Gran Canaria."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
          <button
            onClick={() => onNavigate('CREATE')}
            className="group relative overflow-hidden bg-sand hover:bg-sand/90 text-volcanic font-black text-xl py-10 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 border-b-8 border-black/10"
          >
            <span className="relative z-10 flex flex-col items-center">
              <span className="text-4xl mb-3 bg-white/20 p-3 rounded-2xl">➕</span>
              CREAR EVENTO
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => onNavigate('BROWSE')}
            className="group relative overflow-hidden bg-ocean hover:bg-ocean/90 text-white font-black text-xl py-10 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 border-b-8 border-black/20"
          >
            <span className="relative z-10 flex flex-col items-center">
              <span className="text-4xl mb-3 bg-black/10 p-3 rounded-2xl">🔍</span>
              BUSCAR EVENTO
            </span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <button
          onClick={() => onNavigate('PROFILE')}
          className="w-full group relative overflow-hidden bg-volcanic hover:bg-black text-white font-black text-lg py-6 rounded-3xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-4 border-b-4 border-white/5"
        >
          <span className="text-2xl">👤</span>
          MI PERFIL Y MEDALLAS
        </button>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="bg-sand/20 text-sand p-2 rounded-lg text-xl">📍</span>
            <span className="text-xs font-bold uppercase tracking-wide">100% Canario</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="bg-ocean/20 text-ocean p-2 rounded-lg text-xl">🤝</span>
            <span className="text-xs font-bold uppercase tracking-wide">Inclusión Activa</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="bg-gray-100 text-volcanic p-2 rounded-lg text-xl">🛡️</span>
            <span className="text-xs font-bold uppercase tracking-wide">Seguro y Directo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
