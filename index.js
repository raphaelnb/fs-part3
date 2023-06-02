const express = require('express')
const app = express()
app.use(express.json())

let people = [
    {
        "name": "Aarto",
        "number": "453245",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "rodolfo",
        "number": "3049234",
        "id": 6
      }
]

app.get('/api/persons', (request, response) => {
    response.json(people)
})

app.get('/info', (request, response) => {
    const numPeople = people.length
    console.log(numPeople)
    const date = new Date
    response.send(
        `<p>Phonebook has info for ${numPeople} people</p>
        <p>${date}</p>`
    )
})

app.get('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = people.find(person => person.id === id)
   
    person
    ? response.json(person)
    : response.status(404).ind()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    people = people.filter(person => person.id !== id)
    
    response.status(204).end()
})

const generatedId = (min, max) => {
    min = Math.ceil(people.length + 1)
    max = Math.floor(90000)
    const id = Math.floor(Math.random() * (max - min + 1) + min)
    return id 
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
        id: generatedId()   
    }

    people = people.concat(person)

    console.log(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})