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
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {promptCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedDomain} onValueChange={onDomainChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {domains.map((domain) => (
                <SelectItem key={domain} value={domain}>
                  {domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {availableTags.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Popular Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {availableTags.slice(0, 12).map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80"
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