const express = require('express')
const http = require("http");
const app = express()

const host = 'localhost';
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})