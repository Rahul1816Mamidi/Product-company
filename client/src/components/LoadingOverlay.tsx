import { Loader2, Sparkles, Zap } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  progress: number;
  message: string;
}

export default function LoadingOverlay({ isVisible, progress, message }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="glass-card p-8 max-w-md mx-4 border-gradient relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 particle-bg opacity-30"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow-pulse">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent animate-ping opacity-20"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gradient mb-1">AI Analysis in Progress</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Zap className="h-3 w-3 text-primary animate-pulse" />
                {message}
              </p>
            </div>
          </div>
          
          {/* Progress bar with gradient */}
          <div className="relative">
            <div className="h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-500 relative animate-glow-pulse" 
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_linear_infinite]"></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground font-medium">Processing...</span>
              <span className="text-xs font-bold text-gradient">{progress}%</span>
            </div>
          </div>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                style={{
                  animation: `bounce 1s infinite ${i * 0.15}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
