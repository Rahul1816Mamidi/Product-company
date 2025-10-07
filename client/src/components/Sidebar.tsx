import { useQuery } from "@tanstack/react-query";
import { Plus, TrendingUp, FileText, Table, Clock, Zap } from "lucide-react";
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
    <div className="lg:col-span-1 space-y-6 animate-slide-up">
      <Card className="glass-card border-gradient hover-lift transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gradient-cosmic">Session History</h2>
            <Clock className="h-4 w-4 text-primary animate-pulse" />
          </div>
          
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">No sessions yet</p>
              <p className="text-xs text-muted-foreground mt-1">Start your first product analysis</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
              {sessions.map((session, index) => (
                <div
                  key={session.id}
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 animate-scale-in group ${
                    currentSessionId === session.id
                      ? "glass-card border-gradient glow-blue"
                      : "bg-muted/30 hover:bg-muted/50 border border-transparent"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => onSessionSelect(session.id)}
                  data-testid={`session-item-${session.id}`}
                >
                  <h3 className="font-semibold text-sm mb-1" data-testid={`text-session-title-${session.id}`}>
                    {session.title}
                  </h3>
                  {session.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {session.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      session.status === "completed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                      session.status === "processing" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 animate-pulse" :
                      session.status === "error" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                      "bg-primary/20 text-primary border border-primary/30"
                    }`} data-testid={`status-${session.id}`}>
                      {session.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {session.createdAt ? new Date(session.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  {currentSessionId === session.id && (
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <Button 
            onClick={onNewSession} 
            className="btn-holographic w-full mt-6 h-11 font-semibold text-white shadow-lg"
            data-testid="button-new-session"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Session
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-card border-gradient hover-lift transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gradient">Quick Actions</h2>
            <Zap className="h-4 w-4 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
              onClick={() => handleQuickAction("marketResearch")}
              data-testid="button-quick-market-research"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Market Research</span>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 hover:bg-accent/10 hover:text-accent transition-all duration-200 group"
              onClick={() => handleQuickAction("prdTemplate")}
              data-testid="button-quick-prd-template"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <FileText className="h-4 w-4 text-accent" />
              </div>
              <span className="font-medium">PRD Template</span>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all duration-200 group"
              onClick={() => handleQuickAction("wireframeGuide")}
              data-testid="button-quick-wireframe-guide"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <Table className="h-4 w-4 text-emerald-500" />
              </div>
              <span className="font-medium">Wireframe Guide</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
