import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found")
        return res.json()
      })
      .then(data => setCountry(data))
      .catch(() => setCountry(null))
  }, [name])

  return country
}

// const Country = ({ country }) => {
//   if (!country) {
//     return null
//   }

//   if (!country.found) {
//     return (
//       <div>
//         not found...
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h3>{country.data.name} </h3>
//       <div>capital {country.data.capital} </div>
//       <div>population {country.data.population}</div> 
//       <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
//     </div>
//   )
// }

const Country = ({ country }) => {
  if (!country) return <div>not found...</div>

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <img src={country.flags.png} height="100" alt={`flag of ${country.name.common}`} />
    </div>
  )
}


const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App