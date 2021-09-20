import './App.css'
import Header from './components/Header/Header'
import MainPage from './components/MainPage/MainPage'
import CountryDetail from './components/MainPage/CountryDetail'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home/Home'

function App() {
  return (
    <Router>
      <div className='App dark__mode__black h-screen'>
        <Header />
        <div className='dark__mode__black'>
          <div className='container mx-auto dark__mode__black'>
            <Route path='/' component={MainPage} exact />
            {/* <MainPage /> */}
            <Route path='/details/:id' component={CountryDetail} />
          </div>
        </div>
      </div>
      {/* <Route path='/' exact component={App} /> */}
    </Router>
  )
}

export default App
