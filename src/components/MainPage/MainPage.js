import { useEffect } from 'react'
import { useState } from 'react'
import FilterSearch from '../filter/FilterSearch'
import CountryCard from './CountryCard'
import Loader from './Loader'

const MainPage = () => {
  const [countries, setCountries] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [filteredData, setFilteredData] = useState(countries)
  const [query, setQuery] = useState('')
  const [select, setSelect] = useState('')

  // const [searchParam] = useState(['capital', 'name'])

  const url = 'https://restcountries.eu/rest/v2/all'

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data[21])
          setIsLoaded(true)
          setCountries(data)
          setFilteredData(data)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])
  //search function
  // const handleSearch = (event) => {
  //   let value = event.target.value.toLowerCase()
  //   let result = []
  //   result = countries.filter((data) => {
  //     return data.name.toLowerCase().search(value) !== -1
  //   })
  //   setQuery(setFilteredData(result))
  // }
  const handleFilter = (event) => {
    let value = event.target.value.toLowerCase()
    let result = []
    if (value) {
      result = countries.filter((data) => {
        return data.region.toLowerCase() === value
      })
    } else
      result = countries.filter((data) => {
        return data
      })
    setSelect(setFilteredData(result))
  }
  if (error) {
    return <>{error.message}</>
  } else if (!isLoaded) {
    return (
      <>
        <Loader />
      </>
    )
  } else {
    return (
      <div className=''>
        <FilterSearch
          value={query}
          value2={select}
          onChange={(e) => setQuery(e.target.value)}
          onChange2={(e) => handleFilter(e)}
        />
        <div className='mainPage'>
          {filteredData
            .filter((country) => {
              if (query == '') {
                return country
              } else if (
                country.name.toLowerCase().includes(query.toLowerCase())
              ) {
                return country
              }
            })
            .map((country) => {
              return (
                <div className='' key={country.callingCodes + Math.random()}>
                  <CountryCard
                    flag={country.flag}
                    name={country.name}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                    nativeName={country.nativeName}
                  />
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

export default MainPage
