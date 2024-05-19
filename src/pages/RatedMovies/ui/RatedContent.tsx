import { Flex, Pagination } from "@mantine/core"
import { RatedMovies } from "./RatedMovies"
import { MovieFavorite } from "@/entities/movie/types/movie-favorite"
import { Genre } from "@/entities/movie/types/movies-detail-response"
import { genresService } from "@/entities/genres/api"
import { useEffect, useState } from "react"
interface Props {
    movies: MovieFavorite[]
    changeFavorite: () => void
    totalPages: number
    activePage: number
    setActivePage: (value: number) => void
}

export const RatedContent = (props: Props) => {
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        getGenders()
    }, [])

    async function getGenders() {
        const { data: genresResponse } = await genresService.getAll()
        setGenres(genresResponse.genres)
    }

    return (
        <>
            <Flex direction="column" gap={40}>
                <Flex direction="column" gap={24}>
                    <RatedMovies
                        changeFavorite={props.changeFavorite}
                        movies={props.movies}
                        genres={genres}
                    />
                    {props.totalPages > 1 && (<Flex justify="center">
                        <Pagination
                            total={props.totalPages}
                            value={props.activePage}
                            onChange={props.setActivePage}
                            color="grape"
                        />
                    </Flex>)}
                </Flex>
            </Flex>
        </>
    )
}