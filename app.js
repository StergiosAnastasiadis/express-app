import express from 'express'
import helmet from 'helmet'
import { db } from './db/connect.js'

const app = express()

app.use(helmet({ crossOriginEmbedderPolicy: false }))

// MongoDB
// connectDB()

// PostgreSQL
db.connect()

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!!!</h1>')
})

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server listening on port: ${port}`))
