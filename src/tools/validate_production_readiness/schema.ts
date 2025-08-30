// 공통 스키마에서 import
export {
  ValidateProductionReadinessInputSchema,
  ValidateProductionReadinessOutputSchema,
  type ValidateProductionReadinessInput,
  type ValidateProductionReadinessOutput
} from '../../schemas/types.js';

// MCP 스키마 정의
export const mcpInputSchema = {
  type: 'object' as const,
  properties: {
    code: {
      type: 'string',
      description: 'Code to validate - source code containing logging scheduled for deployment'
    },
    environment: {
      type: 'string',
      enum: ['staging', 'production'],
      default: 'production',
      description: 'Target deployment environment - staging: relatively lenient, production: strict standards'
    },
    serviceCriticality: {
      type: 'string',
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'high',
      description: 'Service criticality - low: internal tools, medium: general services, high: core services, critical: financial/healthcare'
    },
    previousAnalysis: {
      type: 'object',
      description: 'Previous analysis results from analyze_logging or suggest_improvements (if available, used for reference)',
      properties: {
        score: { type: 'number', description: 'Previous quality score' },
        issues: { type: 'array', description: 'Known issues' }
      }
    }
  },
  required: ['code']
};