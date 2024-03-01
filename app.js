import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { db } from './db/connect.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet({ crossOriginEmbedderPolicy: false }))
app.use(cors())

// MongoDB
// connectDB()

// PostgreSQL
db.connect()

app.get('/', (req, res) => res.send('<h1>Hello Express!!!</h1>'))

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server listening on port: ${port}`))
