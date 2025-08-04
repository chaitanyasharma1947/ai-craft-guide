import { useState } from "react";
import { Download, FileText, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { prompts } from "@/data/prompts";
import jsPDF from 'jspdf';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPrompts?: string[];
}

export function ExportDialog({ isOpen, onClose, selectedPrompts }: ExportDialogProps) {
  const [format, setFormat] = useState<"json" | "markdown" | "pdf">("json");
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeExamples, setIncludeExamples] = useState(true);

  const exportData = () => {
    const promptsToExport = selectedPrompts 
      ? prompts.filter(p => selectedPrompts.includes(p.id))
      : prompts;

    if (format === "json") {
      exportAsJSON(promptsToExport);
    } else if (format === "markdown") {
      exportAsMarkdown(promptsToExport);
    } else if (format === "pdf") {
      exportAsPDF(promptsToExport);
    }
    onClose();
  };

  const exportAsJSON = (data: typeof prompts) => {
    const exportData = data.map(prompt => ({
      ...prompt,
      ...(includeMetadata ? {} : { category: undefined, domain: undefined, tags: undefined }),
      ...(includeExamples ? {} : { example: undefined })
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    downloadFile(blob, 'prompts.json');
  };

  const exportAsMarkdown = (data: typeof prompts) => {
    let markdown = "# Prompt Engineering Guide\n\n";
    
    data.forEach(prompt => {
      markdown += `## ${prompt.title}\n\n`;
      markdown += `${prompt.description}\n\n`;
      
      if (includeMetadata) {
        markdown += `**Category:** ${prompt.category}\n`;
        markdown += `**Domain:** ${prompt.domain}\n`;
        markdown += `**Tags:** ${prompt.tags.join(', ')}\n\n`;
      }
      
      markdown += `**Use Case:** ${prompt.useCase}\n\n`;
      
      if (includeExamples && prompt.example) {
        markdown += `**Example:** ${prompt.example}\n\n`;
      }
      
      markdown += `**Prompt:**\n\`\`\`\n${prompt.prompt}\n\`\`\`\n\n---\n\n`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    downloadFile(blob, 'prompts.md');
  };

  const exportAsPDF = (data: typeof prompts) => {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    doc.setFontSize(20);
    doc.text('Prompt Engineering Guide', margin, yPosition);
    yPosition += 20;

    data.forEach((prompt) => {
      if (yPosition > pageHeight - 50) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(16);
      doc.text(prompt.title, margin, yPosition);
      yPosition += 10;

      doc.setFontSize(12);
      const descLines = doc.splitTextToSize(prompt.description, 170);
      doc.text(descLines, margin, yPosition);
      yPosition += descLines.length * 5 + 5;

      if (includeMetadata) {
        doc.text(`Category: ${prompt.category} | Domain: ${prompt.domain}`, margin, yPosition);
        yPosition += 10;
      }

      const promptLines = doc.splitTextToSize(prompt.prompt, 170);
      doc.text(promptLines, margin, yPosition);
      yPosition += promptLines.length * 5 + 15;
    });

    doc.save('prompts.pdf');
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card-enhanced">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gradient">
            <Download className="w-5 h-5" />
            Export Prompts
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium">Export Format</Label>
            <RadioGroup value={format} onValueChange={setFormat as any} className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex items-center gap-2 cursor-pointer">
                  <Package className="w-4 h-4" />
                  JSON Format
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="markdown" id="markdown" />
                <Label htmlFor="markdown" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="w-4 h-4" />
                  Markdown Format
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="w-4 h-4" />
                  PDF Document
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm font-medium">Options</Label>
            <div className="space-y-3 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="metadata" 
                  checked={includeMetadata}
                  onCheckedChange={(checked) => setIncludeMetadata(!!checked)}
                />
                <Label htmlFor="metadata" className="cursor-pointer">
                  Include metadata (categories, domains, tags)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="examples" 
                  checked={includeExamples}
                  onCheckedChange={(checked) => setIncludeExamples(!!checked)}
                />
                <Label htmlFor="examples" className="cursor-pointer">
                  Include examples and use cases
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={exportData} className="btn-glow">
              <Download className="w-4 h-4 mr-2" />
              Export {selectedPrompts ? selectedPrompts.length : prompts.length} Prompts
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}