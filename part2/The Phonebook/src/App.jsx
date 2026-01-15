import { useState, useEffect } from "react";
import service from './services/person'
import Notification from "./services/notification";

const App = () => {
  // const [person, setPerson] = useState([
  //   { name: "Diwakar Prasad", number: 8475889263, id: 5 },
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]);

  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterName, setFilterName] = useState("");
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    // console.log('use-effect')
    // axios
    // .get('http://localhost:3001/persons')
    // .then(Response => {
    //   console.log('fullfilled')
    //   setPerson(Response.data)
    // })

    service.getAll().then(intialData => setPerson(intialData))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (person.filter((obj) => obj.name === newName).length > 0) {
    //   alert(`${newName} is already added to phonebook`);
    //   return;
    // }
    const existingPerson = person.find(obj => obj.name === newName)
    if(existingPerson){
      alert(`${existingPerson.name} is already added to phonebook, replace the older number to new one`)
      let newPerson = {...existingPerson, number: newNum}
      service.update(existingPerson.id, newPerson)
      .then(returnedPerson => {
      setPerson(person.map(obj => obj.id === existingPerson.id ? returnedPerson : obj))
      setErrorMsg(`${newPerson.name}'s number is changed`)
      setTimeout(()=> setErrorMsg(null), 5000)
      setNewName('')
      setNewNum('')
      })
      .catch(error => {
      setErrorMsg(error.response?.data?.error || 'Error updating number');
      setTimeout(() => setErrorMsg(null), 5000);
      }
    );

    } else {

    let newPerson = {
      name: newName,
      number: newNum,
      // id: String(person.length + 1)
    };

    // axios.post('http://localhost:3001/persons', newPerson).then(Response => {
    //   setPerson(person.concat(Response.data))
    //   setNewName('')
    //   setNewName('')
    // })
    // // setPerson(person.concat(newPerson));
    // // setNewName("");
    // // setNewNum("");

    service.create(newPerson)
    .then(returnedData => {
    setPerson(person.concat(returnedData))
    setErrorMsg(`Added ${newPerson.name} `)
    setTimeout(()=> setErrorMsg(null), 5000)
    setNewName('')
    setNewNum('')
    })
    .catch(error => {
      console.log(error)
      setErrorMsg(error.response?.data?.error)
      setTimeout(() => setErrorMsg(null), 5000)
    })
}
  };

const handleDelete = (personToDelete) => {
  if (!window.confirm(`Delete ${personToDelete.name}?`)) return;

  service
    .dlt(personToDelete.id)
    .then(() => {
      setPerson(person.filter(p => p.id !== personToDelete.id));
    })
    .catch(() => {
      setErrorMsg(`Information of ${personToDelete.name} has already been removed from server`);
      setTimeout(() => setErrorMsg(null), 5000);

      setPerson(person.filter(p => p.id !== personToDelete.id));
    });
};



  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

const filteredPersons = filterName
  ? person.filter(obj => obj.name.toLowerCase().includes(filterName.toLowerCase()))
  : []; 


  const handleFilterChange = (event) => setFilterName(event.target.value);

  const handleNumChange = (event) => setNewNum(event.target.value);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={errorMsg} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} filteredPersons={filteredPersons} />

      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName = {newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} />

      <h2>Numbers:</h2>
      <Persons person={person} handleDelete={handleDelete} />
    </div>
  );
};

const Filter = ({filterName, handleFilterChange, filteredPersons}) => {
  return(
    <>
  filter shown with{" "}
        <input type="text" value={filterName} onChange={handleFilterChange} />
        <div>
          {filteredPersons.map((obj) => (
            <p key={obj.id}>
              {obj.name} {obj.number}
            </p>
          ))}
        </div>
 </>
  )
}

const PersonForm = ({handleSubmit, newName, handleNameChange, newNum, handleNumChange}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            required
          />
          <br />
          number: <input value={newNum} onChange={handleNumChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({person, handleDelete}) => {
  return(
    <>
    {person.map((obj) => (
        <p key={obj.id}>
          {obj.name} {obj.number} 
          <button onClick={() => handleDelete(obj)}>delete</button>
        </p>
      ))}
    </>
  )
}
export default App;
