import { Request, Response } from 'express';
// import { chatWithTencent } from '../utils/tencentAI';
import { chatWithDeepseek } from '../utils/deepseekAI';

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const response = await chatWithDeepseek(message);
    res.json({ success: true, data: response });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error?.message || 'Unknown error'
    });
  }
}; 