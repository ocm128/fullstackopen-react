import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'
import './index.css';


const Filter = ({value, onChange}) => 
  <div>
      filter shown with <input value={value} onChange={onChange} />
  </div>
  
const Persons = ({persons, searchName, removePerson}) => {
  const exp = new RegExp( searchName, 'i' );
  const result =  persons.filter(person => person.name.match(exp))
  return (
    result.map(person => <p key = {person.id}>{person.name}: {person.number} {''}
       <button className='btn-delete' 
          onClick={() => removePerson(person.id)}> Delete</button></p>)
  )
}

const PersonForm = ({onSubmit, newName, handleAddPerson, newNumber, handleAddNumber}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleAddPerson}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleAddNumber} />
      </div>
      <div>
        <button className='btn-add' type="submit">Add</button>
      </div>
    </form>
  )
}

const Notification = ({ msg, type }) => {
  if (msg === null) {
    return null
  }

  if(type === 'info'){
      return <div className="info">{msg}</div> 
  } else if (type === 'error'){
      return <div className="error">{msg}</div>
  }
}

const App = () => {
  /* const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '945554422'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])  */
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ notificationMsg, setNotificationMsg ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const objPerson = {
      name: newName,
      number: newNumber,
    };
    let repeated = persons.some(
      (person) => person["name"].toLowerCase() === newName.toLowerCase()
    );
    if(repeated) {
      if(window.confirm(`${newName} is already added to phonebook. Replace old phone number?`)) {
        const personExist = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase());
        const updatedPerson = {...personExist, number: newNumber}
      
        personService
          .update(personExist.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== personExist.id ? person : response.data))
            console.log(`${newName} was updated`)
            setNotificationMsg(`${newName} was updated`);
            setNotificationType("info");
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setNotificationMsg(null)
            }, 5000)
          })
      } 
    }else {
      if(newName !== ''){
          personService
          .create(objPerson)
          .then((response) => { setPersons(persons.concat(response.data));
            setNotificationMsg(`${objPerson.name} has been added`);
            setNotificationType("info");
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setNotificationMsg(null);
            }, 3000);
          })
          .catch((error) => {
            console.log('Error adding a new person', error);
            setNotificationMsg(`${error.response.data.error}`);
            setNotificationType("error");
          });
      }
    }
  };

  const removePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    const confirm = window.confirm(`Delete ${personToDelete.name}?`)
    if (confirm) {
      personService
        .deletePerson(personToDelete.id)
        .then((response) => personService.getAll())
        .then((response) => setPersons(response.data));
      setNotificationMsg(`${personToDelete.name} has been removed`)
      setNotificationType('error');

      setTimeout(() => {
        setNotificationMsg(null)
      }, 2000);
    }
  }

  const handleAddPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification msg={notificationMsg} type={notificationType} />  
        <Filter value={searchName} onChange={handleSearchName} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson} 
        newName={newName}
        handleAddPerson={handleAddPerson} 
        newNumber={newNumber} 
        handleAddNumber={handleAddNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} removePerson={removePerson}/>
    </div>
  )
}

export default App;
