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
      "Chain-of-Thought": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Few-Shot Learning": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Zero-Shot": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Role-Based": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Step-by-Step": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      "Template-Based": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      "Iterative Refinement": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Constraint-Based": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  const getDomainColor = (domain: string) => {
    const colors: Record<string, string> = {
      "Frontend": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
      "Backend": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      "Architecture": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
      "QA/Testing": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
      "DevOps": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      "General": "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    };
    return colors[domain] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{prompt.title}</CardTitle>
            <CardDescription className="mt-2">{prompt.description}</CardDescription>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(prompt.prompt)}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewDetails(prompt)}
              className="h-8 w-8"
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