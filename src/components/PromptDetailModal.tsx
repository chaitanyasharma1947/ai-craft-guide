import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download } from "lucide-react";
import { Prompt } from "@/data/prompts";
import { useToast } from "@/hooks/use-toast";

interface PromptDetailModalProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PromptDetailModal = ({ prompt, isOpen, onClose }: PromptDetailModalProps) => {
  const { toast } = useToast();

  if (!prompt) return null;

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

  const downloadPrompt = () => {
    const content = `# ${prompt.title}

## Description
${prompt.description}

## Category
${prompt.category}

## Domain
${prompt.domain}

## Use Case
${prompt.useCase}

${prompt.example ? `## Example\n${prompt.example}` : ''}

## Tags
${prompt.tags.join(', ')}

## Prompt
${prompt.prompt}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">{prompt.title}</DialogTitle>
          <DialogDescription>{prompt.description}</DialogDescription>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className={getCategoryColor(prompt.category)}>
              {prompt.category}
            </Badge>
            <Badge className={getDomainColor(prompt.domain)}>
              {prompt.domain}
            </Badge>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Use Case</h3>
              <p className="text-muted-foreground">{prompt.useCase}</p>
            </div>
            
            {prompt.example && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Example Usage</h3>
                <p className="text-muted-foreground">{prompt.example}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Prompt Template</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(prompt.prompt)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadPrompt}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                  {prompt.prompt}
                </pre>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};