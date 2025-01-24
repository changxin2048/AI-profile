export interface Bookmark {
  id: number;
  title: string;
  url: string;
  description?: string;
  created_at: string;
}

export interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
} 