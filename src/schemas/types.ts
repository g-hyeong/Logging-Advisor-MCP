import { z } from 'zod';

// 심플하고 평면적인 스키마 구조
// LLM이 쉽게 이해하고 채울 수 있도록 최소화

export const AnalyzeLoggingInputSchema = z.object({
  code: z.string().describe('분석할 코드 (텍스트)'),
  language: z.string().optional().describe('프로그래밍 언어 (자동 감지 가능)'),
  focus: z.enum(['all', 'patterns', 'levels', 'errors', 'security']).default('all')
    .describe('분석 초점: all(전체), patterns(패턴), levels(레벨), errors(에러), security(보안)'),
  environment: z.enum(['development', 'production']).default('production')
    .describe('대상 환경 - 로그 레벨 평가 기준')
});

export const AnalyzeLoggingOutputSchema = z.object({
  score: z.number().min(0).max(100).describe('로깅 품질 점수 (0-100)'),
  
  summary: z.string().describe('한 문장 요약'),
  
  issues: z.array(z.object({
    type: z.string().describe('문제 유형'),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    message: z.string().describe('문제 설명'),
    line: z.number().optional().describe('코드 라인 번호')
  })).describe('발견된 문제들'),
  
  patterns: z.object({
    libraries: z.array(z.string()).describe('사용된 로깅 라이브러리들'),
    consistency: z.boolean().describe('일관성 여부'),
    structured: z.boolean().describe('구조화 로깅 여부'),
    observability: z.object({
      hasCorrelationId: z.boolean().describe('correlation ID 추적 가능'),
      hasContextPreservation: z.boolean().describe('비즈니스 컨텍스트 보존'),
      supportsDistributedTracing: z.boolean().describe('분산 추적 지원'),
      metricsLinkage: z.boolean().describe('메트릭 연계 가능')
    }).describe('관찰가능성 준비도'),
    performance: z.object({
      hasAsyncLogging: z.boolean().describe('비동기 로깅 사용'),
      hasLevelFiltering: z.boolean().describe('로그 레벨 필터링'),
      riskySyncOperations: z.number().describe('위험한 동기 작업 수'),
      productionDebugLeaks: z.number().describe('프로덕션 DEBUG 노출 수')
    }).describe('성능 영향도')
  }).describe('로깅 패턴 분석'),
  
  recommendations: z.array(z.string()).describe('개선 권장사항 (우선순위순)')
});

export const SuggestImprovementsInputSchema = z.object({
  code: z.string().describe('원본 코드'),
  analysis: AnalyzeLoggingOutputSchema.describe('분석 결과'),
  targetScore: z.number().min(0).max(100).default(80)
    .describe('목표 품질 점수'),
  maxChanges: z.number().default(5)
    .describe('최대 수정 개수')
});

export const CodeChangeSchema = z.object({
  line: z.number().describe('수정할 라인'),
  original: z.string().describe('원본 코드'),
  suggested: z.string().describe('제안 코드'),
  reason: z.string().describe('수정 이유'),
  impact: z.enum(['minor', 'moderate', 'major']).describe('영향도'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('구현 난이도'),
  timeEstimate: z.string().describe('예상 소요 시간'),
  roi: z.enum(['low', 'medium', 'high', 'critical']).describe('투자 대비 효과')
});

export const SuggestImprovementsOutputSchema = z.object({
  changes: z.array(CodeChangeSchema).describe('제안된 코드 수정사항들'),
  
  estimatedScore: z.number().min(0).max(100)
    .describe('수정 후 예상 점수'),
  
  priority: z.array(z.number()).describe('수정 우선순위 (changes 인덱스)'),
  
  summary: z.string().describe('수정 요약'),
  
  migrationPlan: z.object({
    quickWins: z.array(z.string()).describe('즉시 적용 가능한 개선사항'),
    shortTerm: z.array(z.string()).describe('단기 개선사항 (1주일)'),
    longTerm: z.array(z.string()).describe('장기 개선사항 (1달)')
  }).describe('단계별 마이그레이션 계획')
});

// 새로운 Production Readiness 검증 도구 스키마
export const ValidateProductionReadinessInputSchema = z.object({
  code: z.string().describe('검증할 코드'),
  environment: z.enum(['staging', 'production']).default('production')
    .describe('배포 대상 환경'),
  serviceCriticality: z.enum(['low', 'medium', 'high', 'critical']).default('high')
    .describe('서비스 중요도'),
  previousAnalysis: AnalyzeLoggingOutputSchema.optional()
    .describe('이전 분석 결과 (있는 경우)')
});

export const ValidateProductionReadinessOutputSchema = z.object({
  decision: z.enum(['GO', 'CONDITIONAL_GO', 'NO_GO'])
    .describe('배포 판정 결과'),
  
  blockers: z.array(z.object({
    category: z.string().describe('차단 요소 카테고리'),
    severity: z.enum(['critical']).describe('심각도'),
    message: z.string().describe('차단 사유'),
    line: z.number().optional().describe('해당 라인')
  })).describe('배포 차단 요소들'),
  
  risks: z.array(z.object({
    category: z.string().describe('위험 요소 카테고리'),
    severity: z.enum(['high', 'medium']).describe('심각도'),
    message: z.string().describe('위험 내용'),
    mitigation: z.string().describe('완화 방안')
  })).describe('잠재적 위험 요소들'),
  
  checklist: z.object({
    security: z.enum(['pass', 'fail', 'warning']).describe('보안 검사 결과'),
    performance: z.enum(['pass', 'fail', 'warning']).describe('성능 검사 결과'),
    observability: z.enum(['pass', 'fail', 'warning']).describe('관찰가능성 검사 결과'),
    operational: z.enum(['pass', 'fail', 'warning']).describe('운영 준비도 검사 결과'),
    compliance: z.enum(['pass', 'fail', 'warning']).describe('규정 준수 검사 결과')
  }).describe('카테고리별 체크리스트 결과'),
  
  recommendations: z.array(z.string()).describe('배포 전 필수 조치사항'),
  
  summary: z.string().describe('종합 의견')
});

// 타입 export
export type AnalyzeLoggingInput = z.infer<typeof AnalyzeLoggingInputSchema>;
export type AnalyzeLoggingOutput = z.infer<typeof AnalyzeLoggingOutputSchema>;
export type SuggestImprovementsInput = z.infer<typeof SuggestImprovementsInputSchema>;
export type SuggestImprovementsOutput = z.infer<typeof SuggestImprovementsOutputSchema>;
export type CodeChange = z.infer<typeof CodeChangeSchema>;
export type ValidateProductionReadinessInput = z.infer<typeof ValidateProductionReadinessInputSchema>;
export type ValidateProductionReadinessOutput = z.infer<typeof ValidateProductionReadinessOutputSchema>;