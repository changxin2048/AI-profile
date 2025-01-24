import { Request, Response } from 'express';
import { SQLiteMessageRepository } from '../repositories/messageRepository';

const messageRepo = new SQLiteMessageRepository();

export const resultController = {
  async receiveResult(req: Request, res: Response) {
    try {
      const result = req.body;
      const messageContent = result.text?.content || '';
      console.log('收到外部请求结果:', messageContent);
      // 存储消息
      const message = await messageRepo.create({
        content: messageContent,
        status: 'pending',
        source: 'external',
        metadata: JSON.stringify({
          ip: req.ip,
          headers: req.headers,
          timestamp: new Date().toISOString()
        })
      });

      console.log('收到外部请求:', {
        消息ID: message.id,
        时间: new Date().toLocaleString(),
        请求体: result,
        IP: req.ip
      });

      res.json({
        code: 200,
        message: 'success',
        data: { messageId: message.id },
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('处理外部请求失败:', error);
      res.status(500).json({
        code: 500,
        message: 'error',
        error: '处理请求失败',
        timestamp: Date.now()
      });
    }
  }
}; 