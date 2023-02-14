import * as dotenv from 'dotenv';
// import * as pg from 'pg';
import { Sequelize } from 'sequelize';

dotenv.config();

const { DB_NAME, DB_USERNAME, SUPABASE_HOST, SUPABASE_PASSWORD } = process.env;

if (!SUPABASE_HOST || !SUPABASE_PASSWORD) {
  throw new Error('Missing Database config');
}

export const sequelize = new Sequelize(DB_USERNAME, DB_NAME, SUPABASE_PASSWORD, {
  host: SUPABASE_HOST,
  dialect: 'postgres',
  // dialectModule: pg,
});
