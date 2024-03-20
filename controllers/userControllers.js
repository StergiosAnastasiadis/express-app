import { randomBytes } from 'crypto';
import { db } from '../db/connect.js';
import _ from 'lodash';
import bcrypt from 'bcryptjs'
import { generateToken, getUser } from '../utils/user.js'

const authUser = async (req, res) => {
    const email = req.body.email?.trim().toLowerCase()
    const password = req.body.password?.trim()

    if (!email || !password) {
        return res.status(400).send({ error: true, message: 'All Fields Required' })
    }

    const userInfo = await getUser(email)
    if (!userInfo) {
        return res.status(404).send({ error: true, message: 'User not found' })
    }

    if (!bcrypt.compareSync(password, userInfo.password)) {
        return res.status(403).send({ message: 'Incorrect Password' })
    }

    const user = await generateToken(userInfo)

    res.status(200).send({ error: false, userInfo, user })
}

const registerUser = async (req, res) => {
    const email = req.body.email?.toLowerCase().trim()
    const password = req.body.password?.trim()
    const firstname = _.capitalize(req.body.firstname)
    const lastname = _.capitalize(req.body.lastname)

    if (!email || !password || !firstname || !lastname) {
        res.status(400).send({ error: true, message: 'All Fields Required required - Email | Password  | Firstname | Lastname ' })
        return
    }

    const user = await getUser(email)

    if (user) {
        res.status(400).send({ error: true, message: 'User Already Exists' })
        return
    }

    const activationToken = randomBytes(20).toString('hex');

    const encryptedPassword = bcrypt.hashSync(password, 10)

    await db.query('INSERT INTO users (email, password, firstname, lastname, active, "activationToken") VALUES ($1, $2, $3, $4, $5, $6)',
        [email, encryptedPassword, firstname, lastname, false, activationToken]
    )

    res.send({ email, firstname, lastname })
}

export {
    authUser,
    registerUser
}