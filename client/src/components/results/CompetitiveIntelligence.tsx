import { Target, TrendingUp, Shield, AlertCircle, CheckCircle, Download } from "lucide-react";
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
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Target className="h-5 w-5 mr-3" />
            Competitive Intelligence & SWOT Analysis
          </h3>
          <Button variant="ghost" size="sm" onClick={handleExport} className="text-white/80 hover:text-white">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        {/* Market Position */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold mb-2 text-blue-800">Market Position</h4>
          <p className="text-sm text-blue-700">{data.marketPosition}</p>
        </div>

        {/* SWOT Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Strengths */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold mb-3 text-green-800 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Strengths
            </h4>
            <ul className="space-y-2">
              {data.swotAnalysis.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-green-700 flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold mb-3 text-red-800 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Weaknesses
            </h4>
            <ul className="space-y-2">
              {data.swotAnalysis.weaknesses.map((weakness, index) => (
                <li key={index} className="text-sm text-red-700 flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold mb-3 text-yellow-800 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Opportunities
            </h4>
            <ul className="space-y-2">
              {data.swotAnalysis.opportunities.map((opportunity, index) => (
                <li key={index} className="text-sm text-yellow-700 flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                  <span>{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold mb-3 text-orange-800 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Threats
            </h4>
            <ul className="space-y-2">
              {data.swotAnalysis.threats.map((threat, index) => (
                <li key={index} className="text-sm text-orange-700 flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                  <span>{threat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Differentiation Strategy */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold mb-3 text-purple-800">Differentiation Strategy</h4>
          <div className="space-y-2">
            {data.differentiationStrategy.map((strategy, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-sm text-purple-700">{strategy}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}