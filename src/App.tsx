import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'


const MainPage = () => (
  <>
    <h1>Main page</h1>
  </>
)

const MoviesPage = () => (
  <>
    <h3>Movies page </h3>
  </>
);

const MoviePage = () => (
  <>
    <h1>Страница детальной информации</h1>
  </>
)

const ReatedMovies = () => (
  <>
    <h1>Reated movies</h1>
  </>
)

const NotFoundPage = () => (
  <>
    <h1>Not Found</h1>
  </>
)

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/reated-movies" element={<ReatedMovies />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
