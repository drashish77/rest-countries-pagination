import React, { useEffect, useState } from 'react'

const useCountry = (props) => {
  const [countries, setCountries] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const url = 'https://restcountries.eu/rest/v2/all'

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(url)
        const countries = await response.json()
        setIsLoaded(true)
        setCountries(countries)
      } catch (error) {
        setIsLoaded(true)
        setError(error)
      }
    }
    fetchCountries()
  }, [props])
  return countries
}

export default useCountry
