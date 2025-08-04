import { useLocalStorage } from './useLocalStorage';
import { Prompt } from '@/data/prompts';

interface CopyHistoryItem {
  prompt: Prompt;
  copiedAt: string;
}

export function useCopyHistory() {
  const [history, setHistory] = useLocalStorage<CopyHistoryItem[]>('copy-history', []);

  const addToHistory = (prompt: Prompt) => {
    const newItem: CopyHistoryItem = {
      prompt,
      copiedAt: new Date().toISOString(),
    };

    setHistory(prev => {
      const filtered = prev.filter(item => item.prompt.id !== prompt.id);
      return [newItem, ...filtered].slice(0, 20); // Keep only last 20 items
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (promptId: string) => {
    setHistory(prev => prev.filter(item => item.prompt.id !== promptId));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
}