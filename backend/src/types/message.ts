export interface Message {
  id?: number;
  content: string;
  status: 'pending' | 'processed' | 'failed';
  source: 'external' | 'internal';
  created_at?: string;
  updated_at?: string;
  metadata?: string;
}

export interface MessageRepository {
  create(message: Partial<Message>): Promise<Message>;
  findById(id: number): Promise<Message | null>;
  updateStatus(id: number, status: Message['status']): Promise<boolean>;
  getAll(): Promise<Message[]>;
} 