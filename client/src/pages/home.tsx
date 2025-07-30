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
    <div className="min-h-screen bg-ai-slate-50">
      <AppHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
