import { Brain, TrendingUp, Target, Shield, Heart, Zap } from "lucide-react";
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
      totalScore += 4; // Assume good market research
      components++;
    }

    return components > 0 ? Math.round(totalScore / components) : 0;
  };

  const overallScore = getOverallScore();

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600";
    if (score >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center mb-2">
              <Brain className="h-6 w-6 mr-3" />
              AI Analysis Dashboard
            </h2>
            <p className="text-indigo-100">Comprehensive product intelligence powered by advanced AI</p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold text-white mb-1`}>
              {overallScore}/5
            </div>
            <div className="text-indigo-100 text-sm">Overall Score</div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Sentiment Analysis */}
          {results.sentiment && (
            <div className="text-center p-4 bg-pink-50 rounded-lg border border-pink-200">
              <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-600">{results.sentiment.rating}/5</div>
              <div className="text-xs text-pink-700">Sentiment</div>
              <div className="text-xs text-gray-500 mt-1">{Math.round(results.sentiment.confidence * 100)}% confidence</div>
            </div>
          )}

          {/* Market Research */}
          {results.marketResearch && (
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-600">{results.marketResearch.marketSize}</div>
              <div className="text-xs text-blue-700">Market Size</div>
              <div className="text-xs text-gray-500 mt-1">{results.marketResearch.growthRate} growth</div>
            </div>
          )}

          {/* Competitive Intelligence */}
          {results.competitiveIntelligence && (
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-600">SWOT</div>
              <div className="text-xs text-purple-700">Analysis</div>
              <div className="text-xs text-gray-500 mt-1">Complete</div>
            </div>
          )}

          {/* Risk Assessment */}
          {results.riskAssessment && (
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <Shield className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-red-600 capitalize">{results.riskAssessment.overallRiskLevel}</div>
              <div className="text-xs text-red-700">Risk Level</div>
              <div className="text-xs text-gray-500 mt-1">{results.riskAssessment.risks.length} risks identified</div>
            </div>
          )}

          {/* Tech Stack */}
          {results.techStack && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-600">{results.techStack.length}</div>
              <div className="text-xs text-green-700">Tech Stacks</div>
              <div className="text-xs text-gray-500 mt-1">Recommended</div>
            </div>
          )}

          {/* Problems Identified */}
          {results.problemAnalysis && (
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-600">{results.problemAnalysis.length}</div>
              <div className="text-xs text-orange-700">Problems</div>
              <div className="text-xs text-gray-500 mt-1">Analyzed</div>
            </div>
          )}
        </div>

        {/* Key Insights Bar */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Insights Summary</h3>
          <div className="flex flex-wrap gap-2">
            {results.sentiment && (
              <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                {results.sentiment.rating >= 4 ? "Positive Sentiment" : results.sentiment.rating >= 3 ? "Neutral Sentiment" : "Needs Improvement"}
              </span>
            )}
            {results.marketResearch && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {results.marketResearch.competitorCount} Competitors Identified
              </span>
            )}
            {results.riskAssessment && (
              <span className={`px-3 py-1 rounded-full text-sm ${
                results.riskAssessment.overallRiskLevel === "low" ? "bg-green-100 text-green-800" :
                results.riskAssessment.overallRiskLevel === "medium" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                {results.riskAssessment.overallRiskLevel.toUpperCase()} Risk
              </span>
            )}
            {results.techStack && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Tech Stack Ready
              </span>
            )}
          </div>
        </div>

        {/* Analysis Completeness Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Analysis Completeness</span>
            <span>{Math.round((Object.keys(results).length / 8) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(Object.keys(results).length / 8) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}