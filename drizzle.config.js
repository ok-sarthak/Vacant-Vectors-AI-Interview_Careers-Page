import dotenv from 'dotenv';

// dotenv.config({ path: './.env.local' });
dotenv.config({ path: './.env' });

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
};