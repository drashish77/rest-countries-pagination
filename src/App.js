import './App.css'
import Header from './components/Header/Header'
import MainPage from './components/MainPage/MainPage'
import CountryDetail from './components/MainPage/CountryDetail'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className='App dark__mode__black h-full'>
        <Header />

        <div className='container mx-auto '>
          <Route path='/rest-countries' component={MainPage} exact />
          {/* <MainPage /> */}
          <Route path='/details/:id' component={CountryDetail} />
        </div>
      </div>

      {/* <Route path='/' exact component={App} /> */}
    </Router>
  )
}

export default App
