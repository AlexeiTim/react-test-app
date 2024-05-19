import { MovieDetailResponse } from "@/entities/movie/types/movies-detail-response"
import { Flex, Text } from "@mantine/core"
import { MovieOverview } from "./MovieOverview"

interface Props {
    movie: MovieDetailResponse
}

export const MovieOverviewBlock = ({ movie }: Props) => {
    return (
        <Flex direction="column" gap={16}>
            <Text size="20px" fw={600}>Description</Text>
            <MovieOverview movie={movie} />
        </Flex>
    )
}