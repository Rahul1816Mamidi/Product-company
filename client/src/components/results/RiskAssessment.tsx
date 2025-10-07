import { AlertTriangle, Shield, Download, Sparkles, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RiskAssessmentProps {
  data: {
    risks: Array<{
      type: string;
      description: string;
      probability: "low" | "medium" | "high";
      impact: "low" | "medium" | "high";
      mitigation: string;
    }>;
    overallRiskLevel: "low" | "medium" | "high";
  };
}

export default function RiskAssessment({ data }: RiskAssessmentProps) {
  const handleExport = () => {
    const exportData = JSON.stringify(data, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'risk-assessment.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "border-red-500/30 text-red-600 dark:text-red-400";
      case "medium": return "border-yellow-500/30 text-yellow-600 dark:text-yellow-400";
      case "low": return "border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
      default: return "border-muted text-muted-foreground";
    }
  };

  const getOverallRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-gradient-to-r from-red-500 to-pink-500";
      case "medium": return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "low": return "bg-gradient-to-r from-emerald-500 to-teal-500";
      default: return "bg-gradient-to-r from-muted to-muted";
    }
  };

  const getRiskScore = (probability: string, impact: string) => {
    const probWeight = probability === "high" ? 3 : probability === "medium" ? 2 : 1;
    const impactWeight = impact === "high" ? 3 : impact === "medium" ? 2 : 1;
    return probWeight * impactWeight;
  };

  return (
    <Card className="overflow-hidden glass-card border-gradient hover-lift transition-all duration-300 animate-scale-in" data-testid="card-risk-assessment">
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-20"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            Risk Assessment
          </h3>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getOverallRiskColor(data.overallRiskLevel)} animate-glow-pulse`} data-testid="overall-risk-level">
              Overall Risk: {data.overallRiskLevel.toUpperCase()}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleExport} 
              className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
              data-testid="button-export-risk"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-8">
        <div className="space-y-6">
          {data.risks.map((risk, index) => {
            const riskScore = getRiskScore(risk.probability, risk.impact);
            return (
              <div 
                key={index} 
                className="glass-card border-gradient p-6 rounded-xl hover-lift transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`risk-${index}`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-lg text-gradient">{risk.type}</h4>
                    <div className="px-3 py-1 glass-card rounded-lg border border-primary/30">
                      <span className="text-xs font-semibold text-primary">
                        Risk Score: {riskScore}/9
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium glass-card border ${getRiskColor(risk.probability)}`}>
                      {risk.probability} probability
                    </span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium glass-card border ${getRiskColor(risk.impact)}`}>
                      {risk.impact} impact
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-foreground leading-relaxed mb-4">{risk.description}</p>
                
                <div className="glass-card p-4 rounded-lg border border-primary/30">
                  <h5 className="font-bold mb-2 text-primary flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Mitigation Strategy
                  </h5>
                  <p className="text-sm text-foreground leading-relaxed">{risk.mitigation}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 glass-card p-6 rounded-xl border-gradient">
          <h4 className="font-bold text-lg mb-4 text-gradient flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary animate-pulse" />
            Risk Management Recommendations
          </h4>
          <ul className="text-sm text-foreground space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 flex-shrink-0 animate-pulse"></div>
              <span className="leading-relaxed">Regularly review and update risk assessments as the project progresses</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 flex-shrink-0 animate-pulse"></div>
              <span className="leading-relaxed">Implement monitoring systems for high-probability risks</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 flex-shrink-0 animate-pulse"></div>
              <span className="leading-relaxed">Establish contingency plans for high-impact scenarios</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 flex-shrink-0 animate-pulse"></div>
              <span className="leading-relaxed">Consider risk insurance or transfer strategies where appropriate</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
