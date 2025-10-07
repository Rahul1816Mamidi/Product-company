import { Table, Download, Lightbulb, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WireframeGuidanceProps {
  data: {
    screens: Array<{
      name: string;
      description: string;
      priority: "critical" | "high" | "medium" | "low";
    }>;
    designConsiderations: string[];
    nextSteps: string[];
  };
}

export default function WireframeGuidance({ data }: WireframeGuidanceProps) {
  const handleExport = () => {
    const exportData = JSON.stringify(data, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wireframe-guidance.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "border-red-500/30 text-red-600 dark:text-red-400";
      case "high": return "border-orange-500/30 text-orange-600 dark:text-orange-400";
      case "medium": return "border-yellow-500/30 text-yellow-600 dark:text-yellow-400";
      case "low": return "border-muted text-muted-foreground";
      default: return "border-muted text-muted-foreground";
    }
  };

  const getPriorityGradient = (priority: string) => {
    switch (priority) {
      case "critical": return "from-red-500/20 to-pink-500/20";
      case "high": return "from-orange-500/20 to-yellow-500/20";
      case "medium": return "from-yellow-500/20 to-emerald-500/20";
      case "low": return "from-muted/20 to-muted/20";
      default: return "from-muted/20 to-muted/20";
    }
  };

  const flowSteps = [
    { label: "1. Discovery", color: "from-primary to-accent" },
    { label: "2. Filter & Compare", color: "from-accent to-purple-500" },
    { label: "3. View Details", color: "from-purple-500 to-pink-500" },
    { label: "4. Book & Pay", color: "from-emerald-500 to-teal-500" },
    { label: "5. Check-in", color: "from-orange-500 to-red-500" }
  ];

  return (
    <Card className="overflow-hidden glass-card border-gradient hover-lift transition-all duration-300 animate-scale-in" data-testid="card-wireframe-guidance">
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Table className="h-6 w-6 text-white" />
            </div>
            Wireframe & MVP Guidance
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleExport} 
            className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
            data-testid="button-export-wireframe"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-8">
        <div className="mb-8">
          <h4 className="text-lg font-bold mb-4 text-gradient flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            Core User Flow
          </h4>
          <div className="flex flex-wrap items-center gap-3">
            {flowSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`glass-card px-4 py-2 rounded-full font-semibold text-sm border-gradient hover-lift transition-all duration-200 bg-gradient-to-r ${step.color} text-white`}>
                  {step.label}
                </div>
                {index < flowSteps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-primary animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4 text-gradient flex items-center gap-2">
              <Table className="h-5 w-5 text-primary" />
              Priority Screens for MVP
            </h4>
            <div className="space-y-3">
              {data.screens.map((screen, index) => (
                <div 
                  key={index} 
                  className="glass-card border-gradient p-4 rounded-xl hover-lift transition-all duration-200 flex items-center justify-between gap-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`screen-${index}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getPriorityGradient(screen.priority)} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-sm font-bold text-gradient">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-foreground mb-1">{screen.name}</h5>
                      <p className="text-xs text-muted-foreground leading-relaxed">{screen.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium glass-card border ${getPriorityColor(screen.priority)}`}>
                    {screen.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-gradient flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500 animate-pulse" />
              Key Design Considerations
            </h4>
            <div className="space-y-3">
              {data.designConsiderations.map((consideration, index) => (
                <div 
                  key={index} 
                  className="glass-card p-4 rounded-xl border border-primary/30 hover-lift transition-all duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`consideration-${index}`}
                >
                  <p className="text-sm text-foreground leading-relaxed">{consideration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 glass-card p-6 rounded-xl border-gradient">
          <h4 className="font-bold text-lg mb-4 text-gradient flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            Next Steps for MVP Development
          </h4>
          <ol className="space-y-3">
            {data.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-gradient">{index + 1}</span>
                </div>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
