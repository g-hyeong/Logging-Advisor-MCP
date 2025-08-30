import { AnalyzeLoggingInputSchema, type AnalyzeLoggingInput } from './schema.js';

// Observability-focused logging best practices and anti-patterns
const LOGGING_CONTEXT = {
  bestPractices: [
    '적절한 로그 레벨 사용',
    '민감정보 제외',
    '의미있는 컨텍스트 정보 포함',
    'correlation ID/request ID 추적',
    '구조화된 로깅 (JSON)',
    '에러 스택트레이스 보존',
    '비동기 로깅으로 성능 보호',
    '환경별 차별화된 레벨 설정'
  ],
  antiPatterns: [
    'Debug by Print (console.log/print 남발)',
    'Fire and Forget Logging (무책임한 로깅)',
    'Trace Pollution (무의미한 디버그 흔적)',
    'Log Bombing (rate limiting 없는 반복 로깅)',
    '민감정보 노출 (패스워드/토큰/PII)',
    '에러 무시 (빈 catch 블록)',
    '동기 I/O 로깅으로 인한 블로킹',
    '비구조화 로깅 (문자열 연결)',
    'Context-free 로깅 (추적 불가)',
    '환경 무관 동일 로깅 레벨'
  ],
  sensitivePatterns: [
    'password', 'pwd', 'secret', 'token', 'apiKey', 'api_key',
    'authorization', 'auth', 'credential', 'private', 'key',
    'email', 'phone', 'ssn', 'card', 'account', 'user_id', 'userId'
  ],
  observabilityPatterns: [
    'requestId', 'correlationId', 'traceId', 'spanId',
    'userId', 'sessionId', 'transactionId', 'operationId'
  ],
  performanceRisks: [
    'console.log', 'console.error', 'print(', 'println',
    'System.out', 'fmt.Print', 'std::cout', 'logger.debug'
  ]
};

// Analysis execution function - Generate analysis guidelines
export async function execute(input: AnalyzeLoggingInput): Promise<string> {
  const analysisGuide = `
당신은 관찰가능성 중심의 로깅 품질 전문 검사관입니다.
제공된 코드를 실제 운영 환경 관점에서 분석하여 로깅 품질을 평가하세요.

[핵심 분석 관점]
"문제가 생겼을 때 원인을 빠르게 파악할 수 있는가?"
"시스템의 현재 상태를 정확히 이해할 수 있는가?"

[단계별 분석]
1단계: 로깅 아키텍처 식별
- Debug by Print: console.log/print/println 등 표준 출력 남용
- 전문 로깅 라이브러리: winston, pino, logrus, slf4j 등
- 환경별 설정: dev/staging/prod 차별화 여부
- 일관성: 혼재 시 "Logging Chaos" 문제

2단계: 관찰가능성(Observability) 평가
- Correlation Tracking: requestId, traceId, correlationId 등
- Context Preservation: 중요 비즈니스 컨텍스트 포함 여부
- Distributed Tracing: 분산 시스템 추적 준비도
- Metric Linkage: 로그-메트릭-트레이스 연계 가능성

3단계: 운영 안전성 검토
- 민감정보 노출: password, token, apiKey, email, phone, ssn, card, account, user_id, userId
- Error Swallowing: 빈 catch 블록 = Critical 문제
- Stack Trace Loss: 에러 컨텍스트 손실
- Rate Limiting: Log Bombing 방지 여부

4단계: 성능 영향도 평가
- Synchronous I/O: 동기 로깅으로 인한 블로킹 위험
- Log Level Filtering: 불필요한 로그 생성 방지
- Structured vs Unstructured: 파싱 비용 고려
- Production Debugging: 프로덕션 DEBUG 레벨 노출

5단계: 환경별 적합성
Production 기준:
- INFO 이상 레벨만 허용
- 민감정보 완전 차단
- 성능 최우선
- 알람 연계 가능한 구조

Development 기준:
- DEBUG 레벨 허용
- 상세 컨텍스트 포함 가능
- 개발 편의성 고려

[심각도 기준]
Critical (-20점): 민감정보 노출, 에러 무시, 프로덕션 보안 위험
High (-15점): Context 부재, 추적 불가능, 성능 블로킹
Medium (-10점): 구조화 미흡, 레벨 부적절, 일관성 부족
Low (-5점): 포맷팅, 경미한 베스트 프랙티스 위반

[특별 가점]
+10점: 우수한 관찰가능성 설계
+5점: 환경별 적절한 레벨 분리
+5점: 구조화 로깅과 컨텍스트 보존

안티패턴 키워드: Debug by Print (console.log/print 남발), Fire and Forget Logging (무책임한 로깅), Trace Pollution (무의미한 디버그 흔적), Log Bombing (rate limiting 없는 반복 로깅), 민감정보 노출 (패스워드/토큰/PII), 에러 무시 (빈 catch 블록), 동기 I/O 로깅으로 인한 블로킹, 비구조화 로깅 (문자열 연결), Context-free 로깅 (추적 불가), 환경 무관 동일 로깅 레벨
관찰가능성 키워드: requestId, correlationId, traceId, spanId, userId, sessionId, transactionId, operationId

반드시 AnalyzeLoggingOutput 스키마 JSON으로 응답하세요.
`;

  return analysisGuide;
}

// MCP handler
export async function handleRequest(args: any): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  try {
    const parsedArgs = AnalyzeLoggingInputSchema.parse({
      code: args.code,
      language: args.language,
      focus: args.focus || 'all',
      environment: args.environment || 'production'
    });
    
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