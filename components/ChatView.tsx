
import React, { useState, useEffect, useRef } from 'react';
import { SportEvent, Message } from '../types';

interface ChatViewProps {
  event: SportEvent;
  onExit: () => void;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 'm1', sender: 'Carlos', text: '¡Hola a todos! ¿Alguien lleva material extra para hoy?', timestamp: Date.now() - 3600000, isMe: false },
  { id: 'm2', sender: 'Marta', text: '¡Buenas! Yo llevo un par de toallas y agua de sobra. ¡Nos vemos en el parking!', timestamp: Date.now() - 1800000, isMe: false },
];

export const ChatView: React.FC<ChatViewProps> = ({ event, onExit }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'Tú',
      text: inputText,
      timestamp: Date.now(),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex-grow flex flex-col h-full animate-fadeIn max-w-4xl mx-auto w-full bg-white shadow-2xl md:my-4 md:rounded-[40px] overflow-hidden">
      {/* Header */}
      <div className="island-gradient p-6 text-white flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black">{event.activity} @ {event.location.split('(')[0]}</h2>
            <span className="bg-green-400/20 text-green-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-400/30 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              CHAT ACTIVO
            </span>
          </div>
          <button 
            onClick={() => {
              if (confirm('¿Seguro que quieres salir del evento?')) onExit();
            }}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all"
          >
            SALIR DEL EVENTO
          </button>
        </div>
        <p className="text-white/70 text-sm font-medium">Evento programado para: {event.date} a las {event.time}</p>
      </div>

      {/* Security Disclaimer */}
      <div className="bg-sand/10 border-b border-sand/20 p-4 px-6 flex items-start gap-4">
        <span className="text-2xl">⚠️</span>
        <div>
          <h4 className="text-xs font-black text-volcanic uppercase tracking-wider mb-1">Aviso de Seguridad Crítico</h4>
          <p className="text-xs text-volcanic/80 leading-relaxed">
            <strong>Por tu seguridad:</strong> No compartas rutas no oficiales ni datos personales sensibles. 
            Verifica siempre el clima en la <strong>AEMET</strong> y el estado del mar antes de salir. 
            SportMatch recomienda el uso de Puntos de Interés Local (PIL) oficiales.
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4 bg-[#fcfcfc]">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`max-w-[80%] flex flex-col ${msg.isMe ? 'self-end items-end' : 'self-start items-start'}`}
          >
            <span className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-tighter px-2">
              {msg.sender} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <div 
              className={`p-4 rounded-3xl shadow-sm text-sm font-medium ${
                msg.isMe 
                ? 'bg-ocean text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 text-volcanic rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-4 items-center">
        <input 
          type="text" 
          placeholder="Escribe un mensaje al grupo..."
          className="flex-grow bg-gray-50 border-2 border-transparent focus:border-ocean rounded-2xl px-6 py-3 outline-none transition-all font-medium text-sm"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-volcanic text-white p-3 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};
