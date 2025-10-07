import { FileText, Edit, Download, Sparkles } from "lucide-react";
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
    <Card className="overflow-hidden glass-card border-gradient hover-lift transition-all duration-300 animate-scale-in" data-testid="card-prd-document">
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-20"></div>
        <div className="relative z-10 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            Product Requirements Document
          </h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleEdit} 
              className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
              data-testid="button-edit-prd"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleExport} 
              className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
              data-testid="button-export-prd"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-8">
        <div className="space-y-8">
          {data.map((section, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl border-gradient hover-lift transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
              data-testid={`prd-section-${index}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-gradient">{index + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-gradient pt-2">{section.title}</h4>
              </div>
              <div 
                className="prose prose-sm max-w-none text-foreground leading-relaxed"
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
