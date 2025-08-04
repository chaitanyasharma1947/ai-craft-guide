import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { Prompt, prompts } from "@/data/prompts";

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: Prompt) => void;
}

export function FavoritesPanel({ isOpen, onClose, onSelectPrompt }: FavoritesPanelProps) {
  const { favorites, removeFavorite } = useFavorites();

  const favoritePrompts = prompts.filter(prompt => favorites.includes(prompt.id));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden card-enhanced">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-destructive fill-destructive" />
            <CardTitle className="text-gradient">Your Favorites ({favoritePrompts.length})</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-auto">
          {favoritePrompts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
              <p className="text-muted-foreground">
                Star some prompts to save them here for quick access
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoritePrompts.map((prompt, index) => (
                <Card 
                  key={prompt.id} 
                  className="card-enhanced cursor-pointer group fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => onSelectPrompt(prompt)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm group-hover:text-gradient transition-all">
                        {prompt.title}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFavorite(prompt.id);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-2">
                      {prompt.description}
                    </p>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs">
                        {prompt.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {prompt.domain}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}