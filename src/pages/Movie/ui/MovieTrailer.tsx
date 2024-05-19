import { MovieDetailResponse } from "@/entities/movie/types/movies-detail-response"
import { Paper, Text } from "@mantine/core"

interface Props {
    movie: MovieDetailResponse
}

export const MovieTrailer = ({ movie }: Props) => {
    if (!movie.videos.results.length)
        return <Text>No trailer</Text>

    return (
        <Paper p={4}>
            <iframe width="500" height="281" className="rounded-md"
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            >
            </iframe>
        </Paper>
    )
}