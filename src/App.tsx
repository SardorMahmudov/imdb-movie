import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home, MovieDetail, Watchlist } from './pages'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-detail/:id" element={<MovieDetail />} />
        <Route path='/watchlist' element={<Watchlist />} />
      </Routes>
    </>
  )
}

export default App
