import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromptCategory, Domain, prompts } from "@/data/prompts";
import { FileText, Layers, Globe, BarChart3 } from "lucide-react";

interface StatsOverviewProps {
  filteredPromptsCount: number;
  totalPromptsCount: number;
  selectedCategory: PromptCategory | "all";
  selectedDomain: Domain | "all";
}

export const StatsOverview = ({ 
  filteredPromptsCount, 
  totalPromptsCount,
  selectedCategory,
  selectedDomain
}: StatsOverviewProps) => {
  const categoryStats = prompts.reduce((acc, prompt) => {
    acc[prompt.category] = (acc[prompt.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const domainStats = prompts.reduce((acc, prompt) => {
    acc[prompt.domain] = (acc[prompt.domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const topDomains = Object.entries(domainStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="card-enhanced fade-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gradient">Total Prompts</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {totalPromptsCount}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gradient mb-1">{filteredPromptsCount}</div>
          <p className="text-xs text-muted-foreground">
            {filteredPromptsCount === totalPromptsCount ? "All prompts available" : "Filtered results"}
          </p>
        </CardContent>
      </Card>

      <Card className="card-enhanced fade-in" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {Object.keys(categoryStats).length}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topCategories.map(([category, count], index) => (
              <div key={category} className="flex justify-between text-sm group">
                <span 
                  className={`transition-all ${
                    selectedCategory === category 
                      ? "font-semibold text-primary" 
                      : "group-hover:text-primary/80"
                  }`}
                >
                  {category}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-enhanced fade-in" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-medium">Domains</CardTitle>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {Object.keys(domainStats).length}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topDomains.map(([domain, count], index) => (
              <div key={domain} className="flex justify-between text-sm group">
                <span 
                  className={`transition-all ${
                    selectedDomain === domain 
                      ? "font-semibold text-primary" 
                      : "group-hover:text-primary/80"
                  }`}
                >
                  {domain}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-enhanced fade-in" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center group">
              <span className="group-hover:text-primary/80 transition-colors">Frontend</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-primary/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${((domainStats["Frontend"] || 0) / totalPromptsCount) * 100}%` }}
                  />
                </div>
                <Badge variant="outline" className="text-xs">
                  {domainStats["Frontend"] || 0}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center group">
              <span className="group-hover:text-primary/80 transition-colors">Backend</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-primary/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${((domainStats["Backend"] || 0) / totalPromptsCount) * 100}%` }}
                  />
                </div>
                <Badge variant="outline" className="text-xs">
                  {domainStats["Backend"] || 0}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center group">
              <span className="group-hover:text-primary/80 transition-colors">QA/Testing</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-primary/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${((domainStats["QA/Testing"] || 0) / totalPromptsCount) * 100}%` }}
                  />
                </div>
                <Badge variant="outline" className="text-xs">
                  {domainStats["QA/Testing"] || 0}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};