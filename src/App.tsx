// import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'
import './assets/scss/App.scss'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import MoviesPage from './pages/MoviesPage'
import MoviePage from './pages/MoviePage'
import CharactersPage from './pages/CharactersPage'


const App = () => {

  return (
    <div id="App">
      <Navigation />
      {/* <Container className="py-3"> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        {/* <Route path="/characters/:id" element={<CharacterPage />} /> */}



        <Route path="/*" element={<NotFound />} />

      </Routes>
      {/* </Container> */}
    </div>
  )
}

export default App
