import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";
import { PromptCategory, Domain, promptCategories, domains } from "@/data/prompts";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: PromptCategory | "all";
  onCategoryChange: (value: PromptCategory | "all") => void;
  selectedDomain: Domain | "all";
  onDomainChange: (value: Domain | "all") => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
  onClearFilters: () => void;
}

export const FilterBar = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDomain,
  onDomainChange,
  selectedTags,
  onTagToggle,
  availableTags,
  onClearFilters,
}: FilterBarProps) => {
  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedDomain !== "all" || selectedTags.length > 0;

  return (
    <div className="card-enhanced p-6 fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
          <Input
            placeholder="Search prompts by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-primary/20 focus:border-primary/40 bg-background/50 transition-smooth"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full sm:w-[200px] border-primary/20 focus:border-primary/40 bg-background/50 transition-smooth">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-primary/20">
              <SelectItem value="all" className="focus:bg-primary/10">All Categories</SelectItem>
              {promptCategories.map((category) => (
                <SelectItem key={category} value={category} className="focus:bg-primary/10">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedDomain} onValueChange={onDomainChange}>
            <SelectTrigger className="w-full sm:w-[200px] border-primary/20 focus:border-primary/40 bg-background/50 transition-smooth">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-primary/20">
              <SelectItem value="all" className="focus:bg-primary/10">All Domains</SelectItem>
              {domains.map((domain) => (
                <SelectItem key={domain} value={domain} className="focus:bg-primary/10">
                  {domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {availableTags.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gradient">Popular Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {availableTags.slice(0, 12).map((tag, index) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-spring hover:scale-105 fade-in ${
                  selectedTags.includes(tag) 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "hover:bg-primary/10 hover:text-primary border-primary/20"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => onTagToggle(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary">
                Search: "{searchTerm}"
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary">
                Category: {selectedCategory}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("all")} />
              </Badge>
            )}
            {selectedDomain !== "all" && (
              <Badge variant="secondary">
                Domain: {selectedDomain}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onDomainChange("all")} />
              </Badge>
            )}
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                Tag: {tag}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onTagToggle(tag)} />
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};