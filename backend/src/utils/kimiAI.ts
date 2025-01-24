import axios from 'axios';

interface KimiResponse {
  id: string;
  object: string;
  created: number;
  choices: [{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export const chatWithKimi = async (message: string): Promise<string> => {
  try {
    const response = await axios.post<KimiResponse>(
      'https://api.moonshot.cn/v1/chat/completions',
      {
        model: 'moonshot-v1-8k',
        messages: [{
          role: 'user',
          content: message
        }],
        temperature: 0.7,
        stream: false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.KIMI_API_KEY}`
        }
      }
    );

    console.log('Kimi response:', response.data);
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('Kimi error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
}; 