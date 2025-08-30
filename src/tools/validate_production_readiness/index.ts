import { mcpInputSchema } from './schema.js';
import { handleRequest } from './handler.js';

// Tool definition
export const validateProductionReadinessTool = {
  name: 'validate_production_readiness',
  
  description: `Final logging safety validation before production deployment

**When used**:
Automatically executed after suggest_improvements completion or when final pre-deployment inspection is needed

**Strict GO/NO-GO determination**:
- Immediate NO-GO if even one Critical issue exists
- Comprehensive evaluation of security, performance, operational stability
- Focus on actual service failure possibilities

**5-stage safety validation**:
1  Security Gate: Complete sensitive data blocking (password, token, PII)
2 Performance Gate: Prevent service performance blocking
3 Observability Gate: Ensure incident response capability
4 Operational Gate: Monitoring system integration
5 Compliance Gate: Regulatory compliance (GDPR, audit)

**Deployment decision**:
- GO: Safe to deploy
- CONDITIONAL GO: Deploy with caution due to limited risks
- NO-GO: Deployment prohibited, fixes required

**Critical Blockers**: console.log, sensitive data exposure, synchronous I/O logging, error ignoring`,

  inputSchema: mcpInputSchema,
  handleRequest
};

// Convenience exports
export { handleRequest as handler };
export * from './schema.js';