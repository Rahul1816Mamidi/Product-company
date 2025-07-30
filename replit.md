# AI Product Manager - System Architecture

## Overview

This is a comprehensive full-stack AI-powered product management application built with React, Express, and PostgreSQL. The application transforms product ideas into detailed business intelligence through advanced AI analysis including market research, sentiment analysis, competitive intelligence, risk assessment, tech stack recommendations, PRD generation, and wireframe guidance.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (Updated: July 30, 2025)
- ✅ Implemented comprehensive AI integration with GPT-4o
- ✅ Added advanced analysis features: sentiment analysis, competitive intelligence, SWOT analysis, risk assessment
- ✅ Enhanced market research with web search integration (simulated)
- ✅ Created AI Dashboard with real-time insights and scoring
- ✅ Built robust fallback system with demo data for missing API keys
- ✅ Integrated 8 specialized result components for different analysis types
- ✅ Enhanced progress tracking with detailed analysis steps

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming and AI-specific colors
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design with comprehensive analysis endpoints
- **Middleware**: Custom logging, JSON parsing, error handling
- **Development**: Hot reloading with Vite integration in development mode

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Management**: Drizzle Kit for migrations
- **Data Storage**: In-memory storage implementation with interface for easy database swapping

## Advanced AI Integration

### Core AI Services
- **Provider**: OpenAI GPT-4o for all AI analysis with graceful fallback to demo data
- **Market Research**: Enhanced with web search integration and trend analysis
- **Sentiment Analysis**: Product idea sentiment scoring with confidence metrics
- **Competitive Intelligence**: SWOT analysis and market positioning strategies
- **Risk Assessment**: Comprehensive risk analysis with probability/impact matrix
- **Tech Stack Recommendations**: Context-aware technology recommendations
- **PRD Generation**: Detailed product requirements with success metrics
- **Wireframe Guidance**: UX/UI recommendations with priority screens

### AI Analysis Components
1. **AI Dashboard**: Real-time overview with scoring and completeness indicators
2. **Sentiment Analysis**: Emotion and confidence scoring with insights
3. **Market Research Results**: Market size, growth rate, competitor analysis
4. **Problem Analysis**: Structured problem identification with solutions
5. **Competitive Intelligence**: SWOT analysis and differentiation strategies
6. **Risk Assessment**: Risk matrix with mitigation strategies
7. **Tech Stack Recommendations**: Categorized technology suggestions
8. **PRD Document**: Comprehensive product requirements
9. **Wireframe Guidance**: Screen priorities and design considerations

### Web Search Integration
- **Market Trends**: Simulated web search for current market trends
- **Competitive Analysis**: Enhanced competitor research with web data
- **Industry Insights**: Market research augmentation with search results
- **Fallback System**: Robust demo data when external services unavailable

## Key Features

### Comprehensive Analysis Pipeline
1. **Input Phase**: Detailed product form with industry and preferences
2. **AI Processing**: 7-step analysis with real-time progress updates
3. **Intelligence Dashboard**: Overview scoring and analysis completeness
4. **Detailed Results**: 8 specialized result components with export capabilities
5. **Session Management**: Persistent analysis sessions with history

### Data Models
- **Users**: Basic user management with username/password
- **Sessions**: Product analysis sessions with comprehensive analysis options
- **Analysis Results**: Extended JSON schema for all AI analysis types including sentiment, competitive intelligence, and risk assessment

## User Experience

### Dashboard Features
- **AI Status Indicator**: Real-time AI service availability
- **Overall Scoring**: Intelligent scoring based on multiple analysis factors
- **Progress Tracking**: 7-step analysis with detailed progress messages
- **Export Capabilities**: Individual component export in JSON/Markdown formats
- **Session History**: Chronological listing with status indicators

### Analysis Completeness
- **Sentiment Analysis**: Product idea emotional analysis with confidence scoring
- **Market Intelligence**: Size, growth, competitors, and trends
- **Strategic Analysis**: SWOT, positioning, and differentiation strategies
- **Risk Management**: Comprehensive risk assessment with mitigation plans
- **Technical Guidance**: Stack recommendations and architecture advice
- **Product Requirements**: Detailed PRD with success metrics
- **Design Guidance**: Wireframe priorities and UX considerations

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for comprehensive analysis
- **Fallback System**: Intelligent demo data generation for development
- **Web Search**: Simulated market research enhancement

### Development Tools
- **Replit Integration**: Cartographer plugin and runtime error modal
- **Build Pipeline**: ESBuild for server bundling, Vite for client bundling
- **Type Safety**: Comprehensive TypeScript coverage with Drizzle schemas

### UI Libraries
- **Radix UI**: Accessible primitive components
- **Lucide React**: Comprehensive icon library
- **Tailwind CSS**: Utility-first styling with custom AI theme colors

## Deployment Strategy

### Environment Configuration
- **Development**: Full-featured with demo data fallback
- **Production**: OpenAI integration with robust error handling
- **API Key Management**: Graceful handling of missing or invalid keys

### Data Integrity
- **Authentic Analysis**: Real AI analysis when API keys are available
- **Demo Fallback**: Comprehensive demo data that maintains feature functionality
- **Error Handling**: Graceful degradation with user-friendly messaging

The architecture provides a complete AI-powered product management platform with advanced analysis capabilities, intelligent fallbacks, and comprehensive user experience features.