import { AlertTriangle, Lightbulb, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ProblemSolution } from "@shared/schema";

interface ProblemAnalysisProps {
  data: ProblemSolution[];
}

export default function ProblemAnalysis({ data }: ProblemAnalysisProps) {
  return (
    <Card className="overflow-hidden glass-card border-gradient hover-lift transition-all duration-300 animate-scale-in" data-testid="card-problem-analysis">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-20"></div>
        <h3 className="relative z-10 text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          Problem Analysis & Solutions
        </h3>
      </div>
      
      <CardContent className="p-8">
        <div className="space-y-8">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl border-l-4 border-red-500 hover-lift transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
              data-testid={`problem-${index}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-gradient">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-red-600 dark:text-red-400 mb-2">
                    {item.problem}
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
              
              <div className="glass-card p-5 rounded-lg border border-emerald-500/30 mt-4">
                <h5 className="font-bold mb-3 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Recommended Solutions
                </h5>
                <ul className="space-y-3">
                  {item.solutions.map((solution, solutionIndex) => (
                    <li key={solutionIndex} className="flex items-start group">
                      <Lightbulb className="h-4 w-4 text-emerald-500 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-foreground leading-relaxed">{solution}</span>
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
