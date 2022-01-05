// FIX SERVER PORT
const {SERVER_PORT} = 4204
let baseUrl = `http://localhost:${SERVER_PORT}`
const nameInput = document.querySelector('#name')
const naughtyInput = document.querySelector('#naughty')
const imgInput = document.querySelector('#image')
const cardContainer = document.querySelector('#card-container')

const getAllCards = () => axios.get(`http://localhost:4204/getAllCards`).then(res=>{
    let cards = res.data
    displayCards(cards)
    console.log(cards)
})

const createCard = card => {
    const newCard = document.createElement('div')
    newCard.setAttribute('class','card')
    newCard.setAttribute('id',`${card.card_id}`)

    newCard.innerHTML = `<img src=${card.img} class="card_image"/>
    <p class="name">${card.name}</p>
    <div class="naughty-container">
        <button onclick="updateCard(${card.card_id}, 'minus')">-</button>
        <p class="naughty-amount">${card.naughty}</p>
        <button onclick="updateCard(${card.card_id}, 'plus')">+</button>
    </div>
    <button onclick="deleteCard(${card.card_id})">delete</button>
    `
    cardContainer.appendChild(newCard)
}
const displayCards = arr =>{
    console.log(arr)
    cardContainer.innerHTML = ``
    for (let i=0; i<arr.length; i++){
        createCard(arr[i])
    }
}

const createNewCard = () => {}
const deleteCard = () => {}
const updateCard = () => {}

getAllCards()
