import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Home() {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="fixed inset-0 mesh-gradient -z-10"></div>
      
      {/* Particle background effect */}
      <div className="fixed inset-0 particle-bg -z-10"></div>
      
      {/* Grid overlay */}
      <div className="fixed inset-0 -z-10" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      
      <AppHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Sidebar 
            currentSessionId={currentSessionId}
            onSessionSelect={setCurrentSessionId}
            onNewSession={() => setCurrentSessionId(null)}
          />
          
          <MainContent 
            currentSessionId={currentSessionId}
            onSessionCreated={setCurrentSessionId}
            onAnalysisStart={() => {
              setIsAnalyzing(true);
              setAnalysisProgress(0);
              setLoadingMessage("Starting AI analysis...");
            }}
            onAnalysisProgress={(progress, message) => {
              setAnalysisProgress(progress);
              setLoadingMessage(message);
            }}
            onAnalysisComplete={() => {
              setIsAnalyzing(false);
              setAnalysisProgress(100);
            }}
          />
        </div>
      </div>

      <LoadingOverlay 
        isVisible={isAnalyzing}
        progress={analysisProgress}
        message={loadingMessage}
      />
    </div>
  );
}
