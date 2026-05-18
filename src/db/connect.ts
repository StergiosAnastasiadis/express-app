import pg from 'pg';

export const db = new pg.Client({
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
})
