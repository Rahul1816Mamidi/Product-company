import { Table, Download, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WireframeGuidanceProps {
  data: {
    screens: Array<{
      name: string;
      description: string;
      priority: "critical" | "high" | "medium" | "low";
    }>;
    designConsiderations: string[];
    nextSteps: string[];
  };
}

export default function WireframeGuidance({ data }: WireframeGuidanceProps) {
  const handleExport = () => {
    const exportData = JSON.stringify(data, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wireframe-guidance.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getPriorityNumber = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-600";
      case "high": return "bg-orange-100 text-orange-600";
      case "medium": return "bg-yellow-100 text-yellow-600";
      case "low": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Table className="h-5 w-5 mr-3" />
            Wireframe & MVP Guidance
          </h3>
          <Button variant="ghost" size="sm" onClick={handleExport} className="text-white/80 hover:text-white">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Core User Flow</h4>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="bg-ai-blue text-white px-3 py-1 rounded-full text-sm">1. Discovery</div>
            <span className="text-gray-400">→</span>
            <div className="bg-ai-indigo text-white px-3 py-1 rounded-full text-sm">2. Filter & Compare</div>
            <span className="text-gray-400">→</span>
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">3. View Details</div>
            <span className="text-gray-400">→</span>
            <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">4. Book & Pay</div>
            <span className="text-gray-400">→</span>
            <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">5. Check-in</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Priority Screens for MVP</h4>
            <div className="space-y-3">
              {data.screens.map((screen, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${getPriorityNumber(screen.priority)}`}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h5 className="font-medium">{screen.name}</h5>
                      <p className="text-xs text-gray-500">{screen.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(screen.priority)}`}>
                    {screen.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Key Design Considerations</h4>
            <div className="space-y-4">
              {data.designConsiderations.map((consideration, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">{consideration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center">
            <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
            Next Steps for MVP Development
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {data.nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
