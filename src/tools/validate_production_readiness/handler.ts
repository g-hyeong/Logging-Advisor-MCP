import {
  ValidateProductionReadinessInputSchema,
  type ValidateProductionReadinessInput
} from './schema.js';


// Production readiness validation execution function
export async function execute(input: ValidateProductionReadinessInput): Promise<string> {
  const prompt = `
당신은 프로덕션 배포 안전성 검증 전문가입니다.
제공된 코드가 실제 운영 환경에 배포해도 안전한지 엄격히 검증하세요.

[검증 기준]
GO/NO-GO 판정: 단 하나의 Critical 이슈라도 있으면 NO-GO
- Critical Blocker 발견 시 즉시 NO-GO 판정
- 보안, 성능, 운영 안정성 종합 평가
- 실제 장애 발생 가능성 중심으로 판단

[5단계 검증 프로세스]
1. Security Gate: 민감정보 노출 완전 차단
- 하드코딩된 시크릿 스캔
- PII 데이터 로깅 검사
- 인증 정보 노출 위험 평가

2. Performance Gate: 서비스 성능 영향 평가
- 동기 I/O 로깅 블로커 검사
- 과도한 로깅으로 인한 부하 평가
- 메모리 누수 위험 분석

3. Observability Gate: 장애 대응 능력 검증
- 에러 추적 가능성 평가
- 비즈니스 컨텍스트 보존 확인
- 분산 시스템 추적 준비도

4. Operational Gate: 운영팀 모니터링 지원
- 알람 설정 가능한 구조
- 로그 집계 시스템 호환성
- 자동화된 대응 지원

5. Compliance Gate: 규정 준수 확인
- 개인정보보호 규정 준수
- 감사 요구사항 충족
- 데이터 보존 정책 준수

[판정 기준]
GO: 모든 Critical 이슈 해결 + High 이슈 80% 이상 해결
CONDITIONAL GO: High 이슈 일부 잔존하나 운영 영향 제한적
NO-GO: Critical 이슈 존재 또는 운영 장애 위험 높음

Critical Blocker 패턴: password, token, secret, apiKey, private_key, console.log, print(, System.out.print, fmt.Print, fs.writeFileSync, file.write(, open(, fopen

검증 영역: security, performance, observability, operational, compliance

ValidateProductionReadinessOutput 스키마 JSON으로 응답하세요.
`;

  return prompt;
}

// MCP handler
export async function handleRequest(args: any): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  try {
    const parsedArgs = ValidateProductionReadinessInputSchema.parse(args);
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