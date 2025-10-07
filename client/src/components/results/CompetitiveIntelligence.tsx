import { Target, TrendingUp, Shield, AlertCircle, CheckCircle, Download, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CompetitiveIntelligenceProps {
  data: {
    swotAnalysis: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    marketPosition: string;
    differentiationStrategy: string[];
  };
}

export default function CompetitiveIntelligence({ data }: CompetitiveIntelligenceProps) {
  const handleExport = () => {
    const exportData = JSON.stringify(data, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'competitive-intelligence.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="overflow-hidden glass-card border-gradient hover-lift transition-all duration-300 animate-scale-in" data-testid="card-competitive-intelligence">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            Competitive Intelligence & SWOT
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleExport} 
            className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
            data-testid="button-export-competitive"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-8">
        {/* Market Position */}
        <div className="mb-8 glass-card p-6 rounded-xl border-gradient hover-lift" data-testid="market-position">
          <h4 className="font-bold text-lg mb-3 text-gradient flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            Market Position
          </h4>
          <p className="text-sm text-foreground leading-relaxed">{data.marketPosition}</p>
        </div>

        {/* SWOT Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <div className="glass-card p-6 rounded-xl border border-emerald-500/30 hover-lift transition-all duration-200" data-testid="swot-strengths">
            <h4 className="font-bold text-lg mb-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              Strengths
            </h4>
            <ul className="space-y-3">
              {data.swotAnalysis.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-foreground flex items-start group">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mr-3 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                  <span className="leading-relaxed">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="glass-card p-6 rounded-xl border border-red-500/30 hover-lift transition-all duration-200" data-testid="swot-weaknesses">
            <h4 className="font-bold text-lg mb-4 text-red-600 dark:text-red-400 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              Weaknesses
            </h4>
            <ul className="space-y-3">
              {data.swotAnalysis.weaknesses.map((weakness, index) => (
                <li key={index} className="text-sm text-foreground flex items-start group">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 mr-3 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                  <span className="leading-relaxed">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="glass-card p-6 rounded-xl border border-yellow-500/30 hover-lift transition-all duration-200" data-testid="swot-opportunities">
            <h4 className="font-bold text-lg mb-4 text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-yellow-500" />
              </div>
              Opportunities
            </h4>
            <ul className="space-y-3">
              {data.swotAnalysis.opportunities.map((opportunity, index) => (
                <li key={index} className="text-sm text-foreground flex items-start group">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mr-3 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                  <span className="leading-relaxed">{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="glass-card p-6 rounded-xl border border-orange-500/30 hover-lift transition-all duration-200" data-testid="swot-threats">
            <h4 className="font-bold text-lg mb-4 text-orange-600 dark:text-orange-400 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <Shield className="h-4 w-4 text-orange-500" />
              </div>
              Threats
            </h4>
            <ul className="space-y-3">
              {data.swotAnalysis.threats.map((threat, index) => (
                <li key={index} className="text-sm text-foreground flex items-start group">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mr-3 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                  <span className="leading-relaxed">{threat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Differentiation Strategy */}
        <div className="glass-card p-6 rounded-xl border-gradient hover-lift" data-testid="differentiation-strategy">
          <h4 className="font-bold text-lg mb-4 text-gradient-cosmic flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
            Differentiation Strategy
          </h4>
          <div className="space-y-4">
            {data.differentiationStrategy.map((strategy, index) => (
              <div key={index} className="flex items-start gap-4 glass-card p-4 rounded-lg border border-muted hover-lift transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-gradient-cosmic">{index + 1}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed pt-2">{strategy}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
