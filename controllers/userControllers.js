import { randomBytes } from 'crypto';
import { db } from '../db/connect.js';
// import { capitalize } from 'lodash';
import _ from 'lodash';
import bcrypt from 'bcryptjs'

const authUser = async (req, res) => {
    const { email, password } = req.body
    res.json({ email, password })
}

const registerUser = async (req, res) => {
    const email = req.body.email.toLowerCase().trim()
    const password = req.body.email.trim()
    const firstname = _.capitalize(req.body.firstname)
    const lastname = _.capitalize(req.body.lastname)

    if (!email || !password || !firstname || !lastname) {
        res.status(400).json({ error: true, message: 'All Fields Required required - Email | Password  | Firstname | Lastname ' })
    }

    const activationToken = randomBytes(20).toString('hex');

    const encryptedPassword = bcrypt.hashSync(password, 10)
    console.log(encryptedPassword);

    await db.query('INSERT INTO users (email, password, firstname, lastname, active, "activationToken") VALUES ($1, $2, $3, $4, $5, $6)',
        [email, encryptedPassword, firstname, lastname, false, activationToken]
    )

    res.json({ email, password, firstname, lastname })
}

export {
    authUser,
    registerUser
}