import { AlertTriangle, Shield, Download } from "lucide-react";
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
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getOverallRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-600";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const getRiskScore = (probability: string, impact: string) => {
    const probWeight = probability === "high" ? 3 : probability === "medium" ? 2 : 1;
    const impactWeight = impact === "high" ? 3 : impact === "medium" ? 2 : 1;
    return probWeight * impactWeight;
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-3" />
            Risk Assessment
          </h3>
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getOverallRiskColor(data.overallRiskLevel)}`}>
              Overall Risk: {data.overallRiskLevel.toUpperCase()}
            </div>
            <Button variant="ghost" size="sm" onClick={handleExport} className="text-white/80 hover:text-white">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {data.risks.map((risk, index) => {
            const riskScore = getRiskScore(risk.probability, risk.impact);
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <h4 className="font-semibold text-gray-800 mr-3">{risk.type}</h4>
                    <div className="text-xs text-gray-500">
                      Risk Score: {riskScore}/9
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(risk.probability)}`}>
                      {risk.probability} probability
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(risk.impact)}`}>
                      {risk.impact} impact
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-1 flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Mitigation Strategy
                  </h5>
                  <p className="text-sm text-blue-700">{risk.mitigation}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Risk Management Recommendations</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Regularly review and update risk assessments as the project progresses</li>
            <li>• Implement monitoring systems for high-probability risks</li>
            <li>• Establish contingency plans for high-impact scenarios</li>
            <li>• Consider risk insurance or transfer strategies where appropriate</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}