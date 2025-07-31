import { useState, useMemo } from "react";
import { PromptCard } from "@/components/PromptCard";
import { FilterBar } from "@/components/FilterBar";
import { PromptDetailModal } from "@/components/PromptDetailModal";
import { StatsOverview } from "@/components/StatsOverview";
import { prompts, Prompt, PromptCategory, Domain } from "@/data/prompts";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | "all">("all");
  const [selectedDomain, setSelectedDomain] = useState<Domain | "all">("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
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
  }, [searchTerm, selectedCategory, selectedDomain, selectedTags]);

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

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedDomain("all");
    setSelectedTags([]);
  };

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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Prompt Engineering Guide</h1>
          <p className="text-xl text-muted-foreground mb-2">
            A comprehensive collection of prompt engineering patterns for developers and QA teams
          </p>
          <p className="text-muted-foreground">
            Discover reusable prompts categorized by type and domain to enhance your AI-assisted development workflow
          </p>
        </div>

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

        <div className="mt-8">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No prompts found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clear the filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <PromptCard 
                  key={prompt.id} 
                  prompt={prompt} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
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
