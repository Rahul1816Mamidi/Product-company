import { Code, Download, Sparkles, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TechStackRecommendation } from "@shared/schema";

interface TechStackProps {
  data: TechStackRecommendation[];
}

export default function TechStack({ data }: TechStackProps) {
  const handleExport = () => {
    const exportData = JSON.stringify(data, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tech-stack.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'Frontend': 'from-blue-500 to-cyan-500',
      'Backend': 'from-emerald-500 to-teal-500',
      'Database': 'from-purple-500 to-pink-500',
      'Mobile': 'from-blue-500 to-indigo-500',
      'Infrastructure': 'from-indigo-500 to-purple-500',
      'Payment': 'from-yellow-500 to-orange-500',
      'Maps': 'from-red-500 to-pink-500',
    };
    
    const matchedKey = Object.keys(gradients).find(key => 
      category.toLowerCase().includes(key.toLowerCase())
    );
    
    return gradients[matchedKey || 'default'] || 'from-primary to-accent';
  };

  return (
    <Card className="overflow-hidden glass-card border-gradient hover-lift transition-all duration-300 animate-scale-in" data-testid="card-tech-stack">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Code className="h-6 w-6 text-white" />
            </div>
            Recommended Tech Stack
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleExport} 
            className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
            data-testid="button-export-tech-stack"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => {
            const gradient = getCategoryGradient(item.category);
            
            return (
              <div 
                key={index} 
                className="glass-card p-6 rounded-xl border-gradient hover-lift transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`tech-category-${index}`}
              >
                <h4 className="font-bold text-lg mb-4 text-gradient flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient.replace('from-', 'from-').replace(' to-', '/20 to-')}/20 flex items-center justify-center`}>
                    <Zap className="h-4 w-4" style={{ 
                      color: `hsl(var(--primary))` 
                    }} />
                  </div>
                  {item.category}
                </h4>
                <div className="space-y-3">
                  <div className={`glass-card p-3 rounded-lg border-gradient hover-lift transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-foreground">{item.primary}</span>
                      <span className="glass-card px-2 py-1 rounded text-xs font-medium border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                        Recommended
                      </span>
                    </div>
                  </div>
                  {item.alternatives.map((alt, altIndex) => (
                    <div 
                      key={altIndex} 
                      className="glass-card p-3 rounded-lg border border-muted hover-lift transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{alt}</span>
                        <span className="glass-card px-2 py-1 rounded text-xs text-muted-foreground">
                          Alternative
                        </span>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3">{item.reasoning}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
