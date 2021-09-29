import { Link } from 'react-router-dom'
import { useDarkMode } from '../../Hook/useDarkMode'
import './MainPage.css'
const CountryCard = ({
  flag,
  name,
  population,
  region,
  capital,
  nativeName,
}) => {
  useDarkMode()
  return (
    <div className='card rounded dark__mode__gray shadow'>
      <Link to={`/details/${name}`}>
        <div className='card__image'>
          <img
            src={flag}
            alt={name}
            className='object-cover h-40 w-full rounded shadow'
          />
        </div>
      </Link>
      <div className='card__main mt-4 mx-2 '>
        {/* <h2 className='card__head font-bold text-xl w-48 mx-auto text-left truncate'>
          {name}
        </h2> */}
        <Link to={`/details/${name}`}>
          <p className='card__head ml-2 w-56  truncate'>
            <strong>{name}</strong>
          </p>
        </Link>
        <div className='card__body mx-2 m-4 '>
          <p className='font-bold '>
            Population: <span className='font-medium'> {population}</span>
          </p>
          <p className='font-bold '>
            Region:<span className='font-medium'> {region}</span>
          </p>
          <p className='font-bold '>
            Capital:<span className='font-medium'> {capital}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountryCard
