// 공통 스키마에서 import
export {
  SuggestImprovementsInputSchema,
  SuggestImprovementsOutputSchema,
  CodeChangeSchema,
  type SuggestImprovementsInput,
  type SuggestImprovementsOutput,
  type CodeChange
} from '../../schemas/types.js';

// MCP 스키마 정의
export const mcpInputSchema = {
  type: 'object' as const,
  properties: {
    code: {
      type: 'string',
      description: 'Original code - source code containing logging to be improved'
    },
    analysis: {
      type: 'object',
      description: 'JSON analysis results from analyze_logging tool - includes score, issues, patterns, recommendations',
      properties: {
        score: { type: 'number', description: 'Current quality score' },
        issues: { 
          type: 'array', 
          description: 'Array of discovered issues',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              severity: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
              message: { type: 'string' },
              line: { type: 'number' }
            }
          }
        },
        patterns: { type: 'object', description: 'Logging pattern analysis results' }
      }
    },
    targetScore: {
      type: 'number',
      minimum: 0,
      maximum: 100,
      description: 'Target quality score (0-100) - if not specified, automatically determines appropriate improvement level based on current score'
    },
    maxChanges: {
      type: 'number',
      minimum: 1,
      description: 'Maximum number of changes - if not specified, automatically determined based on code size and issue severity (3-10 range)'
    }
  },
  required: ['code']
};