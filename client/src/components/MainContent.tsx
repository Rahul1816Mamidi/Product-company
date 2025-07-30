import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSessionSchema } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles } from "lucide-react";
import type { Session, AnalysisResult } from "@shared/schema";
import MarketResearchResults from "./results/MarketResearchResults";
import ProblemAnalysis from "./results/ProblemAnalysis";
import TechStack from "./results/TechStack";
import PRDDocument from "./results/PRDDocument";
import WireframeGuidance from "./results/WireframeGuidance";
import SentimentAnalysis from "./results/SentimentAnalysis";
import CompetitiveIntelligence from "./results/CompetitiveIntelligence";
import RiskAssessment from "./results/RiskAssessment";
import AIDashboard from "./AIDashboard";

interface MainContentProps {
  currentSessionId: string | null;
  onSessionCreated: (sessionId: string) => void;
  onAnalysisStart: () => void;
  onAnalysisProgress: (progress: number, message: string) => void;
  onAnalysisComplete: () => void;
}

export default function MainContent({ 
  currentSessionId, 
  onSessionCreated, 
  onAnalysisStart,
  onAnalysisProgress,
  onAnalysisComplete 
}: MainContentProps) {
  const [isFormMode, setIsFormMode] = useState(!currentSessionId);

  const form = useForm({
    resolver: zodResolver(insertSessionSchema.extend({
      title: insertSessionSchema.shape.title.optional()
    })),
    defaultValues: {
      title: "",
      description: "",
      productInput: "",
      industry: "",
      urgency: "medium",
      includeMarketResearch: true,
      generatePRD: true,
      wireframeGuidance: true,
    },
  });

  const { data: currentSession, isLoading: sessionLoading } = useQuery<Session>({
    queryKey: ["/api/sessions", currentSessionId],
    enabled: !!currentSessionId,
  });

  useEffect(() => {
    setIsFormMode(!currentSessionId);
  }, [currentSessionId]);

  const createSessionMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/sessions", data);
      return response.json();
    },
    onSuccess: (session: Session) => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
      onSessionCreated(session.id);
      setIsFormMode(false);
    },
  });

  const analyzeSessionMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await apiRequest("POST", `/api/sessions/${sessionId}/analyze`);
      return response.json();
    },
    onMutate: () => {
      onAnalysisStart();
      
      // Simulate progress updates
      const progressSteps = [
        { progress: 15, message: "Analyzing sentiment and market position..." },
        { progress: 30, message: "Performing comprehensive market research..." },
        { progress: 45, message: "Identifying problems and solutions..." },
        { progress: 60, message: "Generating competitive intelligence..." },
        { progress: 75, message: "Assessing risks and mitigation strategies..." },
        { progress: 85, message: "Recommending optimal tech stack..." },
        { progress: 95, message: "Creating PRD and wireframe guidance..." },
      ];

      progressSteps.forEach((step, index) => {
        setTimeout(() => {
          onAnalysisProgress(step.progress, step.message);
        }, (index + 1) * 2000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/sessions", currentSessionId] });
      onAnalysisComplete();
    },
    onError: () => {
      onAnalysisComplete();
    },
  });

  const onSubmit = (data: any) => {
    const sessionData = {
      ...data,
      title: data.title || `Product Analysis - ${new Date().toLocaleDateString()}`,
    };
    createSessionMutation.mutate(sessionData);
  };

  const handleAnalyze = () => {
    if (currentSessionId) {
      analyzeSessionMutation.mutate(currentSessionId);
    }
  };

  if (sessionLoading) {
    return (
      <div className="lg:col-span-3">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      {isFormMode || !currentSession ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Describe Your Product Idea</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">AI Status:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5"></div>
                  Online
                </span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Title (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Co-working Space Finder App" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description & Problem Statement</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[120px] resize-none"
                          placeholder="Example: I want to build a mobile app that helps remote workers find and book co-working spaces. The main problems are: 1) Difficulty finding available spaces in real-time, 2) Lack of pricing transparency, 3) No way to verify workspace quality beforehand..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fintech">FinTech</SelectItem>
                            <SelectItem value="healthtech">HealthTech</SelectItem>
                            <SelectItem value="edtech">EdTech</SelectItem>
                            <SelectItem value="workspace">Workspace/PropTech</SelectItem>
                            <SelectItem value="ecommerce">E-Commerce</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgency Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low - Research Phase</SelectItem>
                            <SelectItem value="medium">Medium - Planning Phase</SelectItem>
                            <SelectItem value="high">High - Ready to Build</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <FormField
                      control={form.control}
                      name="includeMarketResearch"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Include Market Research
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="generatePRD"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Generate PRD
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wireframeGuidance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Wireframe Guidance
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-ai-blue to-ai-indigo hover:from-blue-600 hover:to-indigo-600"
                    disabled={createSessionMutation.isPending}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {createSessionMutation.isPending ? "Creating..." : "Analyze with AI"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Session Info Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{currentSession?.title}</h2>
                  {currentSession?.description && (
                    <p className="text-gray-600 mt-1">{currentSession.description}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">{currentSession?.productInput}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {currentSession?.status === "pending" && (
                    <Button 
                      onClick={handleAnalyze}
                      className="bg-gradient-to-r from-ai-blue to-ai-indigo hover:from-blue-600 hover:to-indigo-600"
                      disabled={analyzeSessionMutation.isPending}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {analyzeSessionMutation.isPending ? "Analyzing..." : "Start Analysis"}
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setIsFormMode(true)}>
                    Edit Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {currentSession.results && (
            <div className="space-y-6">
              <AIDashboard results={currentSession.results as AnalysisResult} />
              
              {(currentSession.results as AnalysisResult).sentiment && (
                <SentimentAnalysis data={(currentSession.results as AnalysisResult).sentiment!} />
              )}
              
              {(currentSession.results as AnalysisResult).marketResearch && (
                <MarketResearchResults data={(currentSession.results as AnalysisResult).marketResearch!} />
              )}
              
              {(currentSession.results as AnalysisResult).problemAnalysis && (
                <ProblemAnalysis data={(currentSession.results as AnalysisResult).problemAnalysis!} />
              )}
              
              {(currentSession.results as AnalysisResult).competitiveIntelligence && (
                <CompetitiveIntelligence data={(currentSession.results as AnalysisResult).competitiveIntelligence!} />
              )}
              
              {(currentSession.results as AnalysisResult).riskAssessment && (
                <RiskAssessment data={(currentSession.results as AnalysisResult).riskAssessment!} />
              )}
              
              {(currentSession.results as AnalysisResult).techStack && (
                <TechStack data={(currentSession.results as AnalysisResult).techStack!} />
              )}
              
              {(currentSession.results as AnalysisResult).prd && (
                <PRDDocument data={(currentSession.results as AnalysisResult).prd!} />
              )}
              
              {(currentSession.results as AnalysisResult).wireframe && (
                <WireframeGuidance data={(currentSession.results as AnalysisResult).wireframe!} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
