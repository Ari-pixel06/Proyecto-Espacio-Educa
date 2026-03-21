import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { API_CONFIG } from '../config';

export type CardData = {
  apellido?: string;
  nombre: string;
  edad: number;
  padres?: string;
  habilidad?: string;
  especie?: string;
  imagen?: string;
  className?: string;
};

type CardsContextValue = {
  cards: CardData[];
  addCard: (card: CardData) => void;
  updateCards: (cards: CardData[]) => void;
  deleteCard: (index: number) => void;
  updateCard: (index: number, card: CardData) => void;
  api: AxiosInstance;
};

const CardsContext = createContext<CardsContextValue | undefined>(undefined);

const defaultCards: CardData[] = [
  {
    apellido: 'de Nile',
    edad: 5842,
    nombre: 'Cleo',
    padres: 'La momia',
    habilidad: 'Magia Egipcia',
    imagen:
      'https://th.bing.com/th/id/R.7cf6b8d21ef735c84d5685a8c6a7b63e?rik=T9bgC%2f8e%2fTCWFA&riu=http%3a%2f%2fimages5.fanpop.com%2fimage%2fphotos%2f28800000%2fCleo-De-Nile-monster-high-28820550-704-1082.jpg&ehk=f%2bmqWFqARVXyEkiKlwt4%2fUODiCe0Hto7ergqJ66F7XA%3d&risl=&pid=ImgRaw&r=0',
    especie: 'Momia',
  },
  {
    apellido: 'Bominable',
    edad: 16,
    nombre: 'Abbey',
    padres: 'El Yeti',
    habilidad: 'Control del hielo',
    imagen:
      'https://tse3.mm.bing.net/th/id/OIP.eJisJUinMbmHTK3EQjMFegHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    especie: 'Yeti',
  },
  {
    apellido: '',
    edad: 16,
    nombre: 'Operetta',
    padres: 'Fantasma de la Ópera',
    habilidad: 'Canto hipnótico',
    imagen:
      'https://w0.peakpx.com/wallpaper/163/754/HD-wallpaper-monster-high-monster-high-scaritage-operetta-doll-anime.jpg',
    especie: 'Fantasma',
    className: 'operetta',
  },
];

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<CardData[]>(() => {
    const saved = localStorage.getItem('monsterHighCards');
    return saved ? JSON.parse(saved) : defaultCards;
  });

  useEffect(() => {
    localStorage.setItem('monsterHighCards', JSON.stringify(cards));
  }, [cards]);

  // Configurar axios
  const api = axios.create({
    baseURL: API_CONFIG.baseURL,
    headers: {
      'Authorization': `Bearer ${API_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  const value = useMemo(
    () => ({
      cards,
      addCard: (card: CardData) => setCards((prev) => [card, ...prev]),
      updateCards: setCards,
      deleteCard: (index: number) => setCards((prev) => prev.filter((_, i) => i !== index)),
      updateCard: (index: number, card: CardData) => setCards((prev) => prev.map((c, i) => i === index ? card : c)),
      api,
    }),
    [cards],
  );

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>;
}

export function useCards() {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
}
