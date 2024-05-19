import { MovieCard } from "@/entities/movie"
import { Movie } from "@/entities/movie/types/movie-response"
import { Flex, Grid, Pagination } from "@mantine/core"
import { MoviesEmpty } from "./MoviesEmpty"
import { useEffect, useState } from "react"
import { Genre } from "@/entities/movie/types/movies-detail-response"
import { favoriteMoviesStorageService } from "@/entities/movie/storage"
import { MovieFavorite } from "@/entities/movie/types/movie-favorite"

interface Props {
    movies: Movie[]
    genres: Genre[]
    totalPages: number
    activePage: number
    setActivePage: (value: number) => void
}

export const MoviesContent = ({ movies, genres, totalPages, activePage, setActivePage }: Props) => {
    const [favorites, setFavorites] = useState<MovieFavorite[]>([])

    useEffect(() => {
        setFavorites(favoriteMoviesStorageService.favorites)
    }, [favorites])

    if (!movies.length)
        return <MoviesEmpty />

    return (
        <>
            <Grid columns={12} >
                {movies.map((movie) => (
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <MovieCard
                            changeFavorite={() => setFavorites([...favoriteMoviesStorageService.favorites])}
                            movie={movie}
                            genres={genres}
                            favorite={favoriteMoviesStorageService.favoritesMap.get(movie.id)}
                        />
                    </Grid.Col>
                ))}
            </Grid>
            <Flex justify="end">
                <Pagination total={totalPages} value={activePage} onChange={setActivePage} color="grape" />
            </Flex>
        </>
    )
}