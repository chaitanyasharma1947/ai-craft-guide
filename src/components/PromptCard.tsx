import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { Prompt } from "@/data/prompts";
import { useToast } from "@/hooks/use-toast";

interface PromptCardProps {
  prompt: Prompt;
  onViewDetails: (prompt: Prompt) => void;
}

export const PromptCard = ({ prompt, onViewDetails }: PromptCardProps) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Prompt has been copied to your clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy prompt to clipboard",
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Chain-of-Thought": "bg-primary/10 text-primary border-primary/20",
      "Few-Shot Learning": "bg-success/10 text-success border-success/20",
      "Zero-Shot": "bg-secondary text-secondary-foreground border-secondary",
      "Role-Based": "bg-warning/10 text-warning border-warning/20",
      "Step-by-Step": "bg-primary/15 text-primary border-primary/30",
      "Template-Based": "bg-accent text-accent-foreground border-accent",
      "Iterative Refinement": "bg-warning/15 text-warning border-warning/30",
      "Constraint-Based": "bg-destructive/10 text-destructive border-destructive/20",
    };
    return colors[category] || "bg-muted text-muted-foreground border-muted";
  };

  const getDomainColor = (domain: string) => {
    const colors: Record<string, string> = {
      "Frontend": "bg-success/10 text-success border-success/20",
      "Backend": "bg-primary/10 text-primary border-primary/20",
      "Architecture": "bg-secondary text-secondary-foreground border-secondary",
      "QA/Testing": "bg-destructive/10 text-destructive border-destructive/20",
      "DevOps": "bg-warning/10 text-warning border-warning/20",
      "General": "bg-muted text-muted-foreground border-muted",
    };
    return colors[domain] || "bg-muted text-muted-foreground border-muted";
  };

  return (
    <Card className="h-full card-enhanced group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight group-hover:text-gradient transition-all">
              {prompt.title}
            </CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">
              {prompt.description}
            </CardDescription>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(prompt.prompt)}
              className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewDetails(prompt)}
              className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={getCategoryColor(prompt.category)}>
            {prompt.category}
          </Badge>
          <Badge className={getDomainColor(prompt.domain)}>
            {prompt.domain}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Use Case:</h4>
            <p className="text-sm">{prompt.useCase}</p>
          </div>
          
          {prompt.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Tags:</h4>
              <div className="flex flex-wrap gap-1">
                {prompt.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};