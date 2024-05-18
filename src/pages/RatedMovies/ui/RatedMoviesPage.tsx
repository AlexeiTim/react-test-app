import { MovieCard, moviesService } from "@/entities/movie"
import { Button, Flex, Grid, Input, Pagination, Text, Image, Notification } from "@mantine/core"
import { IconSearch, IconX } from '@tabler/icons-react';
import EmptyRatedImage from '@/app/assets/imgs/EmptyRatedImage.png'
import { useEffect, useMemo, useState } from "react";
import { Movie } from "@/entities/movie/types/movie-response";
import { Genre } from "@/entities/genres/types/genre-response";
import { AppLoader } from "@/shared/ui/AppLoader";
import { defineErrorMessage } from "@/shared/lib/defineErrorMessage";
import { genresService } from "@/entities/genres/api";
import { favoriteMoviesStorageService } from "@/entities/movie/storage";
import { useNavigate } from "react-router-dom";

export const RatedMoviesPage = () => {
    const [totalPages, setTotalPages] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [genres, setGenres] = useState<Genre[]>([])
    const [favoritesMovies, setFavoritesMovies] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    function definePagination(favoritesMovies) {
        const totalPages = Math.floor(favoritesMovies.length / 20)
        console.log(totalPages)
        setTotalPages(totalPages)
    }

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

    const searchedFavoritesMovies = useMemo(() => {
        if (!search) return favoritesMovies

        return favoritesMovies.filter(f => f.original_title.toLowerCase().indexOf(search.toLocaleLowerCase()) >= 0)
    }, [search, favoritesMovies])

    async function getGenders() {
        const { data: genresResponse } = await genresService.getAll()
        setGenres(genresResponse.genres)
    }

    return (
        <div className="w-full">
            <Flex align="center" justify="space-between" mb={40} className="w-full">
                <Text fw={600} size="32px">Rated movies</Text>
                <SearchRatedMoviesInput search={search} setSearch={setSearch} />
            </Flex>
            {(!searchedFavoritesMovies.length && favoritesMovies.length) && (<Text className="text-center">No Search</Text>)}
            {favoritesMovies.length ? (
                <Flex direction="column" gap={40}>
                    <Flex direction="column" gap={24}>
                        <Grid columns={12} >
                            {searchedFavoritesMovies.map((movie) => (
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <MovieCard movie={movie} genres={genres} favorite={favoriteMoviesStorageService.favoritesMap.get(movie.id)} />
                                </Grid.Col>
                            ))}
                        </Grid>
                        <Flex justify="center">
                            <Pagination total={totalPages} value={activePage} onChange={setActivePage} color="grape" />
                        </Flex>
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
}
const SearchRatedMoviesInput = ({ search, setSearch }: Props) => {
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
            <Button className="w-[90px] absolute cursor-pointer top-[7px]" color="grape" style={{ width: '90px', right: '12px', zIndex: 2 }}>Search</Button>
        </div>
    )
}
