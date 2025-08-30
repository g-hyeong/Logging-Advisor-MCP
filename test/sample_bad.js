// 나쁜 로깅 예시 - 여러 문제점 포함
const express = require('express');
const app = express();

// 문제 1: console.log 남용
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // 문제 2: 민감정보 노출
    console.log('Login attempt:', username, password);
    
    try {
        const user = authenticateUser(username, password);
        console.log('User logged in: ' + user.id); // 문제 3: 비구조화 로깅
        res.json({ success: true });
    } catch (error) {
        // 문제 4: 에러 무시
        res.status(401).json({ success: false });
    }
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    
    // 문제 5: 과도한 디버그 로깅
    console.log('Step 1: Getting user');
    console.log('Step 2: Checking permissions');
    console.log('Step 3: Fetching from database');
    
    try {
        const user = getUser(userId);
        const apiKey = process.env.API_KEY;
        // 문제 6: API 키 노출
        console.log('Using API key:', apiKey);
        
        res.json(user);
    } catch (err) {
        // 문제 7: 스택트레이스 누락
        console.log('Error occurred');
        res.status(500).send('Internal error');
    }
});

// 문제 8: 로그 레벨 미사용
console.log('Server starting...');
console.log('Database connected');
console.log('Warning: Low memory');
console.log('Error: Connection failed');