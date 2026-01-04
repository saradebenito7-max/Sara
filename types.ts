
export type AppView = 'HOME' | 'CREATE' | 'BROWSE' | 'CHAT' | 'PROFILE';

export enum SportLevel {
  BEGINNER = 'Principiante',
  INTERMEDIATE = 'Intermedio',
  EXPERT = 'Experto'
}

export interface SportEvent {
  id: string;
  activity: string;
  level: SportLevel;
  location: string;
  date: string;
  time: string;
  isMentor: boolean;
  createdAt: number;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  isMe: boolean;
}

export interface Badge {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}
