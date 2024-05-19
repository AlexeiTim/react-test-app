import { MovieCard } from "@/entities/movie"
import { Button, Flex, Grid, Input, Pagination, Text, Image } from "@mantine/core"
import { IconSearch } from '@tabler/icons-react';
import EmptyRatedImage from '@/app/assets/imgs/EmptyRatedImage.png'
import { useEffect, useMemo, useState } from "react";
import { Genre } from "@/entities/genres/types/genre-response";
import { genresService } from "@/entities/genres/api";
import { favoriteMoviesStorageService } from "@/entities/movie/storage";
import { useNavigate } from "react-router-dom";
import { MovieFavorite } from "@/entities/movie/types/movie-favorite";

export const RatedMoviesPage = () => {
    const [totalPages, setTotalPages] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [genres, setGenres] = useState<Genre[]>([])
    const [favoritesMovies, setFavoritesMovies] = useState<MovieFavorite[]>([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    function definePagination(favoritesMovies: MovieFavorite[]) {
        const totalPages = Math.ceil(favoritesMovies.length / 20)
        setTotalPages(totalPages)
    }

    function handleSearchFavoriteMovies() {
        setActivePage(1)
        setSearch(search)
    }

    const searchedFavoritesMovies = useMemo(() => {
        if (!search) favoritesMovies
        return favoritesMovies.filter(f => f.original_title.toLowerCase().indexOf(search.toLocaleLowerCase()) >= 0)
    }, [search, favoritesMovies])

    useEffect(() => {
        setFavoritesMovies([...favoriteMoviesStorageService.favorites])
        definePagination(favoriteMoviesStorageService.favorites)
    }, [])


    useEffect(() => {
        getGenders()
    }, [])

    function handleGoToMovies() {
        navigate('/movies')
    }

    async function getGenders() {
        const { data: genresResponse } = await genresService.getAll()
        setGenres(genresResponse.genres)
    }

    function handleChangeFavorite() {
        setFavoritesMovies([...favoriteMoviesStorageService.favorites])
    }

    const resultFavoriteMovies = useMemo(() => {
        setTotalPages(Math.ceil(searchedFavoritesMovies.length / 19))
        const result = searchedFavoritesMovies.slice((activePage - 1) * 20, activePage * 20)
        definePagination(result)
        return result
    }, [activePage, searchedFavoritesMovies])

    return (
        <div className="w-full">
            {totalPages}
            {!!favoritesMovies.length && (
                <Flex align="center" justify="space-between" mb={40} className="w-full">
                    <Text fw={600} size="32px">Rated movies</Text>
                    <SearchRatedMoviesInput
                        search={search}
                        setSearch={setSearch}
                        searchFavoriteMovies={handleSearchFavoriteMovies}
                    />
                </Flex>
            )}

            {(!resultFavoriteMovies.length && !!favoritesMovies.length) && (<Text className="text-center">No Search</Text>)}
            {(!!resultFavoriteMovies.length || favoritesMovies.length) ? (
                <Flex direction="column" gap={40}>
                    <Flex direction="column" gap={24}>
                        <Grid columns={12} >
                            {resultFavoriteMovies.map((movie) => (
                                <Grid.Col key={movie.id} span={{ base: 12, sm: 6 }}>
                                    <MovieCard
                                        changeFavorite={handleChangeFavorite}
                                        movie={movie}
                                        genres={genres}
                                        favorite={favoriteMoviesStorageService.favoritesMap.get(movie.id)}
                                    />
                                </Grid.Col>
                            ))}
                        </Grid>
                        {(!!resultFavoriteMovies.length && favoritesMovies.length && totalPages > 1) && (<Flex justify="center">
                            <Pagination total={totalPages} value={activePage} onChange={setActivePage} color="grape" />
                        </Flex>)}
                    </Flex>
                </Flex>
            ) : (
                <Flex className="h-[90vh]" align="center" justify="center">
                    <div>
                        <Image src={EmptyRatedImage} className=" w-[400px] h-[300px] my-[auto]" />
                        <Flex direction="column" gap={16}>
                            <Text className="text-center" fw={700} size="20px">You haven't rated any films yet</Text>
                            <Flex justify="center">
                                <Button className="text-center" color="grape" onClick={handleGoToMovies}>Find movies</Button>
                            </Flex>
                        </Flex>
                    </div>
                </Flex>
            )}
        </div>
    )
}

interface Props {
    search: string
    setSearch: (value: string) => void
    searchFavoriteMovies: () => void
}
const SearchRatedMoviesInput = ({ search, setSearch, searchFavoriteMovies }: Props) => {
    return (
        <div className="relative">
            <Input
                size="lg"
                value={search}
                onInput={(e) => setSearch(e.currentTarget.value)}
                className="w-[490px] --input-fz-[14px]"
                style={{ height: '48px', fontSize: '14px' }}
                placeholder="Search movie title"
                leftSection={<IconSearch size={16} />}
            />
            <Button onClick={searchFavoriteMovies} className="w-[90px] absolute cursor-pointer top-[7px]" color="grape" style={{ width: '90px', right: '12px', zIndex: 2 }}>Search</Button>
        </div>
    )
}
