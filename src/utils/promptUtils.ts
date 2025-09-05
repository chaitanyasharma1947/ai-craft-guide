import { Prompt } from '@/data/prompts';

// Popular categories and tags based on common use cases
const popularCategories = ['Chain-of-Thought', 'Role-Based', 'Template-Based'];
const popularTags = ['Code Review', 'Performance', 'Security', 'Architecture', 'Testing'];
const popularDomains = ['Frontend', 'Backend', 'Architecture'];

// Calculate popularity score for sorting
function calculatePopularityScore(prompt: Prompt): number {
  let score = 0;
  
  // Category popularity (weight: 3)
  if (popularCategories.includes(prompt.category)) {
    score += 3;
  }
  
  // Domain popularity (weight: 2)
  if (popularDomains.includes(prompt.domain)) {
    score += 2;
  }
  
  // Tag popularity (weight: 1 per matching tag)
  const matchingTags = prompt.tags.filter(tag => 
    popularTags.some(popular => tag.toLowerCase().includes(popular.toLowerCase()))
  );
  score += matchingTags.length;
  
  return score;
}

export function getPopularPrompts(prompts: Prompt[], limit?: number): Prompt[] {
  const sorted = [...prompts].sort((a, b) => {
    const scoreA = calculatePopularityScore(a);
    const scoreB = calculatePopularityScore(b);
    return scoreB - scoreA;
  });
  
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getRecentPrompts(prompts: Prompt[], limit?: number): Prompt[] {
  // Since we don't have timestamps, we'll use the last few prompts as "recent"
  // In a real app, this would sort by actual creation/usage dates
  const recent = [...prompts].slice(-10).reverse();
  return limit ? recent.slice(0, limit) : recent;
}

export function getCuratedPrompts(prompts: Prompt[]): Prompt[] {
  // Mix of popular and recent prompts for the initial display
  const popular = getPopularPrompts(prompts, 8);
  const recent = getRecentPrompts(prompts, 4);
  
  // Remove duplicates and combine
  const seen = new Set<string>();
  const curated: Prompt[] = [];
  
  [...popular, ...recent].forEach(prompt => {
    if (!seen.has(prompt.id)) {
      seen.add(prompt.id);
      curated.push(prompt);
    }
  });
  
  return curated;
}