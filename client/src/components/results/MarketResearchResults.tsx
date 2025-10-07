import { TrendingUp, PieChart, Users, Download, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { MarketResearchResult } from "@shared/schema";

interface MarketResearchResultsProps {
  data: MarketResearchResult;
}

export default function MarketResearchResults({ data }: MarketResearchResultsProps) {
  const handleExport = () => {
    const exportData = JSON.stringify(data, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'market-research.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="overflow-hidden glass-card border-gradient hover-lift transition-all duration-300 animate-scale-in" data-testid="card-market-research">
      <div className="bg-gradient-to-r from-primary via-accent to-primary p-6 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            Market Research Results
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleExport} 
            className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
            data-testid="button-export-market-research"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 rounded-xl border-gradient hover-lift transition-all duration-200 group" data-testid="metric-market-size-detail">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Market Size</h4>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PieChart className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gradient mb-2">{data.marketSize}</p>
            <p className="text-sm text-muted-foreground">Total addressable market</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl border-gradient hover-lift transition-all duration-200 group" data-testid="metric-growth-rate">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-primary">Growth Rate</h4>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gradient mb-2">{data.growthRate}</p>
            <p className="text-sm text-muted-foreground">CAGR (Annual)</p>
          </div>
          
          <div className="glass-card p-6 rounded-xl border-gradient hover-lift transition-all duration-200 group" data-testid="metric-competitors">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-purple-600 dark:text-purple-400">Competitors</h4>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gradient-cosmic mb-2">{data.competitorCount}</p>
            <p className="text-sm text-muted-foreground">Major players identified</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gradient">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              Key Market Insights
            </h4>
            <div className="glass-card p-6 rounded-xl border border-muted">
              <ul className="space-y-3">
                {data.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start group" data-testid={`insight-${index}`}>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mr-3 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm text-foreground leading-relaxed">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gradient-cosmic">
              <Users className="h-5 w-5 text-purple-500" />
              Competitive Landscape
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.competitors.map((competitor, index) => (
                <div 
                  key={index} 
                  className="glass-card border-gradient p-5 rounded-xl hover-lift transition-all duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`competitor-${index}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-bold text-foreground">{competitor.name}</h5>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium glass-card ${
                      competitor.type === "direct" 
                        ? "border-red-500/30 text-red-600 dark:text-red-400" 
                        : "border-yellow-500/30 text-yellow-600 dark:text-yellow-400"
                    }`}>
                      {competitor.type} Competitor
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{competitor.description}</p>
                  <div className="flex justify-between text-xs gap-2">
                    <div className="glass-card px-3 py-1.5 rounded-lg border border-emerald-500/30">
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Strength: {competitor.strength}</span>
                    </div>
                    <div className="glass-card px-3 py-1.5 rounded-lg border border-red-500/30">
                      <span className="text-red-600 dark:text-red-400 font-medium">Weakness: {competitor.weakness}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
