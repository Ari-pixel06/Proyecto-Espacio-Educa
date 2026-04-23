import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.educapi.com/v2';
const API_KEY = import.meta.env.VITE_API_KEY || 'Aria278720EZ';
const CARDS_ENDPOINT = '/cards';

export type CardData = {
  id?: string;
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
  addCard: (card: CardData) => Promise<void>;
  updateCards: (cards: CardData[]) => void;
  deleteCard: (index: number) => Promise<void>;
  updateCard: (index: number, card: CardData) => Promise<void>;
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

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

function getRemoteCardsData(responseData: unknown): CardData[] {
  if (Array.isArray(responseData)) {
    return responseData as CardData[];
  }

  const maybeData = responseData as { data?: unknown };
  if (Array.isArray(maybeData?.data)) {
    return maybeData.data as CardData[];
  }

  return [];
}

function getRemoteCard(responseData: unknown): CardData | null {
  if (!responseData || typeof responseData !== 'object') {
    return null;
  }

  const candidate = responseData as CardData;
  if (candidate.nombre || candidate.id || candidate.especie) {
    return candidate;
  }

  const maybeData = responseData as { data?: unknown };
  if (maybeData?.data && typeof maybeData.data === 'object') {
    return maybeData.data as CardData;
  }

  return null;
}

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<CardData[]>(() => {
    const saved = localStorage.getItem('monsterHighCards');
    return saved ? JSON.parse(saved) : defaultCards;
  });

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await api.get(CARDS_ENDPOINT);
        const remoteCards = getRemoteCardsData(response.data);
        if (
          Array.isArray(response.data) ||
          (response.data && typeof response.data === 'object' && 'data' in response.data)
        ) {
          setCards(remoteCards);
        }
      } catch (error) {
        console.error('Error cargando cartas remotas:', error);
      }
    };

    void loadCards();
  }, []);

  useEffect(() => {
    localStorage.setItem('monsterHighCards', JSON.stringify(cards));
  }, [cards]);

  const addCard = async (card: CardData) => {
    try {
      const response = await api.post(CARDS_ENDPOINT, card);
      const createdCard = getRemoteCard(response.data) || card;
      setCards((prev) => [createdCard, ...prev]);
    } catch (error) {
      console.error('Error guardando carta remota:', error);
      setCards((prev) => [card, ...prev]);
    }
  };

  const updateCard = async (index: number, card: CardData) => {
    setCards((prev) => prev.map((c, i) => (i === index ? card : c)));
    const existingCard = cards[index];

    if (existingCard?.id) {
      try {
        const response = await api.put(`${CARDS_ENDPOINT}/${existingCard.id}`, card);
        const updated = getRemoteCard(response.data) || card;
        setCards((prev) => prev.map((c, i) => (i === index ? updated : c)));
      } catch (error) {
        console.error('Error actualizando carta remota:', error);
      }
    }
  };

  const deleteCard = async (index: number) => {
    const existingCard = cards[index];
    setCards((prev) => prev.filter((_, i) => i !== index));

    if (existingCard?.id) {
      try {
        await api.delete(`${CARDS_ENDPOINT}/${existingCard.id}`);
      } catch (error) {
        console.error('Error borrando carta remota:', error);
      }
    }
  };

  const value = {
    cards,
    addCard,
    updateCards: setCards,
    deleteCard,
    updateCard,
    api,
  };

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>;
}

export function useCards() {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
}
