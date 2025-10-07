import { Heart, TrendingUp, Lightbulb, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SentimentAnalysisProps {
  data: {
    rating: number;
    confidence: number;
    insights: string[];
  };
}

export default function SentimentAnalysis({ data }: SentimentAnalysisProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-emerald-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
    if (confidence >= 0.6) return "border-yellow-500/30 text-yellow-600 dark:text-yellow-400";
    return "border-red-500/30 text-red-600 dark:text-red-400";
  };

  return (
    <Card className="overflow-hidden glass-card border-gradient hover-lift transition-all duration-300 animate-scale-in" data-testid="card-sentiment-analysis">
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-20"></div>
        <h3 className="relative z-10 text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          Sentiment Analysis
        </h3>
      </div>
      
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center glass-card p-6 rounded-2xl border-gradient hover-lift">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground font-semibold">Overall Sentiment</span>
            </div>
            <div className={`text-6xl font-bold ${getRatingColor(data.rating)} mb-4`} data-testid="text-sentiment-rating">
              {data.rating}/5
            </div>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Heart
                  key={star}
                  className={`h-6 w-6 transition-all duration-200 ${
                    star <= data.rating ? "text-pink-500 fill-current animate-pulse" : "text-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center glass-card p-6 rounded-2xl border-gradient hover-lift">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-5 w-5 text-muted-foreground mr-2 animate-pulse" />
              <span className="text-sm text-muted-foreground font-semibold">Confidence Level</span>
            </div>
            <div className="text-4xl font-bold text-gradient mb-4" data-testid="text-confidence-level">
              {Math.round(data.confidence * 100)}%
            </div>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium glass-card border ${getConfidenceColor(data.confidence)}`}>
              {data.confidence >= 0.8 ? "High Confidence" : data.confidence >= 0.6 ? "Medium Confidence" : "Low Confidence"}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gradient">
            <Lightbulb className="h-5 w-5 text-yellow-500 animate-pulse" />
            Key Insights
          </h4>
          <div className="space-y-3">
            {data.insights.map((insight, index) => (
              <div 
                key={index} 
                className="glass-card p-4 rounded-xl border border-muted hover-lift transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`insight-${index}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 flex-shrink-0 animate-pulse"></div>
                  <p className="text-sm text-foreground leading-relaxed">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
