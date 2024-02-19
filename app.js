const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!!!</h1>')
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server listening on port: ${port}`))
