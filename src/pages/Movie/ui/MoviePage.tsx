import { useEffect, useState } from "react";
import { MovieDetailBreadcrumbs } from "./Breacrumbs";
import { moviesService } from "@/entities/movie";
import { useParams } from "react-router-dom";
import { MovieDetailResponse } from "@/entities/movie/types/movies-detail-response";
import { AppLoader } from "@/shared/ui/AppLoader";
import { defineErrorMessage } from "@/shared/lib/defineErrorMessage";
import { IconX } from "@tabler/icons-react";
import { Button, Divider, Flex, Image, Modal, Notification, NumberFormatter, Paper, Rating, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import NotPoster from '@/app/assets/imgs/NotPoster.png'
import { genresService } from "@/entities/genres/api";
import dayjs from "dayjs";
import NotCompanyLogo from '@/app/assets/imgs/NotCompanyLogo.png'

export const MoviePage = () => {
    const params = useParams()
    const [movie, setMovie] = useState<MovieDetailResponse | null>(null)
    const [error, setError] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [opened, { open, close }] = useDisclosure(false);

    const currentGenres = useMemo(() => {
        if (!movie) return

        if (!movie.genres.length) return 'Unknown'
        return movie.genres.map(g => g.name).join(' ')
    }, [movie])

    const movieCount = useMemo(() => {
        if (!movie) return ''

        const calcCount = movie.vote_count / 1000
        return calcCount > 1 ? calcCount.toFixed(2) + 'K' : movie.vote_count
    }, [movie])

    const moviePremiere = useMemo(() => {
        if (!movie?.release_date) return 'unknown'

        const date = dayjs(movie.release_date).locale('en').format('MMMM D,YYYY')
        return date
    }, [movie])


    useEffect(() => {
        if (!params.id) return

        getMovie(+params.id)
    }, [params.id])

    const duration = useMemo(() => {
        if (!movie) return ''

        let result = ''
        const hours = Math.floor(movie?.runtime / 60)
        if (hours > 0)
            result += hours + 'h'

        const calcMinutes = movie?.runtime - hours * 60
        return result += ' ' + calcMinutes + 'm'
    }, [movie])

    async function getMovie(id: number) {
        try {
            setIsLoading(true)
            setError(null)
            const { data } = await moviesService.getOne(id)
            setMovie(data)
        } catch (e) {
            setError(defineErrorMessage(e))
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            {error && <Notification title={error} icon={<IconX />} color="red" />}
            {isLoading ? (
                <AppLoader />
            ) : (
                <>
                    {movie && (
                        <div className="h-[400px] w-[800px]">
                            <Flex direction="column" gap={20}>
                                <MovieDetailBreadcrumbs originalTitle={movie?.original_title} />
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
                                            <Rating count={1} size={28} onClick={open} />
                                        </Flex>
                                    </Flex>
                                </Paper>
                                <Paper p={24} className="h-auto flex flex-col gap-5">
                                    <div>
                                        <Text fw={600} size="20px" className="pb-4">Trailer</Text>
                                        {movie.videos.results.length ? (
                                            <Paper p={4}>
                                                <iframe width="500" height="281" className="rounded-md"
                                                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                >
                                                </iframe>
                                            </Paper>
                                        ) : (
                                            <Text>No trailer</Text>
                                        )}
                                    </div>
                                    <Divider />
                                    {movie.overview
                                        ? (<Flex direction="column" gap={16}>
                                            <Text size="20px" fw={600}>Description</Text>
                                            <Text>{movie.overview}</Text>
                                        </Flex>)
                                        : (<Text>No description</Text>)
                                    }
                                    <Divider />
                                    <Flex direction="column" gap={16}>
                                        <Text size="20px" fw={600}>Production</Text>
                                        <Flex direction="column" gap={12}>
                                            {movie.production_companies.length
                                                ? (
                                                    <>
                                                        {movie.production_companies.map((c) => {
                                                            return (
                                                                <Flex gap={8} align="center">
                                                                    <div className="w-[40px] h-[40px] rounded-[50%]" style={{
                                                                        backgroundImage: c.logo_path ? `url('http://image.tmdb.org/t/p/w500${c.logo_path}')` : `url('${NotCompanyLogo}')`,
                                                                        backgroundPosition: 'center',
                                                                        backgroundRepeat: 'no-repeat',
                                                                        backgroundSize: 'cover'
                                                                    }}></div>
                                                                    <Text fw={600} size="16px">{c.name}</Text>
                                                                </Flex>
                                                            )
                                                        })}
                                                    </>
                                                )
                                                : (<Text>No production</Text>)
                                            }
                                        </Flex>
                                    </Flex>
                                </Paper>
                            </Flex>

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
                    )}
                </>
            )}
        </div>
    )
}
