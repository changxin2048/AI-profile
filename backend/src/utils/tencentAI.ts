import * as tencentcloud from 'tencentcloud-sdk-nodejs-hunyuan';
import { Message } from '../types/tencent';
import dotenv from 'dotenv';
dotenv.config();

// 在文件开头添加系统提示语
const systemPrompt = `速度优先，有结果了即可回复`;

const client = new tencentcloud.hunyuan.v20230901.Client({
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
  region: process.env.TENCENT_REGION || 'ap-beijing',
  profile: {
    httpProfile: {
      endpoint: 'hunyuan.tencentcloudapi.com',
    },
  },
});

let messages: Message[] = [];

export const chatWithTencent = async (message: string): Promise<string> => {
  try {
    // 设置系统提示语
    // messages = [{
    //   Role: 'system',
    //   Content: systemPrompt
    // }];

    // 添加用户消息到历史记录
    messages.push({
      Role: 'user',
      Content: message
    });
    

    // 调用混元大模型API
    const response = await client.ChatCompletions({
      Messages: messages,
      Model: 'hunyuan-turbo-latest',
      Temperature: 0.7,
      Stream: false,
      ForceSearchEnhancement: false,
      SearchInfo: true
    });

    if (response?.Choices?.[0]?.Message?.Content) {
      const reply = response.Choices[0].Message.Content;
      console.log('用户提问：', messages);
      console.log(reply);
      messages.push({
        Role: 'assistant',
        Content: reply
      });

      return reply;
    }

    throw new Error('无效的响应格式');

  } catch (error) {
    console.error('腾讯AI调用失败:', error);
    throw error;
  }
};

// 清除聊天历史
export const clearTencentHistory = () => {
  messages = [];
};

// 设置系统提示语
export const setTencentSystemPrompt = (prompt: string) => {
  messages = [{
    Role: 'system',
    Content: prompt
  }];
}; 