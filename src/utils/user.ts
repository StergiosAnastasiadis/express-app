import jwt from 'jsonwebtoken'

import { db } from "../db/connect.js"

export const getUser = async (email: string) => {
    const query = `SELECT email, password, firstname, lastname FROM users WHERE email='${email}'`
    const user = await db.query(query)

    if (user.rows) return user.rows[0]

    return false
}

// @ts-ignore
export const generateToken = async (userInfo) => {
    return jwt.sign(userInfo, 'JWT_SECRET', { expiresIn: '1h' })
}
