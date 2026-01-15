import { useState, useEffect } from 'react';
import axios from 'axios';


const Country = ({ country }) => {
  if (!country) return null; 

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital && country.capital[0]}</p>
      <p>Area: {country.area} km²</p>

      <h3>Languages:</h3>
      <ul>
        {country.languages && Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  );
};




const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selected, setSelected] = useState(null);

  // Fetch all countries on mount
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error(error));
  }, []);

  // Filter countries whenever search changes
  useEffect(() => {
    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(results);
    setSelected(null); // reset selected whenever search changes
  }, [search]);

  const handleChange = (event) => setSearch(event.target.value);

  const handleShow = (country) => setSelected(country);

  const renderContent = () => {
    if (selected) {
      return <Country country={selected} />;
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.name.common}>
              {country.name.common}{' '}
              <button onClick={() => handleShow(country)}>show</button>
            </li>
          ))}
        </ul>
      );
    } else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    } else {
      return <p>No matches found</p>;
    }
  };

  return (
    <div>
      <h1>Country Info</h1>
      <div>
        Find countries: <input value={search} onChange={handleChange} />
      </div>
      {renderContent()}
    </div>
  );
};

export default App;

