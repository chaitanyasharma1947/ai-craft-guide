import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Lightbulb, Target, Zap, CheckCircle, Star, Copy, Download } from "lucide-react";
import barclaysLogo from "@/assets/barclays-current-logo.svg";

export const ClientGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <img src={barclaysLogo} alt="Barclays" className="w-8 h-8" />
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Prompt Engineering Guide
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive guide to understanding and mastering prompt engineering using the Barclays Prompt Engineering Hub
        </p>
      </div>

      {/* What is Prompt Engineering */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            What is Prompt Engineering?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Prompt engineering is the art and science of crafting effective instructions for AI systems to produce desired outcomes. 
            It involves designing, refining, and optimizing text prompts to communicate clearly with AI models and achieve specific goals.
          </p>
          <p>
            In the context of software development, prompt engineering helps teams:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Generate high-quality code faster</li>
            <li>Improve code review processes</li>
            <li>Create comprehensive documentation</li>
            <li>Design better system architectures</li>
            <li>Optimize performance and security</li>
          </ul>
        </CardContent>
      </Card>

      {/* Core Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Core Principles of Effective Prompts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Be Specific</h4>
                  <p className="text-sm text-muted-foreground">Provide clear, detailed instructions with specific requirements and constraints.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Provide Context</h4>
                  <p className="text-sm text-muted-foreground">Include relevant background information and explain the purpose of your request.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Use Examples</h4>
                  <p className="text-sm text-muted-foreground">Show what you want with concrete examples of inputs and expected outputs.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Structure Your Request</h4>
                  <p className="text-sm text-muted-foreground">Break complex tasks into clear steps and use formatting to organize information.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Iterate and Refine</h4>
                  <p className="text-sm text-muted-foreground">Test your prompts and refine them based on the quality of responses you receive.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Define Success Criteria</h4>
                  <p className="text-sm text-muted-foreground">Clearly state what constitutes a successful response to your prompt.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Understanding Prompt Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>The Barclays Prompt Engineering Hub organizes prompts into several categories, each with specific use cases:</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <Badge variant="secondary" className="mb-2">Chain-of-Thought</Badge>
                <p className="text-sm">Guides AI through step-by-step reasoning for complex problem-solving</p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Role-Based</Badge>
                <p className="text-sm">Assigns specific roles or personas to AI for specialized expertise</p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Template-Based</Badge>
                <p className="text-sm">Provides structured formats for consistent, reusable outputs</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Badge variant="secondary" className="mb-2">Few-Shot</Badge>
                <p className="text-sm">Uses examples to demonstrate the desired output format and style</p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Iterative</Badge>
                <p className="text-sm">Builds on previous responses through multiple rounds of refinement</p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Constraint-Based</Badge>
                <p className="text-sm">Sets specific limitations and requirements for controlled outputs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Use the Hub */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            How to Use the Barclays Prompt Engineering Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Discovery & Search</h4>
              <ul className="space-y-2 text-sm">
                <li>• Use the search bar to find prompts by keywords</li>
                <li>• Filter by category (Chain-of-Thought, Role-Based, etc.)</li>
                <li>• Filter by domain (Frontend, Backend, DevOps, etc.)</li>
                <li>• Browse featured prompts for inspiration</li>
              </ul>
              
              <h4 className="font-semibold">Quick Access</h4>
              <ul className="space-y-2 text-sm">
                <li>• Press Cmd/Ctrl + K to open the command palette</li>
                <li>• Access favorites and copy history instantly</li>
                <li>• Use keyboard shortcuts for efficient navigation</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Using Prompts</h4>
              <ul className="space-y-2 text-sm">
                <li>• Click any prompt card to view details</li>
                <li>• Copy prompts with one click using the <Copy className="w-4 h-4 inline" /> button</li>
                <li>• Review examples and use cases before implementing</li>
                <li>• Customize prompts to fit your specific needs</li>
              </ul>
              
              <h4 className="font-semibold">Organization</h4>
              <ul className="space-y-2 text-sm">
                <li>• Save frequently used prompts to favorites <Star className="w-4 h-4 inline" /></li>
                <li>• Access your copy history for recent prompts</li>
                <li>• Export your favorites as markdown files <Download className="w-4 h-4 inline" /></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Best Practices for Implementation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Before You Start</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Clearly define your objective and success criteria</li>
              <li>• Choose the appropriate prompt category for your task</li>
              <li>• Review similar examples in the hub for inspiration</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">During Implementation</h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Start with existing prompts and adapt them to your needs</li>
              <li>• Test prompts with small datasets before full implementation</li>
              <li>• Document what works and what doesn't for future reference</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Optimization Tips</h4>
            <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <li>• Iterate based on AI responses and refine your prompts</li>
              <li>• Keep successful prompts in your favorites for reuse</li>
              <li>• Share effective prompts with your team for consistency</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Common Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Common Use Cases in Software Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Code Generation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• API implementations</li>
                <li>• Component creation</li>
                <li>• Database schemas</li>
                <li>• Test suites</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Code Review</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Security analysis</li>
                <li>• Performance optimization</li>
                <li>• Best practice checks</li>
                <li>• Bug identification</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Documentation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• API documentation</li>
                <li>• Technical specifications</li>
                <li>• User guides</li>
                <li>• Architecture decisions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>For support or questions about the Barclays Prompt Engineering Hub, please contact your technical team.</p>
      </div>
    </div>
  );
};