import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { countryListAlpha3 } from './contryCode'
import Loader from './Loader'

const CountryDetail = ({ match }) => {
  const [country, setCountry] = useState([])
  const [nativeName, setNativeName] = useState('')
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const url2 = 'https://restcountries.com/v3.1/all'

  useEffect(() => {
    fetch(url2)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true)
          const SingleData = data.find((a) => a.name.common === match.params.id)
          // console.log(SingleData)
          setCountry(SingleData)
          const native =
            typeof Object.values(SingleData.name.nativeName)[1] !== 'undefined'
              ? Object.values(Object.values(SingleData.name.nativeName)[1])[1]
              : Object.values(Object.values(SingleData.name.nativeName)[0])[1]

          setNativeName(native)
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
            <Link to='/rest-countries-pagination'>
              <button className='lg:m-0 shadow px-4 py-2'>← Back</button>
            </Link>
          </div>

          {/* <p>Currencies: {country.currencies[0]['code']}</p> */}

          <div className='flex flex-col lg:flex-row justify-center md:justify-between md:items-center m-5 lg:m-0'>
            <div className='card__image_single w-1/2'>
              <img
                src={country.flags && country.flags.svg}
                alt={country.name && country.name.common}
                className='object-cover w-full rounded shadow'
              />
            </div>
            <div className='right  w-full lg:w-1/2'>
              <h2 className='my-4 text-2xl'>
                <strong>{country.name && country.name.common}</strong>
              </h2>
              <div className='container flex flex-col lg:flex-row justify-between'>
                <div className='boxInner'>
                  <p>
                    <span className='font-semibold'>Native Name: </span>{' '}
                    {nativeName}
                  </p>
                  {/* <p>
                    <span className='font-semibold'>Population: </span>{' '}
                    {country.population}
                  </p> */}
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
                    {country.tld && country.tld}
                  </p>
                  <p>
                    <span className='font-semibold'>Currencies:</span>{' '}
                    {country.currencies &&
                      Object.values(Object.values(country.currencies)[0])[0]}
                  </p>
                  <p>
                    <span className='font-semibold'>Languages: </span>{' '}
                    {country.languages &&
                      Object.values(country.languages).map((a) => (
                        <span a={Math.random() * 77} className='mr-2'>
                          {a},
                        </span>
                      ))}
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
