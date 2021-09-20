import { Link } from 'react-router-dom'
import { useDarkMode } from '../../Hook/useDarkMode'
import './Header.css'
const Header = () => {
  const [colorTheme, setTheme] = useDarkMode()
  return (
    <div className='dark__mode__gray'>
      <div className='flex justify-between items-center py-5 px-20 text font-bold'>
        <Link to='/'>
          <div className=''>
            <h3>Where in the world?</h3>
          </div>
        </Link>
        <div
          className='darkMode cursor-pointer '
          onClick={() => setTheme(colorTheme)}
        >
          {colorTheme === 'dark' ? (
            <button className='px-3 py-2 shadow font-bold'>
              <div className='night'>
                <i className='fas fa-moon'></i> Dark Mode
              </div>
            </button>
          ) : (
            <button className='px-3 py-2 shadow font-bold'>
              <div className='day'>
                <i className='far fa-lightbulb'></i> Light Mode
              </div>
            </button>
          )}
        </div>
      </div>
      <hr />
      {/* <dir className='hederBox'></dir> */}
    </div>
  )
}

export default Header
