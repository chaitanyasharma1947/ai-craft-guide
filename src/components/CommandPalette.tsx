import { useState, useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, Heart, History, Download, Settings } from "lucide-react";
import { Prompt } from "@/data/prompts";
import { useFavorites } from "@/hooks/useFavorites";
import { useCopyHistory } from "@/hooks/useCopyHistory";

interface CommandPaletteProps {
  prompts: Prompt[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: Prompt) => void;
  onShowFavorites: () => void;
  onShowHistory: () => void;
  onExport: () => void;
}

export function CommandPalette({
  prompts,
  isOpen,
  onClose,
  onSelectPrompt,
  onShowFavorites,
  onShowHistory,
  onExport,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const { favorites } = useFavorites();
  const { history } = useCopyHistory();

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(search.toLowerCase()) ||
    prompt.description.toLowerCase().includes(search.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput 
        placeholder="Search prompts or type a command..." 
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {search === "" && (
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={onShowFavorites} className="gap-2">
              <Heart className="w-4 h-4" />
              View Favorites ({favorites.length})
            </CommandItem>
            <CommandItem onSelect={onShowHistory} className="gap-2">
              <History className="w-4 h-4" />
              View Copy History ({history.length})
            </CommandItem>
            <CommandItem onSelect={onExport} className="gap-2">
              <Download className="w-4 h-4" />
              Export All Prompts
            </CommandItem>
          </CommandGroup>
        )}

        {filteredPrompts.length > 0 && (
          <CommandGroup heading="Prompts">
            {filteredPrompts.slice(0, 8).map((prompt) => (
              <CommandItem
                key={prompt.id}
                onSelect={() => {
                  onSelectPrompt(prompt);
                  onClose();
                }}
                className="gap-2"
              >
                <Search className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>{prompt.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {prompt.category} • {prompt.domain}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}