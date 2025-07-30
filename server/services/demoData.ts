import type { 
  MarketResearchResult, 
  ProblemSolution, 
  TechStackRecommendation, 
  PRDSection, 
  WireframeScreen,
  AnalysisResult 
} from "@shared/schema";

// Demo data for when OpenAI API is not available
export function generateDemoMarketResearch(productInput: string, industry: string): MarketResearchResult {
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

export function generateDemoProblemAnalysis(productInput: string): ProblemSolution[] {
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

export function generateDemoTechStack(productInput: string, industry: string): TechStackRecommendation[] {
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

export function generateDemoPRD(productInput: string, industry: string, marketResearch: MarketResearchResult): PRDSection[] {
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
      content: "• Real-time space discovery with live availability\n• Transparent pricing with no hidden fees\n• Instant booking and payment processing\n• User reviews and photo verification\n• Location-based search with map integration\n• User profile and booking history"
    },
    {
      title: "Phase 2 Features",
      content: "• Team booking for multiple users\n• Recurring booking options\n• Integration with calendar apps\n• Loyalty program and rewards\n• Advanced filtering (amenities, capacity, etc.)\n• Host dashboard for space owners"
    },
    {
      title: "Success Metrics",
      content: "• User acquisition: 10,000 monthly active users within 6 months\n• Booking conversion rate: >15% from search to booking\n• User retention: >40% monthly retention rate\n• Revenue: $100K ARR within first year\n• Customer satisfaction: >4.2/5 average rating"
    },
    {
      title: "Technical Requirements",
      content: "• Mobile-responsive web app and native mobile apps\n• Sub-3 second page load times\n• 99.9% uptime for booking system\n• Real-time data synchronization\n• Secure payment processing (PCI compliance)\n• Scalable architecture for 100K+ users"
    }
  ];
}

export function generateDemoWireframeGuidance(productInput: string, industry: string) {
  return {
    screens: [
      {
        name: "Onboarding & Sign Up",
        description: "Simple 3-step onboarding with location permission and profile setup",
        priority: "critical" as const
      },
      {
        name: "Home/Discovery Screen",
        description: "Map view with nearby spaces, search bar, and filter options",
        priority: "critical" as const
      },
      {
        name: "Space Details",
        description: "Detailed space information, photos, amenities, pricing, and booking button",
        priority: "critical" as const
      },
      {
        name: "Booking Flow",
        description: "Date/time selection, payment processing, and confirmation",
        priority: "critical" as const
      },
      {
        name: "User Profile",
        description: "Account settings, booking history, and preferences",
        priority: "high" as const
      },
      {
        name: "Reviews & Ratings",
        description: "Post-visit review submission with photos and ratings",
        priority: "high" as const
      },
      {
        name: "Notifications",
        description: "Booking reminders, availability alerts, and promotional messages",
        priority: "medium" as const
      }
    ] as WireframeScreen[],
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

export function generateDemoSentiment(text: string) {
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

export function generateDemoCompetitiveIntelligence(productInput: string, industry: string) {
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

export function generateDemoRiskAssessment(productInput: string, industry: string) {
  return {
    risks: [
      {
        type: "Technical",
        description: "Real-time data synchronization complexity may lead to booking conflicts or system outages",
        probability: "medium" as const,
        impact: "high" as const,
        mitigation: "Implement redundant systems, extensive testing, and fallback booking processes"
      },
      {
        type: "Market",
        description: "Established competitors may respond aggressively with price cuts or feature matching",
        probability: "high" as const,
        impact: "medium" as const,
        mitigation: "Focus on unique value propositions and build strong customer loyalty through superior service"
      },
      {
        type: "Financial",
        description: "High customer acquisition costs in competitive market may strain runway",
        probability: "medium" as const,
        impact: "high" as const,
        mitigation: "Optimize marketing channels, focus on organic growth, and consider partnership strategies"
      },
      {
        type: "Operational",
        description: "Dependency on space partner cooperation for data integration and quality standards",
        probability: "medium" as const,
        impact: "medium" as const,
        mitigation: "Develop strong partner relationships, create mutual value propositions, and maintain backup inventory"
      }
    ],
    overallRiskLevel: "medium" as const
  };
}

export function generateDemoAnalysisResult(productInput: string, industry: string): AnalysisResult {
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