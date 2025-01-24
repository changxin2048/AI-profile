import { Message, MessageRepository } from '../types/message';
import { getDb } from '../utils/db';
import { Database } from 'sqlite3';
import fs from 'fs';
import path from 'path';

export class SQLiteMessageRepository implements MessageRepository {
  private db: Database;

  constructor() {
    this.db = new Database('messages.db');
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    const migration = fs.readFileSync(
      path.join(__dirname, '../db/migrations/001_create_messages_table.sql'),
      'utf8'
    );
    
    return new Promise((resolve, reject) => {
      this.db.exec(migration, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  async create(message: Partial<Message>): Promise<Message> {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO messages (content, status, source, metadata)
       VALUES (?, ?, ?, ?)`,
      message.content,
      message.status || 'pending',
      message.source || 'external',
      message.metadata || null
    );
    
    return {
      id: result.lastID,
      ...message
    } as Message;
  }

  async findById(id: number): Promise<Message | null> {
    const db = await getDb();
    const result = await db.get<Message>('SELECT * FROM messages WHERE id = ?', id);
    return result || null;
  }

  async updateStatus(id: number, status: Message['status']): Promise<boolean> {
    const db = await getDb();
    const result = await db.run(
      `UPDATE messages 
       SET status = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      status, id
    );
    return (result?.changes || 0) > 0;
  }

  async getAll(): Promise<Message[]> {
    const db = await getDb();
    return db.all('SELECT * FROM messages ORDER BY created_at DESC');
  }

  async findLatestPending(): Promise<Message | null> {
    const db = await getDb();
    const result = await db.get<Message>(
      `SELECT * FROM messages 
       WHERE status = 'pending' 
       ORDER BY created_at DESC 
       LIMIT 1`
    );
    return result || null;
  }
} 