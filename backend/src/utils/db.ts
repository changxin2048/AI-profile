import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// 数据库连接
export const getDb = async () => {
  return open({
    filename: './messages.db',
    driver: sqlite3.Database
  });
};

// 初始化数据库
export const initDb = async () => {
  const db = await getDb();
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      source TEXT NOT NULL DEFAULT 'external',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      metadata TEXT
    )
  `);
  
  return db;
}; 