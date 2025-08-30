import { 
  SetupAnalysisSessionInputSchema, 
  type SetupAnalysisSessionInput,
  type SetupAnalysisSessionOutput
} from './schema.js';

// Generate session ID
function generateSessionId(): string {
  return `logging_session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

// Generate language-specific workflow guidance
function generateWorkflowGuidance(language?: string, environment: string = 'production', focus: string = 'all'): string {
  const languageName = language || 'general';
  
  const languageSpecific = {
    javascript: "JavaScript/Node.js logging patterns (console.log → winston/pino)",
    typescript: "TypeScript logging with type safety",
    python: "Python logging module best practices",
    java: "Java logging frameworks (slf4j, logback)",
    go: "Go structured logging patterns",
    cpp: "C++ logging libraries and practices",
    csharp: "C# logging with ILogger interface",
    ruby: "Ruby logging gems and patterns"
  };
  
  const environmentNote = environment === 'production' 
    ? "Production-grade logging standards"
    : "Development-friendly logging approaches";
    
  const focusNote = {
    all: "Comprehensive logging analysis",
    patterns: "Focus on logging patterns and structure",
    security: "Emphasis on security and sensitive data handling", 
    errors: "Error handling and observability",
    performance: "Performance impact of logging"
  };
  
  return `
**${languageName.toUpperCase()} Logging Analysis Workflow**

**Environment**: ${environmentNote}
**Focus**: ${focusNote[focus as keyof typeof focusNote]}
${language ? `**Language Guide**: ${languageSpecific[language as keyof typeof languageSpecific]}` : '**General Guidelines**: Cross-language logging best practices'}

**Analysis Steps:**
1. **analyze_logging** - Get ${languageName} logging quality guidelines
2. **suggest_improvements** - Receive ${languageName}-specific improvement patterns  
3. **validate_production_readiness** - Production deployment checklist
`;
}

// Execute analysis session setup function
export async function execute(input: SetupAnalysisSessionInput): Promise<string> {
  const sessionId = generateSessionId();
  const workflowGuidance = generateWorkflowGuidance(input.language, input.environment, input.focus);
  
  return `
**Logging Analysis Session Setup Complete**

**Session ID**: ${sessionId}
**Language**: ${input.language || 'General'}
**Environment**: ${input.environment}
**Service Criticality**: ${input.serviceCriticality}
**Analysis Focus**: ${input.focus}

${workflowGuidance}

**Next Step**
Use the \`analyze_logging\` tool with your selected language to get specific guidelines.

---
*To change settings: Re-run this tool with different parameters*
`;
}

// MCP 핸들러
export async function handleRequest(args: any): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  try {
    const parsedArgs = SetupAnalysisSessionInputSchema.parse(args);
    const result = await execute(parsedArgs);
    
    return {
      content: [{
        type: 'text',
        text: result
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }],
      isError: true
    };
  }
}