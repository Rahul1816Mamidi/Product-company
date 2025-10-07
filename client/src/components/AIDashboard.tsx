import { Brain, TrendingUp, Target, Shield, Heart, Zap, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { AnalysisResult } from "@shared/schema";

interface AIDashboardProps {
  results: AnalysisResult;
}

export default function AIDashboard({ results }: AIDashboardProps) {
  const getOverallScore = () => {
    let totalScore = 0;
    let components = 0;

    if (results.sentiment) {
      totalScore += results.sentiment.rating;
      components++;
    }

    if (results.riskAssessment) {
      const riskScore = results.riskAssessment.overallRiskLevel === "low" ? 5 : 
                      results.riskAssessment.overallRiskLevel === "medium" ? 3 : 1;
      totalScore += riskScore;
      components++;
    }

    if (results.marketResearch) {
      totalScore += 4;
      components++;
    }

    return components > 0 ? Math.round(totalScore / components) : 0;
  };

  const overallScore = getOverallScore();

  return (
    <Card className="overflow-hidden glass-card border-gradient hover-lift transition-all duration-300 animate-scale-in" data-testid="card-ai-dashboard">
      <div className="animated-gradient p-8 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white flex items-center mb-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
                <Brain className="h-7 w-7 text-white animate-pulse" />
              </div>
              AI Analysis Dashboard
            </h2>
            <p className="text-white/90 text-lg flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Comprehensive product intelligence powered by advanced AI
            </p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/20 text-center min-w-[140px]">
            <div className="text-5xl font-bold text-white mb-2 text-gradient-cosmic" data-testid="text-overall-score">
              {overallScore}/5
            </div>
            <div className="text-white/80 text-sm font-medium">Overall Score</div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {/* Sentiment Analysis */}
          {results.sentiment && (
            <div className="text-center p-4 glass-card rounded-xl border-gradient hover-lift transition-all duration-200 group" data-testid="metric-sentiment">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Heart className="h-7 w-7 text-pink-500" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">{results.sentiment.rating}/5</div>
              <div className="text-xs font-semibold text-muted-foreground mb-2">Sentiment</div>
              <div className="text-xs text-muted-foreground">{Math.round(results.sentiment.confidence * 100)}% confidence</div>
            </div>
          )}

          {/* Market Research */}
          {results.marketResearch && (
            <div className="text-center p-4 glass-card rounded-xl border-gradient hover-lift transition-all duration-200 group" data-testid="metric-market-size">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <div className="text-lg font-bold text-gradient mb-1">{results.marketResearch.marketSize}</div>
              <div className="text-xs font-semibold text-muted-foreground mb-2">Market Size</div>
              <div className="text-xs text-muted-foreground">{results.marketResearch.growthRate} growth</div>
            </div>
          )}

          {/* Competitive Intelligence */}
          {results.competitiveIntelligence && (
            <div className="text-center p-4 glass-card rounded-xl border-gradient hover-lift transition-all duration-200 group" data-testid="metric-competitive">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-purple-500" />
              </div>
              <div className="text-lg font-bold text-gradient-cosmic mb-1">SWOT</div>
              <div className="text-xs font-semibold text-muted-foreground mb-2">Analysis</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          )}

          {/* Risk Assessment */}
          {results.riskAssessment && (
            <div className="text-center p-4 glass-card rounded-xl border-gradient hover-lift transition-all duration-200 group" data-testid="metric-risk">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-red-500" />
              </div>
              <div className="text-lg font-bold text-gradient mb-1 capitalize">{results.riskAssessment.overallRiskLevel}</div>
              <div className="text-xs font-semibold text-muted-foreground mb-2">Risk Level</div>
              <div className="text-xs text-muted-foreground">{results.riskAssessment.risks.length} risks identified</div>
            </div>
          )}

          {/* Tech Stack */}
          {results.techStack && (
            <div className="text-center p-4 glass-card rounded-xl border-gradient hover-lift transition-all duration-200 group" data-testid="metric-tech-stack">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-emerald-500" />
              </div>
              <div className="text-lg font-bold text-gradient mb-1">{results.techStack.length}</div>
              <div className="text-xs font-semibold text-muted-foreground mb-2">Tech Stacks</div>
              <div className="text-xs text-muted-foreground">Recommended</div>
            </div>
          )}

          {/* Problems Identified */}
          {results.problemAnalysis && (
            <div className="text-center p-4 glass-card rounded-xl border-gradient hover-lift transition-all duration-200 group" data-testid="metric-problems">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-orange-500" />
              </div>
              <div className="text-lg font-bold text-gradient mb-1">{results.problemAnalysis.length}</div>
              <div className="text-xs font-semibold text-muted-foreground mb-2">Problems</div>
              <div className="text-xs text-muted-foreground">Analyzed</div>
            </div>
          )}
        </div>

        {/* Key Insights Bar */}
        <div className="glass-card p-6 rounded-xl border border-muted mb-6">
          <h3 className="font-bold text-lg text-gradient mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            AI-Powered Insights Summary
          </h3>
          <div className="flex flex-wrap gap-3">
            {results.sentiment && (
              <span className="px-4 py-2 glass-card rounded-full text-sm font-medium border border-pink-500/30 text-pink-600 dark:text-pink-400">
                {results.sentiment.rating >= 4 ? "Positive Sentiment" : results.sentiment.rating >= 3 ? "Neutral Sentiment" : "Needs Improvement"}
              </span>
            )}
            {results.marketResearch && (
              <span className="px-4 py-2 glass-card rounded-full text-sm font-medium border border-primary/30 text-primary">
                {results.marketResearch.competitorCount} Competitors Identified
              </span>
            )}
            {results.riskAssessment && (
              <span className={`px-4 py-2 glass-card rounded-full text-sm font-medium ${
                results.riskAssessment.overallRiskLevel === "low" ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400" :
                results.riskAssessment.overallRiskLevel === "medium" ? "border-yellow-500/30 text-yellow-600 dark:text-yellow-400" :
                "border-red-500/30 text-red-600 dark:text-red-400"
              }`}>
                {results.riskAssessment.overallRiskLevel.toUpperCase()} Risk
              </span>
            )}
            {results.techStack && (
              <span className="px-4 py-2 glass-card rounded-full text-sm font-medium border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                Tech Stack Ready
              </span>
            )}
          </div>
        </div>

        {/* Analysis Completeness Indicator */}
        <div>
          <div className="flex items-center justify-between text-sm font-semibold mb-3">
            <span className="text-muted-foreground">Analysis Completeness</span>
            <span className="text-gradient text-lg">{Math.round((Object.keys(results).length / 8) * 100)}%</span>
          </div>
          <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-500 animate-glow-pulse" 
              style={{ width: `${(Object.keys(results).length / 8) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_linear_infinite]"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
