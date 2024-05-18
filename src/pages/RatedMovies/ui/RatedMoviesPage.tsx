import { MovieCard } from "@/entities/movie"
import { Button, Flex, Grid, Input, Pagination, Text, Image } from "@mantine/core"
import { IconSearch } from '@tabler/icons-react';
import EmptyRatedImage from '@/app/assets/imgs/EmptyRatedImage.png'

export const RatedMoviesPage = () => {
    const items = Array(5).fill(null)

    return (
        <>
            {items.length ? (
                <Flex direction="column" gap={40}>
                    <Flex align="center" justify="space-between">
                        <Text fw={600} size="32px">Rated movies</Text>
                        <SearchRatedMoviesInput />
                    </Flex>
                    <Flex direction="column" gap={24}>
                        <Grid columns={12} >
                            {items.map(() => (
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <MovieCard />
                                </Grid.Col>
                            ))}
                        </Grid>
                        <Flex justify="center">
                            <Pagination total={3} color="grape" />
                        </Flex>
                    </Flex>
                </Flex>
            ) : (
                <Flex className="h-[90vh]" align="center" justify="center">
                    <div>
                        <Image src={EmptyRatedImage} className=" w-[400px] h-[300px] my-[auto]" />
                        <Flex direction="column" gap={16}>
                            <Text className="text-center" fw={700} size="20px">You haven't rated any films yet</Text>
                            <Flex justify="center">
                                <Button className="text-center" color="grape">Find movies</Button>
                            </Flex>
                        </Flex>
                    </div>
                </Flex>
            )}
        </>
    )
}

const SearchRatedMoviesInput = () => {
    return (
        <div className="relative">
            <Input
                size="lg"
                className="w-[490px] --input-fz-[14px]"
                style={{ height: '48px', fontSize: '14px' }}
                placeholder="Search movie title"
                leftSection={<IconSearch size={16} />}
            />
            <Button className="w-[90px] absolute cursor-pointer top-[7px]" color="grape" style={{ width: '90px', right: '12px', zIndex: 2 }}>Search</Button>
        </div>
    )
}
