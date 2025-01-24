import dotenv from 'dotenv';
import { ChatCompletion, setEnvVariable } from "@baiducloud/qianfan";

// 确保在最开始就加载环境变量
dotenv.config();

// 从环境变量中读取密钥
setEnvVariable('QIANFAN_ACCESS_KEY', process.env.QIANFAN_ACCESS_KEY || '');
setEnvVariable('QIANFAN_SECRET_KEY', process.env.QIANFAN_SECRET_KEY || '');
const client = new ChatCompletion();
console.log('API Key:', process.env.QIANFAN_ACCESS_KEY);
console.log('Secret Key:', process.env.QIANFAN_SECRET_KEY);

export const chatWithBaidu = async (message: string): Promise<string> => {
  try {
    const response = await client.chat({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    }, 'ernie-4.0-8k-latest');  // 使用 ERNIE-3.5-8K 模型

    console.log('Chat response:', response);
    // @ts-ignore 处理返回值类型问题
    return response?.result || response?.content || '';
    
  } catch (error: any) {
    console.error('Chat error:', error.response?.data || error.message);
    throw new Error(`Chat failed: ${error.message}`);
  }
}; 