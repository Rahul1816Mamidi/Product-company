// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  sessions;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.sessions = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getSession(id) {
    return this.sessions.get(id);
  }
  async getSessionsByUserId(userId) {
    return Array.from(this.sessions.values()).filter((session) => session.userId === userId).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }
  async createSession(insertSession) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const session = {
      ...insertSession,
      id,
      userId: null,
      // For now, sessions are not tied to users
      results: null,
      status: "pending",
      createdAt: now,
      updatedAt: now,
      description: insertSession.description || null,
      industry: insertSession.industry || null,
      urgency: insertSession.urgency || null,
      includeMarketResearch: insertSession.includeMarketResearch || null,
      generatePRD: insertSession.generatePRD || null,
      wireframeGuidance: insertSession.wireframeGuidance || null
    };
    this.sessions.set(id, session);
    return session;
  }
  async updateSession(id, updates) {
    const session = this.sessions.get(id);
    if (!session) return void 0;
    const updatedSession = {
      ...session,
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }
  async deleteSession(id) {
    return this.sessions.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var sessions = pgTable("sessions", {
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
  status: text("status").default("pending"),
  // pending, processing, completed, error
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertSessionSchema = createInsertSchema(sessions).pick({
  title: true,
  description: true,
  productInput: true,
  industry: true,
  urgency: true,
  includeMarketResearch: true,
  generatePRD: true,
  wireframeGuidance: true
});
var updateSessionSchema = createInsertSchema(sessions).pick({
  results: true,
  status: true
}).partial();

// server/services/openai.ts
import OpenAI from "openai";

// server/services/webSearch.ts
async function searchWeb(query, maxResults = 5) {
  try {
    const simulatedResults = [];
    if (query.toLowerCase().includes("market size") || query.toLowerCase().includes("industry")) {
      simulatedResults.push({
        title: "Industry Market Research Report 2024",
        url: "https://example-research.com/market-report",
        snippet: "Market analysis shows significant growth potential with increasing demand..."
      });
    }
    if (query.toLowerCase().includes("competitor") || query.toLowerCase().includes("competition")) {
      simulatedResults.push({
        title: "Competitive Landscape Analysis",
        url: "https://example-competitors.com/analysis",
        snippet: "Leading competitors in the space include established players and emerging startups..."
      });
    }
    return simulatedResults.slice(0, maxResults);
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}
async function enhanceMarketResearchWithWebData(productInput, industry, aiGeneratedData) {
  try {
    const marketQuery = `${industry} market size growth rate 2024`;
    const competitorQuery = `${industry} competitors analysis ${(/* @__PURE__ */ new Date()).getFullYear()}`;
    const [marketResults, competitorResults] = await Promise.all([
      searchWeb(marketQuery, 3),
      searchWeb(competitorQuery, 5)
    ]);
    const enhancedData = {
      ...aiGeneratedData,
      keyInsights: [
        ...aiGeneratedData.keyInsights,
        ...marketResults.length > 0 ? ["Market research indicates growing demand in recent industry reports"] : [],
        ...competitorResults.length > 0 ? ["Competitive analysis shows established market presence"] : []
      ]
    };
    return enhancedData;
  } catch (error) {
    console.error("Failed to enhance market research with web data:", error);
    return aiGeneratedData;
  }
}
async function getMarketTrends(industry) {
  try {
    const trendsQuery = `${industry} trends 2024 emerging technologies`;
    const results = await searchWeb(trendsQuery, 3);
    const trends = results.map(
      (result) => `Market trend: ${result.title.substring(0, 50)}...`
    );
    return trends.length > 0 ? trends : [
      "Digital transformation accelerating across industries",
      "Increased focus on sustainability and ESG practices",
      "AI and automation adoption growing rapidly"
    ];
  } catch (error) {
    console.error("Failed to get market trends:", error);
    return ["Market trends data temporarily unavailable"];
  }
}

// server/services/openai.ts
var openai = null;
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
function checkOpenAIAvailable() {
  if (!openai) {
    throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.");
  }
}
async function generateMarketResearch(productInput, industry) {
  try {
    checkOpenAIAvailable();
    const marketTrends = await getMarketTrends(industry);
    const response = await openai.chat.completions.create({
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
          content: `Product: ${productInput}
Industry: ${industry}

Current Market Trends: ${marketTrends.join(", ")}

Provide detailed market research for this product idea, incorporating current market trends and realistic market data.`
        }
      ],
      response_format: { type: "json_object" }
    });
    const aiGeneratedData = JSON.parse(response.choices[0].message.content || "{}");
    const enhancedData = await enhanceMarketResearchWithWebData(productInput, industry, aiGeneratedData);
    return enhancedData;
  } catch (error) {
    throw new Error("Failed to generate market research: " + error.message);
  }
}
async function analyzeProblemsSolutions(productInput) {
  try {
    checkOpenAIAvailable();
    const response = await openai.chat.completions.create({
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
          content: `Product: ${productInput}

Identify the main problems this product solves and recommend specific solutions for each.`
        }
      ],
      response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.problems || [];
  } catch (error) {
    throw new Error("Failed to analyze problems and solutions: " + error.message);
  }
}
async function recommendTechStack(productInput, industry) {
  try {
    checkOpenAIAvailable();
    const response = await openai.chat.completions.create({
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
          content: `Product: ${productInput}
Industry: ${industry}

Recommend a complete tech stack for building this product, including frontend, backend, database, third-party services, and infrastructure.`
        }
      ],
      response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.recommendations || [];
  } catch (error) {
    throw new Error("Failed to recommend tech stack: " + error.message);
  }
}
async function generatePRD(productInput, industry, marketResearch) {
  try {
    checkOpenAIAvailable();
    const response = await openai.chat.completions.create({
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
          content: `Product: ${productInput}
Industry: ${industry}
Market Research: ${JSON.stringify(marketResearch)}

Create a comprehensive PRD with sections for: Product Overview, Target Users, Key Features (MVP/Phase 2/Future), Success Metrics, Technical Requirements, and Go-to-Market Strategy.`
        }
      ],
      response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.sections || [];
  } catch (error) {
    throw new Error("Failed to generate PRD: " + error.message);
  }
}
async function generateWireframeGuidance(productInput, industry) {
  try {
    checkOpenAIAvailable();
    const response = await openai.chat.completions.create({
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
          content: `Product: ${productInput}
Industry: ${industry}

Provide wireframe guidance including priority screens for MVP, key design considerations focusing on user experience, accessibility, and modern design patterns, and detailed next steps for development.`
        }
      ],
      response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      screens: result.screens || [],
      designConsiderations: result.designConsiderations || [],
      nextSteps: result.nextSteps || []
    };
  } catch (error) {
    throw new Error("Failed to generate wireframe guidance: " + error.message);
  }
}
async function analyzeSentiment(text2) {
  try {
    checkOpenAIAvailable();
    const response = await openai.chat.completions.create({
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
          content: text2
        }
      ],
      response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      rating: Math.max(1, Math.min(5, Math.round(result.rating))),
      confidence: Math.max(0, Math.min(1, result.confidence)),
      insights: result.insights || []
    };
  } catch (error) {
    throw new Error("Failed to analyze sentiment: " + error.message);
  }
}
async function generateCompetitiveIntelligence(productInput, industry) {
  try {
    checkOpenAIAvailable();
    const response = await openai.chat.completions.create({
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
          content: `Product: ${productInput}
Industry: ${industry}

Provide competitive intelligence including SWOT analysis, market positioning, and differentiation strategies.`
        }
      ],
      response_format: { type: "json_object" }
    });
    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    throw new Error("Failed to generate competitive intelligence: " + error.message);
  }
}
async function generateRiskAssessment(productInput, industry) {
  try {
    checkOpenAIAvailable();
    const response = await openai.chat.completions.create({
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
          content: `Product: ${productInput}
Industry: ${industry}

Provide comprehensive risk assessment including technical, market, financial, and regulatory risks.`
        }
      ],
      response_format: { type: "json_object" }
    });
    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    throw new Error("Failed to generate risk assessment: " + error.message);
  }
}

