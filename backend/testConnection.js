import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

client.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to PostgreSQL successfully!');
  }
  client.end();
});