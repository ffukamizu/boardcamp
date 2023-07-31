import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
};

if (process.env.NODE_ENV === 'production') {
    consigDatabase.ssl = true;
}

const db = new Pool(configDatabase);

try {
    await db.connect();
    console.log('PG Database online');
} catch (err) {
    (err) => console.log(err.message);
}

export default db;