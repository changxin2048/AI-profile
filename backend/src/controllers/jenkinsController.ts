import { Request, Response } from 'express';

export const triggerJenkinsBuild = async (req: Request, res: Response) => {
  try {
    const response = await fetch('http://10.38.74.11:8080/job/test-autoTest/build', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from('test-changxin:115c38cbf524336d507b0fa932928198d1').toString('base64')
      },
    });

    if (!response.ok) {
      throw new Error('Jenkins构建触发失败');
    }

    res.json({ success: true, message: '构建任务已触发' });
  } catch (error) {
    console.error('Jenkins API调用失败:', error);
    res.status(500).json({ success: false, message: '构建触发失败' });
  }
}; 