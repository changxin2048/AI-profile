import { Request, Response } from 'express';
import { SQLiteMessageRepository } from '../repositories/messageRepository';

const messageRepo = new SQLiteMessageRepository();

export const messageController = {
  async getLatestPending(req: Request, res: Response) {
    try {
      const message = await messageRepo.findLatestPending();

      res.json({
        success: true,
        data: message
      });
    } catch (error) {
      console.error('获取消息失败:', error);
      res.status(500).json({
        success: false,
        error: '获取消息失败'
      });
    }
  },
  async updateMessageStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const success = await messageRepo.updateStatus(Number(id), status);
      
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ 
          success: false, 
          error: '消息不存在' 
        });
      }
    } catch (error) {
      console.error('更新消息状态失败:', error);
      res.status(500).json({
        success: false,
        error: '更新状态失败'
      });
    }
  }
}; 