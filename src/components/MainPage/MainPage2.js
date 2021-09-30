import { useEffect } from 'react'
import { useState } from 'react'
import FilterSearch from '../filter/FilterSearch'
import CountryCard from './CountryCard'
import Loader from './Loader'
import Pagination from './Pagination'

const MainPage2 = () => {
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
          // console.log('🔴', data[2].flags.svg)
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
  // search function
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase()
    let result = []
    result = countries.filter((data) => {
      return (
        data.name.common.toLowerCase().search(value) !== -1 ||
        data.region.toLowerCase().search(value) !== -1
      )
    })
    setQuery(setFilteredData(result))
  }
  const handleFilter = (event) => {
    // window.location.reload()
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
      <div className='dark__mode__black '>
        <FilterSearch
          value={query}
          value2={select}
          onChange={(e) => handleSearch(e)}
          onChange2={(e) => handleFilter(e)}
        />
        <div className='mainPage'>
          <Pagination jobs={filteredData} query={query} />
        </div>
      </div>
    )
  }
}

export default MainPage2
