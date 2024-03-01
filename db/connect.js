// import { connect } from "mongoose"

// Mongo DB
// export async function connectDB() {
//     try {
//         const conn = await connect(process.env.MONGO_URI)
//         console.log(`MongoDB Connected: ${conn.connection.host}`)
//     } catch (error) {
//         console.error(`Error: ${error.message}`)
//         process.exit(1)
//     }
// }

// PostgreSQL Database
import pg from "pg"

export const db = new pg.Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
})