// 공통 스키마에서 import
export {
  AnalyzeLoggingInputSchema,
  AnalyzeLoggingOutputSchema,
  type AnalyzeLoggingInput,
  type AnalyzeLoggingOutput
} from '../../schemas/types.js';

// MCP 스키마 정의 (JSON Schema 형태)
export const mcpInputSchema = {
  type: 'object' as const,
  properties: {
    code: {
      type: 'string',
      description: 'Code to analyze (text) - source code containing logging statements'
    },
    language: {
      type: 'string',
      description: 'Programming language (e.g., javascript, python, java, go)'
    },
    focus: {
      type: 'string',
      enum: ['all', 'patterns', 'levels', 'errors', 'security'],
      description: 'Analysis focus - if not specified, automatically determined based on code content. all: comprehensive analysis, patterns: logging patterns, levels: log levels, errors: error handling, security: security'
    },
    environment: {
      type: 'string',
      enum: ['development', 'production'],
      default: 'production',
      description: 'Target environment - production: strict standards, development: development convenience considered'
    }
  },
  required: ['code']
};