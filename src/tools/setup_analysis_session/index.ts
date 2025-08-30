import { mcpInputSchema } from './schema.js';
import { handleRequest } from './handler.js';

// Tool definition
export const setupAnalysisSessionTool = {
  name: 'setup_analysis_session',
  
  description: `Start code logging quality inspection and improvement

**Use for requests like**:
"Check if logs are okay", "Improve logging", "Any issues with log code?", "Check logging before production deployment", "Too many console.log statements", "Is error logging working properly?", "Optimize logs"

**Automatically handles**:
- Auto-detect logging patterns in code
- Provide language-specific optimization suggestions (JavaScript, Python, Java, Go, etc.)
- Validate production environment safety
- Observability improvement guidance

**3-step automated workflow**:
1 Logging quality analysis → 2 Improvement roadmap generation → 3 Deployment safety validation

**Settings (optional)**: environment, serviceCriticality, targetScore, maxChanges, focus
**Defaults**: production environment, high criticality, 80-point target, 5 changes max, comprehensive analysis`,

  inputSchema: mcpInputSchema,
  handleRequest
};

// Convenience exports
export { handleRequest as handler };
export * from './schema.js';