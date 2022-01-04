// FIX SERVER PORT
// const {SERVER_PORT} = 4204
// let baseUrl = `http://localhost:${SERVER_PORT}`
const nameInput = document.querySelector('#name')
const naughtyInput = document.querySelector('#naughty')
const imgInput = document.querySelector('#image')

let cards = getAllCards()

axios.get(`http://localhost:4204/getAllCards`)

// const getAllCards = () => {axios.get(`${baseUrl}/getAllCards`)}
const createCard = () => {}
const deleteCard = () => {}
const updateCard = () => {}

getAllCards()

console.log(cards)