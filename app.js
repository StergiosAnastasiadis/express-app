import express from 'express'
import helmet from 'helmet'
import { connectDB } from './db/connect.js'

const app = express()

app.use(helmet({ crossOriginEmbedderPolicy: false }))

connectDB()

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!!!</h1>')
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server listening on port: ${port}`))
