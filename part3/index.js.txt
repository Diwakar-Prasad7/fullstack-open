const http = require("http");
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())
morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors())
app.use(express.static('dist'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get('/info', (request, response)=> {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response)=>{
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(p => p.id === request.params.id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (!person) {
    return response.status(404).json({ error: 'person not found' })
  }

  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const body = request.body;

  // Validation: name or number missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }


  const nameExists = persons.some(p => p.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  const newId = Math.floor(Math.random() * 1000000);

  const newPerson = {
    id: String(newId),
    name: body.name,
    number: body.number
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});


// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "content-type": "application/json" });
//   response.end(JSON.stringify(persons));
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`)
})