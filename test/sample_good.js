// 좋은 로깅 예시 - 베스트 프랙티스 적용
const express = require('express');
const winston = require('winston');
const app = express();

// 구조화된 로거 설정
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    const requestId = req.headers['x-request-id'];
    
    // 민감정보 제외, 컨텍스트 포함
    logger.info('Login attempt', {
        username,
        requestId,
        ip: req.ip,
        timestamp: new Date().toISOString()
    });
    
    try {
        const user = authenticateUser(req.body);
        logger.info('User authenticated successfully', {
            userId: user.id,
            requestId
        });
        res.json({ success: true });
    } catch (error) {
        // 에러 로깅 with 스택트레이스
        logger.error('Authentication failed', {
            error: error.message,
            stack: error.stack,
            username,
            requestId
        });
        res.status(401).json({ success: false });
    }
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const requestId = req.headers['x-request-id'];
    
    logger.debug('Fetching user', { userId, requestId });
    
    try {
        const user = getUser(userId);
        
        // API 키는 로깅하지 않음
        logger.info('User fetched successfully', {
            userId,
            requestId,
            responseTime: Date.now() - req.startTime
        });
        
        res.json(user);
    } catch (error) {
        // 완전한 에러 정보 로깅
        logger.error('Failed to fetch user', {
            error: error.message,
            stack: error.stack,
            userId,
            requestId,
            context: 'user-fetch'
        });
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 적절한 로그 레벨 사용
logger.info('Server starting', { port: 3000 });
logger.info('Database connected', { db: 'production' });
logger.warn('Low memory detected', { available: '100MB' });
logger.error('Connection failed', { 
    service: 'redis',
    retrying: true,
    nextRetry: '5s'
});