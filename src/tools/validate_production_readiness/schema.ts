// 공통 스키마에서 import
export {
  ValidateProductionReadinessInputSchema,
  ValidateProductionReadinessOutputSchema,
  type ValidateProductionReadinessInput,
  type ValidateProductionReadinessOutput
} from '../../schemas/types.js';

// MCP 스키마 정의 - 배포 안전성 체크리스트 중심
export const mcpInputSchema = {
  type: 'object' as const,
  properties: {
    language: {
      type: 'string',
      enum: ['javascript', 'typescript', 'python', 'java', 'go', 'cpp', 'csharp', 'ruby'],
      description: 'Programming language - provides language-specific validation checklist'
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
    knownIssues: {
      type: 'array',
      items: { type: 'string' },
      description: 'Known issues from previous analysis (optional) - helps focus validation on specific areas'
    }
  },
  required: ['language']
};