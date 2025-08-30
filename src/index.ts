#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
 
// 도구 가져오기
import {
  setupAnalysisSessionTool,
  analyzeLoggingTool,
  suggestImprovementsTool,
  validateProductionReadinessTool
} from './tools/index.js';

// 서버 인스턴스 생성
const server = new Server(
  {
    name: 'mcp-logging-analysis-server',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 도구 목록 제공 핸들러
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: setupAnalysisSessionTool.name,
        description: setupAnalysisSessionTool.description,
        inputSchema: setupAnalysisSessionTool.inputSchema
      },
      {
        name: analyzeLoggingTool.name,
        description: analyzeLoggingTool.description,
        inputSchema: analyzeLoggingTool.inputSchema
      },
      {
        name: suggestImprovementsTool.name,
        description: suggestImprovementsTool.description,
        inputSchema: suggestImprovementsTool.inputSchema
      },
      {
        name: validateProductionReadinessTool.name,
        description: validateProductionReadinessTool.description,
        inputSchema: validateProductionReadinessTool.inputSchema
      }
    ],
  };
});

// 도구 실행 핸들러 (각 도구의 핸들러에 위임)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const args = request.params.arguments as any;

  switch (toolName) {
    case 'setup_analysis_session':
      return await setupAnalysisSessionTool.handleRequest(args);
    
    case 'analyze_logging':
      return await analyzeLoggingTool.handleRequest(args);
    
    case 'suggest_improvements':
      return await suggestImprovementsTool.handleRequest(args);
    
    case 'validate_production_readiness':
      return await validateProductionReadinessTool.handleRequest(args);
    
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
});

// 버전 정보 가져오기 함수
function getVersion(): string {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const packagePath = join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
    return packageJson.version;
  } catch (error) {
    return 'unknown';
  }
}

// CLI 인수 처리
function handleCliArgs(): boolean {
  const args = process.argv.slice(2);
  
  if (args.includes('--version') || args.includes('-v')) {
    console.log(`logging-advisor-mcp v${getVersion()}`);
    return true;
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
logging-advisor-mcp v${getVersion()}

Usage:
  logging-advisor-mcp [options]

Options:
  -v, --version    Show version number
  -h, --help       Show help information

This is an MCP (Model Context Protocol) server for intelligent logging quality analysis.
Run without arguments to start the MCP server.
`);
    return true;
  }
  
  return false;
}

// 서버 시작
async function main(): Promise<void> {
  // CLI 인수 처리
  if (handleCliArgs()) {
    return;
  }
  
  // MCP 서버 모드로 실행
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Logging Analysis Server v2.0 started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});