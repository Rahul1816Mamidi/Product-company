import { AlertTriangle, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ProblemSolution } from "@shared/schema";

interface ProblemAnalysisProps {
  data: ProblemSolution[];
}

export default function ProblemAnalysis({ data }: ProblemAnalysisProps) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-ai-indigo to-purple-600 p-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <AlertTriangle className="h-5 w-5 mr-3" />
          Problem Analysis & Solutions
        </h3>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {data.map((item, index) => (
            <div key={index} className="border-l-4 border-red-400 pl-4">
              <h4 className="font-semibold text-red-800 mb-2">
                Problem {index + 1}: {item.problem}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h5 className="font-medium text-emerald-800 mb-2">Recommended Solutions:</h5>
                <ul className="space-y-1 text-sm">
                  {item.solutions.map((solution, solutionIndex) => (
                    <li key={solutionIndex} className="flex items-start">
                      <Lightbulb className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
