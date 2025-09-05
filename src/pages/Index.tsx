import { useState, useMemo, useEffect } from "react";
import { PromptCard } from "@/components/PromptCard";
import { FilterBar } from "@/components/FilterBar";
import { PromptDetailModal } from "@/components/PromptDetailModal";
import { StatsOverview } from "@/components/StatsOverview";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { prompts, Prompt, PromptCategory, Domain } from "@/data/prompts";
import { useProgressiveLoading } from "@/hooks/useProgressiveLoading";
import { getCuratedPrompts } from "@/utils/promptUtils";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | "all">("all");
  const [selectedDomain, setSelectedDomain] = useState<Domain | "all">("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllMode, setShowAllMode] = useState(false);

  // Determine which prompts to show based on mode
  const basePrompts = useMemo(() => {
    // If any filters are active, show all prompts for filtering
    const hasFilters = searchTerm !== "" || selectedCategory !== "all" || 
                      selectedDomain !== "all" || selectedTags.length > 0;
    
    if (hasFilters || showAllMode) {
      return prompts;
    }
    
    // Default: show curated (popular/recent) prompts
    return getCuratedPrompts(prompts);
  }, [searchTerm, selectedCategory, selectedDomain, selectedTags, showAllMode]);

  const filteredPrompts = useMemo(() => {
    return basePrompts.filter((prompt) => {
      const matchesSearch = searchTerm === "" || 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.useCase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
      const matchesDomain = selectedDomain === "all" || prompt.domain === selectedDomain;
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => prompt.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesDomain && matchesTags;
    });
  }, [basePrompts, searchTerm, selectedCategory, selectedDomain, selectedTags]);

  const availableTags = useMemo(() => {
    const allTags = prompts.flatMap(prompt => prompt.tags);
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([tag]) => tag);
  }, []);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Progressive loading for the filtered prompts
  const {
    visibleItems: visiblePrompts,
    hasMore,
    remainingCount,
    loadMore,
    reset: resetPagination
  } = useProgressiveLoading({
    items: filteredPrompts,
    initialCount: 12,
    loadMoreCount: 6
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedDomain("all");
    setSelectedTags([]);
    setShowAllMode(false);
    resetPagination();
  };

  const handleShowAllPrompts = () => {
    setShowAllMode(true);
    resetPagination();
  };

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [filteredPrompts.length, resetPagination]);

  const handleViewDetails = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16" id="prompts-section">
        <StatsOverview 
          filteredPromptsCount={filteredPrompts.length}
          totalPromptsCount={prompts.length}
          selectedCategory={selectedCategory}
          selectedDomain={selectedDomain}
        />

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDomain={selectedDomain}
          onDomainChange={setSelectedDomain}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          availableTags={availableTags}
          onClearFilters={handleClearFilters}
        />

        <div className="mt-12">
          {/* Show curated vs all prompts toggle */}
          {!showAllMode && (searchTerm === "" && selectedCategory === "all" && 
           selectedDomain === "all" && selectedTags.length === 0) && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted/50 rounded-full">
                <span className="text-sm text-muted-foreground">
                  Showing popular and recent prompts
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleShowAllPrompts}
                  className="h-auto py-1 px-3 text-xs"
                >
                  View All {prompts.length} Prompts
                </Button>
              </div>
            </div>
          )}

          {filteredPrompts.length === 0 ? (
            <div className="text-center py-16 fade-in">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-primary rounded-full opacity-20 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/30 rounded-full" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gradient">No prompts found</h3>
              <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or clear the filters to see more results
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePrompts.map((prompt, index) => (
                  <div 
                    key={prompt.id} 
                    className="fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <PromptCard 
                      prompt={prompt} 
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button 
                    onClick={loadMore}
                    variant="outline"
                    size="lg"
                    className="px-8"
                  >
                    Load {Math.min(remainingCount, 6)} More Prompts
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">
                    {remainingCount} more prompts available
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <PromptDetailModal 
          prompt={selectedPrompt}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Index;
