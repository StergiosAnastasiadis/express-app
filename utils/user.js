import { db } from "../db/connect.js"
import jwt from 'jsonwebtoken'

export const getUser = async (email) => {
    const query = `SELECT email, password, firstname, lastname FROM users WHERE email='${email}'`
    const user = await db.query(query)

    if (user.rows) return user.rows[0]

    return false
}

export const generateToken = async (userInfo) => {
    return jwt.sign(userInfo, 'JWT_SECRET', { expiresIn: '1h' })
}
