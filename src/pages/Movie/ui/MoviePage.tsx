import { useEffect, useState } from "react";
import { MovieDetailBreadcrumbs } from "./Breacrumbs";
import { moviesService } from "@/entities/movie";
import { useParams } from "react-router-dom";
import { MovieDetailResponse } from "@/entities/movie/types/movies-detail-response";
import { AppLoader } from "@/shared/ui/AppLoader";
import { IconX } from "@tabler/icons-react";
import { Divider, Flex, Notification, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { favoriteMoviesStorageService } from "@/entities/movie/storage";
import { MovieFavorite } from "@/entities/movie/types/movie-favorite";
import { MovieDetailViewDTO } from "@/entities/movie/dto/movie-detail-to-view-dto";
import { MovieTrailerBlock } from "./MovieTrailerBlock";
import { MovieOverviewBlock } from "./MovieOverviewBlock";
import { MovieProductionBlock } from "./MovieProductionBlock";
import { MovieRatingModal } from "@/entities/movie/ui/MovieRatingModal";
import { MovieDetailCard } from "@/entities/movie/ui/MovieDetailCard";

export const MoviePage = () => {
    const params = useParams()
    const [movie, setMovie] = useState<MovieDetailResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [selectedRating, setSelectedRating] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [opened, { open, close }] = useDisclosure(false);
    const [favorite, setFavorite] = useState<MovieFavorite | null>(null)


    useEffect(() => {
        if (!params.id) return

        if (!favoriteMoviesStorageService.init)
            favoriteMoviesStorageService.initFavorites()

        const favoriteMap = favoriteMoviesStorageService.favoritesMap.get(+params.id)
        if (!favoriteMap) return

        setFavorite(favoriteMap)
    }, [params])

    useEffect(() => {
        if (!params.id) return

        getMovie(+params.id)
    }, [params])

    async function getMovie(id: number) {
        try {
            setIsLoading(true)
            setError(null)
            const { data } = await moviesService.getMovie(id)
            setMovie(data)
        } catch (e) {
            setError('RequestError')
        } finally {
            setIsLoading(false)
        }
    }

    function handleAddToStorageFavoriteMovie() {
        if (!selectedRating || !params.id || !movie) return

        const viewMovie = new MovieDetailViewDTO(movie)

        const favoriteMovie = {
            ...viewMovie,
            favoriteRating: selectedRating
        }
        favoriteMoviesStorageService.save(favoriteMovie)
        setFavorite(favoriteMovie)
        close()
    }

    function handleRemoveRating() {
        if (!params.id) return

        favoriteMoviesStorageService.delete(+params.id)
        setSelectedRating(0)
        setFavorite(null)
        close()
    }

    if (isLoading)
        return <AppLoader />

    return (
        <div>
            {error && <Notification title={error} icon={<IconX />} color="red" />}
            {movie && (
                <div className="xl:w-full 2xl:w-[800px]">
                    <Flex direction="column" gap={20}>
                        <MovieDetailBreadcrumbs originalTitle={movie?.original_title} />
                        <MovieDetailCard
                            favorite={favorite}
                            movie={movie}
                            openRatingModal={open}
                        />
                        <Paper p={24} className="h-auto flex flex-col gap-5">
                            <MovieTrailerBlock movie={movie} />
                            <Divider />
                            <MovieOverviewBlock movie={movie} />
                            <Divider />
                            <MovieProductionBlock movie={movie} />
                        </Paper>
                    </Flex>

                    <MovieRatingModal
                        addToStorageFavoriteMovie={handleAddToStorageFavoriteMovie}
                        close={close}
                        opened={opened}
                        removeRating={handleRemoveRating}
                        selectedRating={selectedRating}
                        setSelectedRating={setSelectedRating}
                        title={movie.original_title}
                    />
                </div>
            )}
        </div>
    )
}
