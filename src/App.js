import Header from './components/Header/Header'
import CountryDetail from './components/MainPage/CountryDetail'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainPage2 from './components/MainPage/MainPage2'

function App() {
  return (
    <Router>
      <div className='App dark__mode__black h-screen'>
        <Header />

        <div className='mx-auto'>
          {/* Home Page Route extra rest-countries because of going to deploy at  github pages that needs the append so that it will direct to home page otherwise through and error */}
          <Route path='/rest-countries-pagination' component={MainPage2} exact />
          {/* Detail Page Route */}
          <Route path='/rest-countries-pagination/details/:id' component={CountryDetail} />
        </div>
      </div>
    </Router>
  )
}

export default App
