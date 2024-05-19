import { MovieDetailResponse } from "@/entities/movie/types/movies-detail-response"
import { Text } from "@mantine/core"

interface Props {
    movie: MovieDetailResponse
}

export const MovieOverview = ({ movie }: Props) => {

    if (!movie.overview)
        return <Text>No description</Text>

    return (
        <Text>{movie.overview}</Text>
    )
}