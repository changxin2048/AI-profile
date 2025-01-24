import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 3001;

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// CORS配置
app.use(cors());
app.use(express.json());

// 健康检查路由 - 放在最前面
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// API路由
app.use('/api', routes);

// 静态文件服务
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// 所有其他请求返回前端应用
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// 启动服务器
const server = app.listen(port,'0.0.0.0',() => {
  console.log(`Server is running on port ${port}`);
  console.log(`Health check endpoint: http://localhost:${port}/api/health`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});