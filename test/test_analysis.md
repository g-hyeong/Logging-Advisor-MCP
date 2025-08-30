# 로깅 분석 MCP 테스트 가이드

## 테스트 방법

### 1. 서버 빌드 및 시작
```bash
npm run build
npm run dev
```

### 2. MCP Inspector 또는 Claude Desktop에서 연결

### 3. 테스트 시나리오

#### 시나리오 1: 나쁜 코드 분석
```
도구: analyze_logging
입력:
{
  "code": "[sample_bad.js 내용 붙여넣기]",
  "language": "javascript",
  "focus": "all",
  "environment": "production"
}

예상 결과:
- score: 20-40 (낮은 점수)
- issues: 최소 8개 이상
  - console.log 남용 (medium)
  - 패스워드 노출 (critical)
  - API 키 노출 (critical)
  - 에러 무시 (high)
  - 스택트레이스 누락 (high)
  - 비구조화 로깅 (medium)
  - 과도한 디버그 (low)
  - 로그 레벨 미사용 (medium)
```

#### 시나리오 2: 좋은 코드 분석
```
도구: analyze_logging
입력:
{
  "code": "[sample_good.js 내용 붙여넣기]",
  "language": "javascript",
  "focus": "all",
  "environment": "production"
}

예상 결과:
- score: 80-95 (높은 점수)
- issues: 0-2개 (경미한 것만)
- patterns.structured: true
- patterns.consistency: true
```

#### 시나리오 3: 개선안 제시
```
도구: suggest_improvements
입력:
{
  "code": "[sample_bad.js 내용]",
  "analysis": {
    "score": 30,
    "summary": "심각한 보안 문제와 로깅 품질 문제 다수",
    "issues": [
      {
        "type": "sensitive_data",
        "severity": "critical",
        "message": "패스워드가 로그에 노출됨",
        "line": 9
      },
      {
        "type": "missing_error_handling",
        "severity": "high",
        "message": "에러 스택트레이스 누락",
        "line": 16
      }
    ],
    "patterns": {
      "libraries": ["console"],
      "consistency": false,
      "structured": false
    },
    "recommendations": [
      "winston 같은 구조화된 로거 도입",
      "민감정보 제거",
      "에러 로깅 개선"
    ]
  },
  "targetScore": 80,
  "maxChanges": 5
}

예상 결과:
- changes: 5개 수정 제안
  - console.log → logger.info
  - 패스워드 제거
  - 에러 스택 추가
  - API 키 제거
  - 로그 레벨 적용
- estimatedScore: 75-85
```

## 검증 포인트

### 분석 도구 (analyze_logging)
- [ ] console.log 감지 및 문제 지적
- [ ] 민감정보 (password, apiKey) 감지
- [ ] 에러 처리 누락 감지
- [ ] 구조화 로깅 여부 판단
- [ ] 환경별 적절한 로그 레벨 평가

### 개선 도구 (suggest_improvements)
- [ ] 구체적 라인 번호 제시
- [ ] 실행 가능한 코드 제안
- [ ] 우선순위 명확
- [ ] 보안 문제 우선 처리

## 로컬 테스트 실행

```bash
# 1. 빌드
npm run build

# 2. 타입 체크
npm run typecheck

# 3. 개발 모드 실행
npm run dev

# 4. 다른 터미널에서 테스트 (예: npx 사용)
echo '{"jsonrpc": "2.0", "method": "tools/list", "id": 1}' | npm start
```