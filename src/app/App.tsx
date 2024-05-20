import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core'

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
      },
      {
        path: ROUTES.RATED_MOVIES_DETAIL,
        element: <MoviePage />
      }
    ]
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />
  }
])

const theme = createTheme({
  other: {
    ['purple.1']: '#F2EBF9',
    ['purple.2']: '#E5D5FA',
    ['purple.3']: '#D1B4F8',
    ['purple.4']: '#BD93F7',
    ['purple.5']: '#9854F6',
    ['purple.6']: '#541F9D',
    ['gray.1']: '#F5F5F6',
    ['gray.2']: 'EAEBED',
    ['gray.3']: '#D5D6DC',
    ['gray.5']: '#ACADB9',
    ['gray.6']: '#7B7C88',
    yellow: '#FAB005'
  },
  colors: {
    purple: [
      '#F2EBF9',
      '#E5D5FA',
      '#D1B4F8',
      '#BD93F7',
      '#9854F6',
      '#541F9D',
      '#541F9D',
      '#541F9D',
      '#541F9D',
      '#541F9D'
    ]
  }
})


function App() {
  return (
    <>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  )
}

export default App
