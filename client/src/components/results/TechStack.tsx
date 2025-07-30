import { Code, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TechStackRecommendation } from "@shared/schema";

interface TechStackProps {
  data: TechStackRecommendation[];
}

export default function TechStack({ data }: TechStackProps) {
  const handleExport = () => {
    const exportData = JSON.stringify(data, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tech-stack.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Frontend': 'blue',
      'Backend': 'green',
      'Database': 'purple',
      'Mobile': 'blue',
      'Infrastructure': 'indigo',
      'Payment': 'yellow',
      'Maps': 'red',
    };
    
    const matchedKey = Object.keys(colors).find(key => 
      category.toLowerCase().includes(key.toLowerCase())
    );
    
    return colors[matchedKey || 'gray'];
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      gray: 'bg-gray-50 border-gray-200 text-gray-800',
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Code className="h-5 w-5 mr-3" />
            Recommended Tech Stack
          </h3>
          <Button variant="ghost" size="sm" onClick={handleExport} className="text-white/80 hover:text-white">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => {
            const color = getCategoryColor(item.category);
            const colorClasses = getColorClasses(color);
            
            return (
              <div key={index}>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Code className={`h-4 w-4 mr-2 text-${color}-500`} />
                  {item.category}
                </h4>
                <div className="space-y-2">
                  <div className={`flex items-center justify-between p-2 rounded border ${colorClasses}`}>
                    <span className="text-sm font-medium">{item.primary}</span>
                    <span className="bg-white/80 text-xs px-2 py-1 rounded">Recommended</span>
                  </div>
                  {item.alternatives.map((alt, altIndex) => (
                    <div key={altIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{alt}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Alternative</span>
                    </div>
                  ))}
                  <p className="text-xs text-gray-600 mt-2">{item.reasoning}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
