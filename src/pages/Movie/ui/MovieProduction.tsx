import { MovieDetailResponse } from "@/entities/movie/types/movies-detail-response"
import { Flex, Text } from "@mantine/core"
import NotCompanyLogo from '@/app/assets/imgs/NotCompanyLogo.png'

interface Props {
    movie: MovieDetailResponse
}

export const MovieProduction = ({ movie }: Props) => {

    if (!movie.production_companies.length)
        return <Text>No production</Text>

    return (
        <Flex direction="column" gap={12}>
            {movie.production_companies.map((c) =>
                <Flex key={c.id} gap={8} align="center">
                    <div className="w-[40px] h-[40px] rounded-[50%]" style={{
                        backgroundImage: c.logo_path ? `url('http://image.tmdb.org/t/p/w500${c.logo_path}')` : `url('${NotCompanyLogo}')`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}></div>
                    <Text fw={600} size="16px">{c.name}</Text>
                </Flex>
            )}
        </Flex>
    )
}