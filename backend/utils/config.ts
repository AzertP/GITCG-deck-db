import dotenv from 'dotenv';

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/genshin-tcg';

export {MONGODB_URI}