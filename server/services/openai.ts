import OpenAI from "openai";
import type { MarketResearchResult, ProblemSolution, TechStackRecommendation, PRDSection, WireframeScreen } from "@shared/schema";
import { enhanceMarketResearchWithWebData, getMarketTrends } from "./webSearch";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
let openai: OpenAI | null = null;

try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  } else {
    console.warn("Warning: OPENAI_API_KEY not found. AI features will not work properly.");
  }
} catch (error) {
  console.error("Failed to initialize OpenAI client:", error);
}

function checkOpenAIAvailable(): void {
  if (!openai) {
    throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.");
  }
}

export async function generateMarketResearch(productInput: string, industry: string): Promise<MarketResearchResult> {
  try {
    checkOpenAIAvailable();
    
    // Get market trends from web search to enhance AI analysis
    const marketTrends = await getMarketTrends(industry);
    
    const response = await openai!.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a market research expert with access to current market trends. Analyze the given product idea and provide comprehensive market research. 
          Consider the current market trends provided to give accurate insights.
          Return your analysis in JSON format with the following structure:
          {
            "marketSize": "string (e.g., '$4.2B')",
            "growthRate": "string (e.g., '13.2%')",
            "competitorCount": number,
            "keyInsights": ["insight1", "insight2", "insight3"],
            "competitors": [
              {
                "name": "string",
                "type": "direct" or "indirect",
                "description": "string",
                "strength": "string",
                "weakness": "string"
              }
            ]
          }`
        },
        {
          role: "user",
          content: `Product: ${productInput}\nIndustry: ${industry}\n\nCurrent Market Trends: ${marketTrends.join(', ')}\n\nProvide detailed market research for this product idea, incorporating current market trends and realistic market data.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const aiGeneratedData = JSON.parse(response.choices[0].message.content || "{}");
    
    // Enhance with web search data
    const enhancedData = await enhanceMarketResearchWithWebData(productInput, industry, aiGeneratedData);
    
    return enhancedData;
  } catch (error) {
    throw new Error("Failed to generate market research: " + (error as Error).message);
  }
}

export async function analyzeProblemsSolutions(productInput: string): Promise<ProblemSolution[]> {
  try {
    checkOpenAIAvailable();
    
    const response = await openai!.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a product strategy expert. Analyze the given product description and identify key problems and their solutions.
          Return your analysis in JSON format:
          {
            "problems": [
              {
                "problem": "Brief problem title",
                "description": "Detailed problem description",
                "solutions": ["solution1", "solution2", "solution3"]
              }
            ]
          }`
        },
        {
          role: "user",
          content: `Product: ${productInput}\n\nIdentify the main problems this product solves and recommend specific solutions for each.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.problems || [];
  } catch (error) {
    throw new Error("Failed to analyze problems and solutions: " + (error as Error).message);
  }
}

export async function recommendTechStack(productInput: string, industry: string): Promise<TechStackRecommendation[]> {
  try {
    checkOpenAIAvailable();
    
    const response = await openai!.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a technical architect. Recommend a comprehensive tech stack for the given product.
          Return recommendations in JSON format:
          {
            "recommendations": [
              {
                "category": "Frontend Mobile/Backend/Database/etc",
                "primary": "Primary recommendation",
                "alternatives": ["alternative1", "alternative2"],
                "reasoning": "Why this is recommended"
              }
            ]
          }`
        },
        {
          role: "user",
          content: `Product: ${productInput}\nIndustry: ${industry}\n\nRecommend a complete tech stack for building this product, including frontend, backend, database, third-party services, and infrastructure.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.recommendations || [];
  } catch (error) {
    throw new Error("Failed to recommend tech stack: " + (error as Error).message);
  }
}

export async function generatePRD(productInput: string, industry: string, marketResearch: MarketResearchResult): Promise<PRDSection[]> {
  try {
    checkOpenAIAvailable();
    
    const response = await openai!.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert product manager. Create a comprehensive Product Requirements Document (PRD).
          Return the PRD in JSON format:
          {
            "sections": [
              {
                "title": "Section title",
                "content": "Detailed content in markdown format"
              }
            ]
          }`
        },
        {
          role: "user",
          content: `Product: ${productInput}\nIndustry: ${industry}\nMarket Research: ${JSON.stringify(marketResearch)}\n\nCreate a comprehensive PRD with sections for: Product Overview, Target Users, Key Features (MVP/Phase 2/Future), Success Metrics, Technical Requirements, and Go-to-Market Strategy.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.sections || [];
  } catch (error) {
    throw new Error("Failed to generate PRD: " + (error as Error).message);
  }
}

