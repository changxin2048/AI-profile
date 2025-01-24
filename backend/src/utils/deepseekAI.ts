import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// 系统提示语
const systemPrompt = `速度优先，有结果了即可回复`;

const deepseekClient = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com'
});

// 定义消息类型
type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// 保存消息历史
let messages: Message[] = [];

export const chatWithDeepseek = async (message: string): Promise<string> => {
  try {
    // 添加用户消息到历史记录
    messages.push({
      role: 'user',
      content: message
    });

    const response = await deepseekClient.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      stream: false
    });

    if (response?.choices?.[0]?.message?.content) {
      const reply = response.choices[0].message.content;
      console.log('用户提问：', messages);
      console.log(reply);
      
      // 将助手回复添加到历史记录
      messages.push({
        role: 'assistant',
        content: reply
      });

      return reply;
    }

    throw new Error('无效的响应格式');
  } catch (error) {
    console.error('DeepSeek API error:', error);
    throw new Error('与 DeepSeek AI 通信时出错');
  }
};

// 清除聊天历史
export const clearDeepseekHistory = () => {
  messages = [];
};

// 设置系统提示语
export const setDeepseekSystemPrompt = (prompt: string) => {
  messages = [{
    role: 'system',
    content: prompt
  }];
}; 