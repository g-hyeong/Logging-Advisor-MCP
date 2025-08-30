# 로깅 어드바이저 MCP

**"로깅 체크해줘"라고만 하면 자동으로 분석부터 개선까지 모든 것을 처리합니다"**

코드의 로깅 품질을 지능적으로 분석하고 LLM 기반 인사이트를 통해 개선 제안을 제공하는 MCP(Model Context Protocol) 서버입니다. 자연스러운 언어 상호작용과 자동화된 워크플로우를 특징으로 합니다.

## 설치

```bash
npm install -g @g-hyeong/logging-advisor-mcp
```

## MCP 클라이언트 설정

### Claude Desktop
설정 파일에 다음을 추가하세요:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "logging-advisor": {
      "command": "logging-advisor-mcp"
    }
  }
}
```

### Cursor IDE
`.cursorrules` 또는 워크스페이스 설정에 추가:
```json
{
  "mcp": {
    "servers": {
      "logging-advisor": {
        "command": "logging-advisor-mcp"
      }
    }
  }
}
```

### Claude Code (VS Code 확장)
VS Code 설정 또는 `.vscode/settings.json`에 구성:
```json
{
  "claude.mcpServers": {
    "logging-advisor": {
      "command": "logging-advisor-mcp"
    }
  }
}
```

### Gemini CLI
MCP 지원과 함께 사용:
```bash
gemini-cli --mcp-server logging-advisor-mcp
```

### 기타 MCP 클라이언트
MCP 호환 클라이언트의 경우:
```json
{
  "mcpServers": {
    "logging-advisor": {
      "command": "node",
      "args": ["/path/to/logging-advisor-mcp/dist/index.js"]
    }
  }
}
```

설정 후 MCP 클라이언트를 재시작하세요. 로깅 어드바이저 도구를 사용할 수 있습니다.

## 자연어 인터페이스

간단히 이렇게 말하세요:
- **"로깅 체크해줘"** 
- **"로그 코드 괜찮은지 봐줘"**
- **"console.log가 너무 많은 것 같아"**
- **"에러 로깅 개선해줘"**
- **"프로덕션 배포 전에 로깅 확인해줘"**

MCP가 자동으로 무엇이 필요한지 감지하고 적절한 워크플로우를 실행합니다.

## 4단계 자동 워크플로우

### 1. 🚀 `setup_analysis_session` - 스마트 설정
- **자연 매칭**: 로깅 관련 캐주얼한 요청 인식
- **자동 감지**: 프로그래밍 언어, 환경 설정
- **스마트 기본값**: 프로덕션 준비된 설정
- **워크플로우 가이드**: 명확한 다음 단계 안내

### 2. 📊 `analyze_logging` - 품질 분석  
- **패턴 감지**: console.log/print 남용, 에러 삼키기
- **보안 스캔**: 민감 데이터 노출 (비밀번호, 토큰, PII)
- **성능 검토**: 블로킹 I/O, 프로덕션 디버그 누수
- **다중 언어**: JavaScript, Python, Java, Go, C++, C#, Ruby

### 3. 🔧 `suggest_improvements` - ROI 기반 로드맵
- **즉시 효과**: Critical 수정 (1-2시간)
- **라인별 수정**: 정확한 코드 교체
- **구현 가이드**: 난이도, 예상 시간, 의존성
- **마이그레이션 전략**: 빅뱅 변경 방지한 점진적 개선

### 4. ✅ `validate_production_readiness` - 배포 안전성 검증
- **엄격한 GO/NO-GO**: 어떤 Critical 이슈든 배포 차단
- **5단계 검증**: 보안, 성능, 관찰가능성, 운영, 컴플라이언스
- **실제 영향 중심**: 실제 서비스 중단 방지

## 사용 예시

### 자연스러운 워크플로우
```
사용자: "로깅 체크해줘 - 이 코드 프로덕션 배포해도 돼?"

[코드 붙여넣기]

Claude: [자동으로 setup_analysis_session 실행]
→ "JavaScript 코드를 프로덕션 배포 기준으로 분석하겠습니다..."
→ [analyze_logging, suggest_improvements, validate_production_readiness 순차 실행]
→ "❌ NO-GO: Critical 보안 이슈 발견 - 로그에 패스워드 노출됨"
→ [정확한 라인별 수정 방안 제공]
```

### 수동 도구 사용
```
setup_analysis_session으로 이 코드를 분석해주세요:

