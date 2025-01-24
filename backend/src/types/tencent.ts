export interface Message {
  Role: 'system' | 'user' | 'assistant' | 'tool';
  Content: string;
}

export interface ChatResponse {
  Note: string;
  Choices: Array<{
    FinishReason: string;
    Message: {
      Role: string;
      Content: string;
    };
  }>;
  Created: number;
  Id: string;
  Usage: {
    PromptTokens: number;
    CompletionTokens: number;
    TotalTokens: number;
  };
}

export interface ChatHistory {
  role: string;
  content: string;
  timestamp: number;
} 