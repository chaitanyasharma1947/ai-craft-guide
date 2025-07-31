import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromptCategory, Domain, prompts } from "@/data/prompts";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
          <Badge variant="outline">{totalPromptsCount}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{filteredPromptsCount}</div>
          <p className="text-xs text-muted-foreground">
            {filteredPromptsCount === totalPromptsCount ? "All prompts" : "Filtered results"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
          <Badge variant="outline">{Object.keys(categoryStats).length}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex justify-between text-sm">
                <span className={selectedCategory === category ? "font-medium" : ""}>
                  {category}
                </span>
                <span className="text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Domains</CardTitle>
          <Badge variant="outline">{Object.keys(domainStats).length}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {topDomains.map(([domain, count]) => (
              <div key={domain} className="flex justify-between text-sm">
                <span className={selectedDomain === domain ? "font-medium" : ""}>
                  {domain}
                </span>
                <span className="text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Frontend</span>
              <span className="text-muted-foreground">{domainStats["Frontend"] || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Backend</span>
              <span className="text-muted-foreground">{domainStats["Backend"] || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>QA/Testing</span>
              <span className="text-muted-foreground">{domainStats["QA/Testing"] || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};