import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  productInput: text("product_input").notNull(),
  industry: text("industry"),
  urgency: text("urgency"),
  includeMarketResearch: boolean("include_market_research").default(true),
  generatePRD: boolean("generate_prd").default(true),
  wireframeGuidance: boolean("wireframe_guidance").default(true),
  results: jsonb("results"),
  status: text("status").default("pending"), // pending, processing, completed, error
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  title: true,
  description: true,
  productInput: true,
  industry: true,
  urgency: true,
  includeMarketResearch: true,
  generatePRD: true,
  wireframeGuidance: true,
});

export const updateSessionSchema = createInsertSchema(sessions).pick({
  results: true,
  status: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type UpdateSession = z.infer<typeof updateSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// Result types for structured AI responses
export interface MarketResearchResult {
  marketSize: string;
  growthRate: string;
  competitorCount: number;
  keyInsights: string[];
  competitors: {
    name: string;
    type: "direct" | "indirect";
    description: string;
    strength: string;
    weakness: string;
  }[];
}

export interface ProblemSolution {
  problem: string;
  description: string;
  solutions: string[];
}

export interface TechStackRecommendation {
  category: string;
  primary: string;
  alternatives: string[];
  reasoning: string;
}

export interface PRDSection {
  title: string;
  content: string;
}

export interface WireframeScreen {
  name: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
}

export interface AnalysisResult {
  marketResearch?: MarketResearchResult;
  problemAnalysis?: ProblemSolution[];
  techStack?: TechStackRecommendation[];
  prd?: PRDSection[];
  wireframe?: {
    screens: WireframeScreen[];
    designConsiderations: string[];
    nextSteps: string[];
  };
  sentiment?: {
    rating: number;
    confidence: number;
    insights: string[];
  };
  competitiveIntelligence?: {
    swotAnalysis: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    marketPosition: string;
    differentiationStrategy: string[];
  };
  riskAssessment?: {
    risks: Array<{
      type: string;
      description: string;
      probability: "low" | "medium" | "high";
      impact: "low" | "medium" | "high";
      mitigation: string;
    }>;
    overallRiskLevel: "low" | "medium" | "high";
  };
}
