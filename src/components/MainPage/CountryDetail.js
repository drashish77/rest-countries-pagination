import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { countryListAlpha3 } from './contryCode'
import Loader from './Loader'

const CountryDetail = ({ match }) => {
  const [country, setCountry] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const url = 'https://restcountries.eu/rest/v2/all'

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true)
          const SingleData = data.find((a) => a.nativeName === match.params.id)
          setCountry(SingleData)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [match.params.id])
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
        <div className='lg:p-8 pb-8'>
          <div className='p-5 lg:p-8'>
            <Link to='/rest-countries'>
              <button className='lg:m-0 shadow px-4 py-2'>← Back</button>
            </Link>
          </div>

          {/* <p>Currencies: {country.currencies[0]['code']}</p> */}

          <div className='flex flex-col lg:flex-row justify-center md:justify-between md:items-center m-5 lg:m-0'>
            <div className='card__image_single w-1/2'>
              <img
                src={country.flag}
                alt={country.name}
                className='object-cover w-full rounded'
              />
            </div>
            <div className='right  w-full lg:w-1/2'>
              <h2 className='my-4 text-2xl'>
                <strong>{country.name}</strong>
              </h2>
              <div className='container flex flex-col lg:flex-row justify-between'>
                <div className='boxInner'>
                  <p>
                    <span className='font-semibold'>Native Name: </span>{' '}
                    {country.nativeName}
                  </p>
                  <p>
                    <span className='font-semibold'>Population: </span>{' '}
                    {country.population}
                  </p>
                  <p>
                    <span className='font-semibold'>Region: </span>{' '}
                    {country.region}
                  </p>
                  <p>
                    <span className='font-semibold'>Sub Region: </span>{' '}
                    {country.subregion}
                  </p>
                  <p>
                    <span className='font-semibold'>Capital: </span>{' '}
                    {country.capital}
                  </p>
                </div>
                <div className='boxInner2 my-5 lg:my-0 lg:p-5'>
                  <p>
                    <span className='font-semibold'>Top Level Domain: </span>{' '}
                    {country.topLevelDomain && country.topLevelDomain[0]}
                  </p>
                  <p>
                    <span className='font-semibold'>Currencies:</span>{' '}
                    {country.currencies && country.currencies[0]['code']}
                  </p>
                  <p>
                    <span className='font-semibold'>Languages: </span>{' '}
                    {country.languages && country.languages[0]['name']}
                  </p>
                </div>
              </div>

              <div className='mt-10 lg:flex items-center'>
                <h1>Border Countries:</h1>
                <div className='flex m-0 lg:ml-4 flex-wrap'>
                  {country.borders &&
                    country.borders.map((border) => {
                      return (
                        <button
                          className='px-2 lg:px-4 mr-2 my-2  shadow dark__mode__gray'
                          key={`${Math.random() * 999}`}
                        >
                          {countryListAlpha3[border]}
                        </button>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CountryDetail

/*
  // const {
  //   numericCode,
  //   flag,
  //   name,
  //   nativeName,
  //   population,
  //   region,
  //   subregion,
  //   capital,
  //   topLevelDomain,
  //   currencies,
  //   languages,
  //   borders,
  // } = country
*/
