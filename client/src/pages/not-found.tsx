import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Search } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 mesh-gradient -z-10"></div>
      <div className="fixed inset-0 particle-bg -z-10"></div>
      
      <Card className="w-full max-w-md mx-4 glass-card border-gradient hover-lift animate-scale-in">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center animate-glow-pulse">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-pink-500 animate-ping opacity-20"></div>
            </div>
            
            <h1 className="text-4xl font-bold text-gradient-cosmic mb-2">404</h1>
            <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link href="/" className="flex-1">
                <Button className="btn-holographic w-full h-12 font-semibold text-white" data-testid="button-go-home">
                  <Home className="h-5 w-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="flex-1 h-12 glass-card border-gradient hover-lift"
                onClick={() => window.history.back()}
                data-testid="button-go-back"
              >
                <Search className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