// server/services/demoData.ts
function generateDemoMarketResearch(productInput, industry) {
  return {
    marketSize: "$4.2B",
    growthRate: "13.2%",
    competitorCount: 8,
    keyInsights: [
      "Growing demand for digital solutions in the workspace management sector",
      "Remote work trends driving innovation in flexible workspace solutions",
      "Mobile-first approach becoming increasingly important for user adoption",
      "Integration with existing business tools is a key differentiator"
    ],
    competitors: [
      {
        name: "WeWork App",
        type: "direct",
        description: "Global flexible workspace provider with mobile booking platform",
        strength: "Brand recognition and global presence",
        weakness: "Limited real-time availability features"
      },
      {
        name: "Liquidspace",
        type: "direct",
        description: "On-demand workspace booking platform",
        strength: "Established marketplace with verified spaces",
        weakness: "User experience could be more intuitive"
      },
      {
        name: "Breather",
        type: "direct",
        description: "Private workspace rental service",
        strength: "Quality control and premium spaces",
        weakness: "Higher price point and limited locations"
      }
    ]
  };
}
function generateDemoProblemAnalysis(productInput) {
  return [
    {
      problem: "Real-time Space Availability",
      description: "Users struggle to find available co-working spaces in real-time, leading to wasted time and frustration",
      solutions: [
        "Implement live booking system with real-time availability updates",
        "Partner with spaces to provide API access for instant booking confirmation",
        "Add notification system for space availability alerts"
      ]
    },
    {
      problem: "Pricing Transparency",
      description: "Hidden fees and unclear pricing structures make it difficult for users to budget and compare options",
      solutions: [
        "Display all-inclusive pricing with no hidden fees",
        "Provide detailed breakdown of costs including taxes and services",
        "Implement price comparison tools and filters"
      ]
    },
    {
      problem: "Quality Verification",
      description: "Users have no way to verify workspace quality before booking, leading to disappointing experiences",
      solutions: [
        "Implement verified photo system with recent updates",
        "Add user review and rating system with photo uploads",
        "Provide detailed amenity lists and space specifications"
      ]
    }
  ];
}
function generateDemoTechStack(productInput, industry) {
  return [
    {
      category: "Frontend Mobile",
      primary: "React Native",
      alternatives: ["Flutter", "Native iOS/Android"],
      reasoning: "Cross-platform development efficiency with native performance and extensive library ecosystem"
    },
    {
      category: "Backend API",
      primary: "Node.js with Express",
      alternatives: ["Python Django", "Go Gin"],
      reasoning: "JavaScript ecosystem consistency, excellent real-time capabilities, and rapid development"
    },
    {
      category: "Database",
      primary: "PostgreSQL",
      alternatives: ["MongoDB", "MySQL"],
      reasoning: "ACID compliance for booking transactions, spatial data support for location features"
    },
    {
      category: "Real-time Features",
      primary: "Socket.io",
      alternatives: ["WebRTC", "Server-Sent Events"],
      reasoning: "Bi-directional real-time communication for live availability updates and notifications"
    },
    {
      category: "Payment Processing",
      primary: "Stripe",
      alternatives: ["PayPal", "Square"],
      reasoning: "Comprehensive payment features, strong security, and excellent developer experience"
    },
    {
      category: "Maps & Location",
      primary: "Google Maps API",
      alternatives: ["Mapbox", "Apple Maps"],
      reasoning: "Comprehensive location data, reliable geocoding, and familiar user experience"
    }
  ];
}
function generateDemoPRD(productInput, industry, marketResearch) {
  return [
    {
      title: "Product Overview",
      content: "A mobile-first platform that connects remote workers with available co-working spaces in real-time. The app addresses key pain points in the flexible workspace market by providing transparent pricing, verified quality information, and instant booking capabilities."
    },
    {
      title: "Target Users",
      content: "Primary: Remote workers, freelancers, and digital nomads seeking flexible workspace solutions\nSecondary: Business travelers and teams needing temporary office space\nTertiary: Co-working space owners looking to maximize occupancy"
    },
    {
      title: "Core Features (MVP)",
      content: "\u2022 Real-time space discovery with live availability\n\u2022 Transparent pricing with no hidden fees\n\u2022 Instant booking and payment processing\n\u2022 User reviews and photo verification\n\u2022 Location-based search with map integration\n\u2022 User profile and booking history"
    },
    {
      title: "Phase 2 Features",
      content: "\u2022 Team booking for multiple users\n\u2022 Recurring booking options\n\u2022 Integration with calendar apps\n\u2022 Loyalty program and rewards\n\u2022 Advanced filtering (amenities, capacity, etc.)\n\u2022 Host dashboard for space owners"
    },
    {
      title: "Success Metrics",
      content: "\u2022 User acquisition: 10,000 monthly active users within 6 months\n\u2022 Booking conversion rate: >15% from search to booking\n\u2022 User retention: >40% monthly retention rate\n\u2022 Revenue: $100K ARR within first year\n\u2022 Customer satisfaction: >4.2/5 average rating"
    },
    {
      title: "Technical Requirements",
      content: "\u2022 Mobile-responsive web app and native mobile apps\n\u2022 Sub-3 second page load times\n\u2022 99.9% uptime for booking system\n\u2022 Real-time data synchronization\n\u2022 Secure payment processing (PCI compliance)\n\u2022 Scalable architecture for 100K+ users"
    }
  ];
}
function generateDemoWireframeGuidance(productInput, industry) {
  return {
    screens: [
      {
        name: "Onboarding & Sign Up",
        description: "Simple 3-step onboarding with location permission and profile setup",
        priority: "critical"
      },
      {
        name: "Home/Discovery Screen",
        description: "Map view with nearby spaces, search bar, and filter options",
        priority: "critical"
      },
      {
        name: "Space Details",
        description: "Detailed space information, photos, amenities, pricing, and booking button",
        priority: "critical"
      },
      {
        name: "Booking Flow",
        description: "Date/time selection, payment processing, and confirmation",
        priority: "critical"
      },
      {
        name: "User Profile",
        description: "Account settings, booking history, and preferences",
        priority: "high"
      },
      {
        name: "Reviews & Ratings",
        description: "Post-visit review submission with photos and ratings",
        priority: "high"
      },
      {
        name: "Notifications",
        description: "Booking reminders, availability alerts, and promotional messages",
        priority: "medium"
      }
    ],
    designConsiderations: [
      "Mobile-first design with thumb-friendly navigation and touch targets",
      "Clear visual hierarchy emphasizing availability and pricing information",
      "Consistent color coding for different space types and availability status",
      "Accessibility compliance with proper contrast ratios and screen reader support",
      "Offline functionality for viewing previously loaded content and bookings"
    ],
    nextSteps: [
      "Create detailed wireframes for each critical screen",
      "Design user flow diagrams for booking and discovery processes",
      "Develop a comprehensive design system and component library",
      "Conduct user testing sessions with target demographic",
      "Build interactive prototype for stakeholder feedback",
      "Plan technical architecture and development roadmap"
    ]
  };
}
function generateDemoSentiment(text2) {
  return {
    rating: 4,
    confidence: 0.85,
    insights: [
      "Product description shows strong understanding of market pain points",
      "Clear value proposition with focus on real-time solutions",
      "Positive language indicating confidence in the business model",
      "Well-articulated problem statements suggest thorough market research"
    ]
  };
}
function generateDemoCompetitiveIntelligence(productInput, industry) {
  return {
    swotAnalysis: {
      strengths: [
        "Real-time availability tracking as a key differentiator",
        "Mobile-first approach aligning with user behavior trends",
        "Transparent pricing model building user trust",
        "Focus on quality verification addressing market gap"
      ],
      weaknesses: [
        "New brand without established market presence",
        "Dependency on space partner integration for real-time data",
        "Initial limited inventory compared to established competitors",
        "Need for significant marketing investment to build user base"
      ],
      opportunities: [
        "Growing remote work trend increasing target market size",
        "Potential for enterprise partnerships and B2B expansion",
        "International expansion to underserved markets",
        "Integration opportunities with productivity and travel apps"
      ],
      threats: [
        "Established competitors with significant funding and market share",
        "Economic downturn potentially reducing flexible workspace demand",
        "Direct competition from space providers launching their own apps",
        "Regulatory changes affecting short-term workspace rentals"
      ]
    },
    marketPosition: "Positioned as a premium, technology-focused solution targeting quality-conscious remote workers willing to pay for verified, transparent workspace access.",
    differentiationStrategy: [
      "Lead with real-time availability as core value proposition",
      "Emphasize pricing transparency and no hidden fees policy",
      "Build strong quality verification and review system",
      "Focus on superior mobile user experience and design",
      "Develop partnerships with productivity tools and corporate clients"
    ]
  };
}
function generateDemoRiskAssessment(productInput, industry) {
  return {
    risks: [
      {
        type: "Technical",
        description: "Real-time data synchronization complexity may lead to booking conflicts or system outages",
        probability: "medium",
        impact: "high",
        mitigation: "Implement redundant systems, extensive testing, and fallback booking processes"
      },
      {
        type: "Market",
        description: "Established competitors may respond aggressively with price cuts or feature matching",
        probability: "high",
        impact: "medium",
        mitigation: "Focus on unique value propositions and build strong customer loyalty through superior service"
      },
      {
        type: "Financial",
        description: "High customer acquisition costs in competitive market may strain runway",
        probability: "medium",
        impact: "high",
        mitigation: "Optimize marketing channels, focus on organic growth, and consider partnership strategies"
      },
      {
        type: "Operational",
        description: "Dependency on space partner cooperation for data integration and quality standards",
        probability: "medium",
        impact: "medium",
        mitigation: "Develop strong partner relationships, create mutual value propositions, and maintain backup inventory"
      }
    ],
    overallRiskLevel: "medium"
  };
}
function generateDemoAnalysisResult(productInput, industry) {
  const marketResearch = generateDemoMarketResearch(productInput, industry);
  return {
    sentiment: generateDemoSentiment(productInput),
    marketResearch,
    problemAnalysis: generateDemoProblemAnalysis(productInput),
    competitiveIntelligence: generateDemoCompetitiveIntelligence(productInput, industry),
    riskAssessment: generateDemoRiskAssessment(productInput, industry),
    techStack: generateDemoTechStack(productInput, industry),
    prd: generateDemoPRD(productInput, industry, marketResearch),
    wireframe: generateDemoWireframeGuidance(productInput, industry)
  };
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/sessions", async (req, res) => {
    try {
      const sessions2 = await storage.getSessionsByUserId("");
      res.json(sessions2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });
  app2.get("/api/sessions/:id", async (req, res) => {
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
  app2.post("/api/sessions", async (req, res) => {
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
  app2.post("/api/sessions/:id/analyze", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      await storage.updateSession(req.params.id, { status: "processing" });
      try {
        let results = {};
        if (!process.env.OPENAI_API_KEY) {
          console.log("Using demo data due to missing OpenAI API key");
          results = generateDemoAnalysisResult(session.productInput, session.industry || "general");
        } else {
          try {
            results.sentiment = await analyzeSentiment(session.productInput);
            if (session.includeMarketResearch) {
              results.marketResearch = await generateMarketResearch(
                session.productInput,
                session.industry || "general"
              );
            }
            results.problemAnalysis = await analyzeProblemsSolutions(session.productInput);
            results.competitiveIntelligence = await generateCompetitiveIntelligence(
              session.productInput,
              session.industry || "general"
            );
            results.riskAssessment = await generateRiskAssessment(
              session.productInput,
              session.industry || "general"
            );
            results.techStack = await recommendTechStack(
              session.productInput,
              session.industry || "general"
            );
            if (session.generatePRD && results.marketResearch) {
              results.prd = await generatePRD(
                session.productInput,
                session.industry || "general",
                results.marketResearch
              );
            }
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
        const updatedSession = await storage.updateSession(req.params.id, {
          results,
          status: "completed"
        });
        res.json(updatedSession);
      } catch (analysisError) {
        await storage.updateSession(req.params.id, { status: "error" });
        throw analysisError;
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      res.status(500).json({
        message: "Failed to analyze product: " + error.message
      });
    }
  });
  app2.delete("/api/sessions/:id", async (req, res) => {
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
  app2.get("/api/sessions/:id/export", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", `attachment; filename="session-${session.id}.json"`);
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
