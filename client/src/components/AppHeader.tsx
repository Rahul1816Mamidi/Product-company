import { Settings, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  const handleExportSession = () => {
    // TODO: Implement session export
    console.log("Exporting session...");
  };

  const handleShowSettings = () => {
    // TODO: Implement settings modal
    console.log("Showing settings...");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-indigo rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-ai-slate-900">AI Product Manager</h1>
              <p className="text-xs text-gray-500">Intelligent Product Development Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleExportSession}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShowSettings}>
              <Settings className="h-4 w-4" />
            </Button>
            <div className="w-8 h-8 bg-ai-blue rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
