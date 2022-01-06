// FIX SERVER PORT
const {SERVER_PORT} = 4204
let baseUrl = `http://localhost:${SERVER_PORT}`
const nameInput = document.querySelector('#name')
const naughtyInput = document.querySelector('#naughty')
const imgInput = document.querySelector('#image')
const cardContainer = document.querySelector('#card-container')
const submitButton = document.querySelector('#submit')
const inputForm = document.querySelector('#input-form')
const deleteButton = document.querySelector('.delete-button')

const waitFunc = () => setTimeout("location.reload(true);", 10)

const getAllCards = () => axios.get(`http://localhost:4204/getAllCards`).then(res=>{
    let cards = res.data
    displayCards(cards)
    // console.log(cards)
})

const createCard = card => {
    const newCard = document.createElement('div')
    newCard.setAttribute('class','card')
    newCard.setAttribute('id',`${card.card_id}`)
    let newNaughty = 3*card.naughty


    newCard.innerHTML = `
    <style>
    #card-${card.card_id}{
        background: url('${card.img}');
        background-size: 300px 300px;
        width: 300px;
        height: ${newNaughty}px;
        background-position: bottom;
    }
    </style>
    <div id="card-${card.card_id}"class="card-image"></div>
    <p class="name">${card.name}</p>
    <div class="naughty-container">
        <button onclick="updateCard(${card.card_id}, 'minus')">-</button>
        <p class="naughty-amount">${card.naughty}</p>
        <button onclick="updateCard(${card.card_id}, 'plus')">+</button>
    </div>
    <button class = "delete-button" onclick="deleteCard(${card.card_id})">delete</button>
    `
    cardContainer.appendChild(newCard)
}

const displayCards = arr =>{
    cardContainer.innerHTML = ``
    for (let i=0; i<arr.length; i++){
        createCard(arr[i])
    }
    console.log(arr)
}

const createNewCard = body => axios.post(`http://localhost:4204/createNewCard`, body).then(res=>displayCards(res.data))

const submitHandler = e => {
    e.preventDefault()
let bodyObj = {
    name: nameInput.value,
    naughty: naughtyInput.value,
    img: imgInput.value
}
console.log('index', bodyObj)
createNewCard(bodyObj)

waitFunc()
}
submitButton.addEventListener('click', createNewCard)

const updateCard = (card_id, type, naughty) => axios.put(`http://localhost:4204/updateCard/${card_id}`, {type, naughty}).then(res=>{displayCards(res.data)})

const deleteCard = card_id => axios.delete(`http://localhost:4204/deleteCard/${card_id}`).then(res=>{displayCards(res.data)})

inputForm.addEventListener('submit', submitHandler)

getAllCards()
