# Logging Advisor MCP

**"Just say 'check my logging' and let it handle everything automatically"**

An intelligent MCP (Model Context Protocol) server that analyzes logging quality in your code and provides improvement suggestions using LLM-powered insights. Features natural language interaction and automated workflows.

## Installation

```bash
npm install -g logging-advisor-mcp
```

## MCP Client Setup

### Claude Desktop
Add to your configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "logging-advisor": {
      "command": "npx",
      "args": ["logging-advisor-mcp"],
      "env": {}
    }
  }
}
```

### Claude Code
```bash
claude mcp add logging-advisor -- npx -y logging-advisor-mcp
```


After configuration, restart your MCP client. The logging advisor tools will be available.

## Natural Language Interface

Simply say:
- **"Check my logging"** 
- **"Is my logging code okay?"**
- **"Too many console.log statements"**
- **"Improve my error logging"**
- **"Production deployment logging check"**

The MCP automatically detects what you need and runs the appropriate workflow.

## 4-Step Automated Workflow

### 1. 🚀 `setup_analysis_session` - Smart Setup
- **Natural matching**: Recognizes casual requests about logging
- **Auto-detection**: Programming language, environment settings
- **Smart defaults**: Production-ready configuration
- **Workflow guidance**: Clear next steps

### 2. 📊 `analyze_logging` - Quality Analysis  
- **Pattern detection**: console.log/print overuse, error swallowing
- **Security scanning**: Sensitive data exposure (passwords, tokens, PII)
- **Performance review**: Blocking I/O, debug leaks in production
- **Multi-language**: JavaScript, Python, Java, Go, C++, C#, Ruby

### 3. 🔧 `suggest_improvements` - ROI-Based Roadmap
- **Quick wins**: Critical fixes (1-2 hours)
- **Line-by-line fixes**: Exact code replacements
- **Implementation guide**: Difficulty, time estimates, dependencies
- **Migration strategy**: Gradual improvement avoiding big-bang changes

### 4. ✅ `validate_production_readiness` - Deployment Safety
- **Strict GO/NO-GO**: Any critical issue blocks deployment
- **5-gate validation**: Security, Performance, Observability, Operations, Compliance
- **Real impact focus**: Actual service disruption prevention

## Example Usage

### Natural Workflow
```
You: "Check my logging - is this code production ready?"

[Paste your code]

Claude: [Automatically runs setup_analysis_session]
→ "I'll analyze your JavaScript code for production deployment..."
→ [Runs analyze_logging, suggest_improvements, validate_production_readiness]
→ "❌ NO-GO: Critical security issue detected - password exposed in logs"
→ [Provides exact line-by-line fixes]
```

### Manual Tool Usage
```
Please analyze this code with setup_analysis_session:

console.log('User:', username, password);
try {
  loginUser();
} catch(e) {
  // empty catch
}
```

## Features

### 🎯 Natural Language Interface
- **Conversational**: "Check my logging" → automatic workflow
- **Smart matching**: Recognizes various ways of requesting logging help
- **Zero configuration**: Works with smart defaults

### 🔍 Comprehensive Analysis  
- **Security scanning**: Sensitive data exposure (passwords, tokens, PII)
- **Performance review**: Blocking I/O, excessive debug logging
- **Observability check**: Correlation IDs, error context preservation
- **Multi-language**: JavaScript, Python, Java, Go, C++, C#, Ruby

### 🚀 Production-Ready Focus
- **Environment-aware**: Different standards for dev vs production
- **Strict validation**: GO/NO-GO deployment decisions  
- **Real-world impact**: Focus on actual operational issues
- **ROI-based improvements**: Quick wins prioritized

## Deployment Decision Matrix

| Decision | Criteria | Action |
|----------|----------|---------|
| ✅ **GO** | No Critical issues, <20% High issues | Safe to deploy |
| ⚠️ **CONDITIONAL GO** | No Critical, some High issues | Deploy with monitoring |
| ❌ **NO-GO** | Any Critical issues present | Fix required before deployment |

### Critical Blockers
- Sensitive data in logs (passwords, tokens, PII)
- Synchronous I/O logging (performance risk)
- Empty error handling (lost error context)
- Production debug logging enabled

## Language Support

**Primary**: JavaScript/TypeScript, Python, Java, Go  
**Extended**: C++, C#, Ruby, PHP, Rust, Kotlin, Swift

## Development

### Local Development Setup

```bash
git clone https://github.com/g-hyeong/logging-advisor-mcp.git
cd logging-advisor-mcp
npm install
npm run build
```

### Testing with MCP Inspector

```bash
npx @modelcontextprotocol/inspector dist/index.js
# Open http://localhost:5173 in your browser
# Test all 4 tools: setup_analysis_session, analyze_logging, suggest_improvements, validate_production_readiness
```

### Development Setup for Various Clients

**Claude Desktop (Development)**:
```json
{
  "mcpServers": {
    "logging-advisor": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

**Cursor IDE (Development)**:
```json
{
  "mcp": {
    "servers": {
      "logging-advisor": {
        "command": "node",
        "args": ["/absolute/path/to/dist/index.js"]
      }
    }
  }
}
```

**Claude Code (Development)**:
```json
{
  "claude.mcpServers": {
    "logging-advisor": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

## Examples

### Poor Logging Code
```javascript
console.log('Login:', username, password); // Exposes sensitive data
try {
  doSomething();
} catch (e) {
  // Empty catch - ignores errors
}
```

Expected Analysis:
- Score: 20-30
- Issues: Critical security vulnerability, ignored errors
- Recommendations: Use structured logger, remove sensitive data

### Good Logging Code
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

Expected Analysis:
- Score: 85-95
- Issues: None or minor
- Patterns: Structured logging, consistent approach

## Architecture

### LLM-First + User-Friendly Design
- **Natural language interface**: Conversational interaction patterns
- **Automated workflows**: 4-step process with smart defaults  
- **Minimal implementation**: Maximum delegation to LLM capabilities
- **Context preservation**: Session-aware tool chaining

## Scripts

```bash
npm run dev        # Development mode with auto-restart
npm run build      # TypeScript build
npm run typecheck  # Type checking only
npm start          # Production execution
```

## License

Apache-2.0

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/g-hyeong/logging-advisor-mcp).