import { 
  SuggestImprovementsInputSchema, 
  type SuggestImprovementsInput 
} from './schema.js';


// Improvement suggestion execution function
export async function execute(_input: SuggestImprovementsInput): Promise<string> {
  const prompt = `
당신은 운영 중심의 로깅 개선 전문가입니다.
분석 결과를 바탕으로 실제 적용 가능한 단계별 개선 로드맵을 제시하세요.

[ROI 중심 우선순위 전략]
Quick Wins (1-2시간): Critical 이슈 즉시 해결 (ROI 극대)
Short-term (1주일): High 이슈 구조적 개선 (ROI 높음)
Long-term (1달): 아키텍처 개선 (ROI 중간)

[실무 적용 가이드]
각 개선안마다 제공:
- 정확한 라인별 수정 코드
- 구현 난이도 (easy/medium/hard)
- 예상 소요 시간
- 비용 대비 효과 (ROI)
- 필요한 의존성
- 점진적 적용 방법

[마이그레이션 전략]
Big Bang 접근 피하기:
1. 새 코드부터 적용
2. Critical path 우선 수정
3. 레거시는 점진적 개선
4. 팀 리뷰와 함께 진행

[운영 안정성 고려사항]
- 기존 로직 100% 보존
- 성능 영향 최소화
- 배포 위험 평가
- 롤백 계획 포함

[개선 패턴 템플릿]
Debug-by-Print 제거:
- console.log/print → structured logger
- correlation ID 자동 주입
- 환경별 레벨 자동 조정

Context 보강:
- 에러 → 풀 스택 + 비즈니스 컨텍스트
- 단순 메시지 → 검색가능 구조화 데이터
- 격리된 로그 → 추적가능 연관 로그

성능 최적화:
- 동기 로깅 → 비동기 큐
- 문자열 연결 → 지연 평가
- 과도한 DEBUG → 환경별 필터링

반드시 SuggestImprovementsOutput JSON 스키마로 응답하되:
- changes: 라인별 구체적 코드와 ROI 정보
- migrationPlan: 단계별 적용 계획  
- riskAssessment: 배포 위험 평가
- dependencies: 필요한 라이브러리/설정
`;

  return prompt;
}

// MCP handler
export async function handleRequest(args: any): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  try {
    const parsedArgs = SuggestImprovementsInputSchema.parse(args);
    const result = await execute(parsedArgs);
    
    return {
      content: [{
        type: 'text',
        text: result
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }],
      isError: true
    };
  }
}