// 공통 스키마에서 import
export {
  SuggestImprovementsInputSchema,
  SuggestImprovementsOutputSchema,
  CodeChangeSchema,
  type SuggestImprovementsInput,
  type SuggestImprovementsOutput,
  type CodeChange
} from '../../schemas/types.js';

// MCP 스키마 정의 - 개선 패턴 가이드라인 중심
export const mcpInputSchema = {
  type: 'object' as const,
  properties: {
    language: {
      type: 'string',
      enum: ['javascript', 'typescript', 'python', 'java', 'go', 'cpp', 'csharp', 'ruby'],
      description: 'Programming language - provides language-specific improvement patterns'
    },
    currentIssues: {
      type: 'array',
      items: { type: 'string' },
      description: 'Current logging issues identified (optional) - e.g., ["console.log overuse", "missing error context", "sensitive data exposure"]'
    },
    focus: {
      type: 'string',
      enum: ['all', 'patterns', 'security', 'errors', 'performance'],
      default: 'all',
      description: 'Improvement focus area'
    },
    complexity: {
      type: 'string',
      enum: ['quick', 'standard', 'comprehensive'],
      default: 'standard',
      description: 'Improvement complexity - quick: 1-2 hours, standard: half day, comprehensive: full migration'
    }
  },
  required: ['language']
};