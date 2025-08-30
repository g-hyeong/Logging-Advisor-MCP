import { z } from 'zod';

// 입력 스키마
export const SetupAnalysisSessionInputSchema = z.object({
  code: z.string().describe('Code to analyze (required)'),
  language: z.string().optional().describe('Programming language (optional, auto-detection available)'),
  environment: z.enum(['development', 'production']).default('production').describe('Target environment'),
  serviceCriticality: z.enum(['low', 'medium', 'high', 'critical']).default('high').describe('Service criticality level'),
  targetScore: z.number().min(0).max(100).default(80).describe('Target quality score'),
  maxChanges: z.number().min(1).max(20).default(5).describe('Maximum number of changes'),
  focus: z.enum(['all', 'patterns', 'levels', 'errors', 'security']).default('all').describe('Analysis focus area')
});

export type SetupAnalysisSessionInput = z.infer<typeof SetupAnalysisSessionInputSchema>;

// 출력 스키마
export const SetupAnalysisSessionOutputSchema = z.object({
  sessionId: z.string().describe('Session ID'),
  configuration: z.object({
    code: z.string().describe('Code to be analyzed'),
    language: z.string().describe('Detected language'),
    environment: z.enum(['development', 'production']).describe('Analysis environment'),
    serviceCriticality: z.enum(['low', 'medium', 'high', 'critical']).describe('Service criticality'),
    targetScore: z.number().describe('Target quality score'),
    maxChanges: z.number().describe('Maximum changes allowed'),
    focus: z.enum(['all', 'patterns', 'levels', 'errors', 'security']).describe('Analysis focus')
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

// MCP 입력 스키마 (JSON Schema 형식)
export const mcpInputSchema = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
      description: 'Code to analyze (required)'
    },
    language: {
      type: 'string',
      description: 'Programming language (optional, auto-detection available)'
    },
    environment: {
      type: 'string',
      enum: ['development', 'production'],
      default: 'production',
      description: 'Target environment'
    },
    serviceCriticality: {
      type: 'string',
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'high',
      description: 'Service criticality level'
    },
    targetScore: {
      type: 'number',
      minimum: 0,
      maximum: 100,
      default: 80,
      description: 'Target quality score (0-100)'
    },
    maxChanges: {
      type: 'number',
      minimum: 1,
      maximum: 20,
      default: 5,
      description: 'Maximum number of changes (1-20)'
    },
    focus: {
      type: 'string',
      enum: ['all', 'patterns', 'levels', 'errors', 'security'],
      default: 'all',
      description: 'Analysis focus area'
    }
  },
  required: ['code']
} as const;