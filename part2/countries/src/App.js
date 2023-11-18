
import React, {useState, useEffect} from 'react';
import axios from 'axios'


const Filter = ({value, onChange}) => 
  <div>
      Find countries: <input type="text" id="search-form" value={value} onChange={onChange} />
  </div>


const ShowAll = ({countries, searchCountry, handleSearchCountry}) => {
  //console.log(countries)
  let result = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase()) === true)

  if (result.length === 1) {
    const country = result[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <p><b>languages</b></p>
        <ul>
          {/* {country.languages.map(language => <li key={language.name}>{language.name}</li>)} */}
          {Object.keys(country.languages).map(language => <div key={language}>{country.languages[language]}</div>)}
        </ul>
        <img src={country.flags.svg} alt="Country flag" width='200'/>
        <h3>Weather in: {country.capital}</h3>
        <Weather city={country.capital} />
      </div>
    )
  }
  if (result.length > 10) return <div>Too many matches, specify another filter</div>
  return result.map(country => {
    return (
      <div key={country.name.common}>
        {country.name.common} <button value={country.name.common} onClick={handleSearchCountry}>show</button>
      </div>
    )
  })
}

const Weather = ({city}) => {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
      .then(response =>  { 
        setWeather(response.data)
      })
  }, [city])

  if(!weather) return
  return(
      <div>
        <p><b>Temperature:</b> { weather.current.temperature }° Celcius</p>
         <img alt="" height={100} src={weather.current.weather_icons[0]}></img>
         <p><b>Wind:</b> { weather.current.wind_speed } direction { weather.current.wind_dir } </p>
      </div>
  )
} 

function App() {

  const [ countries, setCountries ] = useState([])
  const [ searchCountry, setSearchCountry ] = useState('')

  useEffect(() => {
    axios
      //.get('https://restcountries.com/v3.1/all')
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])


  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <Filter value={searchCountry} onChange={handleSearchCountry} />
      <ShowAll countries={countries}
        searchCountry={searchCountry}
        handleSearchCountry={handleSearchCountry} 
      /> 
    </div>
  );
}

export default App;
