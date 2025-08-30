import { mcpInputSchema } from './schema.js';
import { handleRequest } from './handler.js';

// Tool definition
export const analyzeLoggingTool = {
  name: 'analyze_logging',
  
  description: `Logging code quality analysis and issue diagnosis

**When used**: 
Automatically executed after setup_analysis_session or when direct logging analysis is needed

**Analysis items**:
- Detect console.log/print overuse patterns
- Sensitive information exposure risks (password, token, email, etc.)
- Missing error handling and context loss
- Performance blocking logging (synchronous I/O)
- Lack of observability (correlation ID, tracing)
- DEBUG logging inappropriate for production

**Output**: 
Provides professional logging analysis guidelines to LLMs for accurate quality assessment

**Supported languages**: JavaScript, TypeScript, Python, Java, Go, C++, C#, Ruby
**Environment**: differentiated analysis for development, production`,

  inputSchema: mcpInputSchema,
  handleRequest
};

// Convenience exports
export { handleRequest as handler };
export * from './schema.js';