console.log('User:', username, password);
try {
  loginUser();
} catch(e) {
  // empty catch
}
```

## 기능

### 🎯 자연어 인터페이스
- **대화식**: "로깅 체크해줘" → 자동 워크플로우
- **스마트 매칭**: 다양한 로깅 도움 요청 방식 인식
- **제로 설정**: 스마트 기본값으로 동작

### 🔍 종합적 분석  
- **보안 스캔**: 민감 데이터 노출 (비밀번호, 토큰, PII)
- **성능 검토**: 블로킹 I/O, 과도한 디버그 로깅
- **관찰가능성 체크**: Correlation ID, 에러 컨텍스트 보존
- **다중 언어**: JavaScript, Python, Java, Go, C++, C#, Ruby

### 🚀 프로덕션 중심 초점
- **환경 인식**: 개발 vs 프로덕션 환경별 다른 기준
- **엄격한 검증**: GO/NO-GO 배포 결정  
- **실제 영향**: 실제 운영 문제에 집중
- **ROI 기반 개선**: 빠른 효과 우선순위

## 배포 결정 매트릭스

| 결정 | 기준 | 조치 |
|------|------|------|
| ✅ **GO** | Critical 없음, High 20% 미만 | 안전한 배포 가능 |
| ⚠️ **조건부 GO** | Critical 없음, 일부 High 잔존 | 모니터링과 함께 배포 |
| ❌ **NO-GO** | 어떤 Critical 이슈든 존재 | 수정 후 배포 |

### Critical 차단 요소
- 로그의 민감 데이터 (비밀번호, 토큰, PII)
- 동기 I/O 로깅 (성능 위험)
- 빈 에러 처리 (에러 컨텍스트 손실)
- 프로덕션 디버그 로깅 활성화

## 언어 지원

**주요**: JavaScript/TypeScript, Python, Java, Go  
**확장**: C++, C#, Ruby, PHP, Rust, Kotlin, Swift

## 개발

### 로컬 개발 환경 설정

```bash
git clone https://github.com/g-hyeong/logging-advisor-mcp.git
cd logging-advisor-mcp
npm install
npm run build
```

### MCP Inspector로 테스트

```bash
npx @modelcontextprotocol/inspector dist/index.js
# 브라우저에서 http://localhost:5173 열기
# 4개 도구 모두 테스트: setup_analysis_session, analyze_logging, suggest_improvements, validate_production_readiness
```

### 다양한 클라이언트 개발 설정

**Claude Desktop (개발용)**:
```json
{
  "mcpServers": {
    "logging-advisor": {
      "command": "node",
      "args": ["/절대경로/to/dist/index.js"]
    }
  }
}
```

**Cursor IDE (개발용)**:
```json
{
  "mcp": {
    "servers": {
      "logging-advisor": {
        "command": "node",
        "args": ["/절대경로/to/dist/index.js"]
      }
    }
  }
}
```

**Claude Code (개발용)**:
```json
{
  "claude.mcpServers": {
    "logging-advisor": {
      "command": "node",
      "args": ["/절대경로/to/dist/index.js"]
    }
  }
}
```

## 예시

### 나쁜 로깅 코드
```javascript
console.log('Login:', username, password); // 민감한 데이터 노출
try {
  doSomething();
} catch (e) {
  // 빈 catch - 에러 무시
}
```

예상 분석 결과:
- 점수: 20-30점
- 문제: 심각한 보안 취약점, 무시된 에러
- 권장사항: 구조화된 로거 사용, 민감한 데이터 제거

### 좋은 로깅 코드
```javascript
logger.info('Login attempt', { 
  username, 
  timestamp: Date.now() 
});
try {
  doSomething();
} catch (error) {
  logger.error('Operation failed', { 
    error: error.message, 
    stack: error.stack 
  });
}
```

예상 분석 결과:
- 점수: 85-95점
- 문제: 없음 또는 경미
- 패턴: 구조화된 로깅, 일관된 접근법

## 아키텍처

### LLM 우선 + 사용자 친화적 설계
- **자연어 인터페이스**: 대화식 상호작용 패턴
- **자동화된 워크플로우**: 스마트 기본값을 가진 4단계 프로세스  
- **최소한의 구현**: LLM 기능에 최대한 위임
- **컨텍스트 보존**: 세션 인식 도구 체이닝

## 스크립트

```bash
npm run dev        # 자동 재시작 개발 모드
npm run build      # TypeScript 빌드
npm run typecheck  # 타입 체크만
npm start          # 프로덕션 실행
```

## 라이센스

Apache-2.0

## 기여

[GitHub](https://github.com/g-hyeong/logging-advisor-mcp)에서 이슈와 풀 리퀘스트를 환영합니다.