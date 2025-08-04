import { History, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCopyHistory } from "@/hooks/useCopyHistory";
import { Prompt } from "@/data/prompts";
import { formatDistanceToNow } from "date-fns";

interface CopyHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: Prompt) => void;
}

export function CopyHistoryPanel({ isOpen, onClose, onSelectPrompt }: CopyHistoryPanelProps) {
  const { history, clearHistory, removeFromHistory } = useCopyHistory();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden card-enhanced">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <CardTitle className="text-gradient">Copy History ({history.length})</CardTitle>
          </div>
          <div className="flex gap-2">
            {history.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearHistory}>
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-auto">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No copy history</h3>
              <p className="text-muted-foreground">
                Copy some prompts to see them here for quick access
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item, index) => (
                <Card 
                  key={`${item.prompt.id}-${item.copiedAt}`}
                  className="card-enhanced cursor-pointer group fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => onSelectPrompt(item.prompt)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-gradient transition-all">
                          {item.prompt.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.prompt.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {item.prompt.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.prompt.domain}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(item.copiedAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromHistory(item.prompt.id);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
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