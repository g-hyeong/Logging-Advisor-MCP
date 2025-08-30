import {
  ValidateProductionReadinessInputSchema,
  type ValidateProductionReadinessInput
} from './schema.js';


// Generate production readiness checklist
function generateProductionChecklist(language: string, environment: string, serviceCriticality: string, knownIssues: string[] = []): string {
  const criticalBlockers = {
    javascript: ['console.log', 'console.error', 'process.env in logs'],
    python: ['print()', 'input()', 'sys.stdout'],
    java: ['System.out.println', 'printStackTrace'],
    go: ['fmt.Print', 'log.Print'],
    general: ['password', 'token', 'secret', 'apiKey']
  };
  
  const blockers = criticalBlockers[language as keyof typeof criticalBlockers] || criticalBlockers.general;
  const strictness = environment === 'production' ? 'STRICT' : 'MODERATE';
  const riskLevel = serviceCriticality === 'critical' ? 'ZERO TOLERANCE' : 
                   serviceCriticality === 'high' ? 'LOW TOLERANCE' : 'MODERATE TOLERANCE';
  
  return `
**${language.toUpperCase()} Production Readiness Validation**

**Environment**: ${environment} (${strictness} standards)
**Service Criticality**: ${serviceCriticality} (${riskLevel})

${knownIssues.length ? `**Known Issues to Verify:**
${knownIssues.map(issue => `- ${issue}`).join('\n')}
` : ''}

**CRITICAL BLOCKERS for ${language}:**
${blockers.map(blocker => `- ${blocker}`).join('\n')}

**5-Stage Validation Checklist:**

**1. Security Gate** ${serviceCriticality === 'critical' ? '(ZERO TOLERANCE)' : ''}
□ No hardcoded secrets or credentials
□ No sensitive user data in logs
□ No authentication tokens exposed
□ No PII (email, phone, SSN) in logs

**2. Performance Gate**
□ No synchronous I/O logging operations
□ Async logging implementation verified
□ No excessive logging in hot paths
□ Memory usage within acceptable limits

**3. Observability Gate**  
□ Error context preservation confirmed
□ Request tracing capability present
□ Business context included in logs
□ Searchable structured format used

**4. Operational Gate**
□ Compatible with monitoring systems
□ Alert-friendly log structure
□ Proper log levels implemented
□ Environment-specific configuration

**5. Compliance Gate** ${serviceCriticality === 'critical' ? '(MANDATORY)' : '(IF APPLICABLE)'}
□ Data privacy regulations met
□ Audit trail requirements satisfied
□ Retention policies compliant
□ Access controls implemented

**DECISION MATRIX:**

**GO** - Deploy immediately:
- All Critical issues resolved
- 90%+ of High issues resolved
- Performance impact minimal
- Security risks eliminated

**CONDITIONAL GO** - Deploy with monitoring:
- No Critical issues
- Some High issues remain but limited impact
- Enhanced monitoring required
- Rollback plan ready

**NO-GO** - Do not deploy:
- Any Critical blocker present
- High risk of service failure
- Security vulnerabilities detected
- Performance severely impacted

**Final Validation:**
Run this checklist against your actual code before deployment.
Any 'NO-GO' item requires immediate attention before production release.
`;
}

// Production readiness validation execution function
export async function execute(input: ValidateProductionReadinessInput): Promise<string> {
  return generateProductionChecklist(
    input.language,
    input.environment, 
    input.serviceCriticality,
    input.knownIssues
  );
}

// MCP handler
export async function handleRequest(args: any): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  try {
    const parsedArgs = ValidateProductionReadinessInputSchema.parse(args);
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