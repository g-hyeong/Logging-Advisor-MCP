import { AnalyzeLoggingInputSchema, type AnalyzeLoggingInput } from './schema.js';

// Observability-focused logging best practices and anti-patterns
const LOGGING_CONTEXT = {
  bestPractices: [
    'Use appropriate log levels',
    'Exclude sensitive information',
    'Include meaningful context information',
    'Track correlation ID/request ID',
    'Use structured logging (JSON)',
    'Preserve error stack traces',
    'Protect performance with async logging',
    'Set differentiated levels by environment'
  ],
  antiPatterns: [
    'Debug by Print (console.log/print abuse)',
    'Fire and Forget Logging (irresponsible logging)',
    'Trace Pollution (meaningless debug traces)',
    'Log Bombing (repetitive logging without rate limiting)',
    'Sensitive information exposure (passwords/tokens/PII)',
    'Error ignoring (empty catch blocks)',
    'Blocking due to synchronous I/O logging',
    'Unstructured logging (string concatenation)',
    'Context-free logging (untraceable)',
    'Same logging level regardless of environment'
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

// Generate language-specific analysis guidelines
function generateLanguageGuidelines(language: string, environment: string, focus: string): string {
  const languageSpecific = {
    javascript: {
      antiPatterns: ['console.log', 'console.error', 'console.warn'],
      bestPractices: ['winston', 'pino', 'bunyan'],
      sensitiveCheck: 'process.env variables, user objects'
    },
    typescript: {
      antiPatterns: ['console.log', 'console.error', 'any type logging'],
      bestPractices: ['winston with types', 'pino with interfaces'],
      sensitiveCheck: 'typed user interfaces, auth tokens'
    },
    python: {
      antiPatterns: ['print()', 'sys.stdout.write'],
      bestPractices: ['logging module', 'structlog', 'loguru'],
      sensitiveCheck: 'dict keys, environment variables'
    },
    java: {
      antiPatterns: ['System.out.println', 'printStackTrace'],
      bestPractices: ['slf4j + logback', 'log4j2'],
      sensitiveCheck: 'toString methods, request objects'
    },
    go: {
      antiPatterns: ['fmt.Print', 'log.Print without context'],
      bestPractices: ['slog', 'logrus', 'zap'],
      sensitiveCheck: 'struct fields, context values'
    }
  };

  const lang = languageSpecific[language as keyof typeof languageSpecific] || languageSpecific.javascript;
  
  return `
**${language.toUpperCase()} Logging Quality Analysis Guidelines**

**Language-Specific Anti-Patterns:**
${lang.antiPatterns.map(p => `- ${p}`).join('\n')}

**Recommended Libraries:**
${lang.bestPractices.map(p => `- ${p}`).join('\n')}

**Sensitive Data Check Focus:**
- ${lang.sensitiveCheck}
- Password, token, apiKey fields
- User identification data

**Environment: ${environment}**
${environment === 'production' ? 
  '- Strict: No DEBUG level, no console output\n- Performance critical: async logging only' : 
  '- Permissive: DEBUG allowed for development\n- Convenience over strict performance'}

**Analysis Focus: ${focus}**
${focus === 'security' ? '- Primary: Sensitive data exposure detection' :
  focus === 'performance' ? '- Primary: Synchronous I/O and blocking operations' :
  focus === 'patterns' ? '- Primary: Logging architecture and consistency' :
  '- Comprehensive: All aspects of logging quality'}

**Quality Checklist:**
1. Logging Architecture (console vs structured logging)
2. Sensitive Information Handling
3. Error Context Preservation
4. Performance Impact (sync/async)
5. Observability Support (tracing, correlation)
6. Environment-appropriate Configuration

**Scoring Guide:**
- 90-100: Production ready
- 70-89: Good with minor improvements
- 50-69: Needs significant work
- Below 50: Not production ready
`;
}

// Analysis execution function - Generate language-specific guidelines
export async function execute(input: AnalyzeLoggingInput): Promise<string> {
  return generateLanguageGuidelines(input.language, input.environment, input.focus);
}

// MCP handler
export async function handleRequest(args: any): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  try {
    const parsedArgs = AnalyzeLoggingInputSchema.parse({
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