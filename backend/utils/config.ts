import dotenv from 'dotenv';

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/genshin-tcg';
const PASS = process.env.PASS

export {MONGODB_URI, PASS}