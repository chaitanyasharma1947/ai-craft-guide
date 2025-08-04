import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { Prompt } from '@/data/prompts';

interface SearchOptions {
  searchTerm: string;
  prompts: Prompt[];
  threshold?: number;
}

export function useAdvancedSearch({ searchTerm, prompts, threshold = 0.3 }: SearchOptions) {
  const fuse = useMemo(() => {
    return new Fuse(prompts, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'useCase', weight: 0.2 },
        { name: 'tags', weight: 0.1 }
      ],
      threshold,
      includeScore: true,
      includeMatches: true,
    });
  }, [prompts, threshold]);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return prompts.map(prompt => ({ item: prompt, score: 0 }));
    }

    return fuse.search(searchTerm).map(result => ({
      item: result.item,
      score: result.score || 0,
      matches: result.matches,
    }));
  }, [fuse, searchTerm, prompts]);

  return {
    results: searchResults,
    isEmpty: searchResults.length === 0 && searchTerm.trim() !== '',
  };
}