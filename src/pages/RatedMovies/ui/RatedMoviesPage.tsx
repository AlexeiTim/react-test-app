import { MovieCard, moviesService } from "@/entities/movie"
import { Button, Flex, Grid, Input, Pagination, Text, Image, Notification } from "@mantine/core"
import { IconSearch, IconX } from '@tabler/icons-react';
import EmptyRatedImage from '@/app/assets/imgs/EmptyRatedImage.png'
import { useEffect, useState } from "react";
import { Movie } from "@/entities/movie/types/movie-response";
import { Genre } from "@/entities/genres/types/genre-response";
import { AppLoader } from "@/shared/ui/AppLoader";
import { defineErrorMessage } from "@/shared/lib/defineErrorMessage";
import { genresService } from "@/entities/genres/api";

export const RatedMoviesPage = () => {
    const [totalPages, setTotalPages] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [movies, setMovies] = useState<Movie[]>([])
    const [genres, setGenres] = useState<Genre[]>([])


    useEffect(() => {
        async function getMovies() {
            try {
                setError(null)
                setIsLoading(true)
                const { data } = await moviesService.getAll({ page: activePage })
                const { data: genresResponse } = await genresService.getAll()
                setGenres(genresResponse.genres)
                setMovies(data.results)
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
            } catch (e) {
                setError(defineErrorMessage(e))
            } finally {
                setIsLoading(false)
            }

        }
        getMovies()
    }, [activePage])

    if (isLoading)
        return <AppLoader />

    return (
        <div>
            {error && (<Notification icon={<IconX />} color="red" title={error} />)}
            {movies.length ? (
                <Flex direction="column" gap={40}>
                    <Flex align="center" justify="space-between">
                        <Text fw={600} size="32px">Rated movies</Text>
                        <SearchRatedMoviesInput />
                    </Flex>
                    <Flex direction="column" gap={24}>
                        <Grid columns={12} >
                            {movies.map((movie) => (
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <MovieCard movie={movie} genres={genres} />
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
                                <Button className="text-center" color="grape">Find movies</Button>
                            </Flex>
                        </Flex>
                    </div>
                </Flex>
            )}
        </div>
    )
}

const SearchRatedMoviesInput = () => {
    return (
        <div className="relative">
            <Input
                size="lg"
                className="w-[490px] --input-fz-[14px]"
                style={{ height: '48px', fontSize: '14px' }}
                placeholder="Search movie title"
                leftSection={<IconSearch size={16} />}
            />
            <Button className="w-[90px] absolute cursor-pointer top-[7px]" color="grape" style={{ width: '90px', right: '12px', zIndex: 2 }}>Search</Button>
        </div>
    )
}
