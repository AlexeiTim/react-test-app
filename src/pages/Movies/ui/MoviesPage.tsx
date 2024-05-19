import { moviesService } from "@/entities/movie";
import { Button, Flex, Input, Notification, Select } from "@mantine/core";
import { DateValue, YearPickerInput } from '@mantine/dates';
import { useEffect, useMemo, useState } from "react";
import { IconX } from '@tabler/icons-react';
import { AppLoader } from "@/shared/ui/AppLoader";
import { Movie } from "@/entities/movie/types/movie-response";
import { Genre } from "@/entities/genres/types/genre-response";
import { genresService } from "@/entities/genres/api";
import dayjs from "dayjs";
import { MovieRequestParams } from "@/entities/movie/types/movie-request-params";
import { sortOptions } from "../config/sort-options";
import { MoviesContent } from "./MoviesContent";
import { ratingsOptions } from "../config/rating-options";

export const MoviesPage = () => {
    const [genres, setGenres] = useState<Genre[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [movies, setMovies] = useState<Movie[]>([])
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
    const [selectedReleaseYear, setSelectedReleaseYear] = useState<DateValue | null>(null)
    const [selectedRaitingFrom, setSelectedRaitingFrom] = useState<string | null>(null)
    const [selectedRaitingTo, setSelectedRaitingTo] = useState<string | null>(null)
    const [selectedSort, setSelectedSort] = useState<string | null>(null)

    useEffect(() => {
        getGenders()
    }, [])

    async function getGenders() {
        try {
            const { data: genresResponse } = await genresService.getAll()
            setGenres(genresResponse.genres)
        } catch (e) {
            console.error('Error Request')
        }
    }

    const genreOptions = useMemo(() => {
        return genres.map(g => ({ label: g.name, value: String(g.id) }))
    }, [genres])

    const requestParams = useMemo(() => {
        return {
            page: activePage,
            with_genres: selectedGenre,
            primary_release_year: selectedReleaseYear && dayjs(selectedReleaseYear).format('YYYY'),
            ['vote_average.gte']: selectedRaitingFrom,
            ['vote_average.lte']: selectedRaitingTo,
            sort_by: selectedSort,
        }
    }, [activePage, selectedGenre, selectedReleaseYear, selectedRaitingFrom, selectedRaitingTo, selectedSort])

    async function getMovies(params: MovieRequestParams) {
        try {
            setError(null)
            setIsLoading(true)
            const { data } = await moviesService.getAll(params)
            setMovies(data.results)
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
        } catch (e) {
            setError('Request Error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getMovies(requestParams)
    }, [requestParams])

    function handleResetFilters() {
        setSelectedGenre(null)
        setSelectedReleaseYear(null)
        setSelectedRaitingFrom(null)
        setSelectedRaitingTo(null)
        setSelectedSort(null)
    }

    return (
        <div className="w-full">
            {error && (<Notification icon={<IconX />} color="red" title={error} />)}
            <h1 className="text-[32px]/[140%] font-bold">Movies</h1>
            <Flex direction="column" gap={24}>
                <Flex gap={16} align='end'>
                    <Select
                        label="Genres"
                        placeholder="Select genre"
                        data={genreOptions}
                        value={selectedGenre ? selectedGenre : null}
                        onChange={(_value, option) => setSelectedGenre(option.value)}
                    />

                    <YearPickerInput
                        label="Release year"
                        placeholder="Select release year"
                        value={selectedReleaseYear}
                        onChange={setSelectedReleaseYear}
                    />
                    <Input.Wrapper label="Rating" className="w-[283px]">
                        <Flex gap={16}>
                            <Select
                                placeholder="From"
                                value={selectedRaitingFrom}
                                onChange={setSelectedRaitingFrom}
                                data={ratingsOptions}
                            />
                            <Select
                                placeholder="To"
                                value={selectedRaitingTo}
                                onChange={setSelectedRaitingTo}
                                data={ratingsOptions}
                            />
                        </Flex>
                    </Input.Wrapper>

                    <Button onClick={handleResetFilters} variant="transparent" color="gray" radius="md">Reset filters</Button>
                </Flex>

                <Flex justify="end">
                    <Select
                        label='Sort by'
                        placeholder="Select sort"
                        data={sortOptions}
                        value={selectedSort}
                        onChange={setSelectedSort}
                    />
                </Flex>

                {/* Контент */}
                {!isLoading
                    ? (
                        <MoviesContent
                            movies={movies}
                            activePage={activePage}
                            genres={genres}
                            setActivePage={setActivePage}
                            totalPages={totalPages}
                        />
                    )
                    : (<AppLoader />)
                }

            </Flex>
        </div >
    );
}