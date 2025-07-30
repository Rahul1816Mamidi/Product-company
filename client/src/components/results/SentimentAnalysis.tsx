import { Heart, TrendingUp, Lightbulb } from "lucide-react";
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
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800";
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Heart className="h-5 w-5 mr-3" />
          Sentiment Analysis
        </h3>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Overall Sentiment</span>
            </div>
            <div className={`text-4xl font-bold ${getRatingColor(data.rating)}`}>
              {data.rating}/5
            </div>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Heart
                  key={star}
                  className={`h-5 w-5 ${
                    star <= data.rating ? "text-pink-500 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Confidence Level</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {Math.round(data.confidence * 100)}%
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getConfidenceColor(data.confidence)}`}>
              {data.confidence >= 0.8 ? "High Confidence" : data.confidence >= 0.6 ? "Medium Confidence" : "Low Confidence"}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
            Key Insights
          </h4>
          <div className="space-y-3">
            {data.insights.map((insight, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}