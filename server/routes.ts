import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, updateSessionSchema } from "@shared/schema";
import { 
  generateMarketResearch, 
  analyzeProblemsSolutions, 
  recommendTechStack, 
  generatePRD, 
  generateWireframeGuidance,
  analyzeSentiment,
  generateCompetitiveIntelligence,
  generateRiskAssessment
} from "./services/openai";
import { generateDemoAnalysisResult } from "./services/demoData";
import type { AnalysisResult } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all sessions
  app.get("/api/sessions", async (req, res) => {
    try {
      // For now, get all sessions since we don't have user authentication
      const sessions = await storage.getSessionsByUserId("");
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  // Get specific session
  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch session" });
    }
  });

  // Create new session
  app.post("/api/sessions", async (req, res) => {
    try {
      const validation = insertSessionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid session data",
          errors: validation.error.errors 
        });
      }

      const session = await storage.createSession(validation.data);
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to create session" });
    }
  });

  // Analyze product with AI
  app.post("/api/sessions/:id/analyze", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      // Update session status to processing
      await storage.updateSession(req.params.id, { status: "processing" });

      try {
        let results: AnalysisResult = {};

        // Check if OpenAI is available, if not use demo data
        if (!process.env.OPENAI_API_KEY) {
          console.log("Using demo data due to missing OpenAI API key");
          results = generateDemoAnalysisResult(session.productInput, session.industry || "general");
        } else {
          try {
            // Perform sentiment analysis on the product input
            results.sentiment = await analyzeSentiment(session.productInput);

            // Generate market research if requested
            if (session.includeMarketResearch) {
              results.marketResearch = await generateMarketResearch(
                session.productInput,
                session.industry || "general"
              );
            }

            // Analyze problems and solutions
            results.problemAnalysis = await analyzeProblemsSolutions(session.productInput);

            // Generate competitive intelligence
            results.competitiveIntelligence = await generateCompetitiveIntelligence(
              session.productInput,
              session.industry || "general"
            );

            // Generate risk assessment
            results.riskAssessment = await generateRiskAssessment(
              session.productInput,
              session.industry || "general"
            );

            // Recommend tech stack
            results.techStack = await recommendTechStack(
              session.productInput,
              session.industry || "general"
            );

            // Generate PRD if requested
            if (session.generatePRD && results.marketResearch) {
              results.prd = await generatePRD(
                session.productInput,
                session.industry || "general",
                results.marketResearch
              );
            }

            // Generate wireframe guidance if requested
            if (session.wireframeGuidance) {
              results.wireframe = await generateWireframeGuidance(
                session.productInput,
                session.industry || "general"
              );
            }
          } catch (openaiError) {
            console.warn("OpenAI analysis failed, falling back to demo data:", openaiError);
            results = generateDemoAnalysisResult(session.productInput, session.industry || "general");
          }
        }

        // Update session with results
        const updatedSession = await storage.updateSession(req.params.id, {
          results,
          status: "completed"
        });

        res.json(updatedSession);
      } catch (analysisError) {
        // Update session status to error
        await storage.updateSession(req.params.id, { status: "error" });
        throw analysisError;
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      res.status(500).json({ 
        message: "Failed to analyze product: " + (error as Error).message 
      });
    }
  });

  // Delete session
  app.delete("/api/sessions/:id", async (req, res) => {
    try {
      const success = await storage.deleteSession(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete session" });
    }
  });

  // Export session data
  app.get("/api/sessions/:id/export", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      // Set headers for file download
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="session-${session.id}.json"`);
      
      res.json({
        title: session.title,
        description: session.description,
        productInput: session.productInput,
        industry: session.industry,
        results: session.results,
        createdAt: session.createdAt
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to export session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
