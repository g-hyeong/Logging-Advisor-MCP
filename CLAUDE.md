# MCP 로깅 분석 서버 - 사용자 친화적 자동 워크플로우

**"로그 괜찮은지 점검해줘"라고 하면 자동으로 분석부터 개선까지** - 실제 운영 환경에서 문제를 빠르게 파악하고 해결할 수 있는 로깅 품질 분석 도구

## 핵심 철학: 자연스러운 사용성 + 관찰가능성 우선

### "로깅 개선해줘"만 말해도 자동으로 처리
- 복잡한 도구명 기억 불필요 → 자연스러운 대화로 시작
- 설정값 고민 불필요 → 스마트한 기본값 제공  
- 단계별 수동 진행 → 4단계 자동 워크플로우

### 확장된 모듈 구조
```
src/
├── index.ts                     # MCP 서버 엔트리 (4개 도구)
├── tools/
│   ├── setup_analysis_session/  # 🚀 초기 설정 및 워크플로우 시작
│   │   ├── schema.ts           # 사용자 요구사항 수집
│   │   ├── handler.ts          # 언어 감지, 세션 설정
│   │   └── index.ts            # 자연 매칭 설명
│   ├── analyze_logging/         # 📊 관찰가능성 중심 품질 분석
│   │   ├── schema.ts           
│   │   ├── handler.ts          # LLM 분석 가이드라인 생성
│   │   └── index.ts            
│   ├── suggest_improvements/    # 🔧 ROI 기반 개선 로드맵
│   │   ├── schema.ts
│   │   ├── handler.ts          # 실무 적용 가능한 개선안
│   │   └── index.ts
│   ├── validate_production_readiness/  # ✅ 배포 안전성 검증
│   │   ├── schema.ts
│   │   ├── handler.ts          # GO/NO-GO 엄격한 판정
│   │   └── index.ts
│   └── index.ts                # 4개 도구 통합 export
└── schemas/
    └── types.ts                # 공통 타입 (기존 호환성)
```

## 4단계 자동 워크플로우

### 1단계: setup_analysis_session 🚀 - 스마트한 시작
**목적**: "로깅 개선해줘" 한 마디로 모든 설정 자동화

**자연스러운 매칭**:
- "로그 괜찮은지 점검해줘" 
- "console.log 너무 많은 것 같은데"
- "프로덕션 배포 전에 로깅 체크해줘"
- "에러 로깅 제대로 되고 있나?"

**자동 처리**:
- 언어 자동 감지 (JavaScript, Python, Java, Go 등)
- 환경별 기본값 설정 (production 기준)
- 3단계 후속 워크플로우 안내

### 2단계: analyze_logging 📊 - 관찰가능성 품질 분석
**목적**: 실제 운영 환경 관점에서 로깅 품질 종합 평가

**핵심 분석 항목**:
- console.log/print 남발 패턴 감지
- 민감정보 노출 위험 (password, token, email 등)
- 에러 처리 누락 및 컨텍스트 손실  
- 성능 블로킹 로깅 (동기 I/O)
- 관찰가능성 부족 (correlation ID, tracing)

**지원 언어**: JavaScript, TypeScript, Python, Java, Go, C++, C#, Ruby

### 3단계: suggest_improvements 🔧 - ROI 기반 개선 로드맵  
**목적**: 실제 적용 가능한 단계별 마이그레이션 전략 제시

**제공하는 것**:
- 즉시 적용 가능한 Quick Wins (1-2시간)
- 라인별 정확한 수정 코드
- 구현 난이도 및 예상 소요 시간
- 필요한 라이브러리/설정 안내

**개선 패턴**:
- console.log → structured logger (winston, pino)
- 에러 무시 → 완전한 컨텍스트 보존
- 동기 로깅 → 비동기 성능 최적화

### 4단계: validate_production_readiness ✅ - 배포 안전성 검증
**목적**: 프로덕션 배포 전 로깅 안전성 최종 검증

**엄격한 GO/NO-GO 판정**:
- 단 하나의 Critical 이슈라도 있으면 즉시 NO-GO
- 실제 서비스 장애 가능성 중심 판단

**5단계 안전성 검증**:
1. Security Gate: 민감정보 완전 차단
2. Performance Gate: 서비스 성능 블로킹 방지
3. Observability Gate: 장애 대응 능력 확보
4. Operational Gate: 모니터링 시스템 연계
5. Compliance Gate: 규정 준수 (GDPR, 감사)

## 기술 스택

- **Node.js**: v20+
- **TypeScript**: 5.3.3
- **MCP SDK**: 1.17.4
- **Zod**: 3.24.1 (스키마 검증)

## 사용자 친화적 워크플로우

### 자연스러운 시작
```
사용자: "로깅 개선해줘"
Claude: setup_analysis_session 도구 자동 선택
→ 언어 감지, 기본 설정, 워크플로우 안내
```

### 단계별 자동 진행  
```
1단계: setup_analysis_session
- 입력: 코드 + 자연스러운 요청
- 출력: 세션 설정 + 다음 단계 안내

2단계: analyze_logging  
- 입력: 설정된 파라미터 자동 적용
- 출력: LLM용 분석 가이드라인

3단계: suggest_improvements
- 입력: 분석 결과 + 사용자 목표
- 출력: 실무 적용 개선 로드맵

4단계: validate_production_readiness  
- 입력: 개선된 코드 + 환경 설정
- 출력: GO/NO-GO 배포 판정
```

### 기존 방식 (수동)도 지원
```bash  
# 직접 도구 호출도 가능
{
  "code": "console.log('user:', userId);",
  "environment": "production", 
  "focus": "all"
}
```

## 개발 및 배포

### 로컬 개발
```bash
npm install        # 의존성 설치
npm run build      # TypeScript 빌드
npm run typecheck  # 타입 체크
npm run dev        # 개발 모드
```

### 프로덕션 배포
```bash
npm start          # 프로덕션 실행
```

### 도구 테스트
```bash
# MCP Inspector로 도구 테스트
npx @modelcontextprotocol/inspector dist/index.js

# 각 도구별 동작 확인
# 1. setup_analysis_session: 자연스러운 시작점
# 2. analyze_logging: 코드 품질 분석
# 3. suggest_improvements: ROI 기반 개선안
# 4. validate_production_readiness: 배포 안전성 검증
```

## 아키텍처 설계 원칙

### 확장성 우선
- 도구별 독립 모듈화로 신규 도구 추가 용이
- 스키마 분리로 타입 안전성 보장
- 핸들러 분리로 테스트 및 유지보수 개선

### LLM 중심 설계 + 사용성 개선
- 복잡한 분석 로직을 LLM에게 위임
- 자연스러운 대화식 인터페이스 제공
- Description을 통한 자동 도구 매칭
- 컨텍스트 기반 판단으로 유연한 분석

### 운영 친화적
- 실제 장애 상황을 가정한 평가 기준
- ROI 중심의 개선 우선순위
- 배포 위험 최소화 전략

## 확장 계획

### 추가 도구 후보
- **generate_logging_config**: 환경별 로깅 설정 자동 생성
- **audit_sensitive_data**: 민감정보 노출 전문 감사
- **benchmark_performance**: 로깅 성능 영향도 측정
- **compliance_check**: 특정 규정(GDPR, PCI-DSS) 준수 검증