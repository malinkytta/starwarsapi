import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import MoviesPage from './pages/MoviesPage'
import MoviePage from './pages/MoviePage'
import CharactersPage from './pages/CharactersPage'
import CharacterPage from './pages/CharacterPage'
import PlanetsPage from './pages/PlanetsPage'
import PlanetPage from './pages/PlanetPage'
import SpeciesPage from './pages/SpeciesPage'
import StarshipsPage from './pages/StarshipsPage'
import VehiclesPage from './pages/VehiclesPage'
import SpeciePage from './pages/SpeciePage'
import StarShipPage from './pages/StarshipPage'
import VehiclePage from './pages/VehiclePage'

import './assets/scss/App.scss'


const App = () => {

  return (
    <div id="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        <Route path="/planets/:id" element={<PlanetPage />} />
        <Route path="/species" element={<SpeciesPage />} />
        <Route path="/species/:id" element={< SpeciePage />} />
        <Route path="/starships" element={<StarshipsPage />} />
        <Route path="/starships/:id" element={<StarShipPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/vehicles/:id" element={<VehiclePage />} />

        <Route path="/*" element={<NotFound />} />

      </Routes>
    </div>
  )
}

export default App