export async function generateWireframeGuidance(productInput: string, industry: string): Promise<{screens: WireframeScreen[], designConsiderations: string[], nextSteps: string[]}> {
  try {
    checkOpenAIAvailable();
    
    const response = await openai!.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a UX/UI expert with knowledge of current design trends and best practices. Provide wireframe and MVP guidance for the given product.
          Consider modern UI/UX patterns, accessibility requirements, and mobile-first design.
          Return guidance in JSON format:
          {
            "screens": [
              {
                "name": "Screen name",
                "description": "What this screen does",
                "priority": "critical" | "high" | "medium" | "low"
              }
            ],
            "designConsiderations": ["consideration1", "consideration2"],
            "nextSteps": ["step1", "step2", "step3"]
          }`
        },
        {
          role: "user",
          content: `Product: ${productInput}\nIndustry: ${industry}\n\nProvide wireframe guidance including priority screens for MVP, key design considerations focusing on user experience, accessibility, and modern design patterns, and detailed next steps for development.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      screens: result.screens || [],
      designConsiderations: result.designConsiderations || [],
      nextSteps: result.nextSteps || []
    };
  } catch (error) {
    throw new Error("Failed to generate wireframe guidance: " + (error as Error).message);
  }
}

// Advanced AI Analysis Functions

export async function analyzeSentiment(text: string): Promise<{
  rating: number,
  confidence: number,
  insights: string[]
}> {
  try {
    checkOpenAIAvailable();
    
    const response = await openai!.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a sentiment analysis expert. Analyze the sentiment of the product description and provide insights.
          Respond with JSON in this format: 
          { 
            "rating": number (1-5 stars), 
            "confidence": number (0-1), 
            "insights": ["insight1", "insight2"]
          }`
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      rating: Math.max(1, Math.min(5, Math.round(result.rating))),
      confidence: Math.max(0, Math.min(1, result.confidence)),
      insights: result.insights || []
    };
  } catch (error) {
    throw new Error("Failed to analyze sentiment: " + (error as Error).message);
  }
}

export async function generateCompetitiveIntelligence(productInput: string, industry: string): Promise<{
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  marketPosition: string;
  differentiationStrategy: string[];
}> {
  try {
    checkOpenAIAvailable();
    
    const response = await openai!.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a competitive intelligence expert. Provide SWOT analysis and competitive positioning for the product.
          Return analysis in JSON format:
          {
            "swotAnalysis": {
              "strengths": ["strength1", "strength2"],
              "weaknesses": ["weakness1", "weakness2"],
              "opportunities": ["opportunity1", "opportunity2"],
              "threats": ["threat1", "threat2"]
            },
            "marketPosition": "Description of market position",
            "differentiationStrategy": ["strategy1", "strategy2"]
          }`
        },
        {
          role: "user",
          content: `Product: ${productInput}\nIndustry: ${industry}\n\nProvide competitive intelligence including SWOT analysis, market positioning, and differentiation strategies.`
        }
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    throw new Error("Failed to generate competitive intelligence: " + (error as Error).message);
  }
}

export async function generateRiskAssessment(productInput: string, industry: string): Promise<{
  risks: Array<{
    type: string;
    description: string;
    probability: "low" | "medium" | "high";
    impact: "low" | "medium" | "high";
    mitigation: string;
  }>;
  overallRiskLevel: "low" | "medium" | "high";
}> {
  try {
    checkOpenAIAvailable();
    
    const response = await openai!.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a risk assessment expert. Analyze potential risks for the product idea.
          Return analysis in JSON format:
          {
            "risks": [
              {
                "type": "Technical/Market/Financial/Legal/etc",
                "description": "Risk description",
                "probability": "low" | "medium" | "high",
                "impact": "low" | "medium" | "high",
                "mitigation": "Mitigation strategy"
              }
            ],
            "overallRiskLevel": "low" | "medium" | "high"
          }`
        },
        {
          role: "user",
          content: `Product: ${productInput}\nIndustry: ${industry}\n\nProvide comprehensive risk assessment including technical, market, financial, and regulatory risks.`
        }
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    throw new Error("Failed to generate risk assessment: " + (error as Error).message);
  }
}
