import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { db } from './db/connect.js'

import router from './services/router.js'

import { notFound } from './middleware/errorMiddleware.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Add Security Headers
app.use(helmet({ crossOriginEmbedderPolicy: false }))

// Enable CORS
app.use(cors())

// PostgreSQL
db.connect().then(() => console.log("DB Connected")).catch(error => console.error(error.message));

app.use('/', router)
app.get('/', (req, res) => res.send('<h1>Hello Express!!!</h1>'))

app.use(notFound)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server listening on port: ${port}`))

// TODO check the Docs for the VSCode Extensions for Docker

// TODO Start a Postgres DB and Connect to IT
// TODO Fix the Dockerfile to run with TS and with not devDependencies

// TODO Add ESLint and Prettier

// TODO Check the ZTM Auth (Session Tokens)
// ? Add Passport.js 

// TODO Add a Logger

// TODO Add Unit Tests

// ? Sockets
// ? File CRUD
// ? Add a MailService



// ! Frontend Angular App
// TODO Create an Angular App
// TODO Add prettier eslint
// TODO Add a UI Library
// TODO Add the Authentication Logic