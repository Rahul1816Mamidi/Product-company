import { TrendingUp, PieChart, Users, Download } from "lucide-react";
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
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-ai-blue to-ai-indigo p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-3" />
            Market Research Results
          </h3>
          <Button variant="ghost" size="sm" onClick={handleExport} className="text-white/80 hover:text-white">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-emerald-800">Market Size</h4>
              <PieChart className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 mt-2">{data.marketSize}</p>
            <p className="text-sm text-emerald-700">Total addressable market</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-blue-800">Growth Rate</h4>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">{data.growthRate}</p>
            <p className="text-sm text-blue-700">CAGR (Annual)</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-purple-800">Competitors</h4>
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">{data.competitorCount}</p>
            <p className="text-sm text-purple-700">Major players identified</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 text-ai-blue mr-2" />
              Key Market Insights
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {data.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Users className="h-4 w-4 text-ai-indigo mr-2" />
              Competitive Landscape
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.competitors.map((competitor, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{competitor.name}</h5>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      competitor.type === "direct" 
                        ? "bg-red-100 text-red-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {competitor.type} Competitor
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{competitor.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-emerald-600">Strength: {competitor.strength}</span>
                    <span className="text-red-600">Weakness: {competitor.weakness}</span>
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
