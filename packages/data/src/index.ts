import { useEffect, useMemo, useState } from 'react';

export interface PublishRequest {
  image: string;
  meta: {
    name: string;
    message: string;
    frame: string;
    style: 'anime' | 'cartoon';
  };
}

export interface PublishedCard {
  id: string;
  url: string;
  thumbUrl?: string;
  name: string;
  message: string;
  style: 'anime' | 'cartoon';
  frame: string;
  createdAt: number;
  removed?: boolean;
}

export interface PublishResponse {
  shareUrl: string;
  id: string;
}

const LOCAL_KEY = 'austcham.cards';

export async function publishCard(request: PublishRequest): Promise<PublishResponse> {
  const id = crypto.randomUUID();
  const entry: PublishedCard = {
    id,
    url: request.image,
    thumbUrl: request.image,
    name: request.meta.name,
    message: request.meta.message,
    style: request.meta.style,
    frame: request.meta.frame,
    createdAt: Date.now()
  };

  const existing = getLocalCards();
  existing.push(entry);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));

  const shareUrl = `${window.location.origin}/wall?card=${id}`;
  return { shareUrl, id };
}

export function useFeed({ paused }: { paused: boolean }) {
  const [cards, setCards] = useState<PublishedCard[]>(() => getLocalCards());

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCards(getLocalCards());
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  const removeCard = async (id: string) => {
    const next = getLocalCards().filter((card) => card.id !== id);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    setCards(next);
  };

  return { cards, removeCard };
}

function getLocalCards(): PublishedCard[] {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as PublishedCard[];
  } catch (error) {
    console.warn('Failed to parse cards', error);
    return [];
  }
}
