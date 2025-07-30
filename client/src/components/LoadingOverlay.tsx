interface LoadingOverlayProps {
  isVisible: boolean;
  progress: number;
  message: string;
}

export default function LoadingOverlay({ isVisible, progress, message }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ai-blue"></div>
          <div>
            <h3 className="font-medium">AI Analysis in Progress</h3>
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-ai-blue to-ai-indigo h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
