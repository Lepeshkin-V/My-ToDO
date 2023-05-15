import { config } from 'dotenv';

config();

export const DB_URL = process.env.MONGO_URL;