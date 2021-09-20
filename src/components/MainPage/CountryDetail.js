import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { countryListAlpha3 } from './contryCode'
import Loader from './Loader'

const CountryDetail = ({ match }) => {
  const [country, setCountry] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [countryDetail, setCountryDetail] = useState([])
  const [borderArrState, setBorderArrState] = useState([])
  const url = 'https://restcountries.eu/rest/v2/all'
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
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true)
        const SingleData = data.find((a) => a.nativeName === match.params.id)
        console.log(SingleData)
        setCountry(SingleData)
      })
  }, [match.params.id])

  const borderArr = country.borders && country.borders
  // setBorderArrState(borderArr)
  // borderArrState.map((a) => console.log(a))

  return (
    <div>
      <Link to='/'>
        <button className='my-10 shadow px-4 py-2'>← Back</button>
      </Link>

      {/* <p>Currencies: {country.currencies[0]['code']}</p> */}

      <div className='flex flex-col lg:flex-row justify-between m-5 lg:m-0'>
        <div className='card__image_single '>
          <img
            src={country.flag}
            alt={country.name}
            className='object-cover w-full rounded'
          />
        </div>
        <div className='right'>
          <h2 className='my-4'>
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
                <span className='font-semibold'>Region: </span> {country.region}
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
                <span className='font-semibold'>
                  Currencies:
                  {country.currencies && country.currencies[0]['code']}
                </span>{' '}
                {country.subregion}
              </p>
              <p>
                <span className='font-semibold'>Languages: </span>{' '}
                {country.languages && country.languages[0]['name']}
              </p>
              {/* <p>Top Level Domain: {country.topLevelDomain[0]}</p>
            <p>Currencies: {country.currencies[0]['code']}</p>
            <p>Languages: {country.languages}</p> */}
            </div>
          </div>

          <div className='mt-10 lg:flex items-center'>
            <h1>Border Countries:</h1>
            <div className='flex ml-4'>
              <button className='px-8  shadow dark__mode__gray'>bor</button>
              <button className='mx-2 px-8  shadow dark__mode__gray'>
                bor
              </button>
              <button className='px-8  shadow dark__mode__gray'>bor</button>
            </div>
          </div>
          <div className='mt-10 lg:flex items-center'>
            <h1>Border Countries:</h1>
            {country.border &&
              countryListAlpha3.find((a) => a === country.border[0].name)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryDetail

/*
{
  country: {
    numericCode,
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  },
}
*/
// setCountryDetail(detail)
// const goToCarddetails = () => {
//   localStorage.setItem('selectedCard', nativeName)
//   this.props.history.push('/card-details')
//   // you can manage here to pass the clicked card id to the card details page if needed

//
// <img src={country.flag} alt='' />
// <h1>{country.name}</h1>
// <p>Native Name: {country.nativeName}</p>
// <p>Population: {country.population}</p>
// <p>Region: {country.region}</p>
// <p>Sub Region: {country.subregion}</p>
// <p>Capital: {country.capital}</p>
// <p>Top Level Domain: {country.topLevelDomain}</p>
