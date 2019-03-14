require('dotenv').load();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const client = 'pg';
export const useNullAsDefault = true;
export const connection = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: true, // depends on your database setup
};