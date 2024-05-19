import { Button, Divider, Flex, Image, Modal, Paper, Rating, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks";
import { Movie } from "../types/movie-response";
import { Genre } from "@/entities/genres/types/genre-response";
import { useMemo, useState } from "react";
import NotPoster from '@/app/assets/imgs/NotPoster.png'
import dayjs from "dayjs";
import { favoriteMoviesStorageService } from "../storage";
import { MovieFavorite } from "../types/movie-favorite";

interface Props {
    movie: Movie
    genres: Genre[]
    favorite?: MovieFavorite
    changeFavorite?: () => void
}

export const MovieCard = ({ movie, genres, favorite, changeFavorite = () => { } }: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedRaiting, setSelectedRaiting] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()

    function handleGoToMovieDetail(id: number) {
        navigate(location.pathname.includes('rated') ? `/rated-movies/${id}` : `/movies/${id}`)
    }

    const currentGenres = useMemo(() => {
        if (!movie.genre_ids?.length) return 'Unknown'
        return genres?.length && genres.map(g => movie.genre_ids.includes(g.id) ? g.name : '').join(' ')
    }, [movie.genre_ids, genres])

    const movieCount = useMemo(() => {
        const calcCount = movie.vote_count / 1000
        return calcCount > 1 ? calcCount.toFixed(2) + 'K' : movie.vote_count
    }, [movie.vote_count])

    function handleOpenRaitingModal() {
        open()
    }

    function handleAddToStorageFavoriteMovie() {
        if (!selectedRaiting) return

        const favoriteMovie = {
            ...movie,
            favoriteRating: selectedRaiting
        }
        favoriteMoviesStorageService.save(favoriteMovie)
        changeFavorite()
        close()
    }

    function handleRemoveRating() {
        favoriteMoviesStorageService.delete(movie.id)
        setSelectedRaiting(0)
        changeFavorite()
        close()
    }

    return (
        <div>
            <Paper p={24} radius="lg">
                <Flex gap={16} direction={{ base: 'column', sm: 'row' }}>
                    <Image
                        src={movie.backdrop_path ? `http://image.tmdb.org/t/p/w500${movie.poster_path}` : NotPoster}
                        onClick={() => handleGoToMovieDetail(movie.id)}
                        className="cursor-pointer w-[119px] h-[170px]" />
                    <Flex justify="space-between" className="w-full">
                        <Flex direction="column" justify="space-between">
                            <Flex direction="column" gap={8}>
                                <Text c='#9854F6' fw={700} size="20px">{movie.original_title}</Text>
                                <Text c='#7B7C88' size="16px">{movie.release_date ? dayjs(movie.release_date).format('YYYY') : 'unknown'}</Text>
                                <Flex gap={8} align="center">
                                    <Flex gap={4} align="center">
                                        <Rating size={28} count={1} value={1} readOnly />
                                        <Text fw={700}>{movie.vote_average}</Text>
                                    </Flex>
                                    <Text c='#7B7C88'>({movieCount})</Text>
                                </Flex>
                            </Flex>
                            <Text size="16px">
                                <Flex gap={8}>
                                    <span className="text-[#7B7C88]">Genres</span>
                                    <span>{currentGenres}</span>
                                </Flex>
                            </Text>
                        </Flex>
                        <div>
                            <Flex align="center" justify="start" gap={4}>
                                <Rating color="grape" count={1} value={favorite ? favorite.favoriteRating : 0} size={28} onClick={handleOpenRaitingModal} />
                                {favorite && <Text fw={700}>{favorite.favoriteRating}</Text>}
                            </Flex>
                        </div>
                    </Flex>
                </Flex>
            </Paper>
            <Modal opened={opened} onClose={close} title="Your rating" centered>
                <div>
                    <Divider />
                    <div className="mt-4">
                        <Flex direction="column" gap={16}>
                            <Text fw={600} size="16px">
                                {movie.original_title}
                            </Text>
                            <Rating value={favorite?.favoriteRating ? favorite?.favoriteRating : selectedRaiting} onChange={setSelectedRaiting} count={10} size={28} />
                            <Flex>
                                <Button onClick={handleAddToStorageFavoriteMovie} color="grape">Save</Button>
                                <Button onClick={handleRemoveRating} variant="transparent" color="grape">Remove rating</Button>
                            </Flex>
                        </Flex>
                    </div>
                </div>
            </Modal>
        </div>
    )
}