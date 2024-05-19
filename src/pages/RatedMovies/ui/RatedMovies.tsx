import { MovieCard } from "@/entities/movie"
import { favoriteMoviesStorageService } from "@/entities/movie/storage"
import { MovieFavorite } from "@/entities/movie/types/movie-favorite"
import { Genre } from "@/entities/movie/types/movies-detail-response"
import { Grid } from "@mantine/core"

interface Props {
    movies: MovieFavorite[]
    genres: Genre[]
    changeFavorite: () => void
}

export const RatedMovies = ({ movies, genres, changeFavorite }: Props) => {
    return (
        <Grid columns={12} >
            {movies.map((movie) => (
                <Grid.Col
                    key={movie.id}
                    span={{ base: 12, lg: 6 }}
                >
                    <MovieCard
                        changeFavorite={changeFavorite}
                        movie={movie}
                        genres={genres}
                        favorite={favoriteMoviesStorageService.favoritesMap.get(movie.id)}
                    />
                </Grid.Col>
            ))}
        </Grid>
    )
}