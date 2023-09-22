import pg from 'pg';

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

export default client;
