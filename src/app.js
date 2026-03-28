import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

// import { db } from './db/connect.js'

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
// db.connect()

app.use('/', router)
app.get('/', (req, res) => res.send('<h1>Hello Express!!!</h1>'))

app.use(notFound)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server listening on port: ${port}`))


// TODO Add Typescript
// TODO Add ES Lint and Prettier
// TODO Add some Unit tests

// TODO Add a Docker-Compose YML File to start a Postgres DB
// TODO Add some Routes
// ? Add Passport.js for Auth ?

// TODO Check the ZTM Auth Section with Cookies and Sessions

// TODO 