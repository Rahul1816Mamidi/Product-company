import { Settings, Download, User, Sparkles } from "lucide-react";
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
    <header className="glass-card sticky top-0 z-50 border-b border-white/20 backdrop-blur-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4 animate-fade-in">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden group">
              <div className="absolute inset-0 animated-gradient opacity-90"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient tracking-tight" data-testid="text-app-title">
                AI Product Manager
              </h1>
              <p className="text-xs text-muted-foreground tracking-wide" data-testid="text-app-subtitle">
                Intelligent Product Development Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 animate-fade-in">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleExportSession}
              className="hover-lift hover:bg-white/10 hover:text-primary transition-all duration-200"
              data-testid="button-export"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShowSettings}
              className="hover-lift hover:bg-white/10 hover:text-primary transition-all duration-200"
              data-testid="button-settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <div className="relative w-10 h-10 rounded-full overflow-hidden group cursor-pointer hover-lift" data-testid="button-user-profile">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue to-cyber-violet"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
