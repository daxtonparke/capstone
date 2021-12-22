const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const ctrl = require('./controller.js')

port = process.env.PORT || 4004

app.listen(4004, console.log(`literally crying and screaming on port ${port}`))