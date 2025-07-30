import { FileText, Edit, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PRDSection } from "@shared/schema";

interface PRDDocumentProps {
  data: PRDSection[];
}

export default function PRDDocument({ data }: PRDDocumentProps) {
  const handleExport = () => {
    const exportContent = data.map(section => 
      `# ${section.title}\n\n${section.content}\n\n`
    ).join('');
    
    const blob = new Blob([exportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-requirements-document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => {
    console.log("Edit PRD functionality would go here");
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <FileText className="h-5 w-5 mr-3" />
            Product Requirements Document (PRD)
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleEdit} className="text-white/80 hover:text-white">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleExport} className="text-white/80 hover:text-white">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="prose max-w-none">
          {data.map((section, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-xl font-semibold mb-3">{section.title}</h4>
              <div 
                className="prose-sm"
                dangerouslySetInnerHTML={{ 
                  __html: section.content.replace(/\n/g, '<br>') 
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
