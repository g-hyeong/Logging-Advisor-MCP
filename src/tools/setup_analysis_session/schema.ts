import { z } from 'zod';

// 입력 스키마 - 코드 없이 가이드라인 중심
export const SetupAnalysisSessionInputSchema = z.object({
  language: z.enum(['javascript', 'typescript', 'python', 'java', 'go', 'cpp', 'csharp', 'ruby']).optional().describe('Programming language'),
  environment: z.enum(['development', 'production']).default('production').describe('Target environment'),
  serviceCriticality: z.enum(['low', 'medium', 'high', 'critical']).default('high').describe('Service criticality level'),
  focus: z.enum(['all', 'patterns', 'security', 'errors', 'performance']).default('all').describe('Analysis focus area')
});

export type SetupAnalysisSessionInput = z.infer<typeof SetupAnalysisSessionInputSchema>;

// 출력 스키마 - 가이드라인과 워크플로우 안내 중심
export const SetupAnalysisSessionOutputSchema = z.object({
  sessionId: z.string().describe('Session ID'),
  configuration: z.object({
    language: z.string().optional().describe('Selected language'),
    environment: z.enum(['development', 'production']).describe('Analysis environment'),
    serviceCriticality: z.enum(['low', 'medium', 'high', 'critical']).describe('Service criticality'),
    focus: z.enum(['all', 'patterns', 'security', 'errors', 'performance']).describe('Analysis focus')
  }).describe('Analysis configuration'),
  nextSteps: z.object({
    step1: z.object({
      tool: z.literal('analyze_logging'),
      description: z.string(),
      ready: z.boolean()
    }),
    step2: z.object({
      tool: z.literal('suggest_improvements'),
      description: z.string(),
      ready: z.boolean()
    }),
    step3: z.object({
      tool: z.literal('validate_production_readiness'),
      description: z.string(),
      ready: z.boolean()
    })
  }).describe('Next steps guidance'),
  summary: z.string().describe('Session setup summary')
});

export type SetupAnalysisSessionOutput = z.infer<typeof SetupAnalysisSessionOutputSchema>;

// MCP 입력 스키마 (JSON Schema 형식) - 코드 없이 가이드라인 중심
export const mcpInputSchema = {
  type: 'object',
  properties: {
    language: {
      type: 'string',
      enum: ['javascript', 'typescript', 'python', 'java', 'go', 'cpp', 'csharp', 'ruby'],
      description: 'Programming language (optional, will provide general guidelines if not specified)'
    },
    environment: {
      type: 'string',
      enum: ['development', 'production'],
      default: 'production',
      description: 'Target environment - production: strict standards, development: development convenience considered'
    },
    serviceCriticality: {
      type: 'string',
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'high',
      description: 'Service criticality - low: internal tools, medium: general services, high: core services, critical: financial/healthcare'
    },
    focus: {
      type: 'string',
      enum: ['all', 'patterns', 'security', 'errors', 'performance'],
      default: 'all',
      description: 'Analysis focus area - all: comprehensive analysis, patterns: logging patterns, security: security, errors: error handling, performance: performance impact'
    }
  },
  required: []
} as const;