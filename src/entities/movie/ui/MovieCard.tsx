import { Button, Divider, Flex, Image, Modal, Paper, Rating, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks";
import { Movie } from "../types/movie-response";
import { Genre } from "@/entities/genres/types/genre-response";
import { useMemo } from "react";
import NotPoster from '@/app/assets/imgs/NotPoster.png'

interface Props {
    movie: Movie
    genres: Genre[]
}

export const MovieCard = ({ movie, genres }: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate()

    function handleGoToMovieDetail(id: number) {
        navigate(`/movies/${id}`)
    }

    const currentGenres = useMemo(() => {
        if (!movie.genre_ids.length) return 'Unknown'
        return genres?.length && genres.map(g => movie.genre_ids.includes(g.id) ? g.name : '').join(' ')
    }, [movie.genre_ids, genres])

    const movieCount = useMemo(() => {
        const calcCount = movie.vote_count / 1000
        return calcCount > 1 ? calcCount.toFixed(2) + 'K' : movie.vote_count
    }, [movie.vote_count])

    return (
        <div>
            <Paper p={24} radius="lg">
                <Flex gap={16} direction={{ base: 'column', sm: 'row' }}>
                    <Image
                        src={movie.backdrop_path ? `http://image.tmdb.org/t/p/w500${movie.backdrop_path}` : NotPoster}
                        onClick={() => handleGoToMovieDetail(1)}
                        className="cursor-pointer w-[119px] h-[170px]" />
                    <Flex justify="space-between" className="w-full">
                        <Flex direction="column" justify="space-between">
                            <Flex direction="column" gap={8}>
                                <Text c='#9854F6' fw={700} size="20px">{movie.title}</Text>
                                <Text c='#7B7C88' size="16px">{movie.release_date}</Text>
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
                        <Rating count={1} size={28} onClick={open} />
                    </Flex>
                </Flex>
            </Paper>
            <Modal opened={opened} onClose={close} title="Your rating" centered>
                <div>
                    <Divider />
                    <div className="mt-4">
                        <Flex direction="column" gap={16}>
                            <Text fw={600} size="16px">Coco</Text>
                            <Rating count={10} size={28} />
                            <Flex>
                                <Button color="grape">Save</Button>
                                <Button variant="transparent" color="grape">Remove rating</Button>
                            </Flex>
                        </Flex>
                    </div>
                </div>
            </Modal>
        </div>
    )
}