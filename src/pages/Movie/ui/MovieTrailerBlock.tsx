import { MovieDetailResponse } from "@/entities/movie/types/movies-detail-response"
import { Text } from "@mantine/core"
import { MovieTrailer } from "./MovieTrailer"

interface Props {
    movie: MovieDetailResponse
}

export const MovieTrailerBlock = ({ movie }: Props) => {
    return (
        <div>
            <Text fw={600} size="20px" className="pb-4">Trailer</Text>
            <MovieTrailer movie={movie} />
        </div>
    )
}