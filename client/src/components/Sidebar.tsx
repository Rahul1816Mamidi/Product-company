import { useQuery } from "@tanstack/react-query";
import { Plus, TrendingUp, FileText, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Session } from "@shared/schema";

interface SidebarProps {
  currentSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
}

export default function Sidebar({ currentSessionId, onSessionSelect, onNewSession }: SidebarProps) {
  const { data: sessions = [], isLoading } = useQuery<Session[]>({
    queryKey: ["/api/sessions"],
  });

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    // TODO: Implement quick actions
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Session History</h2>
          
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-sm">No sessions yet</p>
              <p className="text-xs mt-1">Start by creating your first product analysis</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    currentSessionId === session.id
                      ? "bg-ai-blue/10 border-l-4 border-ai-blue"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => onSessionSelect(session.id)}
                >
                  <h3 className="font-medium text-sm">{session.title}</h3>
                  {session.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{session.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      session.status === "completed" ? "bg-emerald-100 text-emerald-800" :
                      session.status === "processing" ? "bg-yellow-100 text-yellow-800" :
                      session.status === "error" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {session.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {session.createdAt ? new Date(session.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <Button onClick={onNewSession} className="w-full mt-4 bg-ai-blue hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleQuickAction("marketResearch")}
            >
              <TrendingUp className="h-4 w-4 mr-3 text-ai-blue" />
              Market Research
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleQuickAction("prdTemplate")}
            >
              <FileText className="h-4 w-4 mr-3 text-ai-indigo" />
              PRD Template
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleQuickAction("wireframeGuide")}
            >
              <Table className="h-4 w-4 mr-3 text-emerald-500" />
              Wireframe Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
