const express = require('express')
const cors = require('cors')
require('dotenv').config()
const {SERVER_PORT} = process.env
const {seed, getAllCards, createNewCard, updateCard, deleteCard} = require('./controller.js')
const app = express()

app.use(cors())
app.use(express.json())
const ctrl = require('./controller.js')

app.post('/seed', seed)
app.get('/getAllCards', getAllCards)
app.post('/createNewCard', createNewCard)
app.put('/updateCard/:card_id', updateCard)
app.delete('/deleteCard/:card_id', deleteCard)

app.listen(SERVER_PORT, console.log(`literally crying and screaming on port ${SERVER_PORT}`))