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
  const url2 = 'https://restcountries.com/v3.1/all'

  useEffect(() => {
    fetch(url2)
      .then((res) => res.json())
      .then(
        (data) => {
          console.log('🔴', data[2].flags.svg)
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
      <div className='dark__mode__black'>
        <FilterSearch
          value={query}
          value2={select}
          onChange={(e) => setQuery(e.target.value)}
          onChange2={(e) => handleFilter(e)}
        />
        <div className='mainPage'>
          {filteredData
            .filter((country) => {
              if (query === '') {
                return country
              } else if (
                country.name.common.toLowerCase().includes(query.toLowerCase())
              ) {
                return country
              }
            })
            .map((country) => {
              return (
                <div className='' key={Math.random()}>
                  <CountryCard
                    flag={country.flags.svg}
                    name={country.name.common}
                    // population={country.population}
                    region={country.region}
                    capital={country.capital && country.capital[0]}
                    nativeName={
                      country.name.nativeName && country.name.nativeName.common
                    }
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
