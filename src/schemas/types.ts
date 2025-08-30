import { z } from 'zod';

// Simple and flat schema structure
// Minimized for easy LLM understanding and completion

export const AnalyzeLoggingInputSchema = z.object({
  language: z.string().describe('Programming language'),
  focus: z.enum(['all', 'patterns', 'security', 'errors', 'performance']).default('all')
    .describe('Analysis focus: all(comprehensive), patterns(logging patterns), security(security), errors(error handling), performance(performance impact)'),
  environment: z.enum(['development', 'production']).default('production')
    .describe('Target environment - log level evaluation criteria')
});

export const AnalyzeLoggingOutputSchema = z.object({
  score: z.number().min(0).max(100).describe('Logging quality score (0-100)'),
  
  summary: z.string().describe('One sentence summary'),
  
  issues: z.array(z.object({
    type: z.string().describe('Issue type'),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    message: z.string().describe('Issue description'),
    line: z.number().optional().describe('Code line number')
  })).describe('Discovered issues'),
  
  patterns: z.object({
    libraries: z.array(z.string()).describe('Used logging libraries'),
    consistency: z.boolean().describe('Consistency status'),
    structured: z.boolean().describe('Structured logging status'),
    observability: z.object({
      hasCorrelationId: z.boolean().describe('Correlation ID tracking available'),
      hasContextPreservation: z.boolean().describe('Business context preservation'),
      supportsDistributedTracing: z.boolean().describe('Distributed tracing support'),
      metricsLinkage: z.boolean().describe('Metrics linkage possible')
    }).describe('Observability readiness'),
    performance: z.object({
      hasAsyncLogging: z.boolean().describe('Async logging usage'),
      hasLevelFiltering: z.boolean().describe('Log level filtering'),
      riskySyncOperations: z.number().describe('Risky sync operations count'),
      productionDebugLeaks: z.number().describe('Production DEBUG leaks count')
    }).describe('Performance impact')
  }).describe('Logging pattern analysis'),
  
  recommendations: z.array(z.string()).describe('Improvement recommendations (priority order)')
});

export const SuggestImprovementsInputSchema = z.object({
  language: z.string().describe('Programming language'),
  currentIssues: z.array(z.string()).optional().describe('Currently identified issues'),
  focus: z.enum(['all', 'patterns', 'security', 'errors', 'performance']).default('all')
    .describe('Improvement focus area'),
  complexity: z.enum(['quick', 'standard', 'comprehensive']).default('standard')
    .describe('Improvement complexity')
});

export const CodeChangeSchema = z.object({
  line: z.number().describe('Line to modify'),
  original: z.string().describe('Original code'),
  suggested: z.string().describe('Suggested code'),
  reason: z.string().describe('Modification reason'),
  impact: z.enum(['minor', 'moderate', 'major']).describe('Impact level'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('Implementation difficulty'),
  timeEstimate: z.string().describe('Estimated time required'),
  roi: z.enum(['low', 'medium', 'high', 'critical']).describe('Return on investment')
});

export const SuggestImprovementsOutputSchema = z.object({
  changes: z.array(CodeChangeSchema).describe('Suggested code modifications'),
  
  estimatedScore: z.number().min(0).max(100)
    .describe('Estimated score after modifications'),
  
  priority: z.array(z.number()).describe('Modification priority (changes index)'),
  
  summary: z.string().describe('Modification summary'),
  
  migrationPlan: z.object({
    quickWins: z.array(z.string()).describe('Immediately applicable improvements'),
    shortTerm: z.array(z.string()).describe('Short-term improvements (1 week)'),
    longTerm: z.array(z.string()).describe('Long-term improvements (1 month)')
  }).describe('Staged migration plan')
});

// Production Readiness validation tool schema
export const ValidateProductionReadinessInputSchema = z.object({
  language: z.string().describe('Programming language'),
  environment: z.enum(['staging', 'production']).default('production')
    .describe('Target deployment environment'),
  serviceCriticality: z.enum(['low', 'medium', 'high', 'critical']).default('high')
    .describe('Service criticality'),
  knownIssues: z.array(z.string()).optional()
    .describe('Known issues from previous analysis')
});

export const ValidateProductionReadinessOutputSchema = z.object({
  decision: z.enum(['GO', 'CONDITIONAL_GO', 'NO_GO'])
    .describe('Deployment decision result'),
  
  blockers: z.array(z.object({
    category: z.string().describe('Blocker category'),
    severity: z.enum(['critical']).describe('Severity level'),
    message: z.string().describe('Blocking reason'),
    line: z.number().optional().describe('Relevant line')
  })).describe('Deployment blocking factors'),
  
  risks: z.array(z.object({
    category: z.string().describe('Risk category'),
    severity: z.enum(['high', 'medium']).describe('Severity level'),
    message: z.string().describe('Risk description'),
    mitigation: z.string().describe('Mitigation approach')
  })).describe('Potential risk factors'),
  
  checklist: z.object({
    security: z.enum(['pass', 'fail', 'warning']).describe('Security check result'),
    performance: z.enum(['pass', 'fail', 'warning']).describe('Performance check result'),
    observability: z.enum(['pass', 'fail', 'warning']).describe('Observability check result'),
    operational: z.enum(['pass', 'fail', 'warning']).describe('Operational readiness result'),
    compliance: z.enum(['pass', 'fail', 'warning']).describe('Compliance check result')
  }).describe('Category-wise checklist results'),
  
  recommendations: z.array(z.string()).describe('Pre-deployment essential actions'),
  
  summary: z.string().describe('Comprehensive assessment')
});

// Type exports
export type AnalyzeLoggingInput = z.infer<typeof AnalyzeLoggingInputSchema>;
export type AnalyzeLoggingOutput = z.infer<typeof AnalyzeLoggingOutputSchema>;
export type SuggestImprovementsInput = z.infer<typeof SuggestImprovementsInputSchema>;
export type SuggestImprovementsOutput = z.infer<typeof SuggestImprovementsOutputSchema>;
export type CodeChange = z.infer<typeof CodeChangeSchema>;
export type ValidateProductionReadinessInput = z.infer<typeof ValidateProductionReadinessInputSchema>;
export type ValidateProductionReadinessOutput = z.infer<typeof ValidateProductionReadinessOutputSchema>;