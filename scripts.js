const baseUrl = 'https://rickandmortyapi.com/api'

const container = document.querySelector('#container')
const searchContainer = document.createElement('div')
const input = document.querySelector('#charselect')
const buttonAlive = document.querySelector('#alive-button')
const buttonDead = document.querySelector('#dead-button')
const home = document.querySelector('#home')

let characters = []
let aliveCharacter = []
let deadCharacter = []
let selectedChar = []

async function getCharacter() {
  await fetch(baseUrl + '/character')
    .then(res => res.json())
    .then(data => {
      characters = data.results.map(character => {
        const {
          id,
          name,
          status,
          species,
          gender,
          image,
          location,
          episode,
          origin
        } = character
        return {
          id,
          name,
          status,
          species,
          gender,
          image,
          episode,
          origin: origin.name,
          location: location.name
        }
      })
    })
    .catch(() => alert('Conexão com API não estabelecida'))
  render(characters)
}

function render(characters) {
  container.innerHTML = ''

  characters.forEach(char => {
    const cardContent = `
    <div class="card-container"> 
    <img src=${char.image} />
    <h2> ${char.name}</h2>
    
    <div class="gender-wrapper">
    <span class="material-icons md-24 ${
      char.gender === 'Male' ? 'blue700' : 'pink700 '
    }"> ${char.gender === 'Male' ? 'male' : 'female'}</span>
    <p>${char.species}</p>
    </div>
    <div class="status-wrapper">
    <span class="material-icons  md-24 ${
      char.status === 'Alive'
        ? 'green600'
        : char.status === 'Dead'
        ? 'red600'
        : 'yellow600'
    }">
      ${
        char.status === 'Alive' || char.status === 'Dead'
          ? 'circle'
          : 'question_mark'
      }</span>
    <p>${char.status} </p>
    </div>
    
    <div class="local-wrapper">
    <span class="material-icons blue500 md-24">my_location</span>
    <p>${char.location}</p>
    </div>

    <div class="local-wrapper">
    <span class="material-icons blue500 md-24">public</span>
    <p>${char.origin}</p>
    </div>

    <div class="displayed-wrapper"> 
    <span class="material-icons yellow600 md-24">verified</span>
    <p>Aparições: ${char.episode.length}</p>
    </div>
  `
    container.innerHTML += cardContent
  })
}

function statusFilterAlive() {
  characters.filter(char => {
    if (char.status === 'Alive' && char.status !== 'unknown')
      aliveCharacter.push(char)
    deadCharacter = []
    render(aliveCharacter)
  })
}

function statusFilterDead() {
  characters.filter(char => {
    if (char.status === 'Dead' && char.status !== 'unknown')
      deadCharacter.push(char)
    aliveCharacter = []
    render(deadCharacter)
  })
}

function searchCharacter() {
  let content = input.value
  characters.filter(char => {
    if (content === char.name) {
      selectedChar.push(char)
      render(selectedChar)
    }
  })
}

buttonAlive.addEventListener('click', statusFilterAlive)
buttonDead.addEventListener('click', statusFilterDead)
home.addEventListener('click', getCharacter)
input.addEventListener('change', searchCharacter)

getCharacter()
