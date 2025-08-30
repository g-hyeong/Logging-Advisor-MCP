import { 
  SetupAnalysisSessionInputSchema, 
  type SetupAnalysisSessionInput,
  type SetupAnalysisSessionOutput
} from './schema.js';

// Language detection function
function detectLanguage(code: string): string {
  if (code.includes('console.log') || code.includes('const ') || code.includes('=>') || code.includes('import ')) return 'javascript';
  if (code.includes('print(') || code.includes('def ') || code.includes('import ')) return 'python';
  if (code.includes('System.out.println') || code.includes('public class') || code.includes('package ')) return 'java';
  if (code.includes('fmt.Print') || code.includes('func ') || code.includes('package main')) return 'go';
  if (code.includes('std::cout') || code.includes('#include') || code.includes('namespace ')) return 'cpp';
  if (code.includes('puts ') || code.includes('def ') || code.includes('require ')) return 'ruby';
  if (code.includes('Console.WriteLine') || code.includes('using System') || code.includes('namespace ')) return 'csharp';
  return 'unknown';
}

// Generate session ID
function generateSessionId(): string {
  return `logging_session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

// Generate user-specific questions
function generateUserQuestions(code: string): string {
  const codeLines = code.split('\n').length;
  const hasConsoleLog = code.includes('console.log') || code.includes('print(');
  
  let questions = [];
  
  // Environment question
  questions.push("🎯 **What environment is this analysis for?**\n   - development: Focus on development convenience\n   - production: Strict operational standards (recommended)");
  
  // Analysis focus question 
  if (hasConsoleLog) {
    questions.push("🔍 **Any specific area you'd like to focus on?**\n   - all: Comprehensive logging quality (recommended)\n   - patterns: console.log → structured logging\n   - security: Sensitive data exposure risks\n   - errors: Error handling and context");
  } else {
    questions.push("🔍 **What perspective should we analyze from?**\n   - all: Comprehensive logging quality (recommended)\n   - security: Sensitive data exposure risks\n   - errors: Error handling completeness");
  }
  
  // Target score question
  questions.push("📊 **What's your target quality score?** (recommended value based on current state)\n   - 60-70: Basic improvements\n   - 80: Production environment recommendation (default)\n   - 90+: Strict enterprise standards");
  
  // Number of changes question
  if (codeLines > 50) {
    questions.push("⚡ **How many changes should we make at once?**\n   - 3-5: Safe incremental improvements (recommended)\n   - 10+: Large-scale refactoring");
  }
  
  return questions.join('\n\n');
}

// Execute analysis session setup function
export async function execute(input: SetupAnalysisSessionInput): Promise<string> {
  const detectedLanguage = input.language || detectLanguage(input.code);
  const sessionId = generateSessionId();
  const codePreview = input.code.length > 200 ? input.code.substring(0, 200) + '...' : input.code;
  
  // When only required info is available → ask user additional questions
  const hasOnlyCode = !input.language && 
                       input.environment === 'production' && 
                       input.serviceCriticality === 'high' &&
                       input.targetScore === 80 &&
                       input.maxChanges === 5 &&
                       input.focus === 'all';
  
  if (hasOnlyCode) {
    const questions = generateUserQuestions(input.code);
    return `
🚀 **Starting Logging Analysis Session**

**Code Information**
- Language: ${detectedLanguage} (auto-detected)
- Code length: ${input.code.split('\n').length} lines

\`\`\`${detectedLanguage}
${codePreview}
\`\`\`

---

**Additional Information for Custom Analysis** 

${questions}

---

💡 **To start immediately:** Run \`analyze_logging\` with default values
🎯 **Custom setup:** Answer the questions above and re-run \`setup_analysis_session\`

**Session ID**: ${sessionId}
`;
  }
  
  // When all settings are specified → proceed to next step guidance
  return `
🔍 **Logging Analysis Session Setup Complete**

**Session Information**
- Session ID: ${sessionId}
- Language: ${detectedLanguage} (${input.language ? 'specified' : 'auto-detected'})
- Environment: ${input.environment}
- Service Criticality: ${input.serviceCriticality}
- Target Score: ${input.targetScore} points
- Max Changes: ${input.maxChanges}
- Analysis Focus: ${input.focus}

**Analysis Workflow**
1. 📊 **analyze_logging** → Logging quality analysis (ready ✅)
2. 🔧 **suggest_improvements** → ROI-based improvement roadmap (after step 1)
3. ✅ **validate_production_readiness** → Production deployment safety validation (after step 2)

**Next Step**
Use the \`analyze_logging\` tool to start code analysis.

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