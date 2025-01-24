import axios from 'axios';

export const chatWithAI = async (message: string) => {
  try {
    const response = await axios.post('/api/chat', { message });
    return response.data.data;
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
}; 