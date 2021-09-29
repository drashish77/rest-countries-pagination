import { Link } from 'react-router-dom'
import { useDarkMode } from '../../Hook/useDarkMode'
import './Header.css'
import { useHistory } from 'react-router-dom'
const Header = () => {
  const history = useHistory()
  const [colorTheme, setTheme] = useDarkMode()
  const home = () => {
    window.location.reload()
    history.push('/rest-countries-pagination')
  }
  return (
    <div className='dark__mode__gray px-8 lg:px-28'>
      <div className='flex justify-between items-center py-5 text-xs md:text-xl font-bold'>
        <div className='' onClick={home}>
          <h3>Where in the world?</h3>
        </div>

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
    </div>
  )
}

export default Header
