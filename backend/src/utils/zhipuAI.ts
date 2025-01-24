import { ZhipuAI } from "zhipuai-sdk-nodejs-v4";
import dotenv from 'dotenv';

// 确保在最开始就加载环境变量
dotenv.config();

const client = new ZhipuAI({
  apiKey: process.env.ZHIPU_API_KEY || ''
});

// export const chatWithZhipu = async (message: string): Promise<string> => {
  // try {
  //   const response = await client.createChatCompletion({
  //     model: "glm-4",
  //     messages: [{
  //       role: "user",
  //       content: message
  //     }],
  //     temperature: 0.7,
  //     top_p: 0.7,
  //     max_tokens: 1500
  //   });

  //   console.log('Chat response:', response);
  //   return response.choices[0].message.content;
  // } catch (error: any) {
  //   console.error('Chat error:', error);
  //   throw new Error(error.message);
  // }
// }; 