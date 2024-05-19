import { Flex, Image, NumberFormatter, Paper, Rating, Text } from "@mantine/core"
import NotPoster from '@/app/assets/imgs/NotPoster.png'
import { MovieDetailResponse } from "../types/movies-detail-response"
import dayjs from "dayjs"
import { useMemo } from "react"
import { defineMovieVoteCount } from "../lib/define-movie-vote-count"
import { defineDuration } from "@/pages/Movie/lib/define-duration"
import { MovieFavorite } from "../types/movie-favorite"

interface Props {
    movie: MovieDetailResponse
    favorite: MovieFavorite | null
    openRatingModal: () => void
}

export const MovieDetailCard = ({ movie, favorite, openRatingModal }: Props) => {

    const movieCount = useMemo(() => {
        if (!movie) return ''

        return defineMovieVoteCount(movie.vote_count)
    }, [movie])


    const moviePremiere = useMemo(() => {
        if (!movie?.release_date) return 'unknown'

        const date = dayjs(movie.release_date).locale('en').format('MMMM D,YYYY')
        return date
    }, [movie])

    const currentGenres = useMemo(() => {
        if (!movie) return

        if (!movie.genres.length) return 'Unknown'
        return movie.genres.map(g => g.name).join(' ')
    }, [movie])

    const duration = useMemo(() => {
        if (!movie) return ''

        return defineDuration(movie.runtime)
    }, [movie])


    return (
        <Paper p={24} radius="lg">
            <Flex gap={16} direction={{ base: 'column', sm: 'row' }}>
                <Image
                    src={movie.backdrop_path ? `http://image.tmdb.org/t/p/w500${movie.poster_path}` : NotPoster}
                    className="w-[250px] h-[350px]" />
                <Flex justify="space-between" className="w-full">
                    <Flex direction="column" justify="space-between">
                        <Flex direction="column" gap={8}>
                            <Text c='#9854F6' fw={700} size="20px">{movie.original_title}</Text>
                            <Text c='#7B7C88' size="16px">
                                {movie.release_date.length
                                    ? dayjs(movie.release_date).format('YYYY')
                                    : 'unknown'
                                }
                            </Text>
                            <Flex gap={8} align="center">
                                <Flex gap={4} align="center">
                                    <Rating size={28} count={1} value={1} readOnly />
                                    <Text fw={700}>{movie.vote_average}</Text>
                                </Flex>
                                <Text c='#7B7C88'>({movieCount})</Text>
                            </Flex>
                        </Flex>
                        <Text size="16px">
                            <Flex direction="column" gap={12}>
                                <Flex>
                                    <Text c="#7B7C88" className="w-[140px]">Duration</Text>
                                    <div>{duration}</div>
                                </Flex>
                                <Flex>
                                    <Text c="#7B7C88" className="w-[140px]">Premiere</Text>
                                    <div>{moviePremiere}</div>
                                </Flex>
                                <Flex>
                                    <Text c="#7B7C88" className="w-[140px]">Budget</Text>
                                    <NumberFormatter prefix="$" value={movie.budget} thousandSeparator />
                                </Flex>
                                <Flex>
                                    <Text c="#7B7C88" className="w-[140px]">Gross worldwide</Text>
                                    <NumberFormatter prefix="$" value={movie.revenue} thousandSeparator />
                                </Flex>
                                <Flex>
                                    <Text c="#7B7C88" className="text-[#7B7C88] w-[140px]">Genres</Text>
                                    <Text>{currentGenres}</Text>
                                </Flex>
                            </Flex>
                        </Text>
                    </Flex>
                    <div>
                        <Flex align="center" justify="start" gap={4}>
                            <Rating color="grape" count={1} value={favorite ? favorite.favoriteRating : 0} size={28} onClick={openRatingModal} />
                            {favorite && <Text fw={700}>{favorite.favoriteRating}</Text>}
                        </Flex>
                    </div>
                </Flex>
            </Flex>
        </Paper>
    )
}