import '@mantine/core/styles.css';
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button, MantineProvider } from '@mantine/core'


const MainPage = () => (
  <>
    <h1>Main page</h1>
    <Button>Hello</Button>
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
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/reated-movies" element={<ReatedMovies />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
