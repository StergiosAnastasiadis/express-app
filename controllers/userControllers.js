import { randomBytes } from 'crypto';
import { db } from '../db/connect.js';

const authUser = async (req, res) => {
    const { email, password } = req.body
    res.json({ email, password })
}

const registerUser = async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    const activationToken = randomBytes(20).toString('hex');

    await db.query('INSERT INTO users (email, password, firstname, lastname, active, "activationToken") VALUES ($1, $2, $3, $4, $5, $6)', [email.trim().toLowerCase(), password, firstname, lastname, false, activationToken])

    res.json({ email, password, firstname, lastname })
}

export {
    authUser,
    registerUser
}