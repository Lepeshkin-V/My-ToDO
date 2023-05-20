import { config } from 'dotenv';

config();

export const DB_URL = process.env.MONGO_URL;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY