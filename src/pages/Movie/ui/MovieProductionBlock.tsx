import { MovieDetailResponse } from "@/entities/movie/types/movies-detail-response"
import { Flex, Text } from "@mantine/core"
import { MovieProduction } from "./MovieProduction"

interface Props {
    movie: MovieDetailResponse
}

export const MovieProductionBlock = ({ movie }: Props) => {
    return (
        <Flex direction="column" gap={16}>
            <Text size="20px" fw={600}>Production</Text>
            <MovieProduction movie={movie} />
        </Flex>
    )
}