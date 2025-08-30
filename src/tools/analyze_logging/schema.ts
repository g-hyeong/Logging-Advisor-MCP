// 공통 스키마에서 import
export {
  AnalyzeLoggingInputSchema,
  AnalyzeLoggingOutputSchema,
  type AnalyzeLoggingInput,
  type AnalyzeLoggingOutput
} from '../../schemas/types.js';

// MCP 스키마 정의 (JSON Schema 형태) - 가이드라인 제시 중심
export const mcpInputSchema = {
  type: 'object' as const,
  properties: {
    language: {
      type: 'string',
      enum: ['javascript', 'typescript', 'python', 'java', 'go', 'cpp', 'csharp', 'ruby'],
      description: 'Programming language - provides language-specific analysis guidelines'
    },
    environment: {
      type: 'string',
      enum: ['development', 'production'],
      default: 'production',
      description: 'Target environment - production: strict standards, development: development convenience considered'
    },
    focus: {
      type: 'string',
      enum: ['all', 'patterns', 'security', 'errors', 'performance'],
      default: 'all',
      description: 'Analysis focus - all: comprehensive analysis, patterns: logging patterns, security: sensitive data exposure, errors: error handling, performance: performance impact'
    }
  },
  required: ['language']
};