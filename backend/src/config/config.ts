import dotenv from 'dotenv';
dotenv.config();

export const tencentConfig = {
  secretId: process.env.TENCENT_SECRET_ID,
  secretKey: process.env.TENCENT_SECRET_KEY,
  region: process.env.TENCENT_REGION || 'ap-guangzhou'
};
