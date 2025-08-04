import { useLocalStorage } from './useLocalStorage';
import { Prompt } from '@/data/prompts';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>('prompt-favorites', []);

  const addFavorite = (promptId: string) => {
    setFavorites(prev => [...new Set([...prev, promptId])]);
  };

  const removeFavorite = (promptId: string) => {
    setFavorites(prev => prev.filter(id => id !== promptId));
  };

  const toggleFavorite = (promptId: string) => {
    if (favorites.includes(promptId)) {
      removeFavorite(promptId);
    } else {
      addFavorite(promptId);
    }
  };

  const isFavorite = (promptId: string) => favorites.includes(promptId);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}