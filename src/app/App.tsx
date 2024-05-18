import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './App.css'
import { MainPage } from '@/pages/Main';
import { MoviesPage } from '@/pages/Movies';
import { MoviePage } from '@/pages/Movie';
import { RatedMoviesPage } from '@/pages/RatedMovies';
import { NotFoundPage } from '@/pages/NotFound';
import { ROUTES } from '@/shared/config/routes';


const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.MOVIES} />
      },
      {
        path: ROUTES.MOVIES,
        element: <MoviesPage />
      },
      {
        path: ROUTES.MOVIES_DETAIL,
        element: <MoviePage />
      },
      {
        path: ROUTES.RATED_MOVIES,
        element: <RatedMoviesPage />
      }
    ]
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />
  }
])


function App() {
  return (
    <>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  )
}

export default App
