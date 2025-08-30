import { mcpInputSchema } from './schema.js';
import { handleRequest } from './handler.js';

// Tool definition
export const suggestImprovementsTool = {
  name: 'suggest_improvements',
  
  description: `Generate logging improvement roadmap and specific modification suggestions

**When used**: 
Automatically executed after analyze_logging completion or when direct improvement suggestions are needed

**What it provides**:
- Immediately applicable Quick Wins (1-2 hours)
- Phased migration plan (prevents Big Bang approach)
- Line-by-line precise modification code
- ROI-based prioritization (cost vs. benefit)
- Implementation difficulty and estimated time required
- Required library/configuration guidance

**Improvement patterns**:
- console.log → structured logger (winston, pino)
- Error ignoring → complete context preservation
- Synchronous logging → asynchronous performance optimization
- Sensitive data exposure → complete removal/masking
- Untraceable → correlation ID addition

**Operational safety**: Preserve existing logic, incremental application, rollback plan`,

  inputSchema: mcpInputSchema,
  handleRequest
};

// Convenience exports
export { handleRequest as handler };
export * from './schema.js';